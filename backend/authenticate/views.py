
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import logout

from .forms import Signin
from.serializers import MyTokenObtainPairSerializer



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def register_user(request):
    form = Signin(request.POST)

    if form.is_valid():
        form.save()

    return Response({"Message": "User Created."}, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def logout_user(request):
    logout(request)
    return Response(
        {"Message": "User Successfully logged out."}, status=status.HTTP_200_OK
    )
