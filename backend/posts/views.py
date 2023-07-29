from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from rest_framework.views import APIView

# POSTS APP
from .models import Post
from .serializers import PostSerializer

# AUTHENTICATION APP
from authenticate.models import Account


# Create your views here.
@api_view(["GET"])
def api_overview(request):
    api_urls = {
        "View": "/view-posts/",
        "Create": "/create-post/",
        "View-post": "/view-post/id:?/",
        "update-post": "/update-post/id:?/",
        "delete-post": "/delete-post/id:?/",
    }

    return Response(api_urls, status=status.HTTP_200_OK)


class CreatePost(APIView):
    def post(self, request):
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ViewPosts(APIView):
    def get(self, request):
        posts = Post.objects.all().order_by("created")
        serializer = PostSerializer(posts, many=True)

        try:
            for post in serializer.data:
                post_acc = Account.objects.get(id=post["post_account"])
                post["post_account"] = post_acc.account_name

            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(
                serializer.errors,
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )


class ViewPost(APIView):
    def get(self, request, pk):
        try:
            post = Post.objects.get(id=pk)
            serializer = PostSerializer(post, many=False)

            # No need to set account name as we are not using this on the website
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(
                {"Error": "Post does not exist."}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, pk):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(instance=post, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            post = Post.objects.get(id=pk)
            post.delete()

            return Response("Item delete!", status=status.HTTP_204_NO_CONTENT)
        except:
            # When you try to delete a post that is not in the server
            return Response(status=status.HTTP_404_NOT_FOUND)


class LikePost(APIView):
    def put(self, request, pk):
        post_to_like = Post.objects.get(id=pk)
        serializer = PostSerializer(post_to_like, many=False)

        serializer.data["post_likes"].append(request.user.account)
