from rest_framework import serializers
from django.forms import ValidationError

from .models import Post, Comment


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "post_caption", "post_likes", "post_account", "when_posted"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "comment_caption"]
