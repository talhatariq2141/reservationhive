"use client"

import Image from "next/image";
import * as React from "react"
import {
    ArrowRightLeft,
  BanknoteArrowDown,
  BanknoteArrowUp,
  Bed,
  Blocks,
  BookOpen,
  BookOpenText,
  Bot,
  Bug,
  CircleArrowLeft,
  CircleArrowRight,
  CircleDollarSign,
  ClipboardMinus,
  ClockAlert,
  Command,
  CornerDownLeft,
  CornerDownRight,
  DollarSign,
  FolderKanban,
  Frame,
  GitPullRequestArrow,
  Globe,
  Handshake,
  Hotel,
  House,
  LifeBuoy,
  Loader,
  Map,
  NotebookPen,
  PieChart,
  Receipt,
  Rows3,
  Send,
  Settings2,
  SlidersVertical,
  SquareTerminal,
  Ticket,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/vendor/nav-main"
import { NavSecondary } from "@/components/vendor/nav-secondary"
import { NavUser } from "@/components/vendor/nav-user"
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
import { title } from "process";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain1: [
    {
      title: "Dashboard",
      url: "/vendor",
      icon: House,
    },
    {
      title: "Manage Hotel",
      url: "#",
      icon: Globe,      
      items: [
        {
          title: "Settings",
          url: "/vendor/hotel/setting",
        },
        {
          title: "Payment Systems",
          url: "vendor/hotel/setting/payment-systems",
        },
        {
          title: "Room Types",
          url: "/vendor/hotel/room-type",
        },
        {
          title: "Rooms",
          url: "/vendor/hotel/room",
        },
        {
          title: "Premium Services",
          url: "/vendor/hotel/premium-service",
        },
      ],
    },
    {
      title: "Manage Staff",
      url: "#",
      icon: SlidersVertical,
      items: [
        {
          title: "Staff",
          url: "vendor/staff",
        },
        {
          title: "Roles",
          url: "vendor/roles",
        },
        
      ],
    },
    
  ],
  navMain2: [
    {
      title: "Booking Requests",
      url: "vendor/booking/requests",
      icon: GitPullRequestArrow,      
    },
    {
      title: "Todays Booked",
      url: "vendor/booking/todays/booked-room",
      icon: NotebookPen,      
    },
    {
      title: "Todays Check-in",
      url: "vendor/booking/todays/check-in",
      icon: CornerDownRight,      
    },
    {
      title: "Pending Checkin-ins",
      url: "vendor/booking/pending/check-in",
      icon: Loader,      
    },
    {
      title: "Todays Checkouts",
      url: "vendor/booking/todays/checkout",
      icon: CornerDownLeft,      
    },
    {
      title: "Delayted Checkouts",
      url: "vendor/booking/delayed/checkout",
      icon: Loader,      
    },
    {
      title: "Upcoming Check-ins",
      url: "vendor/booking/upcoming/check-in",
      icon: CircleArrowRight,      
    },
    {
      title: "Upcoming Checkouts",
      url: "vendor/booking/upcoming/checkout",
      icon: CircleArrowLeft
      ,      
    },    
  ],
  navMain3: [
    {
      title: "Book Room",
      url: "vendor/book-room",
      icon: Bed,      
    },
    {
      title: "Add Service",
      url: "vendor/premium-service/add-new",
      icon: Blocks,      
    },
    {
      title: "Manage Bookings",
      url: "#",
      icon: FolderKanban,
      items: [
        {
          title: "Active Bookings",
          url: "vendor/booking/approved",
        },
        {
          title: "Checked Out Bookings",
          url: "vendor/booking/checked-out-bookings",
        },
        {
          title: "Cancelled Bookings",
          url: "vendor/booking/cancelled-bookings",
        },
        {
          title: "Refundable Bookings",
          url: "vendor/booking/refundable",
        },
        {
          title: "Delayed Checkout",
          url: "vendor/booking/checkout/delayed",
        },
        {
          title: "All Bookings",
          url: "vendor/booking/all-bookings",
        },
    ]
      
    },
    
    
  ],
  navMain4: [
    {
      title: "Support Ticket",
      url: "vendor/ticket",
      icon: Ticket,      
    },
    {
      title: "Subscription",
      url: "vendor/payment",
      icon: Receipt,      
    },
    {
        title: "Withdraw",
        url:"vendor/withdraw",
        icon: BanknoteArrowDown,
    }
  ],
  navMain5: [
    {
      title: "Bookings",
      url: "vendor/report/bookings",
      icon: BookOpenText,      
    },
    {
      title: "Booking Action",
      url: "vendor/report/booking-actions",
      icon: ClockAlert,      
    },
    {
      title: "Transaction",
      url: "vendor/report/transaction",
      icon: ArrowRightLeft,      
    },
    {
      title: "Received Payments",
      url: "vendor/report/payments/received/history",
      icon: BanknoteArrowDown,      
    },
    {
      title: "Returned Payments",
      url: "vendor/report/payments/returned/history",
      icon: BanknoteArrowUp,      
    },
  ],
 
}

export function VendorSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <SidebarGroupLabel className="ml-1">AKNOWLEDGEMENT</SidebarGroupLabel>
        <NavMain items={data.navMain2} />
        <SidebarGroupLabel className="ml-1">BOOKING</SidebarGroupLabel>
        <NavMain items={data.navMain3} />
        <SidebarGroupLabel className="ml-1">OTHERS</SidebarGroupLabel>
        <NavMain items={data.navMain4} />
        <SidebarGroupLabel className="ml-1">REPORT</SidebarGroupLabel>
        <NavMain items={data.navMain5} />

      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center text-center py-2 px-2">
        <span className="text-sm text-gray-500">RESERVATIONHIVE<span className="text-green-400"> V1.0.0</span></span>
        </div>      
      </SidebarFooter>
    </Sidebar>
  )
}
