"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void };
const ScopedThemeCtx = React.createContext<Ctx | null>(null);

export function useScopedTheme() {
  const v = React.useContext(ScopedThemeCtx);
  if (!v) throw new Error("useScopedTheme must be used within <ScopedThemeProvider>");
  return v;
}

/**
 * Wrap a section with its own theme class scope.
 * - scopeClass: "admin-scope" | "vendor-scope"
 * - storageKey: e.g., "admin-theme" | "vendor-theme"
 */
export function ScopedThemeProvider({
  scopeClass,
  storageKey,
  defaultTheme = "light",
  children,
}: {
  scopeClass: string;
  storageKey: string;
  defaultTheme?: Theme;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const saved = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    setTheme(saved);
    setMounted(true);
  }, [storageKey, defaultTheme]);

  React.useEffect(() => {
    if (mounted) localStorage.setItem(storageKey, theme);
  }, [mounted, theme, storageKey]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ScopedThemeCtx.Provider value={{ theme, setTheme, toggle }}>
      <div className={cn(scopeClass, theme === "dark" && "dark")}>
        {/* ensures tokens apply to the subtree */}
        <div className="min-h-screen bg-background text-foreground">{children}</div>
      </div>
    </ScopedThemeCtx.Provider>
  );
}
