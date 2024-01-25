from django.urls import path, include
from .views import *

urlpatterns = [
    path('products/', ProductView.as_view(), name='product-list'),
    path('carts/', CartView.as_view(), name='cart-list')
]
