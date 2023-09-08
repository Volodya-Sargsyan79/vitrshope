from django.shortcuts import render

# Create your views here.

from .cart import Cart

def cart_detail(request):
  cart = Cart(request)
  print(cart, 22222)