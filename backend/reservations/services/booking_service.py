# reservations/services/booking_service.py
from __future__ import annotations
from datetime import date, timedelta
from decimal import Decimal
from typing import Optional, List

from django.db import transaction
from django.db.models import F

from tenants.models import Property
from rooms.models import RoomType, RatePlan, Inventory, Price
from reservations.models import Guest, Booking, BookingNight


class BookingError(Exception):
    pass


def _dates(check_in: date, check_out: date):
    d = check_in
    while d < check_out:
        yield d
        d += timedelta(days=1)


@transaction.atomic
def create_booking(*,
                   tenant,
                   property_id: int,
                   guest_email: str,
                   guest_first_name: str,
                   guest_last_name: str = "",
                   guest_phone: str = "",
                   check_in: date,
                   check_out: date,
                   room_type_id: int,
                   rate_plan_id: int,
                   channel: str,
                   idempotency_key: str = "",
                   currency: Optional[str] = None) -> Booking:
    """
    Creates a booking with row locks on Inventory to prevent oversells.
    """
    if check_in >= check_out:
        raise BookingError("Invalid stay dates.")

    prop = Property.objects.select_for_update().get(id=property_id, tenant=tenant)
    rt = RoomType.objects.select_related("property").get(id=room_type_id, tenant=tenant, property=prop)
    rp = RatePlan.objects.select_related("room_type").get(id=rate_plan_id, tenant=tenant, room_type=rt)

    los = (check_out - check_in).days
    if not (rp.los_min <= los <= rp.los_max):
        raise BookingError("Stay length violates rate plan constraints.")

    guest, _ = Guest.objects.get_or_create(
        tenant=tenant, email=guest_email,
        defaults={"first_name": guest_first_name, "last_name": guest_last_name, "phone": guest_phone},
    )

    if idempotency_key:
        existing = Booking.objects.filter(tenant=tenant, idempotency_key=idempotency_key).first()
        if existing:
            return existing

    nights = list(_dates(check_in, check_out))
    prices = Price.objects.select_for_update().filter(
        tenant=tenant, property=prop, rate_plan=rp, date__in=nights
    )
    price_by_date = {p.date: p for p in prices}

    subtotal = Decimal("0.00")
    for d in nights:
        inv = (Inventory.objects
               .select_for_update()
               .filter(tenant=tenant, property=prop, room_type=rt, date=d)
               .first())
        if not inv or inv.closed or inv.allotment <= 0:
            raise BookingError(f"No availability for {d}.")
        price = price_by_date.get(d)
        if not price:
            raise BookingError(f"No price configured for {d}.")
        subtotal += price.amount

    booking = Booking.objects.create(
        tenant=tenant,
        property=prop,
        channel=channel,
        source_ref="",
        idempotency_key=idempotency_key or "",
        guest=guest,
        check_in=check_in,
        check_out=check_out,
        guests_adults=2,
        guests_children=0,
        currency=currency or prop.currency,
        subtotal_amount=subtotal,
        tax_amount=Decimal("0.00"),
        total_amount=subtotal,
        status=Booking.Status.CONFIRMED,
    )

    for d in nights:
        inv = (Inventory.objects
               .select_for_update()
               .get(tenant=tenant, property=prop, room_type=rt, date=d))
        if inv.allotment <= 0 or inv.closed:
            raise BookingError(f"Inventory vanished for {d}. Try again.")
        inv.allotment = F("allotment") - 1
        inv.save(update_fields=["allotment"])

        price = price_by_date[d]
        BookingNight.objects.create(
            tenant=tenant,
            booking=booking,
            date=d,
            room_type=rt,
            rate_plan=rp,
            price_amount=price.amount,
            tax_amount=Decimal("0.00"),
        )

    booking.refresh_from_db()
    return booking
