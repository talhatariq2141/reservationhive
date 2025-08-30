"use client";

import Link from "next/link";
import { ChevronRight, House, ShoppingBag, Users, LifeBuoy, Settings, Globe, Hotel, SlidersVertical, CircleDollarSign, BanknoteArrowDown, Ticket, ClipboardMinus, Hexagon, Rows3, Bug, Handshake } from "lucide-react";

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
import Home from "@/app/page";

/**
 * Manual, no-props nav:
 * - Duplicate a <Collapsible> block to add another top-level item.
 * - Edit icons/labels/links inline.
 */
export default function NavMainAdmin() {
  return (
    <SidebarGroup>
      <SidebarMenu>

        {/* Dashboard */}
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Dashboard">
                <House className="shrink-0 text-blue-400" />
                <Link href="/admin">
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
              <SidebarMenuButton className="py-4" tooltip="Manage Locations">
                <Globe className="shrink-0" />
                <span className="text-base ml-2">Manage Locations</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/country/all">Countries</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/city">Cities</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/location">Locations</Link>
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
              <SidebarMenuButton className="py-4" tooltip="Hotel Attributes">
                <SlidersVertical className="shrink-0" />
                <span className="text-base font-sans ml-2">Hotel Attributes</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin-dashboard/users">Amenities</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin-dashboard/users/roles">Facilities</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin-dashboard/users/invitations">Bed Types</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Registered Users */}
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem className="py-2">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="py-4" tooltip="Registered Users">
                <Users className="shrink-0" />
                <span className="text-base font-sans ml-2">Registered Users</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin-dashboard/support/tickets">Active Users</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin-dashboard/support/kb">Banned users</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin-dashboard/support/contact">Email Verified</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin-dashboard/support/contact">Mobile Verified</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin-dashboard/support/contact">All Users</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin-dashboard/support/contact">Send Notifications</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
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
