"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu } from "lucide-react"
// import { useUIState } from "./ui-state"
import { ScopedThemeToggle } from "@/components/scoped-theme-toggle";
import Image from "next/image"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"

const data = {
  user: {
    name: "John Doe",
    email: "Admin",
    avatar: "/avatars/shadcn.jpg",
  }
}
export default function AdminTopbar() {
//   const { collapsed, setCollapsed } = useUIState()

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b bg-background ">
      <div className="h-16 mx-auto flex items-center gap-3 px-3 md:px-4">
        {/* Sidebar trigger stays in Topbar */}
       

        {/* Main logo and app name */}
        <div className="flex  space-x-2">
          <SidebarTrigger/>
              
        </div>
        

        {/* Normal-length search */}
        <div className="w-[320px] max-w-full ">
          <Input placeholder="Search..." />
        </div>

        {/* Right side icons */}
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <NavUser user={data.user} />
          {/* <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/80" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar> */}
          <ScopedThemeToggle />
        </div>
                
      </div>
    </header>
  )
}
