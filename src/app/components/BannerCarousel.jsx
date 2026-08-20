"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const banners = [
  {
    src: "/images/banners/banner1.jpeg",
    heading: "Wake Up to Quiet, Green Luxury",
  },
  {
    src: "/images/banners/banner2.jpeg",
    heading: "A Calm Escape Surrounded by Nature",
  },
  {
    src: "/images/banners/banner3.jpeg",
    heading: "Where Comfort Meets Open Skies",
  },
  {
    src: "/images/banners/banner4.jpeg",
    heading: "Your Next Peaceful Getaway Awaits",
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
    <section className="relative isolate overflow-hidden bg-[#f7f5ec]">
      <div className="relative h-[calc(100vh-88px)] min-h-[520px] w-full">
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
            <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-[#e4f0cf] sm:text-sm">
              The Native Place Shirdi
            </p>
            <h1 className="text-4xl font-semibold leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-7xl">
              {banners[activeIndex].heading}
            </h1>

            <a
              href="/contact"
              className="group relative mx-auto mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/70 bg-white px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#18352A] shadow-[0_16px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dff1bf] hover:bg-[#dff1bf] hover:shadow-[0_22px_45px_rgba(0,0,0,0.22)]"
            >
              <span className="relative z-10 transition-colors duration-300">
                Book Now
              </span>
              <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#18352A]/20 bg-[#f5f1e4] text-[#18352A] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white">
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to banner ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-[#a3ca65]" : "w-2.5 bg-white/50 hover:bg-white/75"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
