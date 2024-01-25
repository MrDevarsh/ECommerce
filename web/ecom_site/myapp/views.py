from django.shortcuts import render
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
import json
from rest_framework import status
# Create your views here.

class ProductView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class CartView(APIView):

    def get(self, request):
        cart = Cart.objects.all()
        serializer = CartSerializer(cart, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.headers['Content-Type'] == 'application/json':
            cart_data = json.loads(request.body)

            print(cart_data)

            # Assuming cart_data has the necessary information to create a Cart object
            serializer = CartSerializer(data={
                'cart_total': cart_data.get('cartTotal'),
                'cart_value': cart_data.get('cartValue'),
                'session': '1',  # You may need to change this based on your requirements
                'tax': cart_data.get('tax')
            })


            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# carts methods
def add_to_cart():
    # 
    return 1

def update_cart():
    # 
    return 1

def checkout():
    # 
    return 1

def update_payment():
    # 
    return 1

def update_shipment():
    # 
    return 1

def download_invoice():
    # 
    return 1

def track_shipment():
    # 
    return 1
