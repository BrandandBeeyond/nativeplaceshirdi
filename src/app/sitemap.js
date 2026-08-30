export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thenativeplaceshirdi.com";
  const now = new Date();

  const routes = [
    "/",
    "/villas",
    "/cottages",
    "/contact",
    "/about-us",
    "/blogs",
    "/policies",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
