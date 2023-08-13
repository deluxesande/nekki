from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json

from authenticate.models import Account

from .models import Chat, Contact, Message
from .serializers import ChatSerializer, MessageSerializer


class ChatRoomConsumer(WebsocketConsumer):
    def fetch_messages(self, data):
        chat = Chat.objects.get(id=data["chat_id"])
        chats_to_serialize = chat.messages.order_by("created").all()  # [0:10]
        messages = MessageSerializer(chats_to_serialize, many=True)

        for message in messages.data:
            contact = Contact.objects.get(id=message["contact"])
            message["contact"] = contact.user.account_name

        self.send_message(messages.data)

    def new_message(self, data):
        sender_acc = Contact.objects.get(user=data["sender"])
        receiver_acc = Contact.objects.get(user=data["receiver"])

        # Setting the receiver and contact
        data["contact"] = sender_acc.id
        data["receiver"] = receiver_acc.id

        # Cleaning up the data
        data.pop("sender")
        data.pop("command")

        serializer = MessageSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

        # Setting the message to a chat
        new_msg_to_chat = Chat.objects.get(id=data["chat_id"])
        new_msg = Message.objects.last()  # Getting the last message
        new_msg_to_chat.messages.add(new_msg)
        new_msg_to_chat.save()

        message = MessageSerializer(new_msg, many=False)

        self.send_chat_message(message.data)

    commands = {"fetch_messages": fetch_messages, "new_message": new_message}

    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name

        self.accept()

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        self.commands[data["command"]](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {"type": "chat_message", "message": message},
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event["message"]

        self.send(text_data=json.dumps(message))
