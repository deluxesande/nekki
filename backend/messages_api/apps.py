from django.apps import AppConfig


class Messages_apiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "messages_api"

    def ready(self):
        import messages_api.signals
