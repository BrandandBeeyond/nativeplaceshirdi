import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    source: { type: String, default: "website" },
    status: {
      type: String,
      enum: ["new", "qualified", "follow_up", "converted", "closed"],
      default: "new",
    },
    notes: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export default Lead;
