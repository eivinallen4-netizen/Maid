import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("pb_session");

  // Protected routes — require auth
  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/stats") ||
    pathname.startsWith("/rep");

  if (isProtected && !sessionToken) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Authenticated users should skip the public pages
  if ((pathname === "/" || pathname === "/signin") && sessionToken) {
    return NextResponse.redirect(new URL("/rep", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/stats/:path*", "/rep", "/rep/:path*", "/signin", "/"],
};
