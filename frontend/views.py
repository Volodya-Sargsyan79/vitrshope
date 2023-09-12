from django.shortcuts import render

# Create your views here.

from cart.cart import Cart

def index(request, category=None, slug=None):
    cart = Cart(request)

    # if cart:
    #     for item in cart:
    #         with product=item.product
    #             print(product.title)
    # else:
    context = {
        'cart': cart
    }

    return render(request, 'index.html', context)