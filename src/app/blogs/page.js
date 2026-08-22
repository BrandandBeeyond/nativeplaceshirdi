import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Sparkles, Tag } from "lucide-react";

const featuredBlog = {
  title: "Why a nature resort stay feels better than a city weekend",
  excerpt:
    "If you’re planning a reset, a quieter setting can do more than a packed itinerary. Fresh air, open spaces and slower mornings create the kind of break people actually remember.",
  image: "/images/banners/banner2.jpeg",
  category: "Resort Experience",
  date: "22 Aug 2026",
  readTime: "5 min read",
  author: "Team Native Place",
  href: "#",
};

const blogs = [
  {
    title: "How to plan a relaxing family getaway near Shirdi",
    excerpt:
      "A short checklist to help families choose the right stay, balance comfort and keep the trip stress-free.",
    image: "/images/villas/villa1.jpeg",
    category: "Travel Tips",
    date: "20 Aug 2026",
    readTime: "4 min read",
  },
  {
    title: "Best ways to enjoy a peaceful cottage vacation",
    excerpt:
      "Small details like sit-outs, open lawns and slow mornings can make a cottage stay feel special.",
    image: "/images/cottages/cottage1.jpeg",
    category: "Stay Guide",
    date: "18 Aug 2026",
    readTime: "6 min read",
  },
  {
    title: "What makes a resort perfect for celebrations",
    excerpt:
      "From birthdays to intimate gatherings, the right ambience can make any celebration feel effortless.",
    image: "/images/amenities/pool2.jpeg",
    category: "Celebrations",
    date: "15 Aug 2026",
    readTime: "4 min read",
  },
  {
    title: "Simple weekend routines for a true digital detox",
    excerpt:
      "A slower stay works best when you let go of the screen and focus on the surroundings around you.",
    image: "/images/common/IMG_9118.JPG.jpeg",
    category: "Wellness",
    date: "12 Aug 2026",
    readTime: "3 min read",
  },
];

function BlogMeta({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#d9dcc9] bg-[#fbf8ef] px-3 py-1 text-xs font-medium text-[#53604b]">
      <Icon className="h-3.5 w-3.5 text-[#6b8444]" />
      {label}
    </span>
  );
}

function BlogCard({ blog, featured = false }) {
  return (
    <article
      className={`overflow-hidden rounded-[28px] border border-[#e7dfcb] bg-white shadow-[0_14px_40px_rgba(23,41,27,0.08)] ${
        featured ? "lg:grid lg:grid-cols-2" : ""
      }`}
    >
      <div className={`relative ${featured ? "min-h-[340px] lg:min-h-[520px]" : "aspect-[16/10]"}`}>
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
          className="object-cover"
          priority={featured}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="absolute left-5 top-5">
          <BlogMeta icon={Tag} label={blog.category} />
        </div>
      </div>

      <div className={`flex items-center ${featured ? "p-6 sm:p-8 lg:p-12" : "p-6"}`}>
        <div className="w-full">
          <div className="flex flex-wrap items-center gap-3">
            <BlogMeta icon={CalendarDays} label={blog.date} />
            <BlogMeta icon={Clock3} label={blog.readTime} />
          </div>

          <h2
            className={`mt-5 font-heading leading-[0.95] text-[#20342b] ${
              featured ? "text-[clamp(2.2rem,4vw,4.1rem)]" : "text-[clamp(1.65rem,2.5vw,2.2rem)]"
            }`}
          >
            {blog.title}
          </h2>

          <p
            className={`mt-5 text-[#566155] ${
              featured ? "max-w-2xl text-[1.05rem] leading-8" : "text-sm leading-7"
            }`}
          >
            {blog.excerpt}
          </p>

          {featured ? (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-[#6b8444]">
                By {blog.author}
              </span>
              <Link
                href={blog.href}
                className="inline-flex items-center gap-2 rounded-full bg-[#07552F] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#4f6f1d]"
              >
                Read full story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <Link
              href="#"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#07552F] transition-colors duration-300 hover:text-[#4f6f1d]"
            >
              Read more
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export const metadata = {
  title: "Blogs | The Native Place Shirdi",
  description: "Read the latest travel stories, resort tips and stay ideas from The Native Place.",
};

export default function BlogsPage() {
  return (
    <main className="bg-[#fbf8ef]">
      <section className="relative overflow-hidden border-b border-[#e7dfcb] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_40%),linear-gradient(180deg,#fcfbf5_0%,#fbf8ef_100%)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d8dcc9] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#6b8444] shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Blogs
            </span>
            <h1 className="mt-5 font-heading text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.92] text-[#20342b]">
              Stories, tips and stay inspiration
            </h1>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-[#5c6258]">
              Explore simple ideas, resort stories and travel inspiration designed for
              peaceful getaways, memorable family stays and slower weekends.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
                Latest blog
              </p>
              <h2 className="mt-2 font-heading text-[clamp(2rem,3vw,3.25rem)] text-[#20342b]">
                Featured post
              </h2>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-[#d9dcc9] bg-white px-4 py-2 text-sm text-[#566155] shadow-sm md:flex">
              <Tag className="h-4 w-4 text-[#6b8444]" />
              Recent story at top
            </div>
          </div>

          <BlogCard blog={featuredBlog} featured />

          <div className="mt-14 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
                More reads
              </p>
              <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.5vw,2.8rem)] text-[#20342b]">
                More stories to explore
              </h3>
            </div>
            <Link
              href="/contact"
              className="hidden rounded-full border border-[#07552F] px-5 py-3 text-sm font-semibold text-[#07552F] transition-colors duration-300 hover:bg-[#07552F] hover:text-white sm:inline-flex"
            >
              Plan a stay
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {blogs.map((blog) => (
              <BlogCard key={blog.title} blog={blog} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
