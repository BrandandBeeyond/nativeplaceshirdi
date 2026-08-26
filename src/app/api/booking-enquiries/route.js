import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect.js";
import { BookingEnquiry } from "@/app/lib/models/index.js";

const clean = (value) => String(value || "").trim();
const today = (() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
})();

export async function POST(request) {
  try {
    const payload = await request.json();
    const firstName = clean(payload?.firstName);
    const lastName = clean(payload?.lastName);
    const phone = clean(payload?.phone);
    const email = clean(payload?.email);
    const checkIn = clean(payload?.checkIn);
    const checkOut = clean(payload?.checkOut);
    const message = clean(payload?.message);

    if (!firstName || !lastName || !phone || !email || !checkIn || !checkOut) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    if (checkIn < today || checkOut < today) {
      return NextResponse.json(
        {
          success: false,
          message: "Check-in and check-out dates must be today or a future date.",
        },
        { status: 400 },
      );
    }

    if (checkOut <= checkIn) {
      return NextResponse.json(
        {
          success: false,
          message: "Check-out date must be after the check-in date.",
        },
        { status: 400 },
      );
    }

    await dbConnect();

    const enquiry = await BookingEnquiry.create({
      firstName,
      lastName,
      phone,
      email,
      checkIn,
      checkOut,
      message,
      source: "website",
      status: "new",
    });

    return NextResponse.json({
      success: true,
      message: "Booking enquiry submitted successfully.",
      enquiry: enquiry.toObject(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit booking enquiry.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
