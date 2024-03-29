from django.db import models
from django.core.files.storage import FileSystemStorage

class Session(models.Model):
    session_id = models.CharField(max_length=40, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=3)
    max_qty = models.IntegerField()
    image = models.TextField()

class Cart(models.Model):
    cart_value = models.DecimalField(max_digits=10, decimal_places=3)
    tax = models.DecimalField(max_digits=10, decimal_places=3)
    cart_total = models.DecimalField(max_digits=10, decimal_places=3)
    updated_on = models.DateTimeField(auto_now=True)

class CartDetails(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1) 

class Shipment(models.Model):
    shipping_address = models.TextField()
    billing_address = models.TextField()
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)

class ShipmentDetails(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    status = models.TextField()
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    tracking_id = models.TextField()

class Payment(models.Model):
    value = models.DecimalField(max_digits=10, decimal_places=3)
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField()
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    payment_id = models.TextField()
    
