import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    personName: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;

