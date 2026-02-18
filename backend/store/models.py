from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    has_discount = models.BooleanField(default=False)
    in_stock = models.BooleanField(default=True)
    is_new = models.BooleanField(default=False)
    color_count = models.PositiveIntegerField(default=1)
    
    available_sizes = models.CharField(max_length=200, blank=True, help_text="Comma-separated sizes: S,M,L,XL,2XL")
    available_colors = models.TextField(blank=True, help_text="Format: ColorName:#HexCode, e.g., Black:#000000,Red:#FF0000,Yellow:#FACC15")
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    def get_sizes_list(self):
        if self.available_sizes:
            return [size.strip() for size in self.available_sizes.split(',')]
        return []
    
    def get_colors_list(self):
        if self.available_colors:
            colors = []
            for color in self.available_colors.split(','):
                if ':' in color:
                    name, hex_code = color.split(':')
                    colors.append({'name': name.strip(), 'hex': hex_code.strip()})
            return colors
        return []


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.product.name} - Image {self.order}"

    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.user.username

    
class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('unpaid', 'Unpaid'),
        ('paid', 'Paid'),
        ('refunded', 'Refunded'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    order_status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='unpaid')
    payment_method = models.CharField(max_length=50, default='COD')

    customer_name = models.CharField(max_length=200)
    customer_phone = models.CharField(max_length=20)
    delivery_address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order {self.id} - {self.user.username if self.user else 'Guest'} - {self.get_order_status_display()}"
    
    def get_status_badge_color(self):
        colors = {
            'pending': 'orange',
            'confirmed': 'blue',
            'processing': 'purple',
            'shipped': 'teal',
            'delivered': 'green',
            'cancelled': 'red',
        }
        return colors.get(self.order_status, 'gray')


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    selected_size = models.CharField(max_length=20, blank=True)
    selected_color = models.CharField(max_length=50, blank=True)

    def __str__(self):
        details = f"{self.quantity} x {self.product.name}"
        if self.selected_size:
            details += f" - Size: {self.selected_size}"
        if self.selected_color:
            details += f" - Color: {self.selected_color}"
        return details
    
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart {self.id} for {self.user}"
    
    @property
    def total(self):
        return sum(item.subtotal for item in self.items.all())
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    
    selected_size = models.CharField(max_length=20, blank=True)
    selected_color = models.CharField(max_length=50, blank=True)

    def __str__(self):
        details = f"{self.quantity} x {self.product.name}"
        if self.selected_size:
            details += f" - Size: {self.selected_size}"
        if self.selected_color:
            details += f" - Color: {self.selected_color}"
        return details
    
    @property
    def subtotal(self):
        return self.quantity * self.product.price