# rooms/serializers.py
from rest_framework import serializers
from .models import (
    Amenity, Facility, BedType, RoomType, RoomImage, Room,
    Policy, RatePlan, Inventory, Price
)

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ["id","name"]

class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ["id","name"]

class BedTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BedType
        fields = ["id","name"]

class RoomImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomImage
        fields = ["id","image"]

class RoomTypeSerializer(serializers.ModelSerializer):
    amenities = serializers.PrimaryKeyRelatedField(many=True, queryset=Amenity.objects.all(), required=False)
    facilities = serializers.PrimaryKeyRelatedField(many=True, queryset=Facility.objects.all(), required=False)
    images = RoomImageSerializer(many=True, read_only=True)

    class Meta:
        model = RoomType
        fields = [
            "id","tenant","property","code","name","description",
            "base_price_amount","base_price_currency","discount_percent",
            "adults","children",
            "cancellation_fee_amount","cancellation_fee_currency",
            "beds_total","bed_type","amenities","facilities",
            "cancellation_policy","max_guests",
            "images",
            "created_at","updated_at",
        ]
        read_only_fields = ["tenant","created_at","updated_at"]

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["id","tenant","property","room_type","room_no","created_at","updated_at"]
        read_only_fields = ["tenant","created_at","updated_at"]

class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = ["id","tenant","name","description","created_at","updated_at"]
        read_only_fields = ["tenant","created_at","updated_at"]

class RatePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatePlan
        fields = ["id","tenant","room_type","name","refundable","los_min","los_max","policy","created_at","updated_at"]
        read_only_fields = ["tenant","created_at","updated_at"]

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ["id","tenant","property","room_type","date","allotment","closed","created_at","updated_at"]
        read_only_fields = ["tenant","created_at","updated_at"]

class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = ["id","tenant","property","rate_plan","date","amount","currency","created_at","updated_at"]
        read_only_fields = ["tenant","created_at","updated_at"]
