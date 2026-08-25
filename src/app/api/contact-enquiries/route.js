import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect.js";
import { ContactEnquiry } from "@/app/lib/models/index.js";

const clean = (value) => String(value || "").trim();

export async function POST(request) {
  try {
    const payload = await request.json();
    const name = clean(payload?.name);
    const contact = clean(payload?.contact);
    const subject = clean(payload?.subject);
    const enquiryType = clean(payload?.enquiryType);
    const message = clean(payload?.message);

    if (!name || !contact || !subject || !enquiryType || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    await dbConnect();

    const enquiry = await ContactEnquiry.create({
      name,
      contact,
      subject,
      enquiryType,
      message,
      source: "website",
      status: "new",
    });

    return NextResponse.json({
      success: true,
      message: "Contact enquiry submitted successfully.",
      enquiry: enquiry.toObject(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit contact enquiry.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
