from django.urls import path

# from rest_framework.authtoken.views import obtain_auth_token

from rest_framework_simplejwt.views import TokenRefreshView

from . import views
from .views import MyTokenObtainPairView

urlpatterns = [
    # simple json authentication
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
