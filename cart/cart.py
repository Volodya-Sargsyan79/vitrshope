from django.conf import settings
from django.core import serializers
from api.serializers import ProductSerializer
from api.models import Product
import json
from django.forms.models import model_to_dict

class Cart(object):

  def __init__(self, request):
    self.session = request.session
    cart = self.session.get(settings.CART_SESSION_ID)

    if not cart:
      cart = self.session[settings.CART_SESSION_ID] = {}

    self.cart = cart
    
  def __iter__(self):
    product_ids = self.cart.keys()

    product_clean_ids = []

    for p in product_ids:
      product_data = self.cart[str(p)]
      queryset = Product.objects.get(pk=p)
      serializer_class = ProductSerializer(queryset, many=False)
      product_data['product'] = serializer_class.data
      product_data['total_price'] = float(product_data['price']) * int(product_data['quantity'])
      product_clean_ids.append(product_data)

    for item in self.cart.values():
      item['total_price'] = float(item['price']) * int(item['quantity'])
      
      yield item

  def __len__(self):
    return sum(item['quantity'] for item in self.cart.values())

  def add(self, product, quantity=1, update_quantity=False):

    product_id = str(product.id)

    price = product.price
    
    if product_id not in self.cart:
      self.cart[product_id] = {'id': product_id, 'quantity': 0, 'price': price}

    if update_quantity:
      self.cart[product_id]['quantity'] = quantity
    else:
      self.cart[product_id]['quantity'] = self.cart[product_id]['quantity'] + 1

    self.save()

  def remove(self, product_id):
    if product_id in self.cart:
      del self.cart[product_id]
      self.save()

  def save(self):
    self.session[settings.CART_SESSION_ID] = self.cart
    self.session.modified = True

  def clear(self):
    del self.session[settings.CART_SESSION_ID]
    self.session.modified = True

  def get_total_length(self):
    return sum(int(item['quantity']) for item in self.cart.values())
  
  def get_total_cost(self):
    print(self.cart,555555)
    if 'total_price' in self.cart.values():
      return sum(float(item['total_price']) for item in self.cart.values())
    else:
      return 0