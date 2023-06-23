from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.shortcuts import redirect


@api_view(["GET"])
def login_user(request):
    # return JsonResponse("Login user.", safe=False)
    return redirect("view-posts")
