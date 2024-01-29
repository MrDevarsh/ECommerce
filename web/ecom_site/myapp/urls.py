from django.urls import path, include
from .views import *

urlpatterns = [
    path('generate-session/', SessionView.as_view(), name='generate-session'),
    path('products/', ProductView.as_view(), name='product-list'),
    path('carts/', CartView.as_view(), name='cart-list'),
    path('sessions/', SessionView.as_view(), name='all_sessions'),
    path('sessions/<str:sessionId>/', SessionView.get_by_session_id(), name='session_by_id'),
]
