from typing import Iterable, Optional
from django.db import models

from authenticate.models import Account


# Create your models here.
class Chat(models.Model):
    sender = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="sender", null=True
    )
    # For group chating, I am not supportting group chats yet
    # receiver = models.ManyToManyField(Account, related_name="receiver")
    receiver = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="receiver", null=True
    )
    message_content = models.CharField(max_length=200, blank=False, unique=True)
    seen = models.BooleanField(default=False)
    sent = models.TimeField(auto_now_add=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.sender)
