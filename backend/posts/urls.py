from django.urls import path

from . import views

urlpatterns = [
    path("", views.api_overview, name="api-overview"),
    path("view-posts/", views.view_posts, name="view-posts"),
    path("view-post/<int:pk>/", views.view_post, name="view-post"),
    path("create-post/", views.create_post, name="create-post"),
    path("update-post/<int:pk>/", views.update_post, name="update-post"),
    path("delete-post/<int:pk>/", views.delete_post, name="delete-post"),
]
