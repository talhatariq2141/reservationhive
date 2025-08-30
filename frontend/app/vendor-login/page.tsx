import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { ScopedThemeProvider } from "@/components/scoped-theme"
import Image from "next/image"

export default function VendorLoginPage() {
  return (
     <ScopedThemeProvider scopeClass="vendor-scope" storageKey="vendor-theme" defaultTheme="dark">
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
          <div className="flex w-full max-w-sm flex-col gap-6">
            <a href="#" className="flex items-center gap-2 self-center font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
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
                                    
              </div>
              ReservationHive
            </a>
            <LoginForm role="vendor" />
          </div>
        </div>
        </ScopedThemeProvider>
  )
}
