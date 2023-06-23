from django.shortcuts import redirect

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Post
from .serializers import PostSerializer

from authenticate.models import Account


# Create your views here.
@api_view(["GET"])
def api_overview(request):
    api_urls = {
        "View": "/view-posts/",
        "Create": "/create-post/",
    }

    return Response(api_urls)


@api_view(["GET"])
def view_posts(request):
    posts = Post.objects.all().order_by("created")
    serializer = PostSerializer(posts, many=True)

    for post in serializer.data:
        post_acc = Account.objects.get(id=post["post_account"])

    return Response(serializer.data)


@api_view(["GET"])
def view_post(request, pk):
    try:
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, many=False)
        print(serializer.data["post_account"])

        return Response(serializer.data)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def create_post(request):
    serializer = PostSerializer(data=request.data)

    if serializer.is_valid():
        # serializer.validated_data["post_account"]
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def update_post(request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(instance=post, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_post(request, pk):
    try:
        post = Post.objects.get(id=pk)
        post.delete()

        return Response("Item delete!", status=status.HTTP_204_NO_CONTENT)
    except:
        # When you try to delete a post that is not in the server
        return Response(status=status.HTTP_404_NOT_FOUND)
