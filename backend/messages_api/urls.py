from django.urls import path

from . import views

urlpatterns = [
    # path("<int:pk>/", views.ListChats.as_view(), name="view-chats"),
    # path("get-chats/<int:pk>/", views.ListUserChats.as_view(), name="view-user-chats"),
    path("<int:pk>/", views.ListUserChats.as_view(), name="view-user-chats"),
    path("delete-chat/<int:pk>/", views.DeleteChat.as_view(), name="delete-chat"),
    path("create/", views.CreateChat.as_view(), name="create-chat"),
    path("<str:room_name>/", views.chats, name="view-chats"),
    path("get-contact/<str:name>/", views.GetUser, name="get-contact"),
]
