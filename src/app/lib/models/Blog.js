import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    keywords: [{ type: String, trim: true }],
    description: { type: String, default: "", trim: true },
    content: { type: String, default: "", trim: true },
    thumbnail: { type: String, default: "", trim: true },
    excerpt: { type: String, default: "", trim: true },
    coverImage: { type: String, default: "", trim: true },
    tags: [{ type: String, trim: true }],
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
