import { NextResponse } from "next/server";
import {
  createAdminSessionToken,
  getAdminCredentials,
  getAdminSessionCookieOptions,
  COOKIE_NAME,
} from "../../../../lib/admin-auth.js";

export async function POST(request) {
  try {
    const { username = "", password = "" } = await request.json();
    const credentials = getAdminCredentials();

    if (!credentials.username || !credentials.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin credentials are not configured.",
        },
        { status: 500 },
      );
    }

    const normalizedUsername = String(username).trim();
    const normalizedPassword = String(password).trim();

    if (
      normalizedUsername !== credentials.username ||
      normalizedPassword !== credentials.password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password.",
        },
        { status: 401 },
      );
    }

    const token = createAdminSessionToken(credentials.username, credentials.password);

    const response = NextResponse.json({
      success: true,
      message: "Signed in successfully.",
    });

    response.cookies.set(COOKIE_NAME, token, getAdminSessionCookieOptions());

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to sign in.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
