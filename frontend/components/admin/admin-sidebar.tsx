"use client"

import Image from "next/image";
import * as React from "react"
import {
  BanknoteArrowDown,
  BookOpen,
  Bot,
  Bug,
  CircleDollarSign,
  ClipboardMinus,
  Command,
  Frame,
  Globe,
  Handshake,
  Hotel,
  House,
  LifeBuoy,
  Map,
  PieChart,
  Rows3,
  Send,
  Settings2,
  SlidersVertical,
  SquareTerminal,
  Ticket,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/admin/nav-main"
import { NavSecondary } from "@/components/admin/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain1: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: House,
    },
    {
      title: "Manage Locations",
      url: "#",
      icon: Globe,      
      items: [
        {
          title: "Countries",
          url: "/admin/country/all",
        },
        {
          title: "Cities",
          url: "/admin/city",
        },
        {
          title: "Locations",
          url: "/admin/location",
        },
      ],
    },
    {
      title: "Hotel Attributes",
      url: "#",
      icon: SlidersVertical,
      items: [
        {
          title: "Amenities",
          url: "/admin/amenities",
        },
        {
          title: "Facilities",
          url: "admin/facility",
        },
        {
          title: "Bed Types",
          url: "admin/bed",
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
          url: "admin/users/active",
        },
        {
          title: "Banned Users",
          url: "admin/users/banned",
        },
        {
          title: "Email Verified",
          url: "admin/users/email-verified",
        },
        {
          title: "Mobile Verified",
          url: "admin/users/mobile-verified",
        },
        {
          title: "All Users",
          url: "admin/users",
        },
        {
          title: "Send Notifications",
          url: "admin/send-notification",
        },
      ],
    },
    {
      title: "Vendor Request",
      url: "#",
      icon: Handshake,
      
    },
     {
      title: "Hotels",
      url: "#",
      icon: Hotel,
      items: [
        {
          title: "Active Hotels",
          url: "/admin/hotels/active",
        },
        {
          title: "Banned Hotels",
          url: "/admin/hotel/banned",
        },
        {
          title: "All Hotels",
          url: "/admin/hotels/all",
        },
        {
          title: "Send Notifications",
          url: "/admin/hotels/send-notification",
        },
      ],
    },
    {
      title: "Payments",
      url: "#",
      icon: CircleDollarSign,
      items: [
        {
          title: "Pending Payments",
          url: "/admin/deposit/pending",
        },
        {
          title: "Approved Payments",
          url: "admin/deposit/approved",
        },
        {
          title: "Successful Payments",
          url: "admin/deposit/successful",
        },
        {
          title: "Rejected Payments",
          url: "admin/deposit/rejected",
        },
        {
          title: "Initiated Payments",
          url: "admin/deposit/initiated",
        },
        {
          title: "All Payments",
          url: "admin/deposit/all",
        },
      ],
    },
    {
      title: "Withdrawals",
      url: "#",
      icon: BanknoteArrowDown,
      items: [
        {
          title: "Pending Withdrawals",
          url: "admin/withdraw/pending",
        },
        {
          title: "Approved Withdrawal",
          url: "admin/withdraw/approved",
        },
        {
          title: "Rejected Withdrawal",
          url: "admin/withdraw/rejected",
        },
        {
          title: "All Withdrawal",
          url: "admin/withdraw/all",
        },
      ],
    },
    
  ],
  navMain2: [
    {
      title: "Hotels",
      url: "#",
      icon: Hotel,
      items: [
        {
          title: "Active Hotels",
          url: "/admin/hotels/active",
        },
        {
          title: "Banned Hotels",
          url: "/admin/hotel/banned",
        },
        {
          title: "All Hotels",
          url: "/admin/hotels/all",
        },
        {
          title: "Send Notifications",
          url: "/admin/hotels/send-notification",
        },
      ],
    },
    {
      title: "Payments",
      url: "#",
      icon: CircleDollarSign,
      items: [
        {
          title: "Pending Payments",
          url: "/admin/deposit/pending",
        },
        {
          title: "Approved Payments",
          url: "admin/deposit/approved",
        },
        {
          title: "Successful Payments",
          url: "admin/deposit/successful",
        },
        {
          title: "Rejected Payments",
          url: "admin/deposit/rejected",
        },
        {
          title: "Initiated Payments",
          url: "admin/deposit/initiated",
        },
        {
          title: "All Payments",
          url: "admin/deposit/all",
        },
      ],
    },
    {
      title: "Withdrawals",
      url: "#",
      icon: BanknoteArrowDown,
      items: [
        {
          title: "Pending Withdrawals",
          url: "admin/withdraw/pending",
        },
        {
          title: "Approved Withdrawal",
          url: "admin/withdraw/approved",
        },
        {
          title: "Rejected Withdrawal",
          url: "admin/withdraw/rejected",
        },
        {
          title: "All Withdrawal",
          url: "admin/withdraw/all",
        },
      ],
    },
    
  ],
  navMain3: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings2,
      
    },
    
    
  ],
  navMain4: [
    {
      title: "Support Ticket",
      url: "#",
      icon: Ticket,
      items: [
        {
          title: "Pending Ticket",
          url: "admin/ticket/pending",
        },
        {
          title: "Closed Tickets",
          url: "admin/ticket/closed",
        },
        {
          title: "Answered Tickets",
          url: "admin/ticket/answered",
        },
        {
          title: "All Tickets",
          url: "admin/ticket",
        },
      ],
    },
    {
      title: "Report",
      url: "#",
      icon: ClipboardMinus,
      items: [
        {
          title: "Transaction History",
          url: "admin/report/transaction",
        },
        {
          title: "User Login History",
          url: "admin/report/login/history",
        },
        {
          title: "Vendor Login History",
          url: "admin/report/login/owner/history",
        },
        {
          title: "Notification History",
          url: "admin/report/notification/history",
        },
      ],
    },
  ],
  navMain5: [
    {
      title: "Extra",
      url: "#",
      icon: Rows3,
      items: [
        {
          title: "Application",
          url: "admin/system/info",
        },
        {
          title: "Server",
          url: "admin/system/server-info",
        },
        {
          title: "Cache",
          url: "admin/system/optimize",
        },
        {
          title: "Update",
          url: "admin/system/system-update",
        },
      ],
    },
    {
      title: "Report & Request",
      url: "admin/request-report",
      icon: Bug,
      
    },
  ],
  Dashboard: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: House,
    },
    
  ],
  
  Settings: [
    {
      title: "",
      url: "#",
      icon: Handshake,
    },
    
  ],
  projects: [
    {
      name: "Dashboard",
      url: "#",
      icon: Frame,
    },    
  ],
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      
      {...props}
    >
      <SidebarHeader className="border-b">
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
                    <span className="text-xl font-sans font-medium group-data-[collapsible=icon]:hidden">
                        ReservationHive
                    </span>
                   
                    </div>
          </div>
      </SidebarHeader>
      <SidebarContent>
        
        <NavMain items={data.navMain1} />         
        <SidebarGroupLabel className="ml-1">SETTINGS</SidebarGroupLabel>
        <NavMain items={data.navMain3} />
        <SidebarGroupLabel className="ml-1">SUPPORT & REPORT</SidebarGroupLabel>
        <NavMain items={data.navMain4} />
        <SidebarGroupLabel className="ml-1">EXTRA</SidebarGroupLabel>
        <NavMain items={data.navMain5} />

      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center text-center">
        <span className="text-sm text-gray-500">RESERVATIONHIVE<span className="text-green-400"> V1.0.0</span></span>
        </div>      
      </SidebarFooter>
    </Sidebar>
  )
}
