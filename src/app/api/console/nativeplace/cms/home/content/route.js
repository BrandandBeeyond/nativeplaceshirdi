import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/app/lib/dbConnect.js";
import { Page } from "@/app/lib/models/index.js";
import { isAdminAuthenticatedFromCookies } from "@/app/lib/admin-auth.js";
import { defaultHomeContent, normalizeHomeContent } from "@/app/console/nativeplace/cms/utils.js";

async function assertAdmin() {
  const cookieStore = await cookies();

  if (!isAdminAuthenticatedFromCookies(cookieStore)) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  return null;
}

export async function PATCH(request) {
  const unauthorized = await assertAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const payload = await request.json();
    const content = normalizeHomeContent(payload?.content || defaultHomeContent);

    await dbConnect();

    const page = await Page.findOneAndUpdate(
      { slug: "home" },
      {
        $set: {
          slug: "home",
          title: "Home Page",
          content,
          isPublished: true,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    ).lean();

    return NextResponse.json({
      success: true,
      message: "Homepage content saved.",
      content: page?.content || content,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save homepage content.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
