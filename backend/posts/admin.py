from django.contrib import admin
from .models import Post, Comment


# Register your models here.
class CommentAdmin(admin.ModelAdmin):
    list_display = ["comment_account", "comment_caption"]
    list_filter = ["comment_caption"]
    search_fields = ["comment_caption"]


class PostAdmin(admin.ModelAdmin):
    list_display = ["post_account", "post_caption"]
    list_filter = ["post_caption"]
    search_fields = ["post_caption"]


admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
