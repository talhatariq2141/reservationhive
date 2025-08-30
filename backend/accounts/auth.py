# backend/accounts/auth.py
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

User = get_user_model()

class EmailOrUsernameTokenObtainPairSerializer(TokenObtainPairSerializer):
    # accept both username and email from clients
    username_field = User.EMAIL_FIELD if hasattr(User, "EMAIL_FIELD") else User.USERNAME_FIELD

    def validate(self, attrs):
        # Allow clients to send either "username" or "email"
        identifier = attrs.get("username") or attrs.get("email")
        password = attrs.get("password")

        if not identifier or not password:
            raise serializers.ValidationError("Missing credentials.")

        # Try authenticate by email first, then username
        user = authenticate(self.context["request"], username=identifier, password=password)
        if user is None:
            # If authenticate() expects username only, and identifier was email, try mapping email->username
            try:
                query = { "email": identifier } if "@" in identifier else { "username": identifier }
                u = User.objects.filter(**query).first()
                if u:
                    user = authenticate(self.context["request"], username=getattr(u, User.USERNAME_FIELD), password=password)
            except Exception:
                pass

        if user is None:
            raise serializers.ValidationError("Invalid credentials.")

        if not user.is_active:
            raise serializers.ValidationError("Inactive account.")

        data = super().validate({self.username_field: getattr(user, self.username_field), "password": password})
        # Optionally include role/tenant so client can skip an extra /me call
        data["user"] = {
            "id": user.id,
            "email": getattr(user, "email", None),
            "role": getattr(user, "role", None),
            "tenant": getattr(user, "tenant_id", None),
        }
        return data
