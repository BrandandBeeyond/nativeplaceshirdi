import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, Sparkles, Tag } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import dbConnect from "../../lib/dbConnect.js";
import { Blog } from "../../lib/models/index.js";
import {
  fallbackBlogPosts,
  normalizeBlogRecord,
  slugifyBlog,
} from "../../lib/blog-utils.js";

export const dynamic = "force-dynamic";

async function resolveSlug(params) {
  const resolvedParams = await params;

  return String(resolvedParams?.slug || "").trim();
}

async function getBlogBySlug(slug) {
  const normalizedSlug = slugifyBlog(slug);

  try {
    await dbConnect();
    const blogs = await Blog.find({ isPublished: true }).lean();
    const matchedBlog = blogs
      .map((blog) => normalizeBlogRecord(blog))
      .find((blog) => blog.slug === normalizedSlug);

    if (matchedBlog) {
      return matchedBlog;
    }
  } catch (_error) {
    // Fall back to sample content below.
  }

  return (
    fallbackBlogPosts.map((post) => normalizeBlogRecord(post)).find((post) => post.slug === normalizedSlug) ||
    null
  );
}

export async function generateMetadata({ params }) {
  const blog = await getBlogBySlug(await resolveSlug(params));

  if (!blog) {
    return {
      title: "Blog not found | The Native Place Shirdi",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${blog.title || blog.name} | The Native Place Shirdi`,
    description: blog.description,
    keywords: blog.keywords?.join(", "),
    openGraph: {
      title: blog.title || blog.name,
      description: blog.description,
      images: blog.thumbnail ? [blog.thumbnail] : [],
    },
  };
}

function InfoPill({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#d9dcc9] bg-[#fbf8ef] px-3 py-1 text-xs font-medium text-[#53604b]">
      <Icon className="h-3.5 w-3.5 text-[#6b8444]" />
      {label}
    </span>
  );
}

export default async function BlogDetailPage({ params }) {
  const blog = await getBlogBySlug(await resolveSlug(params));

  if (!blog) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#fbf8ef]">
        <section className="relative overflow-hidden border-b border-[#e7dfcb] bg-[#0f2418]">
          <div className="absolute inset-0">
            <Image
              src={blog.thumbnail || "/images/banners/banner2.jpeg"}
              alt={blog.name || blog.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,12,0.82)_0%,rgba(7,20,12,0.42)_48%,rgba(7,20,12,0.18)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,220,79,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_26%)]" />
          </div>

          <div className="relative mx-auto flex min-h-[420px] max-w-[1400px] items-end px-4 py-14 sm:min-h-[500px] sm:px-6 sm:py-16 lg:min-h-[620px] lg:px-8 lg:py-20">
            <div className="max-w-4xl pb-4 sm:pb-6 lg:pb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#e8f2d0] backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Blog Post
              </span>

              <h1 className="mt-5 font-heading text-[clamp(2.7rem,5vw,5.5rem)] leading-[0.92] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.26)]">
                {blog.title || blog.name}
              </h1>

              <div className="mt-6 flex flex-wrap gap-3">
                <InfoPill icon={CalendarDays} label="Read at your pace" />
                <InfoPill icon={Clock3} label="Resort story" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1024px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <article className="overflow-hidden rounded-[30px] border border-[#e7e2d3] bg-white shadow-[0_16px_45px_rgba(36,48,38,0.08)]">
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="mb-8 border-b border-[#ece4d2] pb-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
                  {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }) : "Latest Story"}
                </p>
                <h2 className="mt-3 font-heading text-[clamp(1.8rem,3vw,3.1rem)] leading-[1.08] text-[#18352a]">
                  {blog.title || blog.name}
                </h2>
              </div>

              <div
                className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-[#18352a] prose-headings:leading-tight prose-p:text-[#44524a] prose-p:leading-8 prose-li:text-[#44524a] prose-a:text-[#07552F] prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: blog.content || "<p></p>" }}
              />
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
