from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name='frontpage'),
    path('contact/', index, name='contact'),
    path('<slug:category_detail>/<slug:slug>/', index, name='product_detail'),
    path('<slug:slug>/', index, name='category_detail')
]
