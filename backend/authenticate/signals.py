# Write signals to create accounts when a new user is created
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save

from django.contrib.auth.models import User

from .models import Account


@receiver(post_save, sender=User)
def create_account(sender, instance, created, **kwargs):
    if created:
        Account.objects.create(
            user=instance,
            account_name=instance.username,
            email=instance.email,
        )
