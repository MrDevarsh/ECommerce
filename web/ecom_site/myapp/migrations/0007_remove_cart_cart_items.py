# Generated by Django 5.0.1 on 2024-01-29 09:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0006_rename_items_cartdetails_product_cart_cart_items_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='cart_items',
        ),
    ]