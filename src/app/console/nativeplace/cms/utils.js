export const defaultHomeBanners = [
  {
    title: "Wake Up to Quiet, Green Luxury",
    desktopImage: "/images/banners/banner1.jpeg",
    mobileImage: "",
    altText: "The Native Place banner one",
    link: "",
    sortOrder: 1,
    isActive: true,
  },
  {
    title: "A Calm Escape Surrounded by Nature",
    desktopImage: "/images/banners/banner2.jpeg",
    mobileImage: "",
    altText: "The Native Place banner two",
    link: "",
    sortOrder: 2,
    isActive: true,
  },
  {
    title: "Where Comfort Meets Open Skies",
    desktopImage: "/images/banners/banner3.jpeg",
    mobileImage: "",
    altText: "The Native Place banner three",
    link: "",
    sortOrder: 3,
    isActive: true,
  },
  {
    title: "Your Next Peaceful Getaway Awaits",
    desktopImage: "/images/banners/banner4.jpeg",
    mobileImage: "",
    altText: "The Native Place banner four",
    link: "",
    sortOrder: 4,
    isActive: true,
  },
];

export const defaultHomeContent = {
  eyebrow: "Welcome to The Native Place",
  title: "a Resort Near Shirdi",
  descriptionOne:
    "Tucked away in the calm surroundings of Shirdi, The Native Place is more than just a stay - it is an experience of nature, comfort, and mindful living. Surrounded by peaceful greenery, soft silence, and a restful atmosphere, our boutique resort offers the perfect escape for those seeking peace, connection, and rejuvenation.",
  descriptionTwo:
    "Whether you are here to unwind, explore, or simply be - every moment at The Native Place is designed to help you slow down and soak in the beauty of nature.",
};

export const defaultAboutContent = {
  story: {
    eyebrow: "About Us",
    title: "Welcome to The Native Place - where life slows down and nature takes over.",
    descriptionOne:
      "In the middle of our busy lives, we often forget to pause. The Native Place was created as a quiet escape where you can step away from the rush, breathe fresh air, and spend meaningful time with the people who matter.",
    descriptionTwo:
      "Surrounded by greenery and open spaces, our little retreat near Shirdi is a place to relax, reconnect and create memories - whether it is a family getaway, a weekend with friends, or simply some time away from everyday life.",
    closingLine: "Come for a stay. Leave with a story to remember.",
  },
  vision: {
    eyebrow: "Vision",
    title: "To become one of the most preferred nature stays near Shirdi.",
    description: "Known for peaceful surroundings, warm hospitality and memorable guest experiences.",
  },
  mission: {
    eyebrow: "Mission",
    title: "Comfortable stays. Genuine hospitality. Peaceful memories.",
    description:
      "To provide comfortable stays and genuine hospitality while creating a peaceful environment where families, friends and travellers can relax, connect and create lasting memories.",
  },
};

export const normalizeHomeContent = (content = {}) => ({
  eyebrow: content?.eyebrow ?? defaultHomeContent.eyebrow,
  title: content?.title ?? defaultHomeContent.title,
  descriptionOne: content?.descriptionOne ?? defaultHomeContent.descriptionOne,
  descriptionTwo: content?.descriptionTwo ?? defaultHomeContent.descriptionTwo,
});

export const normalizeAboutContent = (content = {}) => ({
  story: {
    eyebrow: content?.story?.eyebrow ?? defaultAboutContent.story.eyebrow,
    title: content?.story?.title ?? defaultAboutContent.story.title,
    descriptionOne: content?.story?.descriptionOne ?? defaultAboutContent.story.descriptionOne,
    descriptionTwo: content?.story?.descriptionTwo ?? defaultAboutContent.story.descriptionTwo,
    closingLine: content?.story?.closingLine ?? defaultAboutContent.story.closingLine,
  },
  vision: {
    eyebrow: content?.vision?.eyebrow ?? defaultAboutContent.vision.eyebrow,
    title: content?.vision?.title ?? defaultAboutContent.vision.title,
    description: content?.vision?.description ?? defaultAboutContent.vision.description,
  },
  mission: {
    eyebrow: content?.mission?.eyebrow ?? defaultAboutContent.mission.eyebrow,
    title: content?.mission?.title ?? defaultAboutContent.mission.title,
    description: content?.mission?.description ?? defaultAboutContent.mission.description,
  },
});

export const normalizeBanner = (banner = {}, index = 0) => ({
  _id: banner?._id ? String(banner._id) : "",
  title: banner?.title ?? defaultHomeBanners[index % defaultHomeBanners.length]?.title ?? "",
  desktopImage:
    banner?.desktopImage ??
    defaultHomeBanners[index % defaultHomeBanners.length]?.desktopImage ??
    "",
  mobileImage:
    banner?.mobileImage ??
    defaultHomeBanners[index % defaultHomeBanners.length]?.mobileImage ??
    "",
  altText: banner?.altText ?? defaultHomeBanners[index % defaultHomeBanners.length]?.altText ?? "",
  link: banner?.link ?? "",
  sortOrder: Number(banner?.sortOrder ?? index + 1),
  isActive: banner?.isActive ?? true,
});

export const normalizeBannerList = (banners = []) => {
  const source = Array.isArray(banners) && banners.length ? banners : defaultHomeBanners;

  return source
    .map((banner, index) => normalizeBanner(banner, index))
    .sort((left, right) => left.sortOrder - right.sortOrder);
};
