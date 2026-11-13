import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isClientNavigation =
    request.headers.has("rsc") ||
    request.headers.has("next-router-state-tree");
  const pathname = request.nextUrl.pathname.replace(/\/+$/, "");

  if (pathname === "/projects" && !isClientNavigation) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/projects/:path*"],
};
