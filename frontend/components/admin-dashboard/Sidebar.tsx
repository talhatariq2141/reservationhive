"use client";

import { useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Globe,
  ShoppingBag,
  Users,
  LifeBuoy,
  Settings,
  ChevronDown,
  Home,
  Command,
  Frame,
  GalleryVerticalEnd,
  Hotel,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Wrench,
  BadgeDollarSign,
  BanknoteArrowDown
} from "lucide-react";

type SubItem = { label: string; href: string };
type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: SubItem[];
};

const nav: NavItem[] = [
  {
    label: "Manage Locations",
    icon: Globe,
    href: "/admin-dashboard",
    children: [
      { label: "Countries", href: "#" },
      { label: "Cities", href: "#" },
      { label: "Locations", href: "#" },
    ],
  },
  {
    label: "E-commerce",
    icon: ShoppingBag,
    href: "/admin-dashboard/ecommerce",
    children: [
      { label: "Products", href: "/admin-dashboard/ecommerce/products" },
      { label: "Orders", href: "/admin-dashboard/ecommerce/orders" },
      { label: "Customers", href: "/admin-dashboard/ecommerce/customers" },
    ],
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin-dashboard/users",
    children: [
      { label: "All users", href: "/admin-dashboard/users" },
      { label: "Roles & permissions", href: "/admin-dashboard/users/roles" },
      { label: "Invitations", href: "/admin-dashboard/users/invitations" },
    ],
  },
  {
    label: "Support",
    icon: LifeBuoy,
    href: "/admin-dashboard/support",
    children: [
      { label: "Tickets", href: "/admin-dashboard/support/tickets" },
      { label: "Knowledge base", href: "/admin-dashboard/support/kb" },
      { label: "Contact", href: "/admin-dashboard/support/contact" },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin-dashboard/settings",
    children: [
      { label: "General", href: "/admin-dashboard/settings" },
      { label: "Billing", href: "/admin-dashboard/settings/billing" },
      { label: "Integrations", href: "/admin-dashboard/settings/integrations" },
    ],
  },
];

export default function Sidebar() {
  // track which parent menus are open
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside
      className={cn(
        "hidden md:flex md:flex-col shrink-0 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "transition-[width] duration-300 ease-in-out",
        "w-[var(--sidebar-width)]",
        "group-data-[collapsed=icon]/sidebar:w-[var(--sidebar-width-icon)]",
        "sticky top-0 h-full"        // <-- pin the sidebar in place 
      )}
    >
      {/* <Link href="/admin-dashboard" className="flex ">
      <div className="h-14 flex items-center px-3">
        <div>
        <Home className="h-5 w-5 text-teal-300" />
        </div>
        <span className="ml-2 text-sm font-semibold  tracking-tight group-data-[collapsed=icon]/sidebar:hidden">
          DASHBOARD
        </span>
      </div>
      </Link> */}
      

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="grid gap-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const id = `submenu-${item.label.toLowerCase().replace(/\s+/g, "-")}`;
            const isOpen = !!open[item.label];

            return (
              <li key={item.label}>
                {/* Parent row: label links to main route; chevron toggles submenu */}
                <div
                  className={cn(
                    "flex items-center rounded-lg px-3 py-1 font-sans text-base font-semibold transition-colors hover:bg-muted",
                    "justify-between",
                    "group-data-[collapsed=icon]/sidebar:justify-center"
                  )}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3",
                      "group-data-[collapsed=icon]/sidebar:justify-center"
                    )}
                  >
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    <span className="truncate group-data-[collapsed=icon]/sidebar:hidden">
                      {item.label}
                    </span>
                  </Link>

                  {/* Chevron (hidden in icon-rail mode) */}
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => toggle(item.label)}
                    className="ml-2 group-data-[collapsed=icon]/sidebar:hidden"
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </Button>
                </div>

                {/* Submenu */}
                <div
                  id={id}
                  data-open={isOpen ? "true" : "false"}
                  className={cn(
                    "pl-11 pr-2", // indent under icon+label
                    "overflow-hidden transition-[max-height] duration-300",
                    // closed height
                    !isOpen && "max-h-0",
                    // open height (enough for 3 items)
                    isOpen && "max-h-40",
                    // hide completely in icon-rail mode
                    "group-data-[collapsed=icon]/sidebar:hidden"
                  )}
                >
                  <ul className="py-1 grid gap-1">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className={cn(
                            "flex items-center rounded-md px-2 py-1.5 text-sm",
                            "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      <Separator />
      <div className="p-3">
        <p className="text-xs text-muted-foreground group-data-[collapsed=icon]/sidebar:hidden">
          © 2025 ReservationHive
        </p>
      </div>
    </aside>
  );
}























// "use client"

// import Link from "next/link"
// import { Separator } from "@/components/ui/separator"
// import { cn } from "@/lib/utils"
// import {
//   Gauge, ShoppingBag, Users, LifeBuoy, Settings,
// } from "lucide-react"

// const nav = [
//   { label: "Dashboard", icon: Gauge, href: "/admin-dashboard" },
//   { label: "E-commerce", icon: ShoppingBag, href: "#" },
//   { label: "Users", icon: Users, href: "#" },
//   { label: "Support", icon: LifeBuoy, href: "#" },
//   { label: "Settings", icon: Settings, href: "#" },
// ]

// export default function Sidebar() {
//   return (
//     <aside
//       className={cn(
//         // base
//         "hidden md:flex md:flex-col shrink-0 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
//         "transition-[width] duration-300 ease-in-out",
//         // full vs icon width driven by the group's data attribute
//         "w-[var(--sidebar-width)]",
//         "group-data-[collapsed=icon]/sidebar:w-[var(--sidebar-width-icon)]"
//       )}
//     >
//       {/* Brand */}
//       {/* <div className="h-14 flex items-center px-3">
//         <div className="size-7 rounded-full bg-primary" />
//         <span className="ml-2 text-sm font-semibold tracking-tight
//                          group-data-[collapsed=icon]/sidebar:hidden">
//           Admin
//         </span>
//       </div>
//       <Separator /> */}

//       {/* Nav */}
//       <nav className="flex-1 overflow-y-auto p-2">
//         <ul className="grid gap-1">
//           {nav.map((item) => (
//             <li key={item.label}>
//               <Link
//                 href={item.href}
//                 className={cn(
//                   "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
//                   // when collapsed, center icons and hide labels
//                   "group-data-[collapsed=icon]/sidebar:justify-center"
//                 )}
//               >
//                 <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
//                 <span className="truncate group-data-[collapsed=icon]/sidebar:hidden">
//                   {item.label}
//                 </span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <Separator />
//       <div className="p-3">
//         <p className="text-xs text-muted-foreground group-data-[collapsed=icon]/sidebar:hidden">
//           © 2025 ReservationHive
//         </p>
//       </div>
//     </aside>
//   )
// }
