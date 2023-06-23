from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Account(models.Model):
    USERNAME_lENGHT = 50
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    account_name = models.CharField(
        max_length=USERNAME_lENGHT, unique=True, blank=False
    )
    user_name = models.CharField(max_length=USERNAME_lENGHT, unique=True, blank=True)
    email = models.EmailField(unique=True, blank=False)
    # profile_pic = models.ImageField(upload_to="/profiles")

    def __str__(self):
        return str(self.user)
