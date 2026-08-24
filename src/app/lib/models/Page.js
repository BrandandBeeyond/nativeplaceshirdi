import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    metaTitle: { type: String, default: "", trim: true },
    metaDescription: { type: String, default: "", trim: true },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Page = mongoose.models.Page || mongoose.model("Page", pageSchema);

export default Page;
