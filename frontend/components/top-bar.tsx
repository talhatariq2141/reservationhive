"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Settings, Search } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle"; // if you use ModeToggle

type TopBarProps = {
  logoSrc?: string;
  appName?: string;
  userName?: string;
  avatarSrc?: string;
  searchPlaceholder?: string;
};

export default function TopBar({
  logoSrc = "/reservationhive-logo.svg",
  appName = "ReservationHive",
  userName = "Admin",
  avatarSrc = "/admin-avatar.jpg",
  searchPlaceholder = "Search",
}: TopBarProps) {
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      {/* 
        IMPORTANT:
        We pad-left by the current sidebar width so the top bar content
        doesn't "jump" when the sidebar is toggled.
        The group state comes from the wrapper with class 'group/sidebar'.
      */}
      <div
        className={`
          flex h-14 items-center gap-3
          px-3 md:px-4
          
        `}
      >
        {/* LEFT: sidebar trigger + logo + app name */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />

          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <Image
              src={logoSrc}
              alt={appName}
              width={28}
              height={28}
              className="w-7 h-7"
              priority
            />
            <span className="hidden sm:inline text-base font-semibold">
              {appName}
            </span>
          </Link>
        </div>

        {/* MIDDLE: search (left-aligned overall, but takes remaining space) */}
        <div className="ml-2 flex-1">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9"
              aria-label="Search"
            />
          </div>
          {/* Compact search button on small screens */}
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open search">
            <Search className="size-5" />
          </Button>
        </div>

        {/* RIGHT: actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Notifications" className="rounded-full">
            <Bell className="size-5" />
          </Button>

          <Button variant="ghost" size="icon" aria-label="Settings" className="rounded-full">
            <Settings className="size-5" />
          </Button>

          <ModeToggle />

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Avatar + dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 gap-2 px-2" aria-label="Open profile menu">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={avatarSrc} alt={userName} />
                  <AvatarFallback>{userName?.slice(0, 2).toUpperCase() || "AD"}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-medium">
                Signed in as <span className="font-semibold">{userName}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/notifications">Notifications</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/logout">Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
