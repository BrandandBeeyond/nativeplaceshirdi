import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/app/lib/dbConnect.js";
import { Page } from "@/app/lib/models/index.js";
import { isAdminAuthenticatedFromCookies } from "@/app/lib/admin-auth.js";
import { getDefaultStayContent, normalizeStayContent, staySlugs } from "@/app/lib/stay-content.js";

async function assertAdmin() {
  const cookieStore = await cookies();

  if (!isAdminAuthenticatedFromCookies(cookieStore)) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  return null;
}

const resolvePageTitle = (slug) => {
  if (slug === "cottages") {
    return "Cottages";
  }

  return "Villas";
};

export async function GET(request) {
  const slug = String(new URL(request.url).searchParams.get("slug") || "").trim();

  if (!staySlugs.includes(slug)) {
    return NextResponse.json({ success: false, message: "Invalid stay slug." }, { status: 400 });
  }

  try {
    await dbConnect();
    const page = await Page.findOne({ slug }).lean();

    return NextResponse.json({
      success: true,
      content: normalizeStayContent(slug, page?.content || getDefaultStayContent(slug)),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to load stay images.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request) {
  const unauthorized = await assertAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const payload = await request.json();
    const slug = String(payload?.slug || "").trim();

    if (!staySlugs.includes(slug)) {
      return NextResponse.json({ success: false, message: "Invalid stay slug." }, { status: 400 });
    }

    const normalizedContent = normalizeStayContent(slug, payload?.content || {});

    await dbConnect();

    const page = await Page.findOneAndUpdate(
      { slug },
      {
        $set: {
          slug,
          title: resolvePageTitle(slug),
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
      message: `${resolvePageTitle(slug)} images saved successfully.`,
      content: page?.content || normalizedContent,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save stay images.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
