import { Armchair, BedDouble, Coffee, Package, Trees, Wifi, Zap } from "lucide-react";
import StayDetailPage from "../components/StayDetailPage.jsx";

export const metadata = {
  title: "2 BHK Villas | The Native Place Shirdi",
  description: "Explore the 2 BHK Villas at The Native Place Shirdi.",
};

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

const heroThumbs = [
  "/images/villas/villa1.jpeg",
  "/images/villas/villa2.WEBP",
  "/images/common/IMG_9118.JPG.jpeg",
  "/images/common/IMG_9115.JPG.jpeg",
  "/images/common/IMG_9116.JPG.jpeg",
];

const galleryImages = [
  "/images/common/IMG_9115.JPG.jpeg",
  "/images/common/IMG_9116.JPG.jpeg",
  "/images/common/IMG_0074.JPG.jpeg",
  "/images/common/IMG_0073.JPG.jpeg",
];

export default function VillasPage() {
  return (
    <StayDetailPage
      stayLabel="All Villas"
      stayTitle="2 BHK Villas"
      bannerTitle="2 BHK Villas"
      bannerDescription="Spacious villas designed for relaxed family stays, private gatherings, and peaceful weekends."
      bannerImage="/images/banners/banner1.jpeg"
      heroImage="/images/villas/villa1.jpeg"
      heroThumbs={heroThumbs}
      introImage="/images/common/IMG_9118.JPG.jpeg"
      galleryImages={galleryImages}
      amenities={villaAmenities}
      highlights={villaHighlights}
    />
  );
}
