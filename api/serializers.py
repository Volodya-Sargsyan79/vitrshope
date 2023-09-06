from rest_framework import serializers

from .models import Product, Category

class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = ('id', 'title', 'slug', 'description', 'price')

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ('id', 'title', 'slug', 'ordering')