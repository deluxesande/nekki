from django.contrib import admin

from messages_api.models import Chat, Contact, Message


# Register your models here.
class MessageAdmin(admin.ModelAdmin):
    list_display = ["contact", "receiver", "content", "sent"]
    search_fields = ["content", "contact", "receiver"]
    list_filter = ["contact", "receiver", "content"]


admin.site.register(Chat)
admin.site.register(Contact)
admin.site.register(Message, MessageAdmin)
