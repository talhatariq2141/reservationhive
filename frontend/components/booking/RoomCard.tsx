"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RoomCard({ room }: { room: any }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{room.name}</span>
          <Badge variant="secondary">Max {room.maxGuests}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-[2fr,3fr] gap-4">
        <div className="rounded-lg bg-muted/40 aspect-video" />
        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">{room.description}</p>
          <div className="grid gap-2">
            {room.ratePlans.map((rp: any) => (
              <div key={rp.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="font-medium">{rp.name}</div>
                  <div className="text-xs text-muted-foreground">{rp.refundable ? "Free cancellation" : "Non‑refundable"}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">
                    {rp.currency} {rp.nightlyFrom}/night
                  </div>
                  <Button size="sm">Select</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
