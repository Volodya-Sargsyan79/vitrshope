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

from order.utils import checkout
from order.models import Order, OrderItem

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

def api_checkout(request):
  cart = Cart(request)

  data = json.loads(request.body)
  jsonresponse = {'success': True}
  first_name = data['first_name']
  last_name = data['last_name']
  email = data['email']
  address = data['address']
  zipcode = data['zipcode']
  place = data['place']
  
  

  orderid = checkout(request, first_name, last_name, email, address, zipcode, place)


  paid = True

  if paid == True:
    order = Order.objects.get(pk=orderid)
    order.paid = True
    order.paid_amount = cart.get_total_cost()
    order.save()

    cart.clear()

  return JsonResponse(jsonresponse)

def api_add_to_cart(request):

  data = json.loads(request.body)
  jsonresponse = {'success': True}
  product_id = data['product_id']
  update = data['update']
  quantity = data['quantity']
  
  cart = Cart(request)
  
  product = get_object_or_404(Product, pk=product_id)

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
  productsstring = {}

  for item in cart:
    product = item['product']

    product_id = str(product.id)

    if product_id not in productsstring:
      productsstring[product_id] = {
        'id': product.id, 
        'title': product.title, 
        'price': product.price, 
        'quantity': item['quantity'], 
        'total_price': item['total_price'],
      }

  cart_funct = {
    'total_quantity': cart.get_total_length(),
    'total_cost': cart.get_total_cost()
  }

  statment = {
    'cart_funct': cart_funct,
    'productsstring': productsstring
  }

  return JsonResponse(statment)