"use client";
import { useScopedTheme } from "@/components/scoped-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ScopedThemeToggle() {
  const { theme, toggle } = useScopedTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = theme === "dark";
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
      {mounted ? (isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />) : null}
    </Button>
  );
}
