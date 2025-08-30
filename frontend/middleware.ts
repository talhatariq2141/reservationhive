import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Protect admin area (except its login page)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin-login")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/admin-login", request.url))
    }
  }

  // Protect vendor area (except its login page)
  if (pathname.startsWith("/vendor") && !pathname.startsWith("/vendor-login")) {
    if (!token || token.role !== "vendor") {
      return NextResponse.redirect(new URL("/vendor-login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/vendor/:path*"],
}
