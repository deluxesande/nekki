from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Custom token claims
        token["username"] = user.account.account_name
        token["account_id"] = user.account.id
        token["profile_pic"] = user.account.get_profile_pic()

        return token
