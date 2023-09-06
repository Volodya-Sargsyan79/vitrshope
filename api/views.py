from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from rest_framework.decorators import action
from .serializers import ProductSerializer, CategorySerializer
from .models import Product, Category
from rest_framework.decorators import api_view

# Create your views here.

class ProductView(generics.ListAPIView):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer


class CategoryView(generics.ListAPIView):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer

class ProductDetailView(generics.ListAPIView):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer

  @action(detail=False, methods=['POST'])
  def product_detail(self, request, slug):
    productDetail = get_object_or_404(Product, slug=slug)
    print(productDetail)
    return render(request)