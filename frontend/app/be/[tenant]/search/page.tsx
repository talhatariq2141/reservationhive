import Link from "next/link";
import BookingSearchBar from "@/components/booking/BookingSearchBar";

export default function SearchPage({ params }: { params: { tenant: string } }) {
  return (
    <main className="max-w-5xl mx-auto p-4">
      <div className="sticky top-4 z-10">
        <BookingSearchBar tenant={params.tenant} />
      </div>

      <section className="mt-6 grid gap-4">
        <div className="rounded-lg border p-6 bg-card">
          <h2 className="text-lg font-semibold">Welcome to {params.tenant}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose your dates and guests to see available rooms.
          </p>
        </div>
      </section>
    </main>
  );
}
