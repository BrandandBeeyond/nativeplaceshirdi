import { NextResponse } from "next/server";
import { COOKIE_NAME } from "../../../../lib/admin-auth.js";

export async function GET(request) {
  const response = NextResponse.redirect(new URL("/console/nativeplace/login", request.url));

  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

export async function POST(request) {
  return GET(request);
}
