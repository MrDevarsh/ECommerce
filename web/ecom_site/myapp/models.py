from django.db import models
from django.core.files.storage import FileSystemStorage

class Session(models.Model):
    session_id = models.CharField(max_length=40, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)  # Use auto_now_add for creation time

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=3)
    max_qty = models.IntegerField()
    image = models.ImageField(upload_to='products/%Y/%m/%d/', storage=FileSystemStorage())

class Cart(models.Model):
    items = models.ForeignKey(Product, on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=10, decimal_places=3)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    updated_on = models.DateTimeField(auto_now=True)

class Payment(models.Model):
    value = models.DecimalField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField()

class Shipment(models.Model):
    shipmentAddress = models.TextField()
    billingAddress = models.TextField()
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)

class ShipmentDetails(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    status = models.TextField()
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)