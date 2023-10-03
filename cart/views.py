from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse

from .cart import Cart


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

  context = {
    'cart_funct': cart_funct,
    'pub_key': settings.STRIPE_API_KEY_PUBLISHABLE,
    'productsstring': productsstring
  }

  return JsonResponse(context)
