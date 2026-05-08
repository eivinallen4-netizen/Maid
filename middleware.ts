import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only protect /admin and /account routes
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/account")) {
    return NextResponse.next();
  }

  // Check if session cookie exists
  const sessionToken = request.cookies.get("pb_session");

  if (!sessionToken) {
    // Redirect to login with return URL
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
