from django.urls import path, include
from .views import ProductView, CategoryView, product_detail, categoy_detail


urlpatterns = [
   path('product/', ProductView.as_view()),
   path('category/', CategoryView.as_view()),
   path('<slug:category>/<slug:slug>/', product_detail, name="product_detail"),
   path('<slug:slug>/', categoy_detail, name="categoy_detail"),
]