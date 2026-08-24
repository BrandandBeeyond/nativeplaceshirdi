import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/app/lib/dbConnect.js";
import { Page } from "@/app/lib/models/index.js";
import { isAdminAuthenticatedFromCookies } from "@/app/lib/admin-auth.js";
import { defaultAboutContent, normalizeAboutContent } from "@/app/console/nativeplace/cms/utils.js";

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
    const section = String(payload?.section || "").trim();
    const data = payload?.data || {};

    if (!["story", "vision", "mission"].includes(section)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid about section.",
        },
        { status: 400 },
      );
    }

    await dbConnect();

    const existingPage = await Page.findOne({ slug: "about" }).lean();
    const normalizedContent = normalizeAboutContent(existingPage?.content || defaultAboutContent);
    normalizedContent[section] = {
      ...normalizedContent[section],
      ...data,
    };

    const page = await Page.findOneAndUpdate(
      { slug: "about" },
      {
        $set: {
          slug: "about",
          title: "About Us",
          content: normalizedContent,
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
      message: "About content saved.",
      content: page?.content || normalizedContent,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save about content.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
