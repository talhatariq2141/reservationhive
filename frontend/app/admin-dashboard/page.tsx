import AdminDashboardLayout from "@/components/layouts/AdminDashboardLayout";


export default function AdminDashboardPage() {
  return (
    
    <AdminDashboardLayout>
      
      <div className="p-6 space-y-8">
      
      <p>Welcome back, Admin! Here's an overview of your dashboard:</p>

      {/* Placeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Card Title {i + 1}</h2>
            <p>Some summary or metric here—like stats, metrics, etc.</p>
          </div>
        ))}
      </div>

      {/* Large Content Section */}
      <section className="bg-gray-50 p-4 rounded space-y-4">
        <h2 className="text-2xl font-semibold">Detailed Analytics</h2>
        {[1, 2, 3, 4, 5].map((sec) => (
          <div key={sec} className="bg-white p-3 rounded border">
            <h3 className="font-medium">Section {sec}</h3>
            <p>
              This is placeholder content to demonstrate vertical scrolling. Add charts,
              tables, lists, or longer text to simulate real dashboard data.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at venenatis nisi. Cras convallis orci eu dolor placerat sollicitudin.</p>
          </div>
        ))}
      </section>

      {/* Footer-like Section */}
      <footer className="mt-8 text-center text-gray-500">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>

      {/* <div className="grid auto-rows-min gap-4 md:grid-cols-4 mt">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>

      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
    </AdminDashboardLayout>
    
  );
}
