from rest_framework.serializers import ModelSerializer
from ..models import Post, Token
from django.contrib.auth.hashers import make_password

class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ("id", "username", "password", "email", "money", "phone", "country")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])
        return super().update(instance, validated_data)

class TokenSerializer(ModelSerializer):
    class Meta:
        model = Token
        fields = ["token", "created_at", "expires_at", "user_id", "is_used"]