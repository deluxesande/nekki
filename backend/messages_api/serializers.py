from rest_framework import serializers

from .models import Message, Chat, Contact

from authenticate.models import Account


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
        read_only_fields = ["created", "sent"]


class ChatSerializer(serializers.ModelSerializer):
    profiles = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Chat
        fields = ["id", "participants", "messages", "profiles"]

    def get_profiles(self, obj):
        if not hasattr(obj, "id"):
            return None
        if not isinstance(obj, Chat):
            return None
        
        participants = obj.participants.all()
        participant_urls = []

        for participant in participants:
            acc = Account.objects.get(account_name=participant)
            contact = Contact.objects.get(user=acc)
            participant_urls.append({"contact": contact.user.account_name,"id": contact.user.id, "url": contact.user.get_profile_pic()})

        return participant_urls
        