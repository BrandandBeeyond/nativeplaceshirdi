"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const banners = [
{
  src: "/images/banners/banner1.jpeg",
  heading: "A Serene Resort Near Shirdi for a Peaceful Stay",
},
{
  src: "/images/banners/banner2.jpeg",
  heading: "Experience Nature and Comfort Near Shirdi",
},
{
  src: "/images/banners/banner3.jpeg",
  heading: "A Peaceful Getaway Near Shirdi",
},
{
  src: "/images/banners/banner4.jpeg",
  heading: "Your Perfect Stay Near Shirdi Awaits",
},
];

export default function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#f7f5ec]" data-aos="fade-up">
      <div className="relative h-[64vh] min-h-[360px] w-full sm:h-[72vh] sm:min-h-[440px] lg:h-[calc(100vh-88px)] lg:min-h-[520px]">
        {banners.map((banner, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={banner.src}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${isActive ? "z-20 opacity-100" : "z-10 opacity-0"
                }`}
            >
              <div
                className={`absolute inset-0 transition-transform duration-[1400ms] ease-out ${isActive ? "scale-[1.04]" : "scale-100"
                  }`}
              >
                <Image
                  src={banner.src}
                  alt={banner.heading}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,28,17,0.22)_0%,rgba(3,28,17,0.45)_45%,rgba(3,28,17,0.7)_100%)]" />
            </div>
          );
        })}

        <div className="relative z-30 flex h-full items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div key={activeIndex} className="max-w-4xl text-white animate-banner-heading">
            <p className="mb-3 text-[9px] uppercase tracking-[0.28em] text-[#e4f0cf] sm:mb-4 sm:text-sm sm:tracking-[0.45em]">
              The Native Place Shirdi
            </p>
            <h1 className="text-[clamp(1.7rem,7vw,4.7rem)] font-semibold leading-[1.08] drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-7xl">
              {banners[activeIndex].heading}
            </h1>

            <Link
              href="/#booking-section"
              className="group relative mx-auto mt-5 inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/70 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#18352A] shadow-[0_16px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dff1bf] hover:bg-[#dff1bf] hover:shadow-[0_22px_45px_rgba(0,0,0,0.22)] sm:mt-8 sm:gap-3 sm:px-7 sm:py-3 sm:text-[13px] sm:tracking-[0.2em]"
            >
              <span className="relative z-10 transition-colors duration-300">
                Book Now
              </span>
              <span className="relative z-10 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#18352A]/20 bg-[#f5f1e4] text-[#18352A] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white sm:h-7 sm:w-7">
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-6">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to banner ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 sm:h-2.5 ${index === activeIndex ? "w-7 bg-[#a3ca65] sm:w-10" : "w-1.5 bg-white/50 hover:bg-white/75 sm:w-2.5"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
