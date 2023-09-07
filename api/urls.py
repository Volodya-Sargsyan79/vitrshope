from django.urls import path, include
from .views import ProductView, CategoryView, testProduct


urlpatterns = [
   path('product/', ProductView.as_view()),
   path('category/', CategoryView.as_view()),
   path('<slug:slug>/', testProduct, name="product_detail"),
]