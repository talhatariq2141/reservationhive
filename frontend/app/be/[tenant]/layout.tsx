import type { ReactNode } from "react";
import { ScopedThemeProvider } from "@/components/scoped-theme"; // the one you built for admin/vendor
import { headers } from "next/headers";

export default function BookingLayout({ children, params }: { children: ReactNode; params: { tenant: string } }) {
  const { tenant } = params;
  // Optional: map tenant -> theme defaults
  const storageKey = `be-theme:${tenant}`;
  return (
    <ScopedThemeProvider scopeClass="vendor-scope" storageKey={storageKey} defaultTheme="light">
      <div className="min-h-screen bg-background text-foreground">
        <header className="h-14 border-b bg-background/95 backdrop-blur px-4 flex items-center">
          <div className="font-semibold">{tenant.toUpperCase()}</div>
          <div className="ml-auto text-sm text-muted-foreground">Booking Engine</div>
        </header>
        {children}
      </div>
    </ScopedThemeProvider>
  );
}
