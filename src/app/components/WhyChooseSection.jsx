"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const highlights = [
  {
    title: "Peaceful natural surroundings",
    description: "Lush greenery, fresh air and pure tranquility around every stay.",
    image: "/images/common/IMG_9119.JPG.jpeg",
  },
  {
    title: "Comfortable villas and cottages",
    description: "Thoughtfully designed spaces with comfort, style and privacy.",
    image: "/images/villas/villa1.jpeg",
  },
  {
    title: "Swimming pool",
    description: "A clean and well-maintained pool to relax, refresh and unwind.",
    image: "/images/amenities/pool2.jpeg",
  },
  {
    title: "Family-friendly environment",
    description: "A safe, warm and welcoming space for guests of all ages.",
    image: "/images/amenities/kidsplayarea.jpeg",
  },
  {
    title: "Spacious open areas",
    description: "Wide lawns and open spaces to relax, play and reconnect.",
    image: "/images/common/IMG_9118.JPG.jpeg",
  },
  {
    title: "Approx. 18 km from Shirdi",
    description: "A short drive from Shirdi, yet far enough to enjoy peace and calm.",
    image: "/images/common/IMG_0073.JPG.jpeg",
  },
  {
    title: "Suitable for groups and celebrations",
    description: "Perfect for birthdays, family get-togethers and special occasions.",
    image: "/images/banners/weddinghall.WEBP",
  },
  {
    title: "Suitable for corporate outings",
    description: "Ideal for team retreats, meetings and corporate getaways.",
    image: "/images/dininghall/dininghall.jpeg",
  },
];

function HighlightCard({ item }) {
  return (
    <article className="w-[88vw] shrink-0 snap-center overflow-hidden rounded-[26px] border border-[#e8dfcb] bg-[#fffdf6] shadow-[0_12px_28px_rgba(40,55,35,0.08)] sm:w-auto sm:min-w-0">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 88vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="font-heading text-[1.35rem] leading-tight text-[#20342b]">
          {item.title}
        </h3>
        <p className="mt-2 max-w-[24ch] text-sm leading-6 text-[#59645d]">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export default function WhyChooseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileSlideWidth = useMemo(() => "88vw", []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const handleChange = () => {
      if (!mediaQuery.matches) {
        setActiveIndex(0);
      }
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    if (!mediaQuery.matches || highlights.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % highlights.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section
      id="why-native-place"
      className="relative isolate overflow-visible bg-[#f7f2e4] scroll-mt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(184,220,79,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(107,132,68,0.12),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9cfb7] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d9cfb7] to-transparent" />

      <div className="relative mx-auto max-w-[1500px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
          <div className="w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[360px]">
            <Image
              src="/images/svg/whynativeplace.png"
              alt="Why Native Place"
              width={900}
              height={280}
              className="h-auto w-full object-contain"
              priority={false}
            />
          </div>

          <div className="mt-12 max-w-[1250px] sm:mt-14">
            <p className="mb-10 font-heading text-[clamp(2.05rem,4vw,3.35rem)] leading-none font-normal tracking-[-0.03em] text-[#6b8444] sm:mb-12">
              Why Choose
            </p>

            <h2 className="font-anton text-[clamp(2.15rem,5.6vw,5.1rem)] leading-[0.9] tracking-[0.18em] text-[#4f6f1d] drop-shadow-[0_8px_22px_rgba(61,80,31,0.12)] lg:text-[5.5rem]">
              THE NATIVE PLACE
            </h2>
          </div>
        </div>

        <div className="mt-12 sm:mt-14">
          <div className="flex gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:overflow-visible sm:pb-0 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div
              className="flex gap-4 transition-transform duration-700 ease-out sm:contents"
              style={{
                width: `calc(${mobileSlideWidth} * ${highlights.length} + 1rem * ${highlights.length - 1})`,
                transform: `translateX(calc(-1 * ${activeIndex} * (88vw + 1rem)))`,
              }}
            >
              {highlights.map((item) => (
                <HighlightCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
