"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function BookingSearchBar({ tenant }: { tenant: string }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [range, setRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: sp.get("checkIn") ? new Date(sp.get("checkIn")!) : new Date(),
    to: sp.get("checkOut") ? new Date(sp.get("checkOut")!) : addDays(new Date(), 1),
  });
  const [adults, setAdults] = useState<number>(Number(sp.get("adults") ?? 2));
  const [children, setChildren] = useState<number>(Number(sp.get("children") ?? 0));
  const [promo, setPromo] = useState<string>(sp.get("promo") ?? "");

  function submit() {
    if (!range.from || !range.to) return;
    const qs = new URLSearchParams({
      checkIn: format(range.from, "yyyy-MM-dd"),
      checkOut: format(range.to, "yyyy-MM-dd"),
      adults: String(adults),
      children: String(children),
      promo: promo || "",
    });
    router.push(`/be/${tenant}/rooms?` + qs.toString());
  }

  return (
    <div className="rounded-xl border bg-card p-3 md:p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,auto] gap-2 md:gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start">
              {range.from && range.to
                ? `${format(range.from, "MMM dd")} → ${format(range.to, "MMM dd")}`
                : "Select dates"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={range}
              onSelect={(r) => setRange({ from: r?.from, to: r?.to })}
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start">
              {adults} adults · {children} children
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="start">
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <span>Adults</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => setAdults(Math.max(1, adults - 1))}>-</Button>
                  <span className="w-6 text-center">{adults}</span>
                  <Button size="sm" variant="outline" onClick={() => setAdults(adults + 1)}>+</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Children</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => setChildren(Math.max(0, children - 1))}>-</Button>
                  <span className="w-6 text-center">{children}</span>
                  <Button size="sm" variant="outline" onClick={() => setChildren(children + 1)}>+</Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Input placeholder="Promo code (optional)" value={promo} onChange={(e) => setPromo(e.target.value)} />
        <Button onClick={submit} className="md:justify-self-end">Search</Button>
      </div>
    </div>
  );
}
