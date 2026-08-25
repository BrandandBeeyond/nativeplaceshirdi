import { Armchair, Coffee, Leaf, Package, Trees, Wifi, Zap } from "lucide-react";
import StayDetailPage from "../components/StayDetailPage.jsx";
import dbConnect from "../lib/dbConnect.js";
import { Page } from "../lib/models/index.js";
import { getDefaultStayContent, normalizeStayContent } from "../lib/stay-content.js";

export const metadata = {
  title: "Cottages | The Native Place Shirdi",
  description: "Explore the cottages at The Native Place Shirdi.",
};

export const dynamic = "force-dynamic";

const cottageAmenities = [
  { icon: Armchair, label: "Cozy Sit-out" },
  { icon: Trees, label: "Green Surroundings" },
  { icon: Leaf, label: "Nature Feel" },
  { icon: Wifi, label: "Wi-Fi Access" },
  { icon: Coffee, label: "Tea / Coffee Maker" },
  { icon: Package, label: "Compact Storage" },
  { icon: Zap, label: "Power Backup" },
];

const cottageHighlights = [
  { icon: Armchair, label: "Cozy Sit-out" },
  { icon: Trees, label: "Garden Views" },
  { icon: Leaf, label: "Nature Feel" },
];

async function getCottagesPageContent() {
  try {
    await dbConnect();
    const page = await Page.findOne({ slug: "cottages" }).lean();

    return normalizeStayContent("cottages", page?.content || getDefaultStayContent("cottages"));
  } catch (_error) {
    return getDefaultStayContent("cottages");
  }
}

export default async function CottagesPage() {
  const stayContent = await getCottagesPageContent();

  return (
    <StayDetailPage
      stayLabel="All Cottages"
      stayTitle="Cottages"
      bannerTitle="Cottages"
      bannerDescription="Cozy stays surrounded by greenery, calm spaces, and a slower pace of living."
      bannerImage={stayContent.bannerImage}
      heroImage={stayContent.heroImages?.[0] || stayContent.bannerImage}
      heroThumbs={stayContent.heroImages}
      introImage={stayContent.introImage}
      galleryImages={stayContent.galleryImages}
      amenities={cottageAmenities}
      highlights={cottageHighlights}
    />
  );
}
