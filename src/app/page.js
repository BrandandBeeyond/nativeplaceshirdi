import Navbar from "./components/Navbar";
import BannerCarousel from "./components/BannerCarousel";
import FacilitiesSection from "./components/FacilitiesSection";
import ExperienceSection from "./components/ExperienceSection";
import WhyChooseSection from "./components/WhyChooseSection";
import TestimonialsSection from "./components/TestimonialsSection";
import IntroSection from "./components/IntroSection";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import VillasCottages from "./components/VillasCottages";

export default function Home() {
  return <>
     <Preloader/>
     <Navbar/>
     <BannerCarousel />
     <IntroSection />
     <VillasCottages/>
     <FacilitiesSection />
     <ExperienceSection />
     <WhyChooseSection />
     <TestimonialsSection />
     <Footer />
  </>;
}
