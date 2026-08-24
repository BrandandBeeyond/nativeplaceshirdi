import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminAuthenticatedFromCookies } from "@/app/lib/admin-auth.js";

async function assertAdmin() {
  const cookieStore = await cookies();

  if (!isAdminAuthenticatedFromCookies(cookieStore)) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  return null;
}

const cloudinaryConfig = () => ({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  apiKey: process.env.CLOUDINARY_API_KEY || "",
  apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  folder: process.env.CLOUDINARY_HOME_BANNER_FOLDER || "nativeplace/home-banners",
});

export async function POST(request) {
  const unauthorized = await assertAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const { cloudName, apiKey, apiSecret, folder } = cloudinaryConfig();

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env.local.",
        },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload an image file.",
        },
        { status: 400 },
      );
    }

    if (!String(file.type || "").startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Only image uploads are allowed.",
        },
        { status: 400 },
      );
    }

    const uploadFolder = String(formData.get("folder") || folder).trim() || folder;
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signaturePayload = `folder=${uploadFolder}&timestamp=${timestamp}`;
    const signature = crypto
      .createHash("sha1")
      .update(`${signaturePayload}${apiSecret}`)
      .digest("hex");

    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("api_key", apiKey);
    uploadForm.append("timestamp", timestamp);
    uploadForm.append("folder", uploadFolder);
    uploadForm.append("signature", signature);

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: uploadForm,
      },
    );

    const payload = await cloudinaryResponse.json();

    if (!cloudinaryResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: payload?.error?.message || "Cloudinary upload failed.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully.",
      image: {
        url: payload.secure_url,
        publicId: payload.public_id,
        width: payload.width,
        height: payload.height,
        format: payload.format,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload image.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
