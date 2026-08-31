"use client";

import Image from "next/image";
import { ArrowRight, ChevronRight, Coffee, Mountain, Sprout, Users } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const features = [
  { icon: Sprout, title: "Surrounded by Nature" },
  { icon: Mountain, title: "Scenic Views of Shirdi" },
  { icon: Coffee, title: "Amidst Coffee Plantations" },
  { icon: Users, title: "Peace, Tranquility & Rejuvenation" },
];

const stats = [
  {
    target: 19,
    label: "Years of Hospitality",
    suffix: "+",
  },
  {
    target: 15,
    label: "Acres of Lush Greenery",
    suffix: "+",
  },
  {
    target: 20,
    label: "Comfortable Stays",
    suffix: "+",
  },
  {
    target: 10000,
    label: "Happy Guests",
    suffix: "+",
    format: "compact",
  },
];

export default function IntroSection() {
  const statsRef = useRef(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const isMobile = useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia("(max-width: 767px)");
      mediaQuery.addEventListener("change", onStoreChange);

      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );

  useEffect(() => {
    const node = statsRef.current;

    if (!node || hasAnimated) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setHasAnimated(true);

        const startTime = performance.now();
        const duration = 1800;

        const animate = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setCounts(stats.map((stat) => Math.round(stat.target * eased)));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const formatCount = (value, stat) => {
    if (stat.format === "compact") {
      return `${Math.round(value / 1000)}K${stat.suffix ?? ""}`;
    }

    return `${value}${stat.suffix ?? ""}`;
  };

  return (
    <section className="bg-[#fff] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div
            className="relative min-h-[360px] sm:min-h-[520px] lg:min-h-[760px]"
            data-aos={isMobile ? undefined : "fade-right"}
          >
            <div className="absolute left-0 top-0 h-[60%] w-[86%] overflow-hidden rounded-[1.65rem] shadow-[0_28px_70px_rgba(45,54,38,0.16)] sm:h-[72%] sm:w-[78%] sm:rounded-[2.5rem]">
              <Image
                src="/images/cottages/ambience.WEBP"
                alt="Resort exterior"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority={false}
              />
            </div>

            <div className="absolute bottom-[7%] right-[2%] h-[34%] w-[50%] overflow-hidden rounded-[1.55rem] border-4 border-[#fbf8ef] shadow-[0_24px_60px_rgba(45,54,38,0.18)] sm:bottom-[8%] sm:right-[8%] sm:h-[40%] sm:w-[46%] sm:rounded-[2.25rem]">
              <Image
                src="/images/common/IMG_9115.JPG.jpeg"
                alt="Walkway view"
                fill
                sizes="(max-width: 1024px) 100vw, 26vw"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-0 z-10 hidden w-[94%] rounded-[1.25rem] bg-[#f5f1e4] px-3 py-3 shadow-[0_20px_50px_rgba(50,58,46,0.08)] sm:block sm:w-[78%] sm:rounded-[2rem] sm:px-5 sm:py-5">
              <div className="grid grid-cols-2 gap-2 sm:grid sm:grid-cols-4 sm:gap-2">
                {features.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className={`flex flex-col items-center gap-1.5 text-center ${index < features.length - 1 ? "sm:border-r sm:border-[#d9d2bc]" : ""}`}
                    >
                      <Icon className="h-6 w-6 text-[#6b8444] sm:h-8 sm:w-8" strokeWidth={1.7} />
                      <p className="max-w-[140px] text-[11px] leading-snug text-[#334039] sm:text-sm">
                        {feature.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="px-1 lg:px-6" data-aos={isMobile ? undefined : "fade-left"}>
            <div className="flex items-center justify-center gap-3 text-[#6b8444]">
              <span className="h-px w-8 bg-[#d9d2bc] sm:w-10" />
              <span className="font-subheading text-[9px] font-semibold uppercase tracking-[0.24em] text-[#6b8444] sm:text-[12px] sm:tracking-[0.45em] sm:text-sm">
                Welcome to The Native Place
              </span>
              <span className="h-px w-8 bg-[#d9d2bc] sm:w-10" />
            </div>

            <h2 className="mt-5 text-center font-heading text-[clamp(1.8rem,6vw,3rem)] leading-tight text-[#22302a] sm:mt-7 sm:text-5xl lg:text-[3rem] lg:leading-[1.05]">
              Comfort, Nature & Serenity
              <br />
              at a Resort Near Shirdi
            </h2>

            <div className="mx-auto mt-3 flex items-center justify-center gap-4">
              <div className="w-[120px] sm:w-[170px]">
                <Image
                  src="/images/svg/nativeplacevector.png"
                  width={220}
                  height={60}
                  alt="Villas and Cottages"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            <div className="mx-auto mt-3 max-w-[680px] space-y-4 text-[14px] leading-7 text-[#5c6b64] sm:mt-4 sm:space-y-6 sm:text-lg sm:leading-8">
              <p>
                Looking for a peaceful resort near Shirdi? The Native Place offers a relaxing stay surrounded by greenery, open spaces, and the tranquillity of nature. Our boutique resort combines modern comfort with a serene atmosphere, making it an ideal choice for families, couples, and travellers visiting Shirdi.
              </p>
              <p>
                Conveniently located near Shirdi, The Native Place is perfect for those who want to explore the spiritual destination while enjoying a quiet retreat away from the crowds. From relaxing in nature to spending quality time with loved ones.
              </p>
            </div>

            <div
              ref={statsRef}
              className="mx-auto mt-7 max-w-[920px] sm:mt-10"
              data-aos="fade-up"
            >
              <div className="hidden grid-cols-2 gap-2.5 sm:grid sm:grid-cols-4 sm:gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="counter-card flex min-h-[132px] flex-col items-center justify-center rounded-[22px] bg-[#fbf8ef]/95 px-3 py-4 text-center shadow-[0_12px_30px_rgba(56,64,50,0.05)] sm:min-h-[230px] sm:rounded-[28px] sm:px-6 sm:py-8"
                  >
                    <div className="text-[clamp(1.55rem,4.5vw,2.4rem)] font-semibold tracking-[-0.04em] text-[#23312a] sm:text-[3.1rem]">
                      {formatCount(counts[index], stat)}
                    </div>
                    <div className="mt-2 max-w-[10ch] text-[12px] leading-5 text-[#5c6b64] sm:mt-3 sm:text-[1.1rem] sm:leading-7">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:hidden">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="counter-card flex min-h-[112px] flex-col items-center justify-center rounded-[18px] bg-[#fbf8ef]/95 px-3 py-4 text-center shadow-[0_12px_30px_rgba(56,64,50,0.05)]"
                  >
                    <div className="text-[clamp(1.15rem,5.4vw,1.7rem)] font-semibold tracking-[-0.04em] text-[#23312a]">
                      {formatCount(counts[index], stat)}
                    </div>
                    <div className="mt-1 max-w-[12ch] text-[10.5px] leading-4 text-[#5c6b64]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex justify-center sm:mt-10">
              <a
                href="#why-native-place"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#154725] to-[#184826] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(34,88,49,0.28)] transition-transform duration-300 hover:-translate-y-0.5 sm:gap-3 sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.18em]"
              >
                Why Native place
                <span className="relative z-10 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#fff]/20 text-[#18352A] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white sm:h-7 sm:w-7">
                  <ChevronRight className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" strokeWidth={2.4} />
                </span>
              </a>
            </div>

            <div className="mt-7 sm:hidden">
              <div className="rounded-[1.35rem] bg-[#f5f1e4] px-3 py-3 shadow-[0_12px_30px_rgba(50,58,46,0.08)]">
                <div className="grid grid-cols-2 gap-2">
                  {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                      <div key={feature.title} className="flex flex-col items-center gap-2 px-2 py-2 text-center">
                        <Icon className="h-6 w-6 text-[#6b8444]" strokeWidth={1.7} />
                        <p className="text-[12px] leading-5 text-[#334039]">{feature.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
