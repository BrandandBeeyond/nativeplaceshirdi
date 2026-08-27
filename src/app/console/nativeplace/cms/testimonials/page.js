import ConsoleShell from "../../ConsoleShell.jsx";
import { requireAdminSession } from "../../auth.js";
import dbConnect from "@/app/lib/dbConnect.js";
import { Testimonial } from "@/app/lib/models/index.js";
import { normalizeTestimonialRecord } from "@/app/lib/testimonial-utils.js";
import TestimonialsEditor from "../components/TestimonialsEditor.jsx";

export const metadata = {
  title: "CMS Testimonials | The Native Place",
  description: "Create and manage live guest testimonials.",
};

async function getTestimonialsData() {
  try {
    await dbConnect();
    const testimonialDocs = await Testimonial.find({}).sort({ updatedAt: -1, createdAt: -1 }).lean();

    return {
      testimonials: testimonialDocs.map((testimonial) => normalizeTestimonialRecord(testimonial)),
      warning: "",
    };
  } catch (error) {
    return {
      testimonials: [],
      warning: "Testimonials database is not available. Showing an empty editor state.",
    };
  }
}

export default async function CmsTestimonialsPage() {
  await requireAdminSession("/console/nativeplace/cms/testimonials");
  const { testimonials, warning } = await getTestimonialsData();

  return (
    <ConsoleShell
      pageTitle="CMS Testimonials"
      pageDescription="Create, edit and publish guest testimonials from one place."
    >
      <TestimonialsEditor initialTestimonials={testimonials} sourceWarning={warning} />
    </ConsoleShell>
  );
}
