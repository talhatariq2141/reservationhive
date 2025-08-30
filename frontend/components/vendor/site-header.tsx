"use client"

import { Bell, Command, Link, Settings, SidebarIcon } from "lucide-react"
import Image from "next/image"

import { SearchForm } from "@/components/admin/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { ScopedThemeToggle } from "../scoped-theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { NavUser } from "../nav-user"

const data = {
  user: {
    name: "John Doe",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
}

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
        <header className="bg-background sticky z-50 top-0 border-b flex h-16 shrink-0 items-center gap-2 px-4">
            <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />                
            <SearchForm />
            </div>
            <div className="ml-auto flex items-center gap-2">
              
              <Button variant="ghost" size="icon" aria-label="Notifications" className="rounded-full">
            <Bell className="size-5" />
          </Button>

          <Button variant="ghost" size="icon" aria-label="Settings" className="rounded-full">
            <Settings className="size-5" />
          </Button>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Avatar + dropdown */}
          <NavUser user={data.user} />


              <Separator orientation="vertical" className="h-6" />
              <ScopedThemeToggle />
              
            </div>
        </header>
  )
}
