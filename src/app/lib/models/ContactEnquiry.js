import mongoose from "mongoose";

const contactEnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    subject: {
      type: String,
      required: true,
      enum: ["Booking", "Need info"],
    },
    enquiryType: {
      type: String,
      required: true,
      enum: ["URGENT", "REGULAR"],
    },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "read", "replied", "closed"],
      default: "new",
    },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

const ContactEnquiry =
  mongoose.models.ContactEnquiry || mongoose.model("ContactEnquiry", contactEnquirySchema);

export default ContactEnquiry;
