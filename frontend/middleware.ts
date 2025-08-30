// middleware.ts
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = request.nextUrl

  // Already-authenticated users shouldn't see login pages:
  if (pathname === "/admin-login" && token?.role === "admin") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }
  if (pathname === "/vendor-login" && token?.role === "vendor") {
    return NextResponse.redirect(new URL("/vendor", request.url))
  }

  // Protect admin area
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      const url = new URL("/admin-login", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }
  }

  // Protect vendor area
  if (pathname.startsWith("/vendor")) {
    if (!token || token.role !== "vendor") {
      const url = new URL("/vendor-login", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Include login routes too so we can redirect logged-in users away
export const config = {
  matcher: ["/admin/:path*", "/vendor/:path*", "/admin-login", "/vendor-login"],
}
