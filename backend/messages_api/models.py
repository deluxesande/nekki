from django.db import models

from authenticate.models import Account


# Create your models here.
class Contact(models.Model):
    user = models.ForeignKey(Account, related_name="sender", on_delete=models.CASCADE)
    friends = models.ManyToManyField(Account, blank=True)

    def __str__(self):
        return str(self.user.account_name)


class Message(models.Model):
    contact = models.ForeignKey(
        Contact, on_delete=models.CASCADE, related_name="sender", null=True
    )
    receiver = models.ForeignKey(
        Contact, on_delete=models.CASCADE, related_name="receiver", null=True
    )
    content = models.TextField(null=True)
    seen = models.BooleanField(default=False)
    sent = models.TimeField(auto_now_add=True)
    created = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return str(self.contact.user.account_name)


class Chat(models.Model):
    participants = models.ManyToManyField(Contact, related_name="chats")
    messages = models.ManyToManyField(Message, related_name="messages", blank=True)

    def __str__(self):
        return str(self.pk)
