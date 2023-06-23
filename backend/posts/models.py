from django.db import models

from authenticate.models import Account


# Create your models here.
class Comment(models.Model):
    comment_account = models.OneToOneField(Account, on_delete=models.CASCADE)
    comment_caption = models.CharField(max_length=200)  # The comment
    created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.comment_caption


class Post(models.Model):
    post_account = models.ForeignKey(Account, on_delete=models.CASCADE)
    # post_image = models.ImageField(upload_to="posts/")
    post_caption = models.CharField(max_length=200)
    post_likes = models.IntegerField(blank=False, default=0)
    created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.post_caption
