import ConsoleShell from "../../ConsoleShell.jsx";
import { requireAdminSession } from "../../auth.js";
import dbConnect from "@/app/lib/dbConnect.js";
import { Blog } from "@/app/lib/models/index.js";
import BlogPostEditor from "../components/BlogPostEditor.jsx";
import { normalizeBlogRecord } from "@/app/lib/blog-utils.js";

export const metadata = {
  title: "CMS Blogs | The Native Place",
  description: "Create, edit and publish blog posts with SEO fields and rich content.",
};

async function getBlogData() {
  try {
    await dbConnect();
    const blogDocs = await Blog.find({}).sort({ updatedAt: -1, createdAt: -1 }).lean();

    return {
      blogs: blogDocs.map((blog) => normalizeBlogRecord(blog)),
      warning: "",
    };
  } catch (error) {
    return {
      blogs: [],
      warning:
        "MongoDB is unavailable or authentication failed, so the blog editor is showing an empty workspace for now.",
      error: error?.message || "Unable to load blog data.",
    };
  }
}

export default async function CmsBlogsPage() {
  await requireAdminSession("/console/nativeplace/cms/blogs");
  const { blogs, warning } = await getBlogData();

  return (
    <ConsoleShell
      pageTitle="CMS Blogs"
      pageDescription="Create, edit, upload thumbnails and publish live blog posts from one place."
    >
      <BlogPostEditor initialBlogs={blogs} sourceWarning={warning} />
    </ConsoleShell>
  );
}
