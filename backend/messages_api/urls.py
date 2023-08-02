from django.urls import path

from . import views

urlpatterns = [
    path("", views.ListChats.as_view(), name="view-chats"),
    path("get-chats/", views.ListUserChats.as_view(), name="view-user-chats"),
    path("delete-chat/<int:pk>/", views.DeleteChat.as_view(), name="delete-chat"),
    path("create/", views.CreateChat.as_view(), name="create-chat"),
]
