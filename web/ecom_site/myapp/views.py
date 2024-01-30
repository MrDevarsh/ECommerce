from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Session, Product, Cart, CartDetails, Shipment, ShipmentDetails, Payment
from .serializers import *
import datetime
import uuid
import json
from ecom_site import settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

# permission_classes = (IsAuthenticated)

@api_view(['POST'])
@permission_classes([AllowAny])
def generate_access_token(request):
    user, created = User.objects.get_or_create(username='default_user')

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    expiration_time = timezone.now() + timedelta(minutes=settings.SESSION_COOKIE_AGE)  # Adjust as needed
    response_data = {
        'access_token': access_token,
        'refresh_token': refresh_token,
        'access_token_expiration': expiration_time,
    }

    return Response(response_data)

@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_access_token(request):
    refresh_token = request.data.get('refresh')
    if not refresh_token:
        return Response({'error': 'Refresh token is required'}, status=400)

    try:
        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)
        expiration_time = timezone.now() + timedelta(minutes=settings.SESSION_COOKIE_AGE)  # Adjust as needed

        response_data = {
            'access_token': access_token,
            'access_token_expiration': expiration_time,
        }
        return Response(response_data)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_products(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def add_to_carts(request):
    if request.method == 'POST':
        cart_data = json.loads(request.body)
        serializer = CartSerializer(data={
            'cart_value': cart_data.get('cartValue'),
            'tax': cart_data.get('tax'),
            'cart_total': cart_data.get('cartTotal'),
            'updated_on': datetime.datetime.now()
        })

        if serializer.is_valid():
            cart = serializer.save()
            
            print("-----------------------Inside Cart-----------------------------")

            res_cart_detail = add_cart_details(request, cart, cart_data)
                            
            if(res_cart_detail.status_code == 201):
                
                res_ship = add_shipment(cart.id, cart_data)
                res_payment = add_payment(cart.id, cart_data)
                
                
                if(res_ship.status_code == 201 and res_payment.status_code == 201):
                    
                    
                    return Response({'paymentDetails': res_payment.data.get('message'),
                                     'shipmentDetails': res_ship.data.get('message')}, status=status.HTTP_200_OK)
                
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

def add_cart_details(request, cart, cart_data):
    try:
        
        for item in cart_data.get('cartItems', []):
            product_id = item.get('id')
            product_qty = item.get('qty')
            
            serializer = CartDetailsSerializer(data={
                'cart': cart.id,
                'product': product_id,
                'quantity': product_qty
            })
            
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Cart details added successfully'}, status=status.HTTP_201_CREATED)
            
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    except json.JSONDecodeError:
        return Response({'message': 'Invalid JSON data in request body'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    if request.method == 'POST':
        if request.headers['Content-Type'] == 'application/json':
            payment_data = json.loads(request.body)
            serializer = PaymentSerializer(data=payment_data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def add_shipment(cart_id, cart_data):
    shipping_address = cart_data.get('shippingAddress')
    billing_address = cart_data.get('billingAddress')
    
    serializer = ShipmentSerializer(data={
        'shipping_address': shipping_address,
        'billing_address': billing_address,
        'cart': cart_id
    })
    
    
    if (serializer.is_valid()):
        shipping = serializer.save()
        
        return add_shipping_details(shipping.id)
        
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
def add_shipping_details(shippingId):
    trackingId = 'JS_SH00' + str(shippingId)
    
    serializer = ShipmentDetailsSerializer(data={
        'shipment': shippingId,
        'status': 'Ready to Dispatch',
        'tracking_id': trackingId
    })
    
    if (serializer.is_valid()):
        serializer.save()
        
        return Response({'message': 'Order Shipment Place. Tracking ID: ' + trackingId}, status=status.HTTP_201_CREATED)

    else:
        return Response({'message': 'Error storing shipping details'}, status=status.HTTP_400_BAD_REQUEST)
    
def add_payment(cart_id, cart_data):
    paymentId = 'JS_PAY00' + str(cart_id)
    
    serializer = PaymentSerializer(data={
        'value': cart_data.get('cartTotal'),
        'created_on': datetime.datetime.now(),
        'status': True,
        'cart': cart_id,
        'payment_id': paymentId,
    })
    
    print(serializer)
    
    if(serializer.is_valid()):
        serializer.save()

        print("-----------------------Inside Payment Details-----------------------------")

        return Response({'message': 'Payment Successfull. PaymentId: ' + paymentId}, status=status.HTTP_201_CREATED)
    
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_invoice(request):
    if request.method == 'GET':
        # Assuming you want to get all payments, adjust the queryset accordingly
        payments = Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def track_shipment(request):
    if request.method == 'GET':
        # Assuming you want to get all shipment details, adjust the queryset accordingly
        shipment_details = ShipmentDetails.objects.all()
        serializer = ShipmentDetailsSerializer(shipment_details, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def generate_session_id(request):
    if request.method == 'POST':
        session_id = uuid.uuid4()
        current_time = timezone.now()
        expires_at = current_time + timezone.timedelta(minutes=settings.SESSION_COOKIE_AGE)

        existing_session = Session.objects.filter(expires_at__gt=current_time).first()

        if existing_session:
            # Session is still valid, return the existing session ID
            serializer = SessionSerializer(existing_session)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Session has expired or doesn't exist, generate a new one
            session_id = uuid.uuid4()
            expires_at = current_time + timezone.timedelta(minutes=settings.SESSION_COOKIE_AGE)

            # Create or update the session record in the database
            if existing_session:
                existing_session.session_id = session_id
                existing_session.expires_at = expires_at
                existing_session.save()
            else:
                Session.objects.create(
                    session_id=session_id,
                    expires_at=expires_at
                )

            # Return the new session data
            new_session = Session.objects.get(session_id=session_id)
            serializer = SessionSerializer(new_session)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_sessions(request):
    sessions = Session.objects.all()
    serializer = SessionSerializer(sessions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_session_by_id(request, session_id):
    session_instance = get_object_or_404(Session, session_id=session_id)
    serializer = SessionSerializer(session_instance)
    return Response(serializer.data, status=status.HTTP_200_OK)
