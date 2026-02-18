from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', views.register_view),
    path('token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/', views.get_products),
    path('products/new/', views.get_new_products),
    path('products/<int:pk>/', views.get_product),
    path('categories/', views.get_categories),
    path('cart/', views.get_cart),
    path('cart/add/', views.add_to_cart),
    path('cart/remove/', views.remove_from_cart),
    path('cart/update-quantity/', views.update_cart_quantity),
    path('orders/create/', views.create_order),
    path('user/info/', views.get_user_info, name='user_info'),
    path('user/update/', views.update_user_info, name='update_user_info'),
    path('user/orders/', views.get_user_orders, name='user_orders'),

    path('api/orders/create', views.create_order),
    path('webhook/paystack/', views.paystack_webhook),
]