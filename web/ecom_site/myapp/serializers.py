from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CartDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartDetails
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Cart
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = '__all__'

class ShipmentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipmentDetails
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'
