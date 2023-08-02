from django.contrib import admin

from messages_api.models import Chat


# Register your models here.
class ChatAdmin(admin.ModelAdmin):
    list_display = ["sender", "receiver", "message_content", "sent"]
    search_fields = ["message_content", "sender", "receiver"]
    list_filter = ["sender", "receiver", "message_content"]


admin.site.register(Chat, ChatAdmin)
