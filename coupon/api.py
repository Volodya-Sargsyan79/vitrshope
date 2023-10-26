from django.http import JsonResponse

from .models import Coupon

def api_can_use(request):
    json_response = {}

    coupon_code = request.GET.get('coupon_code', '')

    try:
        coupon = Coupon.objects.get(code=coupon_code)

        if coupon.can_use():
            json_response = {
                'amount': coupon.value,
                'coupon': coupon.code
            }
        else:
            json_response = {
                'amount': 0,
                'coupon': ""
            }
    except Exception:
            json_response = {
                'amount': 0,
                'coupon': ""
            }

    return JsonResponse(json_response)