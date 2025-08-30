import { ChartAreaInteractive } from "@/components/admin-dashboard/chart-area-interactive";
import { DataTable } from "@/components/admin-dashboard/data-table"
import { SectionCards } from "@/components/admin-dashboard/section-cards"
import data from "./data.json"


export default function AdminDashboardPage() {
  return (
    <div className="@container/main flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-col col-4 gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
  );
}