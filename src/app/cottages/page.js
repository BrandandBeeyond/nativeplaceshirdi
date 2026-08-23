import { Armchair, Coffee, Leaf, Package, Trees, Wifi, Zap } from "lucide-react";
import StayDetailPage from "../components/StayDetailPage.jsx";

export const metadata = {
  title: "Cottages | The Native Place Shirdi",
  description: "Explore the cottages at The Native Place Shirdi.",
};

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

const heroThumbs = [
  "/images/cottages/cottage1.jpeg",
  "/images/cottages/ambience.WEBP",
  "/images/cottages/IMG_0085.WEBP",
  "/images/cottages/IMG_0083.WEBP",
  "/images/cottages/IMG_0081.WEBP",
];

const galleryImages = [
  "/images/cottages/IMG_0084.JPG.jpeg",
  "/images/cottages/IMG_0082.JPG.jpeg",
  "/images/cottages/IMG_0076.JPG.jpeg",
  "/images/cottages/ambience.WEBP",
];

export default function CottagesPage() {
  return (
    <StayDetailPage
      stayLabel="All Cottages"
      stayTitle="Cottages"
      bannerTitle="Cottages"
      bannerDescription="Cozy stays surrounded by greenery, calm spaces, and a slower pace of living."
      bannerImage="/images/banners/banner2.jpeg"
      heroImage="/images/cottages/cottage1.jpeg"
      heroThumbs={heroThumbs}
      introImage="/images/cottages/ambience.WEBP"
      galleryImages={galleryImages}
      amenities={cottageAmenities}
      highlights={cottageHighlights}
    />
  );
}
