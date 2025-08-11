"use client";

import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { NavUser } from "@/components/nav-user"
import { ModeToggle } from "@/components/ModeToggle";
import { ThemeProvider } from "@/components/theme-provider"; // Ensure this import is correct
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

interface Props {
  children: ReactNode;
}

export default function AdminDashboardLayout({ children }: Props) {
  return (
    <ThemeProvider>
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        {/* Header with breadcrumbs */}
        <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Admin</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
              <div className="flex-1 flex justify-end gap-4 items-center">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[250px] max-w-xs"
                />
                <div className="flex items-center gap-2">
                  <NavUser user={data.user} />              
                </div>
                <div className="flex items-center gap-2">
                  <ModeToggle />              
                </div>
              </div>
        </header>

        {/* Main content area */}
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
    </ThemeProvider>
  );
}
