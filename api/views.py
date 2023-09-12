import json
from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from .serializers import ProductSerializer, CategorySerializer, CartSerializer
from .models import Product, Category
from rest_framework.decorators import api_view
from cart.cart import Cart
from django.http import JsonResponse
from django.contrib.sessions.models import Session

# Create your views here.

class ProductView(generics.ListAPIView):
  queryset = Product.objects.filter(is_featured=True)
  serializer_class = ProductSerializer


class CategoryView(generics.ListAPIView):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer


@api_view(['GET'])
def product_detail(request, category, slug):

  queryset = Product.objects.get(slug=slug)
  serializer_class = ProductSerializer(queryset, many=False)
  
  return Response(serializer_class.data)

@api_view(['GET'])
def categoy_detail(request, slug):

  queryset = Category.objects.get(slug=slug)
  serializer_class = CategorySerializer(queryset, many=False)

  queryset_filter = Product.objects.filter(category=serializer_class.data['id'])
  serializer_class_filter = ProductSerializer(queryset_filter, many=True)

  return Response(serializer_class_filter.data)

@api_view(['GET'])
def catedory(request, pk):

  queryset = Category.objects.get(id=pk)
  serializer_class = CategorySerializer(queryset, many=False)
  
  return Response(serializer_class.data)

def api_add_to_cart(request):

  data = json.loads(request.body)
  jsonresponse = {'success': True}
  product_id = data['product_id']
  update = data['update']
  quantity = data['quantity']
  
  product = get_object_or_404(Product, pk=product_id)
 

  cart = Cart(request)

  if not update:
    cart.add(product=product, update_quantity=False)
  else:
    cart.add(product=product, quantity=quantity, update_quantity=True)
  return JsonResponse(jsonresponse)


def api_remove_from_cart(request):
  data = json.loads(request.body)
  jsonresponse = {'success': True}
  product_id = str(data['product_id'])

  cart = Cart(request)
  cart.remove(product_id)

  return JsonResponse(jsonresponse)


def cart_detail(request):
  cart = Cart(request)
  return JsonResponse(cart.cart)