from django.shortcuts import render

# Create your views here.

from cart.cart import Cart

def index(request, category=None, slug=None):
    return render(request, 'index.html')