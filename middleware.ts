import { NextRequest, NextResponse } from "next/server";

const VISITED_COOKIE = "portfolio-visited";

export function middleware(request: NextRequest) {
  if (request.cookies.has(VISITED_COOKIE)) {
    return NextResponse.next();
  }

  const isHomePage = request.nextUrl.pathname === "/";
  const response = isHomePage
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/", request.url));

  response.cookies.set(VISITED_COOKIE, "1", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });

  return response;
}

export const config = {
  matcher: [
    "/",
    "/projects/:path*",
    "/contact",
    "/experience",
    "/skills",
    "/certificates",
  ],
};
