"use client";

import Link from "next/link";
import { ChevronRight, House, ShoppingBag, Users, LifeBuoy, Settings, Globe, Hotel, SlidersVertical, CircleDollarSign, BanknoteArrowDown, Ticket, ClipboardMinus, Hexagon, Rows3, Bug, Handshake, UserPlus } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";


/**
 * Manual, no-props nav:
 * - Duplicate a <Collapsible> block to add another top-level item.
 * - Edit icons/labels/links inline.
 */
export default function NavMainVendor() {
  return (
    <SidebarGroup>
      <SidebarMenu>

        {/* Dashboard */}
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Dashboard">
                <House className="shrink-0 text-blue-400" />
                <Link href="/vendor">
                <span className="text-base ml-2">Dashboard</span>
                </Link>                
              </SidebarMenuButton>
            </CollapsibleTrigger>            
          </SidebarMenuItem>
        </Collapsible>
        
        {/* Manage Locations */}
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Manage Hotel">
                <Hotel className="shrink-0" />
                <span className="text-base ml-2">Manage Hotel</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/vendor/hotel/setting">Settings</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/vendor/hotel/settting/payment-systems">Payment Systems</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/vendor/hotel/room-type">Room Types</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/vendor/hotel/room">Room</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/vendor/hotel/premium-service">Premium Services</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Hotel Attributes */}
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Manage Staff">
                <UserPlus className="shrink-0" />
                <span className="text-base font-sans ml-2">Manage Staff</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/vendor/staff">Staff</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/vendor/roles">Roles</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>                
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Aknowledgement */}        
         <SidebarGroupLabel>ACKNOWLEDGEMENT</SidebarGroupLabel>

        
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Booking Requests">
                
                <Users className="shrink-0" />
                <Link href="/vendor/requests">
                <span className="text-base font-sans ml-2">Booking Requests</span>
                </Link>
              </SidebarMenuButton>
            </CollapsibleTrigger>            
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Booking Requests">                
                <Users className="shrink-0" />
                <Link href="/vendor/booking/todays/booked-room">
                <span className="text-base font-sans ml-2">Todays Booked</span>
                </Link>
              </SidebarMenuButton>
            </CollapsibleTrigger>            
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Booking Requests">                
                <Users className="shrink-0" />
                <Link href="/vendor/booking/todays/check-in">
                <span className="text-base font-sans ml-2">Todays Checkin</span>
                </Link>
              </SidebarMenuButton>
            </CollapsibleTrigger>            
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Booking Requests">                
                <Users className="shrink-0" />
                <Link href="/vendor/booking/pending/check-in">
                <span className="text-base font-sans ml-2">Pending Check-ins</span>
                </Link>
              </SidebarMenuButton>
            </CollapsibleTrigger>            
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Booking Requests">                
                <Users className="shrink-0" />
                <Link href="/vendor/booking/todays/checkout">
                <span className="text-base font-sans ml-2">Todays Checkout</span>
                </Link>
              </SidebarMenuButton>
            </CollapsibleTrigger>            
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Booking Requests">                
                <Users className="shrink-0" />
                <Link href="/vendor/booking/delayed/checkout">
                <span className="text-base font-sans ml-2">Delayed Checkouts</span>
                </Link>
              </SidebarMenuButton>
            </CollapsibleTrigger>            
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Booking Requests">                
                <Users className="shrink-0" />
                <Link href="/vendor/booking/upcoming/check-in">
                <span className="text-base font-sans ml-2">Upcomign Check-ins</span>
                </Link>
              </SidebarMenuButton>
            </CollapsibleTrigger>            
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Booking Requests">                
                <Users className="shrink-0" />
                <Link href="/vendor/booking/upcoming/checkout">
                <span className="text-base font-sans ml-2">Upcoming Checkouts</span>
                </Link>
              </SidebarMenuButton>
            </CollapsibleTrigger>            
          </SidebarMenuItem>
        </Collapsible>



        {/* Vendor Requests */}
            <Collapsible asChild defaultOpen={false} className="group/collapsible">
              <SidebarMenuItem className="py-2">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="py-4" tooltip="Vendor Requests">
                    <Handshake className="shrink-0" />
                    <span className="text-base font-sans ml-2">Vendor Requests</span>                
                  </SidebarMenuButton>
                </CollapsibleTrigger>            
              </SidebarMenuItem>
            </Collapsible>

        {/* Hotels */}
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Hotels">
                <Hotel className="shrink-0" />
                <span className="text-base font-sans ml-2">Hotels</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/hotels/active">Active Hotels</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/hotels/banned">Banned Hotels</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/hotels/all">All Hotels</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/hotels/send-notification">Send Notifications</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Payments */}
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Payments">
                <CircleDollarSign className="shrink-0" />
                <span className="text-base font-sans ml-2">Payments</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/deposit/pending">Pending Payments</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/deposit/approved">Approved Payments</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/deposit/successful">Successful Payments</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/deposit/rejected">Rejected Payments</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/deposit/initiated">Initiated Payments</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/deposit/all">All Payments</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Withdrawals */}
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Withdrawals">
                <BanknoteArrowDown className="shrink-0" />
                <span className="text-base font-sans ml-2">Withdrawals</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/withdraw/pending">Pending Withdrawals</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/withdraw/approved">Approved Withdrawals</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/withdraw/rejected">Rejected Withdrawals</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/withdraw/all">All Withdrawals</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

       
        {/* Settings Area */}        
         <SidebarGroupLabel>SETTINGS</SidebarGroupLabel>
                 
            {/* System Settings */}
            <Collapsible asChild defaultOpen={false} className="group/collapsible">
              <SidebarMenuItem className="py-2">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="py-4" tooltip="System Settings">
                    <Settings className="shrink-0" />
                    <Link href="/admin/settings">
                    <span className="text-base font-sans ml-2">System Settings</span>
                    </Link>                
                  </SidebarMenuButton>
                </CollapsibleTrigger>            
              </SidebarMenuItem>
            </Collapsible>

        {/* Support & Report */}
        <SidebarGroupLabel>SUPPORT & REPORT</SidebarGroupLabel>
        

            {/* Support Ticket */}
            <Collapsible asChild defaultOpen={false} className="group/collapsible">
              <SidebarMenuItem className="py-2">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="py-4" tooltip="Support Ticket">
                    <Ticket className="shrink-0" />
                    <span className="text-base font-sans ml-2">Support Ticket</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/ticket/pending">Pending Ticket</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/ticket/closed">Closed Ticket</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/answered">Answered Ticket</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/ticket">All Ticket</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Report */}
            <Collapsible asChild defaultOpen={false} className="group/collapsible">
              <SidebarMenuItem className="py-2">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="py-4" tooltip="Report">
                    <ClipboardMinus className="shrink-0" />
                    <span className="text-base font-sans ml-2">Report</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/report/transaction">Transaction History</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/report/login/history">User Login History</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/login/owner/history">Vendor Login History</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/report/notification/history">Notification History</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

        {/* Extra */}
        <SidebarGroupLabel>EXTRA</SidebarGroupLabel>

            {/* Extra */}
            <Collapsible asChild defaultOpen={false} className="group/collapsible">
              <SidebarMenuItem className="py-2">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="py-4" tooltip="Support Ticket">
                    <Rows3 className="shrink-0" />
                    <span className="text-base font-sans ml-2">Extra</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/system/info">Application</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/system/server-info">Server</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/system/optimize">Cache</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/system/system-update">Update</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Report & Request */}
            <Collapsible asChild defaultOpen={false} className="group/collapsible">
              <SidebarMenuItem className="py-2">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="py-4" tooltip="Report & Request">
                    <Bug className="shrink-0" />
                    <Link href="/admin/request-report">
                    <span className="text-base font-sans ml-2">Report & Request</span>
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>                
              </SidebarMenuItem>
            </Collapsible>
        
             
      </SidebarMenu>
    </SidebarGroup>
  );
}
