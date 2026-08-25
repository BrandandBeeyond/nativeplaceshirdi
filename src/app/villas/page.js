import { Armchair, BedDouble, Coffee, Package, Trees, Wifi, Zap } from "lucide-react";
import StayDetailPage from "../components/StayDetailPage.jsx";
import dbConnect from "../lib/dbConnect.js";
import { Page } from "../lib/models/index.js";
import { getDefaultStayContent, normalizeStayContent } from "../lib/stay-content.js";

export const metadata = {
  title: "2 BHK Villas | The Native Place Shirdi",
  description: "Explore the 2 BHK Villas at The Native Place Shirdi.",
};

export const dynamic = "force-dynamic";

const villaAmenities = [
  { icon: BedDouble, label: "2 Bedrooms" },
  { icon: Armchair, label: "Private Sit-out" },
  { icon: Trees, label: "Garden Views" },
  { icon: Wifi, label: "Wi-Fi Access" },
  { icon: Coffee, label: "Tea / Coffee Maker" },
  { icon: Package, label: "Mini Storage" },
  { icon: Zap, label: "24x7 Power Backup" },
];

const villaHighlights = [
  { icon: BedDouble, label: "2 Bedrooms" },
  { icon: Armchair, label: "Private Sit-out" },
  { icon: Trees, label: "Garden Views" },
];

async function getVillasPageContent() {
  try {
    await dbConnect();
    const page = await Page.findOne({ slug: "villas" }).lean();

    return normalizeStayContent("villas", page?.content || getDefaultStayContent("villas"));
  } catch (_error) {
    return getDefaultStayContent("villas");
  }
}

export default async function VillasPage() {
  const stayContent = await getVillasPageContent();

  return (
    <StayDetailPage
      stayLabel="All Villas"
      stayTitle="2 BHK Villas"
      bannerTitle="2 BHK Villas"
      bannerDescription="Spacious villas designed for relaxed family stays, private gatherings, and peaceful weekends."
      bannerImage={stayContent.bannerImage}
      heroImage={stayContent.heroImages?.[0] || stayContent.bannerImage}
      heroThumbs={stayContent.heroImages}
      introImage={stayContent.introImage}
      galleryImages={stayContent.galleryImages}
      amenities={villaAmenities}
      highlights={villaHighlights}
    />
  );
}
