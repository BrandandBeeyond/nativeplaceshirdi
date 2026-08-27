export const fallbackBlogPosts = [
  {
    name: "Why a nature resort stay feels better than a city weekend",
    title: "Why a nature resort stay feels better than a city weekend",
    slug: "why-a-nature-resort-stay-feels-better-than-a-city-weekend",
    description:
      "If you are planning a reset, a quieter setting can do more than a packed itinerary. Fresh air, open spaces and slower mornings create the kind of break people actually remember.",
    keywords: ["resort experience", "nature stay", "weekend getaway"],
    thumbnail: "/images/banners/banner2.jpeg",
    content:
      "<p>If you are planning a reset, a quieter setting can do more than a packed itinerary. Fresh air, open spaces and slower mornings create the kind of break people actually remember.</p><p>Nature stays help guests slow down, reconnect and enjoy time away from noise and screens.</p>",
    isPublished: true,
    publishedAt: "2026-08-22T00:00:00.000Z",
  },
  {
    name: "How to plan a relaxing family getaway near Shirdi",
    title: "How to plan a relaxing family getaway near Shirdi",
    slug: "how-to-plan-a-relaxing-family-getaway-near-shirdi",
    description:
      "A short checklist to help families choose the right stay, balance comfort and keep the trip stress-free.",
    keywords: ["travel tips", "family getaway", "Shirdi stay"],
    thumbnail: "/images/villas/villa1.jpeg",
    content:
      "<p>A short checklist to help families choose the right stay, balance comfort and keep the trip stress-free.</p><p>Choose a property with enough space, easy access and calm surroundings for every age group.</p>",
    isPublished: true,
    publishedAt: "2026-08-20T00:00:00.000Z",
  },
  {
    name: "Best ways to enjoy a peaceful cottage vacation",
    title: "Best ways to enjoy a peaceful cottage vacation",
    slug: "best-ways-to-enjoy-a-peaceful-cottage-vacation",
    description:
      "Small details like sit-outs, open lawns and slow mornings can make a cottage stay feel special.",
    keywords: ["stay guide", "cottage vacation", "nature stay"],
    thumbnail: "/images/cottages/cottage1.jpeg",
    content:
      "<p>Small details like sit-outs, open lawns and slow mornings can make a cottage stay feel special.</p><p>Plan a stay that gives you enough time to enjoy the setting instead of rushing through it.</p>",
    isPublished: true,
    publishedAt: "2026-08-18T00:00:00.000Z",
  },
  {
    name: "What makes a resort perfect for celebrations",
    title: "What makes a resort perfect for celebrations",
    slug: "what-makes-a-resort-perfect-for-celebrations",
    description:
      "From birthdays to intimate gatherings, the right ambience can make any celebration feel effortless.",
    keywords: ["celebrations", "resort events", "family gatherings"],
    thumbnail: "/images/amenities/pool2.jpeg",
    content:
      "<p>From birthdays to intimate gatherings, the right ambience can make any celebration feel effortless.</p><p>A resort with privacy, space and helpful support creates better moments for hosts and guests alike.</p>",
    isPublished: true,
    publishedAt: "2026-08-15T00:00:00.000Z",
  },
];

export const slugifyBlog = (value = "") =>
  String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const splitKeywords = (value = []) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }

  return String(value || "")
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
};

export const joinKeywords = (keywords = []) => splitKeywords(keywords).join(", ");

export const hasVisibleHtml = (value = "") =>
  String(value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim().length > 0;

export const normalizeBlogRecord = (blog = {}) => {
  const name = String(blog?.name || blog?.blogName || blog?.title || "").trim();
  const title = String(blog?.title || name).trim();
  const description = String(blog?.description || blog?.excerpt || "").trim();
  const content = String(blog?.content || "").trim();
  const thumbnail = String(blog?.thumbnail || blog?.coverImage || "").trim();
  const slugSource = String(blog?.slug || "").trim() || name || title;

  return {
    _id: blog?._id ? String(blog._id) : "",
    name,
    title,
    slug: String(blog?.slug || slugifyBlog(slugSource)).trim(),
    keywords: splitKeywords(blog?.keywords || blog?.tags || blog?.metaKeywords),
    description,
    content,
    thumbnail,
    isPublished: Boolean(blog?.isPublished),
    publishedAt: blog?.publishedAt ? new Date(blog.publishedAt).toISOString() : "",
    createdAt: blog?.createdAt ? new Date(blog.createdAt).toISOString() : "",
    updatedAt: blog?.updatedAt ? new Date(blog.updatedAt).toISOString() : "",
  };
};

export const blogToFormState = (blog = {}) => ({
  _id: blog._id || "",
  name: blog.name || "",
  title: blog.title || "",
  keywords: joinKeywords(blog.keywords || []),
  description: blog.description || "",
  content: blog.content || "",
  thumbnail: blog.thumbnail || "",
  slug: blog.slug || "",
  isPublished: Boolean(blog.isPublished),
  publishedAt: blog.publishedAt || "",
});

export const createEmptyBlogForm = () => ({
  _id: "",
  name: "",
  title: "",
  keywords: "",
  description: "",
  content: "<p>Start writing your resort blog content here...</p>",
  thumbnail: "",
  slug: "",
  isPublished: false,
  publishedAt: "",
});

export const formatBlogDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
