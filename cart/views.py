from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse

from .cart import Cart

def cart_detail(request):
  cart = Cart(request)

  cart_funct = {
    'total_quantity': cart.get_total_length(),
    'total_cost': sum(float(item['total_price']) for item in list(cart))
  }

  context = {
    'cart': list(cart),
    'cart_funct': cart_funct
  }

  
  return JsonResponse(context)
