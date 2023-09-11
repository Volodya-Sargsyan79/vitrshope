from rest_framework import serializers

from .models import Product, Category

class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = ('id', 'category', 'title', 'slug', 'description', 'price')

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ('id', 'title', 'slug', 'ordering')

class CartSerializer(serializers.Serializer):
  id = serializers.IntegerField()
  quantity = serializers.IntegerField()
  price = serializers.DecimalField(max_digits=10, decimal_places=2)