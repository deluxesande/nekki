from rest_framework import serializers

from .models import Post, Comment


class PostSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    profile = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "post_caption",
            "post_account",
            "post_image",
            "post_likes",
            "profile",
            "when_posted",
            "likes",
        ]
        read_only_fields = ["id", "post_account", "post_likes", "when_posted"]

    def get_likes(self, obj):
        # Check that an instance of post is being passed here
        if not hasattr(obj, "id"):
            return None
        if not isinstance(obj, Post):
            return None
        return obj.get_total_likes()

    def get_profile(self, obj):
        if not hasattr(obj, "id"):
            return None
        if not isinstance(obj, Post):
            return None
        return obj.post_account.get_profile_pic()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "comment_caption"]
        read_only_fields = ["id"]
