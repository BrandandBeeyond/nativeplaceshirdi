import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect.js";
import { Testimonial } from "@/app/lib/models/index.js";
import { normalizeTestimonialRecord } from "@/app/lib/testimonial-utils.js";

export async function GET() {
  try {
    await dbConnect();

    const testimonials = await Testimonial.find({ isPublished: true })
      .sort({ createdAt: -1, updatedAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      testimonials: testimonials.map((testimonial) => normalizeTestimonialRecord(testimonial)),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to load testimonials.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

