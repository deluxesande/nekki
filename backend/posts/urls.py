from django.urls import path

from . import views

urlpatterns = [
    path("", views.ViewPosts.as_view(), name="view-posts"),
    path("get-posts/", views.ViewPost.as_view(), name="post"),
    path("overview/", views.ApiOverview.as_view(), name="api-overview"),
    path("create/", views.CreatePost.as_view(), name="create-post"),
    path("like/<int:pk>/", views.LikePost.as_view(), name="like-post"),
    path("unlike/<int:pk>/", views.UnlikePost.as_view(), name="unlike-post"),
]
