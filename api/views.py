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
from coupon.models import Coupon
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
def category(request, pk):

  queryset = Category.objects.get(id=pk)
  serializer_class = CategorySerializer(queryset, many=False)
  
  return Response(serializer_class.data)

def create_checkout_session(request):
  data = json.loads(request.body)
  cart = Cart(request)

  price = sum(float(item['total_price']) for item in list(cart))

  coupon_code = data['coupon_code']
  coupon_value = 0

  if coupon_code != "":
    coupon = Coupon.objects.get(code = coupon_code)
    

    if coupon.can_use():
      coupon_value = coupon.value

  if int(coupon_value) > 0:
    x = price * int(coupon_value) / 100
    price_coupon = float('{0:.2f}'.format(x))
  else:
    price_coupon = price
      
  stripe.api_key = settings.STRIPE_API_KEY_HIDDEN

  session = stripe.PaymentIntent.create(
    currency = 'usd',
    amount = int(price_coupon * 100),
    automatic_payment_methods = {
      'enabled': True
    }
  )

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
  order.paid_amount = price_coupon
  order.used_coupon = coupon_code
  order.save()  
  
  return JsonResponse({'session': session})

# def finish_checkout_session(request):
  # data = json.loads(request.body)
  # cart = Cart(request)

  # price = sum(float(item['total_price']) for item in list(cart))

  # coupon_code = data['coupon_code']
  # coupon_value = 0

  # print(coupon_code, 11111111111111)

  # if coupon_code != "":
  #   coupon = Coupon.objects.get(code = coupon_code)
    

  #   if coupon.can_use():
  #     coupon_value = coupon.value
      
  #     coupon.use()

  # print(coupon_value, 2222222)

  # if int(coupon_value) > 0:
  #   x = price * int(coupon_value) / 100
  #   price_coupon = float('{0:.2f}'.format(x))
  # else:
  #   price_coupon = price

  # print(price_coupon, 33333)

  # stripe.api_key = settings.STRIPE_API_KEY_HIDDEN

  # session = stripe.PaymentIntent.create(
  #   currency = 'usd',
  #   amount = int(price_coupon * 100),
  #   automatic_payment_methods = {
  #     'enabled': True
  #   }
  # )

  # first_name = data['first_name']
  # last_name = data['last_name']
  # email = data['email']
  # address = data['address']
  # zipcode = data['zipcode']
  # place = data['place']
  # payment_intent = 12
  # orderid = checkout(request, first_name, last_name, email, address, zipcode, place)

  # order = Order.objects.get(pk=orderid)
  # order.payment_intent = payment_intent
  # order.paid = True
  # order.paid_amount = price_coupon
  # order.used_coupon = coupon_code
  # order.save()

  # cart.clear()
    
  # return JsonResponse()


def api_remove_from_cart(request):
  data = json.loads(request.body)
  jsonresponse = {'success': True}
  product_id = str(data['product_id'])

  cart = Cart(request)
  cart.remove(product_id)

  return JsonResponse(jsonresponse)
