from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required

from .models import Chat, Contact, Message
from .serializers import ChatSerializer

from authenticate.models import Account


@login_required
def chats(request, room_name):
    return render(
        request, "index.html", {"room_name": room_name, "user": request.user.account.id}
    )


class ListChats(APIView):
    def get(self, request, pk):
        user = request.user

        users_chats = Chat.objects.filter(sender=pk)
        serializer = ChatSerializer(users_chats, many=True)

        try:
            for chat in serializer.data:
                chat["sender"] = user.account.account_name
                receiver_account = Account.objects.get(id=chat["receiver"])
                chat["receiver"] = {
                    "receiver_account": receiver_account.account_name,
                    "receiver_id": receiver_account.id,
                    "receiver_profile": receiver_account.profile_pic.url,
                }
                chat_time = chat["sent"][0:5]
                chat["sent"] = chat_time

            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(
                {"Error": "Error setting the receiver account details"},
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )


class ListUserChats(APIView):
    def get(self, request, pk):
        try:
            contact = get_object_or_404(Contact, user=pk)
            contact_chats = contact.chats.all()
            serializer = ChatSerializer(contact_chats, many=True)

            for chat in serializer.data:
                chat_p = []
                for i in chat["participants"]:
                    p_contact = Contact.objects.get(id=i)
                    chat_p.append(p_contact.user.account_name)

                # Setting the account names of participants
                # So they can be viewed in the frontend
                chat["participants"] = chat_p

                # Setting the messages to be the last message in a chat
                # I cannot create a new variable in a Serializer
                # so I am overriding the existing data in chat.messages from a list to the last message
                num_chats = len(chat["messages"])
                if num_chats > 1:
                    msg_id = chat["messages"][num_chats - 1]  # Last message in the chat
                    msg = Message.objects.get(id=msg_id)

                    chat["messages"] = msg.content

            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"Message": "No Chats"}, status=status.HTTP_202_ACCEPTED)


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


class GetUser(APIView):
    def get(self, request, name):
        try:
            user = get_object_or_404(Account, account_name=name)
            contact = get_object_or_404(Contact, user=user.id)

            return Response({"receiver": contact}, status=status.HTTP_200_OK)
        except:
            return Response({"Message": "No user"}, status=status.HTTP_404_NOT_FOUND)
