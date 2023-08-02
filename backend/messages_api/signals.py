# Write signals to create accounts when a new user is created
from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import Chat


@receiver(post_save, sender=Chat)
def create_account(sender, instance, created, **kwargs):
    if created:
        # Figure out how to do this
        # Chat.objects.create(sender=instance)
        pass
