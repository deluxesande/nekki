from rest_framework import serializers

from .models import Chat


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = "__all__"
        read_only_fields = ["sender", "receiver", "created", "sent"]
