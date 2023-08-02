from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Chat
from .serializers import ChatSerializer

from authenticate.models import Account


# Create your views here.
class ListChats(APIView):
    def get(self, request):
        user = request.user
        users_chats = Chat.objects.all()
        serializer = ChatSerializer(users_chats, many=True)

        for chat in serializer.data:
            chat["sender"] = user.account.account_name
            receiver_account = Account.objects.get(id=chat["receiver"])
            chat["receiver"] = receiver_account.account_name

        return Response(serializer.data, status=status.HTTP_200_OK)


class ListUserChats(APIView):
    def get(self, request):
        users_chats = Chat.objects.filter(sender=request.user.account)
        serializer = ChatSerializer(users_chats, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateChat(APIView):
    def post(self, request):
        serializer = ChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DeleteChat(APIView):
    def delete(self, request, pk):
        chat_to_delete = Chat.objects.get(id=pk)
        chat_to_delete.delete()

        return Response(
            {"Message": f"Chat '{chat_to_delete}' deleted."}, status=status.HTTP_200_OK
        )
