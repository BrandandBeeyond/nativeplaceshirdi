const defaultStayContent = {
  villas: {
    bannerImage: "/images/banners/banner1.jpeg",
    heroImages: [
      "/images/villas/villa1.jpeg",
      "/images/villas/villa2.WEBP",
      "/images/common/IMG_9118.JPG.jpeg",
      "/images/common/IMG_9115.JPG.jpeg",
      "/images/common/IMG_9116.JPG.jpeg",
    ],
    introImage: "/images/common/IMG_9118.JPG.jpeg",
    galleryImages: [
      "/images/common/IMG_9115.JPG.jpeg",
      "/images/common/IMG_9116.JPG.jpeg",
      "/images/common/IMG_0074.JPG.jpeg",
      "/images/common/IMG_0073.JPG.jpeg",
    ],
  },
  cottages: {
    bannerImage: "/images/banners/banner2.jpeg",
    heroImages: [
      "/images/cottages/cottage1.jpeg",
      "/images/cottages/ambience.WEBP",
      "/images/cottages/IMG_0085.WEBP",
      "/images/cottages/IMG_0083.WEBP",
      "/images/cottages/IMG_0081.WEBP",
    ],
    introImage: "/images/cottages/ambience.WEBP",
    galleryImages: [
      "/images/cottages/IMG_0084.JPG.jpeg",
      "/images/cottages/IMG_0082.JPG.jpeg",
      "/images/cottages/IMG_0076.JPG.jpeg",
      "/images/cottages/ambience.WEBP",
    ],
  },
};

const cleanImageList = (value, fallback = []) => {
  const source = Array.isArray(value) ? value : [];
  const cleaned = source.map((item) => String(item || "").trim()).filter(Boolean);

  return cleaned.length ? cleaned : fallback;
};

export const normalizeStayContent = (slug, content = {}) => {
  const defaults = defaultStayContent[slug] || defaultStayContent.villas;

  return {
    bannerImage:
      String(content?.bannerImage || "").trim() || defaults.bannerImage || "",
    heroImages: cleanImageList(content?.heroImages, defaults.heroImages || []),
    introImage:
      String(content?.introImage || "").trim() || defaults.introImage || "",
    galleryImages: cleanImageList(content?.galleryImages, defaults.galleryImages || []),
  };
};

export const getDefaultStayContent = (slug) => normalizeStayContent(slug, defaultStayContent[slug]);

export const staySlugs = ["villas", "cottages"];
