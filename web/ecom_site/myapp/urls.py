from django.urls import path, include
from myapp import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', views.generate_access_token, name='generate-access-token'),
    path('token/refresh/', views.refresh_access_token, name='refresh-access-token'),
    path('generate-session/', views.generate_session_id, name='generate-session'),
    path('products/', views.get_products, name='product-list'),
    path('cartdetails/', views.add_cart_details, name='cart-details'),
    path('sessions/', views.get_sessions, name='all_sessions'),
    path('sessions/<str:session_id>/', views.get_session_by_id, name='get-session-by-id'),
    path('carts/', views.add_to_carts, name='add-to-carts'),
    path('checkout/', views.checkout, name='checkout'),
    path('add-shipment/', views.add_shipment, name='add-shipment'),
    path('download-invoice/', views.download_invoice, name='download-invoice'),
    path('track-shipment/', views.track_shipment, name='track-shipment'),
]
