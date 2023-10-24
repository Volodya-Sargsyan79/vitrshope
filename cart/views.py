from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
from api.serializers import ProductSerializer

from .cart import Cart

def cart_detail(request):
  cart = Cart(request)  
  
  cart_funct = {
    'total_quantity': cart.get_total_length(),
    'total_cost': sum(float(item['total_price']) for item in list(cart))
  }

  for item in cart:
    serializer_class = ProductSerializer(item['product'], many=False)
    item['product'] = serializer_class.data

  context = {
    'cart_funct': cart_funct,
    'pub_key': settings.STRIPE_API_KEY_PUBLISHABLE,
    'cart': cart.cart
  }
 
  return JsonResponse(context)
