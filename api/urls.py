from django.urls import path
from .views import ProductView, \
   CategoryView, \
   product_detail, \
   categoy_detail, \
   category, \
   api_remove_from_cart, \
   create_checkout_session, \
   finish_checkout_session
from cart.views import cart_detail
from cart.webhook import webhook

from cart.api import api_add_to_cart
from coupon.api import api_can_use


urlpatterns = [
   path('product/', ProductView.as_view()),
   path('categories/', CategoryView.as_view()),
   path('add_to_cart/', api_add_to_cart, name='api_add_to_cart'),
   path('remove_from_cart/', api_remove_from_cart, name='api_remove_from_cart'),
   path('cart_detail/', cart_detail, name='cart_detail'),
   path('can_use/', api_can_use, name='api_can_use'),
   path('hooks/', webhook, name='webhook'),
   path('create_checkout_session/', create_checkout_session, name='create_checkout_session'),
   path('finish_checkout_session/', finish_checkout_session, name='finish_checkout_session'),
   path('<slug:category>/<slug:slug>/', product_detail, name="product_detail"),
   path('<slug:slug>/', categoy_detail, name="categoy_detail"),
   path('categories/category/<int:pk>/', category, name="category"),  
]