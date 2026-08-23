import { NextResponse } from "next/server";
import { COOKIE_NAME } from "./src/app/lib/admin-auth.js";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/console/nativeplace")) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(COOKIE_NAME)?.value);
  const isLoginRoute = pathname === "/console/nativeplace/login";

  if (hasSession && isLoginRoute) {
    return NextResponse.redirect(new URL("/console/nativeplace", request.url));
  }

  if (!hasSession && !isLoginRoute) {
    const loginUrl = new URL("/console/nativeplace/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/console/nativeplace/:path*"],
};
