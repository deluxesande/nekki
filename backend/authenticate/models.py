from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Account(models.Model):
    USERNAME_lENGHT = 50
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    account_name = models.CharField(
        max_length=USERNAME_lENGHT, unique=True, blank=False
    )
    email = models.EmailField(unique=True, blank=False)
    profile_pic = models.ImageField(
        default="profile.jpeg/",
        upload_to="profiles/",
        verbose_name="profile",
    )

    def get_profile_pic(self):
        return self.profile_pic.url

    def __str__(self):
        return str(self.user)
