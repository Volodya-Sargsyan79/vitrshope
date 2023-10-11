import json
import stripe

from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .cart import Cart

from order.models import Order

from api import views


@csrf_exempt
def webhook(request):

  event = None

  stripe.api_key = settings.STRIPE_API_KEY_HIDDEN

  try:
    event = stripe.Event.construct_from(
      json.loads(request.body), stripe.api_key
    )
    # session = stripe.checkout.Session.create()
  except ValueError as e:
    return HttpResponse(status=400)
  
  if event.type == 'payment_intent.succeeded':
    payment_intent = event.data.object

    print('Payment intent',  1312312)

    # print(session, 222222)

    # order = Order.objects.get(payment_intent=payment_intent.id)
    # order.paid = True
    # order.save()


  return HttpResponse(status=200)