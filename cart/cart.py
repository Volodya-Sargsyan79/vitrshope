from django.conf import settings
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
    
  # def __iter__(self):
  #   product_ids = self.cart.keys()

  #   product_clean_ids = []

  #   for p in product_ids:
  #     product_clean_ids.append(p)

  #     self.cart[str(p)]['product'] = Product.objects.get(pk=p)

  #   for item in self.cart.values():
  #     item['total_price'] = float(item['price']) * int(item['quantity'])
      
  #     yield item

  # def __len__(self):
  #   return sum(item['quantity'] for item in self.cart.values())

  def add(self, product, quantity=1, update_quantity=False):
    
    product_id = str(product.id)
    price = product.price

    product_dict = model_to_dict(product)

    if product_id not in self.cart:
      self.cart[product_id] = {'id': product_id, 'quantity': 0, 'price': price, 'product':product_dict}
    if update_quantity:
      self.cart[product_id]['quantity'] = quantity
      self.cart[product_id]['price'] = price * self.cart[product_id]['quantity']
    else:
      self.cart[product_id]['quantity'] = self.cart[product_id]['quantity'] + 1
      self.cart[product_id]['price'] = price * self.cart[product_id]['quantity']

    self.save()

  def remove(self, product_id):
    if product_id in self.cart:
      del self.cart[product_id]
      self.save()

  def save(self):
    self.session[settings.CART_SESSION_ID] = self.cart
    self.session.modified = True

  # def get_total_length(self):
  #   return sum(int(item['quantity']) for item in self.cart.values())