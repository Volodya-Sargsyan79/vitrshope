import json
import stripe

from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import ProductSerializer, CategorySerializer

from .models import Product, Category
from order.models import Order
from order.utils import checkout
from cart.cart import Cart

from cart.webhook import webhook

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

def create_checkout_session(request):
  cart = Cart(request)

  stripe.api_key = settings.STRIPE_API_KEY_HIDDEN

  session = stripe.PaymentIntent.create(
    currency = 'usd',
    amount = sum(int(item['total_price']) for item in list(cart)) * 100,
    automatic_payment_methods = {
      'enabled': True
    }
  )


  data = json.loads(request.body)

  if data:
    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']
    address = data['address']
    zipcode = data['zipcode']
    place = data['place']
    payment_intent = session.id
    orderid = checkout(request, first_name, last_name, email, address, zipcode, place)

    order = Order.objects.get(pk=orderid)
    order.payment_intent = payment_intent
    order.paid = True
    order.paid_amount = sum(float(item['total_price']) for item in list(cart))
    order.save()

    cart.clear()
    
  return JsonResponse({'session': session})


def api_remove_from_cart(request):
  data = json.loads(request.body)
  jsonresponse = {'success': True}
  product_id = str(data['product_id'])

  cart = Cart(request)
  cart.remove(product_id)

  return JsonResponse(jsonresponse)
