"use client"

import * as React from "react"
import Image from "next/image"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Globe,
  Hotel,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
  Wrench,
  BadgeDollarSign,
  BanknoteArrowDown
} from "lucide-react"


import NavMainVendor from "@/components/nav-main-vendor"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-dropdown-menu"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
  
}

export function VendorSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader className="group-data-[collapsible=icon]:items-center ">
          <div className="flex items-start space-x-2 px-1 py-2">
            {/* Main logo and app name */}
            <div className="flex  space-x-2">
              <Image
                src="/reservationhive-logo.svg"
                alt="Logo"
                width={28}
                height={28}
                unoptimized
                className="w-8 h-8 flex-shrink-0"
              />
              
            </div>
            {/* Version text below, smaller font */}
            <div className="flex flex-col justify-center space-y-1">
            <span className="text-xl font-sans font-semibold group-data-[collapsible=icon]:hidden">
                ReservationHive
            </span>
           
            </div>
          </div>
        
      </SidebarHeader>
      <SidebarContent>
        <NavMainVendor/>
        
      </SidebarContent>
      <SidebarFooter>
       <Separator />
        <SidebarGroupLabel>
          <div className="p-3">
            <p className="text-muted-foreground items-center group-data-[collapsed=icon]/sidebar:hidden">
              <span className="text-sm font-sans font-semibold text-green-500"><span className="text-slate-500">ReservationHive</span>  1.0.0</span>
            </p>
          </div>
      </SidebarGroupLabel>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    
  )
}
