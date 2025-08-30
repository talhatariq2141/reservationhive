# tenants/serializers.py
from rest_framework import serializers
from .models import Property, PropertyImage, PremiumService

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "image"]

class PremiumServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PremiumService
        fields = ["id", "name", "fee_amount", "fee_currency"]

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    premium_services = PremiumServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = [
            "id","tenant","name","timezone","currency",
            "star_rating","country","city","location","feature_image",
            "address","latitude","longitude",
            "tax_name","tax_percent",
            "checkin_time","checkout_time",
            "upcoming_checkin_days","upcoming_checkout_days",
            "description","cancellation_policy",
            "images","premium_services",
            "created_at","updated_at",
        ]
        read_only_fields = ["tenant","created_at","updated_at"]
