import VendorDashboardLayout from "@/components/layouts/VendorDashboardLayout";

export default function VendorDashboardPage() {
  return (
    <VendorDashboardLayout>
      

      <div className="grid auto-rows-min gap-4 md:grid-cols-4 mt">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>

      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </VendorDashboardLayout>
  );
}
