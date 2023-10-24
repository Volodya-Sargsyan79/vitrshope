from django.urls import path
from .views import ProductView, \
   CategoryView, \
   product_detail, \
   categoy_detail, \
   catedory, \
   api_remove_from_cart, \
   create_checkout_session
from cart.views import cart_detail
from cart.webhook import webhook

from cart.api import api_add_to_cart


urlpatterns = [
   path('product/', ProductView.as_view()),
   path('categories/', CategoryView.as_view()),
   path('add_to_cart/', api_add_to_cart, name='api_add_to_cart'),
   path('remove_from_cart/', api_remove_from_cart, name='api_remove_from_cart'),
   path('cart_detail/', cart_detail, name='cart_detail'),
   path('hooks/', webhook, name='webhook'),
   path('create_checkout_session/', create_checkout_session, name='create_checkout_session'),
   path('<slug:category>/<slug:slug>/', product_detail, name="product_detail"),
   path('<slug:slug>/', categoy_detail, name="categoy_detail"),
   path('categories/category/<int:pk>/', catedory, name="catedory"),  
]