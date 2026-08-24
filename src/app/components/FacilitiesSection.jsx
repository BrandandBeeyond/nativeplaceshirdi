"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Leaf } from "lucide-react";

const facilities = [
  {
    title: "Swimming Pool",
    description: "Unwind, relax and soak in pure bliss.",
    image: "/images/amenities/pool2.jpeg",
  },
  {
    title: "Dining Hall",
    description: "Delicious meals, warm ambience, memorable moments.",
    image: "/images/dininghall/dininghall.jpeg",
  },
  {
    title: "Banquet Hall",
    description: "Celebrate life's special occasions in style.",
    image: "/images/banners/weddinghall.WEBP",
  },
  {
    title: "Kids' Play Area",
    description: "A safe and joyful space for little adventurers.",
    image: "/images/amenities/kidsplayarea.jpeg",
  },
  {
    title: "Relaxation Spaces",
    description: "Quiet corners to sit back, breathe and rejuvenate.",
    image: "/images/amenities/relax.jpeg",
  },
  {
    title: "Machan Lounge",
    description: "An elevated retreat for coffee, conversations and calm views.",
    image: "/images/amenities/machan.jpeg",
  },
];

function FacilityCard({ facility, index }) {
  return (
    <article className="group h-full overflow-hidden rounded-[24px] bg-[#f6f0e4] shadow-[0_18px_45px_rgba(18,14,10,0.18)] sm:rounded-[28px]">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={facility.image}
          alt={facility.title}
          fill
          sizes="(max-width: 1280px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          priority={index === 0}
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/58 to-transparent p-4 pt-14 sm:p-6 sm:pt-20">
          <div className="max-w-[92%] text-white">
            <h3 className="font-heading text-[1.25rem] leading-tight text-white sm:text-[1.7rem]">
              {facility.title}
            </h3>
            <p className="mt-2 text-[13px] leading-6 text-white/84 sm:text-[15px]">
              {facility.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FacilitiesSection() {
  const [itemsPerView, setItemsPerView] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(facilities.length);
  const [animate, setAnimate] = useState(true);

  const repeatedFacilities = useMemo(() => [...facilities, ...facilities, ...facilities], []);
  const slideBasis = 100 / itemsPerView;
  const total = facilities.length;

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      const nextItemsPerView = width >= 1280 ? 3 : width >= 768 ? 2 : 1;

      setItemsPerView(nextItemsPerView);
      setAnimate(false);
      setCurrentIndex(total);
      requestAnimationFrame(() => setAnimate(true));
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [total]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAnimate(true);
      setCurrentIndex((value) => value + 1);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex >= total * 2) {
      setAnimate(false);
      setCurrentIndex((value) => value - total);
      requestAnimationFrame(() => setAnimate(true));
    }

    if (currentIndex < total) {
      setAnimate(false);
      setCurrentIndex((value) => value + total);
      requestAnimationFrame(() => setAnimate(true));
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-[#2a1e18] py-12 sm:py-16 lg:py-24"
      data-aos="fade-up"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(102,73,39,0.65),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(184,220,79,0.08),transparent_25%),linear-gradient(180deg,rgba(31,21,16,0.95)_0%,rgba(42,30,24,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[url('/images/common/IMG_9119.JPG.jpeg')] bg-cover bg-center opacity-[0.07] mix-blend-screen" />

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center" data-aos="fade-up">
          <span className="font-subheading text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d7e6b5] sm:text-sm sm:tracking-[0.42em]">
            Our Resort Facilities
          </span>

          <div className="mt-3 flex items-center justify-center gap-4 text-[#b8dc4f]">
            <span className="h-px w-16 bg-[#a89b78]/70" />
            <Leaf className="h-5 w-5" strokeWidth={1.8} />
            <span className="h-px w-16 bg-[#a89b78]/70" />
          </div>

          <h2 className="mt-4 font-heading text-[clamp(2rem,6vw,4.15rem)] leading-[1.08] text-[#f5f1e4] sm:text-5xl lg:text-[4.15rem]">
            Everything You Need, All in One Place
          </h2>

          <p className="mx-auto mt-4 max-w-3xl font-body text-[14px] leading-7 text-white/78 sm:mt-5 sm:text-lg">
            From refreshing mornings by the pool to joyful evenings with loved ones, our
            thoughtfully designed spaces make every moment truly special.
          </p>
        </div>

        <div className="relative mt-8 overflow-hidden sm:mt-12">
          <div
            className="flex"
            style={{
              transform: `translateX(-${currentIndex * slideBasis}%)`,
              transition: animate ? "transform 700ms ease" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {repeatedFacilities.map((facility, index) => (
              <div
                key={`${facility.title}-${index}`}
                className="flex-shrink-0 px-2 sm:px-3"
                style={{ flexBasis: `${slideBasis}%` }}
              >
                <FacilityCard facility={facility} index={index % total} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
