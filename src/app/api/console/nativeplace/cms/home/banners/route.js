import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/app/lib/dbConnect.js";
import { Banner } from "@/app/lib/models/index.js";
import { isAdminAuthenticatedFromCookies } from "@/app/lib/admin-auth.js";

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
    const incomingBanners = Array.isArray(payload?.banners) ? payload.banners : [];
    const banners = incomingBanners
      .map((banner, index) => ({
        title: String(banner?.title || "").trim(),
        desktopImage: String(banner?.desktopImage || "").trim(),
        mobileImage: String(banner?.mobileImage || "").trim(),
        altText: String(banner?.altText || "").trim(),
        link: String(banner?.link || "").trim(),
        sortOrder: Number(banner?.sortOrder ?? index + 1),
        isActive: Boolean(banner?.isActive),
      }))
      .filter((banner) => banner.title && banner.desktopImage);

    if (!banners.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Add at least one valid banner before saving.",
        },
        { status: 400 },
      );
    }

    await dbConnect();
    await Banner.deleteMany({});
    const bannerDocs = await Banner.insertMany(banners, { ordered: true });

    return NextResponse.json({
      success: true,
      message: "Homepage banners saved.",
      banners: bannerDocs
        .map((banner) => banner.toObject())
        .sort((left, right) => left.sortOrder - right.sortOrder),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save homepage banners.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
