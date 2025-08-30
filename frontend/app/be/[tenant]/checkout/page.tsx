import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 grid md:grid-cols-[2fr,1fr] gap-6">
      <section className="bg-card border rounded-lg p-4 grid gap-3">
        <h2 className="text-lg font-semibold">Guest details</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <Input placeholder="First name" />
          <Input placeholder="Last name" />
          <Input className="md:col-span-2" placeholder="Email" />
          <Input className="md:col-span-2" placeholder="Phone" />
        </div>
        <Separator />
        <h3 className="text-md font-medium">Payment</h3>
        <div className="grid gap-3">
          <Input placeholder="Card number" />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="MM/YY" />
            <Input placeholder="CVC" />
          </div>
        </div>
        <Button className="mt-4">Confirm booking</Button>
      </section>

      <aside className="bg-card border rounded-lg p-4 h-fit">
        <h3 className="font-medium">Price summary</h3>
        <div className="mt-2 text-sm text-muted-foreground">2 nights · Deluxe King</div>
        <div className="mt-2 flex items-center justify-between">
          <span>Room</span><span>$240</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxes & fees</span><span>$24</span>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between font-semibold">
          <span>Total</span><span>$264</span>
        </div>
      </aside>
    </main>
  );
}
