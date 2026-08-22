"use client";

import Image from "next/image";
import { ArrowRight, ChevronRight, Coffee, Mountain, Sprout, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Sprout,
    title: "Surrounded by Nature",
  },
  {
    
    icon: Mountain,
    title: "Scenic Views of Shirdi",
  },
  {
    icon: Coffee,
    title: "Amidst Coffee Plantations",
  },
  {
    icon: Users,
    title: "Peace, Tranquility & Rejuvenation",
  },
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
    <section className="bg-[#fff] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid items-center gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="relative min-h-[650px] lg:min-h-[760px]" data-aos="fade-right">
            <div className="absolute left-0 top-0 h-[72%] w-[76%] overflow-hidden rounded-[2.5rem] shadow-[0_28px_70px_rgba(45,54,38,0.16)] sm:w-[78%]">
              <Image
                src="/images/cottages/ambience.WEBP"
                alt="Resort exterior"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority={false}
              />
            </div>

            <div className="absolute bottom-[8%] right-[8%] h-[40%] w-[46%] overflow-hidden rounded-[2.25rem] border-4 border-[#fbf8ef] shadow-[0_24px_60px_rgba(45,54,38,0.18)]">
              <Image
                src="/images/common/IMG_9115.JPG.jpeg"
                alt="Walkway view"
                fill
                sizes="(max-width: 1024px) 100vw, 26vw"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-0 z-10 w-[78%] rounded-[2rem] bg-[#f5f1e4] px-5 py-5 shadow-[0_20px_50px_rgba(50,58,46,0.08)] sm:px-7 sm:py-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-2">
                {features.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className={`flex flex-col items-center gap-2 text-center ${index < features.length - 1 ? "sm:border-r sm:border-[#d9d2bc]" : ""
                        }`}
                    >
                      <Icon className="h-8 w-8 text-[#6b8444]" strokeWidth={1.7} />
                      <p className="max-w-[140px] text-sm leading-snug text-[#334039]">
                        {feature.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="px-1 lg:px-6" data-aos="fade-left">
            <div className="flex items-center justify-center gap-3 text-[#6b8444]">
              <span className="h-px w-10 bg-[#d9d2bc]" />
              <span className="font-subheading text-[12px] font-semibold uppercase tracking-[0.45em] text-[#6b8444] sm:text-sm">
                Welcome to The Native Place
              </span>
              <span className="h-px w-10 bg-[#d9d2bc]" />
            </div>

            <h2 className="mt-7 text-center font-heading text-4xl leading-tight text-[#22302a] sm:text-5xl lg:text-[3rem] lg:leading-[1.05]">
              A Sanctuary of Serenity
              <br />
              in the Heart of Shirdi
            </h2>

            <div className="mx-auto mt-3 flex items-center justify-center gap-4">
              <div className="w-[170px]">
                <Image
                  src="/images/svg/nativeplacevector.png"
                  width={220}
                  height={60}
                  alt="Villas and Cottages"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            <div className="mx-auto mt-3 max-w-[680px] space-y-6 text-[17px] leading-8 text-[#5c6b64] sm:text-lg">
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
              className="mx-auto mt-10 grid max-w-[920px] grid-cols-2 gap-4 sm:grid-cols-4"
              data-aos="fade-up"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="counter-card flex min-h-[180px] flex-col items-center justify-center rounded-[28px] bg-[#fbf8ef]/95 px-4 py-7 text-center shadow-[0_12px_30px_rgba(56,64,50,0.05)] sm:min-h-[230px] sm:px-6 sm:py-8"
                >
                  <div className="text-4xl font-semibold tracking-[-0.04em] text-[#23312a] sm:text-[3.1rem]">
                    {formatCount(counts[index], stat)}
                  </div>
                  <div className="mt-3 max-w-[10ch] text-base leading-7 text-[#5c6b64] sm:text-[1.1rem]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#154725] to-[#184826] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(34,88,49,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Why Native place
                <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#fff]/20 text-[#18352A] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white">
                  <ChevronRight className="h-4 w-4 text-white" strokeWidth={2.4} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
