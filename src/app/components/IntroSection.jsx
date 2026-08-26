"use client";

import Image from "next/image";
import { ArrowRight, ChevronRight, Coffee, Mountain, Sprout, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
          <div className="relative min-h-[360px] sm:min-h-[520px] lg:min-h-[760px]" data-aos="fade-right">
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

            <div className="absolute bottom-[5%] right-[3%] h-[28%] w-[42%] overflow-hidden rounded-[1.4rem] border-4 border-[#fbf8ef] shadow-[0_24px_60px_rgba(45,54,38,0.18)] sm:bottom-[8%] sm:right-[8%] sm:h-[40%] sm:w-[46%] sm:rounded-[2.25rem]">
              <Image
                src="/images/common/IMG_9115.JPG.jpeg"
                alt="Walkway view"
                fill
                sizes="(max-width: 1024px) 100vw, 26vw"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-0 z-10 w-[94%] rounded-[1.25rem] bg-[#f5f1e4] px-3 py-3 shadow-[0_20px_50px_rgba(50,58,46,0.08)] sm:w-[78%] sm:rounded-[2rem] sm:px-5 sm:py-5">
              <div className="hidden grid-cols-2 gap-2 sm:grid sm:grid-cols-4 sm:gap-2">
                <div className="flex flex-col items-center gap-1.5 text-center sm:border-r sm:border-[#d9d2bc]">
                  <Sprout className="h-6 w-6 text-[#6b8444] sm:h-8 sm:w-8" strokeWidth={1.7} />
                  <p className="max-w-[140px] text-[11px] leading-snug text-[#334039] sm:text-sm">
                    Surrounded by Nature
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center sm:border-r sm:border-[#d9d2bc]">
                  <Mountain className="h-6 w-6 text-[#6b8444] sm:h-8 sm:w-8" strokeWidth={1.7} />
                  <p className="max-w-[140px] text-[11px] leading-snug text-[#334039] sm:text-sm">
                    Scenic Views of Shirdi
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center sm:border-r sm:border-[#d9d2bc]">
                  <Coffee className="h-6 w-6 text-[#6b8444] sm:h-8 sm:w-8" strokeWidth={1.7} />
                  <p className="max-w-[140px] text-[11px] leading-snug text-[#334039] sm:text-sm">
                    Amidst Coffee Plantations
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <Users className="h-6 w-6 text-[#6b8444] sm:h-8 sm:w-8" strokeWidth={1.7} />
                  <p className="max-w-[140px] text-[11px] leading-snug text-[#334039] sm:text-sm">
                    Peace, Tranquility & Rejuvenation
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-1 lg:px-6" data-aos="fade-left">
            <div className="flex items-center justify-center gap-3 text-[#6b8444]">
              <span className="h-px w-8 bg-[#d9d2bc] sm:w-10" />
              <span className="font-subheading text-[9px] font-semibold uppercase tracking-[0.24em] text-[#6b8444] sm:text-[12px] sm:tracking-[0.45em] sm:text-sm">
                Welcome to The Native Place
              </span>
              <span className="h-px w-8 bg-[#d9d2bc] sm:w-10" />
            </div>

            <h2 className="mt-5 text-center font-heading text-[clamp(1.8rem,6vw,3rem)] leading-tight text-[#22302a] sm:mt-7 sm:text-5xl lg:text-[3rem] lg:leading-[1.05]">
              A Sanctuary of Serenity
              <br />
              in the Heart of Shirdi
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
                Tucked away in the calm surroundings of Shirdi, The Native Place is more than
                just a stay - it is an experience of nature, comfort, and mindful living.
                Surrounded by peaceful greenery, soft silence, and a restful atmosphere, our
                boutique resort offers the perfect escape for those seeking peace, connection,
                and rejuvenation.
              </p>
              <p>
                Whether you are here to unwind, explore, or simply be - every moment at The
                Native Place is designed to help you slow down and soak in the beauty of nature.
              </p>
            </div>

            <div
              ref={statsRef}
              className="mx-auto mt-7 hidden max-w-[920px] grid-cols-2 gap-2.5 sm:mt-10 sm:grid sm:gap-4 sm:grid-cols-4"
              data-aos="fade-up"
            >
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

            <div className="mt-7 flex justify-center sm:mt-10">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#154725] to-[#184826] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(34,88,49,0.28)] transition-transform duration-300 hover:-translate-y-0.5 sm:gap-3 sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.18em]"
              >
                Why Native place
                <span className="relative z-10 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#fff]/20 text-[#18352A] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white sm:h-7 sm:w-7">
                  <ChevronRight className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" strokeWidth={2.4} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
