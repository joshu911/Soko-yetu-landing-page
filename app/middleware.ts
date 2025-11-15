import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = {
  "/farmer": "farmer",
  "/vendor": "vendor",
  "/logistics": "logistics",
  "/admin": "admin",
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if route is protected
  for (const [route, role] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      // In a real app, check JWT token and role
      // For now, we'll allow all access (enforced via client-side routing)
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/farmer/:path*", "/vendor/:path*", "/logistics/:path*", "/admin/:path*"],
}
