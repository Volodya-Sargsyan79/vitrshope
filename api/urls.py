from django.urls import path
from .views import ProductView, \
   CategoryView, \
   product_detail, \
   categoy_detail, \
   catedory, \
   api_add_to_cart, \
   api_remove_from_cart, \
   cart_detail, \
   api_checkout


urlpatterns = [
   path('product/', ProductView.as_view()),
   path('categories/', CategoryView.as_view()),
   path('add_to_cart/', api_add_to_cart, name='api_add_to_cart'),
   path('remove_from_cart/', api_remove_from_cart, name='api_remove_from_cart'),
   path('cart_detail/', cart_detail, name='cart_detail'),
   path('api_checkout/', api_checkout, name='api_checkout'),
   path('<slug:category>/<slug:slug>/', product_detail, name="product_detail"),
   path('<slug:slug>/', categoy_detail, name="categoy_detail"),
   path('categories/category/<int:pk>/', catedory, name="catedory"),  
]