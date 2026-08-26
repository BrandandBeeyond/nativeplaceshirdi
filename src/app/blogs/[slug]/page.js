import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, Sparkles, Tag } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import dbConnect from "../../lib/dbConnect.js";
import { Blog } from "../../lib/models/index.js";
import {
  fallbackBlogPosts,
  formatBlogDate,
  normalizeBlogRecord,
} from "../../lib/blog-utils.js";

export const dynamic = "force-dynamic";

async function getBlogBySlug(slug) {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug, isPublished: true }).lean();

    if (blog) {
      return normalizeBlogRecord(blog);
    }
  } catch (_error) {
    // Fall back to sample content below.
  }

  return fallbackBlogPosts.find((post) => post.slug === slug) || null;
}

export async function generateMetadata({ params }) {
  const blog = await getBlogBySlug(params.slug);

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
  const blog = await getBlogBySlug(params.slug);

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

          <div className="relative mx-auto flex min-h-[320px] max-w-[1400px] items-center px-4 py-16 sm:min-h-[380px] sm:px-6 sm:py-20 lg:min-h-[420px] lg:px-8 lg:py-24">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#e8f2d0] backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Blog Post
              </span>

              <h1 className="mt-5 font-heading text-[clamp(2.7rem,5vw,5.5rem)] leading-[0.92] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.26)]">
                {blog.title || blog.name}
              </h1>

              <div className="mt-6 flex flex-wrap gap-3">
                <InfoPill icon={CalendarDays} label={blog.publishedAt ? formatBlogDate(blog.publishedAt) : "Published"} />
                <InfoPill icon={Tag} label={blog.keywords?.[0] || "Insights"} />
                <InfoPill icon={Clock3} label="Read at your pace" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1140px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <article className="overflow-hidden rounded-[30px] border border-[#e7e2d3] bg-white shadow-[0_16px_45px_rgba(36,48,38,0.08)]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[300px] lg:min-h-full">
                <Image
                  src={blog.thumbnail || "/images/banners/banner2.jpeg"}
                  alt={blog.name || blog.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
                  SEO Description
                </p>
                <p className="mt-4 text-[16px] leading-8 text-[#566155]">
                  {blog.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {blog.keywords?.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-[#d9dcc9] bg-[#fbf8ef] px-3 py-1 text-xs font-medium text-[#53604b]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <div
                  className="prose prose-lg mt-8 max-w-none prose-headings:font-heading prose-headings:text-[#18352a] prose-p:text-[#566155] prose-li:text-[#566155]"
                  dangerouslySetInnerHTML={{ __html: blog.content || "<p></p>" }}
                />
              </div>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
