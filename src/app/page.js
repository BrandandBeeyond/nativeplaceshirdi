import Navbar from "./components/Navbar";
import BannerCarousel from "./components/BannerCarousel";
import ExperienceSection from "./components/ExperienceSection";
import IntroSection from "./components/IntroSection";
import Preloader from "./components/Preloader";
import VillasCottages from "./components/VillasCottages";

export default function Home() {
  return <>
     <Preloader/>
     <Navbar/>
     <BannerCarousel />
     <IntroSection />
     <VillasCottages/>
     <ExperienceSection />
  </>;
}
