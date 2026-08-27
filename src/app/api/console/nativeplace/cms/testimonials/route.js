import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/app/lib/dbConnect.js";
import { Testimonial } from "@/app/lib/models/index.js";
import { isAdminAuthenticatedFromCookies } from "@/app/lib/admin-auth.js";
import {
  createEmptyTestimonialForm,
  normalizeTestimonialRecord,
  testimonialRecordToFormState,
} from "@/app/lib/testimonial-utils.js";

async function assertAdmin() {
  const cookieStore = await cookies();

  if (!isAdminAuthenticatedFromCookies(cookieStore)) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  return null;
}

const clean = (value) => String(value || "").trim();

const normalizePayload = (payload, existing = null) => {
  const personName = clean(payload?.personName);
  const city = clean(payload?.city);
  const content = clean(payload?.content);

  if (!personName || !city || !content) {
    return { error: "Please fill in person name, city and testimonial content." };
  }

  return {
    value: {
      personName,
      city,
      content,
      isPublished: Boolean(payload?.isPublished),
    },
    existing: existing ? testimonialRecordToFormState(normalizeTestimonialRecord(existing)) : createEmptyTestimonialForm(),
  };
};

export async function GET() {
  const unauthorized = await assertAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    await dbConnect();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1, updatedAt: -1 }).lean();

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

export async function POST(request) {
  const unauthorized = await assertAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const payload = await request.json();
    const normalized = normalizePayload(payload);

    if (normalized.error) {
      return NextResponse.json({ success: false, message: normalized.error }, { status: 400 });
    }

    await dbConnect();
    const testimonial = await Testimonial.create(normalized.value);

    return NextResponse.json({
      success: true,
      message: normalized.value.isPublished
        ? "Testimonial published successfully."
        : "Testimonial draft saved successfully.",
      testimonial: normalizeTestimonialRecord(testimonial.toObject()),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create testimonial.",
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
    const testimonialId = clean(payload?.testimonialId);

    if (!testimonialId) {
      return NextResponse.json({ success: false, message: "Testimonial ID is required." }, { status: 400 });
    }

    await dbConnect();
    const existing = await Testimonial.findById(testimonialId);

    if (!existing) {
      return NextResponse.json({ success: false, message: "Testimonial not found." }, { status: 404 });
    }

    const normalized = normalizePayload(payload, existing);

    if (normalized.error) {
      return NextResponse.json({ success: false, message: normalized.error }, { status: 400 });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(testimonialId, normalized.value, { new: true });

    return NextResponse.json({
      success: true,
      message: normalized.value.isPublished
        ? "Testimonial updated and published successfully."
        : "Testimonial updated successfully.",
      testimonial: normalizeTestimonialRecord(testimonial.toObject()),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update testimonial.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  const unauthorized = await assertAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const payload = await request.json();
    const testimonialId = clean(payload?.testimonialId);

    if (!testimonialId) {
      return NextResponse.json({ success: false, message: "Testimonial ID is required." }, { status: 400 });
    }

    await dbConnect();
    const testimonial = await Testimonial.findByIdAndDelete(testimonialId);

    if (!testimonial) {
      return NextResponse.json({ success: false, message: "Testimonial not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete testimonial.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
