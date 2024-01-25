# Generated by Django 5.0.1 on 2024-01-23 17:43

import django.core.files.storage
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('price', models.DecimalField(decimal_places=3, max_digits=10)),
                ('max_qty', models.IntegerField()),
                ('image', models.ImageField(storage=django.core.files.storage.FileSystemStorage(), upload_to='products/%Y/%m/%d/')),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_id', models.CharField(max_length=40, unique=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.DecimalField(decimal_places=3, max_digits=10)),
                ('updated_on', models.DateTimeField(auto_now=True)),
                ('items', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.product')),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.session')),
            ],
        ),
    ]