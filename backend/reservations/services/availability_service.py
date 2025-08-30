# reservations/services/availability_service.py
from __future__ import annotations
from dataclasses import dataclass
from datetime import date, timedelta
from decimal import Decimal
from typing import List, Dict

from tenants.models import Property
from rooms.models import RoomType, RatePlan, Inventory, Price


@dataclass
class NightQuote:
    date: date
    amount: Decimal
    currency: str


@dataclass
class OptionQuote:
    room_type_id: int
    room_type_name: str
    rate_plan_id: int
    rate_plan_name: str
    total_amount: Decimal
    currency: str
    nightly: List[NightQuote]


def _daterange(start: date, end: date):
    cur = start
    while cur < end:
        yield cur
        cur += timedelta(days=1)


def get_availability(*, tenant, property_id: int, check_in: date, check_out: date,
                     adults: int = 2, children: int = 0) -> List[OptionQuote]:
    """
    Returns availability options for each (RoomType, RatePlan) where:
      - every night has Inventory.allotment > 0 and not closed
      - a Price exists for each night
      - LOS satisfies RatePlan.los_min/max
    """
    prop = Property.objects.select_related("tenant").get(id=property_id, tenant=tenant)
    nights = list(_daterange(check_in, check_out))
    los = len(nights)
    if los <= 0:
        return []

    room_types = (RoomType.objects
                  .filter(tenant=tenant, property=prop, max_guests__gte=adults + children)
                  .select_related("property"))

    rate_plans = (RatePlan.objects
                  .filter(tenant=tenant, room_type__in=room_types,
                          los_min__lte=los, los_max__gte=los)
                  .select_related("room_type"))

    inv_map: Dict[tuple[int, date], Inventory] = {}
    for inv in Inventory.objects.filter(
        tenant=tenant, property=prop, room_type__in=room_types,
        date__gte=check_in, date__lt=check_out,
    ):
        inv_map[(inv.room_type_id, inv.date)] = inv

    price_map: Dict[tuple[int, date], Price] = {}
    for pr in Price.objects.filter(
        tenant=tenant, property=prop, rate_plan__in=rate_plans,
        date__gte=check_in, date__lt=check_out,
    ).select_related("rate_plan"):
        price_map[(pr.rate_plan_id, pr.date)] = pr

    options: List[OptionQuote] = []

    for rp in rate_plans:
        rt = rp.room_type
        nightly_quotes: List[NightQuote] = []
        ok = True
        currency = None

        for d in nights:
            inv = inv_map.get((rt.id, d))
            if not inv or inv.closed or inv.allotment <= 0:
                ok = False
                break

            pr = price_map.get((rp.id, d))
            if not pr:
                ok = False
                break

            currency = pr.currency
            nightly_quotes.append(NightQuote(date=d, amount=pr.amount, currency=pr.currency))

        if not ok or not nightly_quotes:
            continue

        total = sum((n.amount for n in nightly_quotes), start=Decimal("0.00"))
        options.append(OptionQuote(
            room_type_id=rt.id,
            room_type_name=rt.name,
            rate_plan_id=rp.id,
            rate_plan_name=rp.name,
            total_amount=total,
            currency=currency or prop.currency,
            nightly=nightly_quotes,
        ))

    options.sort(key=lambda o: (o.total_amount, o.room_type_name, o.rate_plan_name))
    return options
