from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth.models import User
from .models import Product, Category, Cart, CartItem, Order, OrderItem, UserProfile
from .serializers import ProductSerializer, CategorySerializer, CartItemSerializer, CartSerializer, RegisterSerializer, UserSerializer

import uuid
import json
import hmac
import hashlib
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.conf import settings
from .paystack import checkout


@api_view(['GET'])
def get_products(request):
    products = Product.objects.prefetch_related('images').all()
    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def get_new_products(request):
    products = Product.objects.prefetch_related('images').order_by('-created_at')[:4]
    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def get_product(request, pk):
    try: 
        product = Product.objects.prefetch_related('images').get(id=pk)
        serializer = ProductSerializer(product, context={'request': request})
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({"error": 'Product not found'}, status=400)


@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    quantity_to_add = int(request.data.get('quantity', 1))
    selected_size = request.data.get('selected_size', '')  # NEW
    selected_color = request.data.get('selected_color', '')  # NEW
    
    try:
        product = Product.objects.get(id=product_id)
        cart, created = Cart.objects.get_or_create(user=request.user)
        
        # Check if same product with same size and color already exists
        item = CartItem.objects.filter(
            cart=cart, 
            product=product,
            selected_size=selected_size,
            selected_color=selected_color
        ).first()
        
        if item:
            # Item exists, increment quantity
            item.quantity += quantity_to_add
        else:
            # Create new item
            item = CartItem.objects.create(
                cart=cart,
                product=product,
                quantity=quantity_to_add,
                selected_size=selected_size,
                selected_color=selected_color
            )
        
        item.save()
        return Response({
            'message': 'Product added to cart', 
            'cart': CartSerializer(cart, context={'request': request}).data
        })
    
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request):
    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')

    if not item_id or quantity is None:
        return Response({'error': 'Item ID and quantity are required'}, status=400)
    
    try:
        item = CartItem.objects.get(id=item_id)
        if int(quantity) < 1:
            item.delete()
            return Response({'message': 'Item removed from cart'})
        
        item.quantity = quantity
        item.save()
        serializer = CartItemSerializer(item, context={'request': request})
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'message': 'Cart item not found'}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id = request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()
    return Response({'message': 'Item removed from cart'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try: 
        data = request.data
        name = data.get('name')
        address = data.get('address')
        apartment = data.get('apartment')
        city = data.get('city')
        state = data.get('state')
        postalCode = data.get('postalCode')
        phone = data.get('phone')
        payment_method = data.get('payment_method', 'COD')

        # validate Phone Number
        if not phone.isdigit() or len(phone) < 10:
            return Response({'error': 'Invalid phone number'}, status=400)
        
        # Get user's cart
        cart, created = Cart.objects.get_or_create(user=request.user)
        if not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=400)
        
        total = sum([item.product.price * item.quantity for item in cart.items.all()])

        full_address = address
        if apartment:
            full_address += f", {apartment}"
        if postalCode:
            full_address += f", {postalCode}"

        order = Order.objects.create(
            user=request.user, 
            total_amount=total,
            customer_name=name,
            customer_phone=phone,
            delivery_address=full_address,
            city=city,
            state=state,
            payment_method=payment_method,
            order_status='pending',
            payment_status='unpaid'

        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
                selected_size=item.selected_size,  
                selected_color=item.selected_color 
            )
        
        cart.items.all().delete()

        if payment_method == 'paystack':
            purchase_id = f"order_{order.id}_{uuid.uuid4()}"
            callback_url = f"{settings.FRONTEND_URL}/payment/verify?order_id={order.id}"

            checkout_data = {
                "email": request.user.email,
                "amount": int(total * 100),  
                "currency": "NGN",
                "channels": ["card", "bank_transfer", "bank", "ussd", "qr", "mobile_money"],
                "reference": purchase_id,
                "callback_url": callback_url,
                "metadata": {
                    "order_id": order.id,
                    "user_id": request.user.id,
                    "purchase_id": purchase_id,
                },
                "label": f"Order #{order.id}"
            }

            status, url_or_error = checkout(checkout_data)

            if status:
                return Response({
                    'message': 'Redirect to Paystack',
                    'order_id': order.id,
                    'payment_url': url_or_error, 
                })
            else:
                order.order_status = 'cancelled'
                order.save()
                return Response({'error': url_or_error}, status=400)


        return Response({'message': 'Order created successfully', 'order_id': order.id, 'order_status': order.order_status, 'payment_status': order.payment_status})
    except Exception as e:
        return Response({'error': str(e)}, status=500)


    
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': "User Created Successfully", "user": UserSerializer(user).data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'phone': user.userprofile.phone if hasattr(user, 'userprofile') else '',
    })

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_info(request):
    user = request.user
    data = request.data

    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    user.save()
    
    profile, created = UserProfile.objects.get_or_create(user=user)
    if 'phone' in data:
        profile.phone = data['phone']
    profile.save()
    
    return Response({
        'message': 'Profile updated successfully',
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'phone': profile.phone,
        }
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    orders = Order.objects.filter(user=request.user).prefetch_related('items__product__images').order_by('-created_at')
    
    orders_data = []
    for order in orders:
        items_data = []
        for item in order.items.all():
            first_image = item.product.images.first()
            image_url = None
            if first_image and first_image.image:
                image_url = request.build_absolute_uri(first_image.image.url)
            
            items_data.append({
                'name': item.product.name,
                'color': item.selected_color,
                'size': item.selected_size,
                'quantity': item.quantity,
                'price': str(item.price),
                'image': image_url,
            })
        
        orders_data.append({
            'id': f"#ORD-{order.id}",
            'date': order.created_at.isoformat(),
            'status': order.get_order_status_display(),
            'order_status': order.order_status,
            'payment_status': order.payment_status,
            'total': str(order.total_amount),
            'items': items_data,
            'delivery_info': {
                'name': order.customer_name,
                'phone': order.customer_phone,
                'address': order.delivery_address,
                'city': order.city,
                'state': order.state,
            }
        })
    
    return Response(orders_data)


@csrf_exempt
def paystack_webhook(request):
    secret = settings.PAYSTACK_SECRET_KEY
    request_body = request.body

    hash = hmac.new(secret.encode('utf-8'), request_body, hashlib.sha512).hexdigest()

    if hash == request.META.get('HTTP_X_PAYSTACK_SIGNATURE'):
        webhook_post_data = json.loads(request_body)

        if webhook_post_data["event"] == "charge.success":
            metadata = webhook_post_data["data"]["metadata"]
            order_id = metadata.get("order_id")

            try:
                order = Order.objects.get(id=order_id)
                order.payment_status = 'paid'
                order.order_status = 'confirmed'
                order.save()
            except Order.DoesNotExist:
                pass

    return HttpResponse(status=200)