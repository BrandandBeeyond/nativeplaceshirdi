import mongoose from "mongoose";

const bookingEnquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    message: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["new", "pending", "confirmed", "cancelled", "closed"],
      default: "new",
    },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

const BookingEnquiry =
  mongoose.models.BookingEnquiry || mongoose.model("BookingEnquiry", bookingEnquirySchema);

export default BookingEnquiry;
