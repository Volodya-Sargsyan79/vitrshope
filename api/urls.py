from django.urls import path, include
from .views import ProductView, \
   CategoryView, \
   product_detail, \
   categoy_detail, \
   catedory
   


urlpatterns = [
   path('product/', ProductView.as_view()),
   path('categories/', CategoryView.as_view()),
   path('<slug:category>/<slug:slug>/', product_detail, name="product_detail"),
   path('<slug:slug>/', categoy_detail, name="categoy_detail"),
   path('categories/category/<int:pk>/', catedory, name="catedory"),
]