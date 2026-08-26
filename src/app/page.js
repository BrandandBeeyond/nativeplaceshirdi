import { Coffee, Mountain, Sprout, Users } from "lucide-react";
import Navbar from "./components/Navbar";
import BannerCarousel from "./components/BannerCarousel";
import FacilitiesSection from "./components/FacilitiesSection";
import ExperienceSection from "./components/ExperienceSection";
import WhyChooseSection from "./components/WhyChooseSection";
import BookingSection from "./components/BookingSection";
import TestimonialsSection from "./components/TestimonialsSection";
import IntroSection from "./components/IntroSection";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import VillasCottages from "./components/VillasCottages";

const mobileHighlights = [
  { icon: Sprout, title: "Surrounded by Nature" },
  { icon: Mountain, title: "Scenic Views of Shirdi" },
  { icon: Coffee, title: "Amidst Coffee Plantations" },
  { icon: Users, title: "Peace, Tranquility & Rejuvenation" },
];

function MobileWhyNativePlaceHighlights() {
  return (
    <section className="bg-[#f7f2e4] px-4 pb-8 pt-0 sm:hidden">
      <div className="mx-auto max-w-[1100px] rounded-[28px] bg-[#f5f1e4] px-4 py-4 shadow-[0_12px_30px_rgba(50,58,46,0.08)]">
        <div className="grid grid-cols-2 gap-3">
          {mobileHighlights.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex flex-col items-center gap-2 rounded-[18px] p-2 text-center"
              >
                <Icon className="h-6 w-6 text-[#6b8444]" strokeWidth={1.7} />
                <p className="text-[13px] leading-5 text-[#334039]">{feature.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <BannerCarousel />
      <IntroSection />
      <MobileWhyNativePlaceHighlights />
      <VillasCottages />
      <FacilitiesSection />
      <ExperienceSection />
      <WhyChooseSection />
      <BookingSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
