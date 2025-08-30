"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"       // puts/removes 'dark' on <html>
      defaultTheme="system"
      enableSystem
      storageKey="admin-theme" // optional, keeps admin preference separate
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}











// "use client"

// import * as React from "react"
// import { ThemeProvider as NextThemesProvider } from "next-themes"

// export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }