from rest_framework.response import Response
from rest_framework import status, authentication

from rest_framework.views import APIView
from rest_framework import permissions

# POSTS APP
from .models import Post
from .serializers import PostSerializer

# AUTHENTICATION APP
from authenticate.models import Account


# Create your views here.
class ApiOverview(APIView):
    def get(self, request):
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
                {"Error": "Error retrieving Posts."},
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )


class ViewPost(APIView):
    def get(self, request):
        try:
            account = request.user.account
            posts = Post.objects.filter(post_account=account)
            serializer = PostSerializer(posts, many=True)

            for post in serializer.data:
                post["post_account"] = account.account_name

            # No need to set account name as we are not using this on the website
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(
                {"Error": "Error getting posts."}, status=status.HTTP_404_NOT_FOUND
            )

    # def put(self, request, pk):
    #     post = Post.objects.get(id=pk)
    #     serializer = PostSerializer(instance=post, data=request.data)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class DeletePost(APIView):
#     def delete(self, request, pk):
#         try:
#             post = Post.objects.get(id=pk)
#             post.delete()

#             return Response("Item delete!", status=status.HTTP_204_NO_CONTENT)
#         except:
#             # When you try to delete a post that is not in the server
#             return Response(status=status.HTTP_404_NOT_FOUND)


class LikePost(APIView):
    def get(self, request, pk):
        user = request.user.account
        post_liked = Post.objects.get(id=pk)
        post_liked.post_likes.add(user)
        post_liked.save()

        return Response(
            {"Message": f"Post {post_liked} liked."},
            status=status.HTTP_202_ACCEPTED,
        )


class UnlikePost(APIView):
    def get(self, request, pk):
        post_to_unliked = Post.objects.get(id=pk)
        post_to_unliked.post_likes.remove(request.user.account)
        post_to_unliked.save()

        return Response({"Message": "Post unliked."}, status=status.HTTP_202_ACCEPTED)
