from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, ProductImage, UserProfile, Order, OrderItem, Cart, CartItem

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'in_stock', 'created_at']
    list_filter = ['category', 'in_stock', 'is_new', 'has_discount']
    search_fields = ['name', 'description']
    inlines = [ProductImageInline]

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['product', 'quantity', 'price', 'selected_size', 'selected_color']
    can_delete = False

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'order_number', 
        'customer_name', 
        'user', 
        'total_amount', 
        'payment_method',
        'status_badge', 
        'payment_badge',
        'created_at'
    ]
    list_filter = ['order_status', 'payment_status', 'payment_method', 'created_at']
    search_fields = ['id', 'customer_name', 'customer_phone', 'user__username']
    readonly_fields = ['created_at', 'updated_at', 'total_amount']

    fieldsets = (
        ('Order Information', {
            'fields': ('user', 'order_status', 'payment_status', 'payment_method', 'total_amount')
        }),
        ('Customer Details', {
            'fields': ('customer_name', 'customer_phone', 'delivery_address', 'city', 'state')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    inlines = [OrderItemInline]
    
    def order_number(self, obj):
        return f"#{obj.id}"
    order_number.short_description = 'Order #'
    
    def status_badge(self, obj):
        colors = {
            'pending': '#ff9800',      # Orange
            'confirmed': '#2196f3',    # Blue
            'processing': '#9c27b0',   # Purple
            'shipped': '#00bcd4',      # Teal
            'delivered': '#4caf50',    # Green
            'cancelled': '#f44336',    # Red
        }
        color = colors.get(obj.order_status, '#9e9e9e')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;">{}</span>',
            color,
            obj.get_order_status_display().upper()
        )
    status_badge.short_description = 'Order Status'

    def payment_badge(self, obj):
        colors = {
            'unpaid': '#ff9800',    # Orange
            'paid': '#4caf50',      # Green
            'refunded': '#9e9e9e',  # Gray
        }
        color = colors.get(obj.payment_status, '#9e9e9e')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;">{}</span>',
            color,
            obj.get_payment_status_display().upper()
        )
    payment_badge.short_description = 'Payment Status'

    actions = ['mark_as_confirmed', 'mark_as_processing', 'mark_as_shipped', 'mark_as_delivered', 'mark_as_paid']
    
    def mark_as_confirmed(self, request, queryset):
        queryset.update(order_status='confirmed')
        self.message_user(request, f"{queryset.count()} orders marked as confirmed.")
    mark_as_confirmed.short_description = "Mark selected orders as Confirmed"
    
    def mark_as_processing(self, request, queryset):
        queryset.update(order_status='processing')
        self.message_user(request, f"{queryset.count()} orders marked as processing.")
    mark_as_processing.short_description = "Mark selected orders as Processing"
    
    def mark_as_shipped(self, request, queryset):
        queryset.update(order_status='shipped')
        self.message_user(request, f"{queryset.count()} orders marked as shipped.")
    mark_as_shipped.short_description = "Mark selected orders as Shipped"
    
    def mark_as_delivered(self, request, queryset):
        queryset.update(order_status='delivered', payment_status='paid')  # Auto-mark as paid when delivered (for COD)
        self.message_user(request, f"{queryset.count()} orders marked as delivered and paid.")
    mark_as_delivered.short_description = "Mark selected orders as Delivered"
    
    def mark_as_paid(self, request, queryset):
        queryset.update(payment_status='paid')
        self.message_user(request, f"{queryset.count()} orders marked as paid.")
    mark_as_paid.short_description = "Mark selected orders as Paid"

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product', 'quantity', 'selected_size', 'selected_color', 'subtotal']

admin.site.register(Category)
admin.site.register(UserProfile)
admin.site.register(OrderItem)
admin.site.register(ProductImage)
admin.site.register(Cart)
