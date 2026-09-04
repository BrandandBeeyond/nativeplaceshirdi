"use client";

import Image from "next/image";
import { ChevronRight, Leaf, MapPin, Mountain, PartyPopper, Sprout, UtensilsCrossed, Users } from "lucide-react";
import { useSyncExternalStore } from "react";

const features = [
  { icon: Sprout, title: "Surrounded by Nature" },
  { icon: Mountain, title: "Scenic Views Near Shirdi" },
  { icon: UtensilsCrossed, title: "Pure Veg Dining" },
  { icon: Users, title: "Peace, Tranquility & Rejuvenation" },
];

const highlights = [
  { icon: MapPin, title: "Resort Near Shirdi" },
  { icon: Leaf, title: "Nature-Focused Stay" },
  { icon: Users, title: "Family-Friendly Resort" },
  { icon: PartyPopper, title: "Events & Celebrations" },
];

export default function IntroSection() {
  const isMobile = useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia("(max-width: 767px)");
      mediaQuery.addEventListener("change", onStoreChange);

      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );

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
                src="/images/banners/newbanner.jpeg"
                alt="Resort exterior"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority={false}
              />
            </div>

            <div className="absolute bottom-[7%] right-[2%] h-[34%] w-[50%] overflow-hidden rounded-[1.55rem] border-4 border-[#fbf8ef] shadow-[0_24px_60px_rgba(45,54,38,0.18)] sm:bottom-[8%] sm:right-[8%] sm:h-[40%] sm:w-[46%] sm:rounded-[2.25rem]">
              <Image
                src="/images/common/pool.jpeg"
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

            <div className="mx-auto mt-7 grid max-w-[920px] grid-cols-2 gap-3 sm:mt-10 sm:gap-5">
              {highlights.map((highlight) => {
                const Icon = highlight.icon;

                return (
                  <div
                    key={highlight.title}
                    className="flex min-h-[108px] flex-col items-center justify-center gap-2 rounded-[16px] border border-[#dce7bb] bg-[#fbfaf4] px-3 py-3 text-center shadow-[0_10px_28px_rgba(56,64,50,0.04)] sm:min-h-[116px] sm:flex-row sm:justify-start sm:gap-4 sm:rounded-[16px] sm:px-5 sm:text-left"
                  >
                    <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#e9f2c9] text-[#315c2c] sm:h-[58px] sm:w-[58px]">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.8} />
                    </span>
                    <span className="font-heading text-[15px] leading-[1.08] text-[#20342b] sm:text-[19px]">
                      {highlight.title}
                    </span>
                  </div>
                );
              })}
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
