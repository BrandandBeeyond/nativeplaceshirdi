import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect.js";
import { Lead } from "@/app/lib/models/index.js";

const clean = (value) => String(value || "").trim();

const digitsOnly = (value) => clean(value).replace(/\D/g, "");

export async function POST(request) {
  try {
    const payload = await request.json();
    const phone = digitsOnly(payload?.phone);
    const notes = clean(payload?.notes);

    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Enter mobile number." },
        { status: 400 },
      );
    }

    if (phone.length !== 10) {
      return NextResponse.json(
        { success: false, message: "Enter 10 digit mobile number." },
        { status: 400 },
      );
    }

    await dbConnect();

    const lead = await Lead.create({
      name: clean(payload?.name) || "WhatsApp Lead",
      phone,
      email: clean(payload?.email),
      source: clean(payload?.source) || "whatsapp",
      status: "new",
      notes,
    });

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully.",
      lead: lead.toObject(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save lead.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
