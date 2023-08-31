from django.db import models
from PIL import Image
from authenticate.models import Account


# Create your models here.
class Comment(models.Model):
    comment_account = models.OneToOneField(
        Account, on_delete=models.CASCADE, related_name="comment_account"
    )
    comment_caption = models.CharField(max_length=200)  # The comment
    created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.comment_caption


class Post(models.Model):
    post_account = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="post_account"
    )
    post_image = models.ImageField(
        upload_to="posts/", null=True, verbose_name="post_image"
    )
    post_caption = models.CharField(max_length=200)
    post_likes = models.ManyToManyField(Account, blank=True, related_name="post_likes")
    when_posted = models.DateField(auto_now_add=True, null=True, blank=False)
    created = models.DateTimeField(auto_now_add=True, null=True, blank=False)

    def get_total_likes(self):
        return self.post_likes.count()

    def __str__(self):
        return self.post_caption

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.post_image.path)

        if img.height > 600 and img.width > 600:
            output_size = (300, 600)
            img.thumbnail(output_size)
            img.save(self.post_image.path)
