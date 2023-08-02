from django.contrib import admin
from django.views.static import serve
from django.conf import settings
from django.urls import path, include, re_path

urlpatterns = [
    # Adds urls for the files uploaded
    re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
    re_path(r"^static/(?P<path>.*)$", serve, {"document_root": settings.STATIC_ROOT}),
    # Default paths
    path("admin/", admin.site.urls),
    path("post/", include("posts.urls")),
    path("auth/", include("authenticate.urls")),
    path("chat/", include("messages_api.urls")),
]
