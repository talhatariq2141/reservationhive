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


import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "./theme-provider"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Manage Locations",
      url: "#",
      icon: Globe,
      isActive: true,
      items: [
        {
          title: "Countries",
          url: "#",
        },
        {
          title: "Cities",
          url: "#",
        },
        {
          title: "Locations",
          url: "#",
        },
      ],
    },
    {
      title: "Hotel Attributes",
      url: "#",
      icon: Wrench,
      items: [
        {
          title: "Amenities",
          url: "#",
        },
        {
          title: "Facilities",
          url: "#",
        },
        {
          title: "Bed Types",
          url: "#",
        },
      ],
    },
    {
      title: "Registered Users",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Active Users",
          url: "#",
        },
        {
          title: "Banned Users",
          url: "#",
        },
        {
          title: "Email Verified",
          url: "#",
        },
        {
          title: "Mobile Verified",
          url: "#",
        },
        {
          title: "All Users",
          url: "#",
        },
        {
          title: "Send Notification",
          url: "#",
        },
      ],
    },
    {
      title: "Hotels",
      url: "#",
      icon: Hotel,
      items: [
        {
          title: "Active Hotels",
          url: "#",
        },
        {
          title: "Banned Hotels",
          url: "#",
        },
        {
          title: "All Hotels",
          url: "#",
        },
        {
          title: "Send Notifications",
          url: "#",
        },
      ],
    },
    {
      title: "Payments",
      url: "#",
      icon: BadgeDollarSign,
      items: [
        {
          title: "Pending Payments",
          url: "#",
        },
        {
          title: "Approved Payments",
          url: "#",
        },
        {
          title: "Successful Payments",
          url: "#",
        },
        {
          title: "Rejected Payments",
          url: "#",
        },
        {
          title: "Initiated Payments",
          url: "#",
        },
        {
          title: "All Payments",
          url: "#",
        },
      ],
    },
    {
      title: "Withdrawals",
      url: "#",
      icon: BanknoteArrowDown,
      items: [
        {
          title: "Pending Payments",
          url: "#",
        },
        {
          title: "Approved Payments",
          url: "#",
        },
        {
          title: "Successful Payments",
          url: "#",
        },
        {
          title: "Rejected Payments",
          url: "#",
        },
        {
          title: "Initiated Payments",
          url: "#",
        },
        {
          title: "All Payments",
          url: "#",
        },
      ],
    },
    {
      title: "Payments",
      url: "#",
      icon: BadgeDollarSign,
      items: [
        {
          title: "Pending Payments",
          url: "#",
        },
        {
          title: "Approved Payments",
          url: "#",
        },
        {
          title: "Successful Payments",
          url: "#",
        },
        {
          title: "Rejected Payments",
          url: "#",
        },
        {
          title: "Initiated Payments",
          url: "#",
        },
        {
          title: "All Payments",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    
    <Sidebar collapsible="icon" {...props} className="bg-blue-900">
      <SidebarHeader className="group-data-[collapsible=icon]:items-center">
          <div className="flex items-start space-x-2 px-4 py-3">
            {/* Main logo and app name */}
            <div className="flex  space-x-2">
              <Image
                src="/reservationhive-logo.svg"
                alt="Logo"
                width={32}
                height={32}
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
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    
  )
}
