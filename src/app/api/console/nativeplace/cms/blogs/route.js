import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/app/lib/dbConnect.js";
import { Blog } from "@/app/lib/models/index.js";
import {
  hasVisibleHtml,
  normalizeBlogRecord,
  slugifyBlog,
  splitKeywords,
} from "@/app/lib/blog-utils.js";
import { isAdminAuthenticatedFromCookies } from "@/app/lib/admin-auth.js";

async function assertAdmin() {
  const cookieStore = await cookies();

  if (!isAdminAuthenticatedFromCookies(cookieStore)) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  return null;
}

const clean = (value) => String(value || "").trim();

const buildUniqueSlug = async (baseSlug, excludeId = "") => {
  const root = slugifyBlog(baseSlug) || `blog-${Date.now()}`;
  let candidate = root;
  let counter = 1;

  while (
    await Blog.findOne({
      slug: candidate,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    }).lean()
  ) {
    candidate = `${root}-${counter}`;
    counter += 1;
  }

  return candidate;
};

const normalizePayload = async (payload, existingBlog = null) => {
  const name = clean(payload?.name);
  const title = clean(payload?.title);
  const description = clean(payload?.description);
  const content = clean(payload?.content);
  const thumbnail = clean(payload?.thumbnail);
  const isPublished = Boolean(payload?.isPublished);
  const keywords = splitKeywords(payload?.keywords);

  if (!name || !title || !description || !content || !thumbnail) {
    return {
      error: "Please fill in blog name, title, keywords, description, thumbnail and content.",
    };
  }

  if (!keywords.length) {
    return { error: "Please add at least one keyword." };
  }

  if (!hasVisibleHtml(content)) {
    return { error: "Blog content cannot be empty." };
  }

  const slug =
    existingBlog?.slug || (await buildUniqueSlug(name || title, existingBlog?._id?.toString()));
  const publishedAt = isPublished
    ? existingBlog?.publishedAt || new Date()
    : existingBlog?.isPublished
      ? null
      : existingBlog?.publishedAt || null;

  return {
    value: {
      name,
      title,
      slug,
      keywords,
      description,
      content,
      thumbnail,
      excerpt: description,
      coverImage: thumbnail,
      tags: keywords,
      isPublished,
      publishedAt,
    },
  };
};

export async function GET() {
  const unauthorized = await assertAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ publishedAt: -1, updatedAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      blogs: blogs.map((blog) => normalizeBlogRecord(blog)),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to load blogs.",
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
    await dbConnect();
    const payload = await request.json();
    const normalized = await normalizePayload(payload);

    if (normalized.error) {
      return NextResponse.json({ success: false, message: normalized.error }, { status: 400 });
    }

    const blog = await Blog.create(normalized.value);

    return NextResponse.json({
      success: true,
      message: normalized.value.isPublished
        ? "Blog published successfully."
        : "Blog draft saved successfully.",
      blog: normalizeBlogRecord(blog.toObject()),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save blog.",
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
    await dbConnect();
    const payload = await request.json();
    const blogId = clean(payload?.blogId);

    if (!blogId) {
      return NextResponse.json({ success: false, message: "Blog ID is required." }, { status: 400 });
    }

    const existingBlog = await Blog.findById(blogId);

    if (!existingBlog) {
      return NextResponse.json({ success: false, message: "Blog not found." }, { status: 404 });
    }

    const normalized = await normalizePayload(payload, existingBlog);

    if (normalized.error) {
      return NextResponse.json({ success: false, message: normalized.error }, { status: 400 });
    }

    const blog = await Blog.findByIdAndUpdate(blogId, normalized.value, { new: true });

    return NextResponse.json({
      success: true,
      message: normalized.value.isPublished
        ? "Blog updated and published successfully."
        : "Blog updated successfully.",
      blog: normalizeBlogRecord(blog.toObject()),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update blog.",
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
    await dbConnect();
    const payload = await request.json();
    const blogId = clean(payload?.blogId);

    if (!blogId) {
      return NextResponse.json({ success: false, message: "Blog ID is required." }, { status: 400 });
    }

    const blog = await Blog.findByIdAndDelete(blogId);

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete blog.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
