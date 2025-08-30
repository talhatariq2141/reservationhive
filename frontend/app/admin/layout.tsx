"use client";

import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ScopedThemeProvider } from "@/components/scoped-theme"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SiteHeader } from "@/components/admin/site-header";
// export const iframeHeight = "800px"
// export const description = "A sidebar with a header and a search form."
export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScopedThemeProvider scopeClass="admin-scope" storageKey="admin-theme" defaultTheme="light">
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <SiteHeader />          
          <div className="bg-card flex flex-1 flex-col gap-4 p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ScopedThemeProvider>
   
  )
}
