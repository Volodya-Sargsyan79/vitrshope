from django.urls import path
from .views import ProductView, CategoryView, ProductDetailView

urlpatterns = [
   path('product/', ProductView.as_view()),
   path('category/', CategoryView.as_view()),
   path('product_detail/', ProductDetailView.as_view()),
]
