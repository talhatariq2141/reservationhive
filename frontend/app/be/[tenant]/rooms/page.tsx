import RoomCard from "@/components/booking/RoomCard";
import { Suspense } from "react";

async function getMockRooms() {
  // Replace with API call using search params; SSR is fine here.
  return [
    {
      id: "dlx",
      name: "Deluxe King Room",
      description: "Spacious king bed, city view, 28m²",
      maxGuests: 2,
      images: ["/rooms/dlx.jpg"],
      amenities: ["Wi‑Fi", "AC", "TV"],
      ratePlans: [
        { id: "std", name: "Standard Rate", refundable: true, nightlyFrom: 120, priceTotal: 240, currency: "USD" },
        { id: "nr",  name: "Non‑Refundable", refundable: false, nightlyFrom: 109, priceTotal: 218, currency: "USD" },
      ],
    },
  ];
}

export default async function RoomsPage() {
  const rooms = await getMockRooms();
  return (
    <main className="max-w-5xl mx-auto p-4 grid gap-4">
      <Suspense>
        {rooms.map((r) => <RoomCard key={r.id} room={r} />)}
      </Suspense>
    </main>
  );
}
