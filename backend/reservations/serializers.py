# reservations/serializers.py
from rest_framework import serializers
from .models import Guest, Booking, BookingNight
from reservations.services.availability_service import get_availability

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = ["id", "tenant", "first_name", "last_name", "email", "phone", "created_at", "updated_at"]
        read_only_fields = ["tenant", "created_at", "updated_at"]

class BookingNightSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingNight
        fields = ["id", "tenant", "booking", "date", "room_type", "rate_plan", "price_amount", "tax_amount"]

class AvailabilityQuerySerializer(serializers.Serializer):
    property = serializers.IntegerField()
    check_in = serializers.DateField()
    check_out = serializers.DateField()
    adults = serializers.IntegerField(required=False, default=2, min_value=1)
    children = serializers.IntegerField(required=False, default=0, min_value=0)

    def validate(self, data):
        if data["check_in"] >= data["check_out"]:
            raise serializers.ValidationError("check_in must be before check_out")
        return data


class NightQuoteSerializer(serializers.Serializer):
    date = serializers.DateField()
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    currency = serializers.CharField()


class AvailabilityOptionSerializer(serializers.Serializer):
    room_type_id = serializers.IntegerField()
    room_type_name = serializers.CharField()
    rate_plan_id = serializers.IntegerField()
    rate_plan_name = serializers.CharField()
    total_amount = serializers.DecimalField(max_digits=12, decimal_places=2)
    currency = serializers.CharField()
    nightly = NightQuoteSerializer(many=True)


class BookingCreateSerializer(serializers.Serializer):
    property = serializers.IntegerField()
    guest_email = serializers.EmailField()
    guest_first_name = serializers.CharField()
    guest_last_name = serializers.CharField(required=False, allow_blank=True, default="")
    guest_phone = serializers.CharField(required=False, allow_blank=True, default="")
    check_in = serializers.DateField()
    check_out = serializers.DateField()
    room_type_id = serializers.IntegerField()
    rate_plan_id = serializers.IntegerField()
    channel = serializers.ChoiceField(choices=[c[0] for c in Booking.Channel.choices], default=Booking.Channel.BE)

    def validate(self, data):
        if data["check_in"] >= data["check_out"]:
            raise serializers.ValidationError("check_in must be before check_out")
        return data


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            "id", "tenant", "property", "channel", "source_ref", "idempotency_key",
            "guest", "check_in", "check_out", "guests_adults", "guests_children",
            "currency", "subtotal_amount", "tax_amount", "total_amount", "status",
            "created_at", "updated_at",
        ]
        read_only_fields = fields