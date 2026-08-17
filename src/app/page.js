import Navbar from "./components/Navbar";
import BannerCarousel from "./components/BannerCarousel";
import IntroSection from "./components/IntroSection";
import Preloader from "./components/Preloader";

export default function Home() {
  return <>
     <Preloader/>
     <Navbar/>
     <BannerCarousel />
     <IntroSection />
  </>;
}
