"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const animatedText = "THE NATIVE PLACE";

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

function AnimatedText({ text, letterRefs }) {
  return (
    <span className="inline-flex flex-nowrap justify-center whitespace-nowrap">
      {Array.from(text).map((char, index) => {
        const isSpace = char === " ";
        const spacing = isSpace ? "0.28em" : "0.07em";

        return (
          <span
            key={`${char}-${index}`}
            ref={(node) => {
              letterRefs.current[index] = node;
            }}
            className="inline-block whitespace-pre will-change-transform"
            style={{ marginRight: spacing }}
          >
            {isSpace ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}

function HighlightCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-[26px] border border-[#e8dfcb] bg-[#fffdf6] shadow-[0_12px_28px_rgba(40,55,35,0.08)]">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 1280px) 100vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/34 via-transparent to-transparent" />
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
  const sectionRef = useRef(null);
  const letterRefs = useRef([]);
  const cardRefs = useRef([]);
  const panelRef = useRef(null);

  useLayoutEffect(() => {
    const node = sectionRef.current;
    const letters = letterRefs.current.filter(Boolean);
    const cards = cardRefs.current.filter(Boolean);
    const panel = panelRef.current;

    if (!node || !letters.length || !cards.length || !panel) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(letters, {
        opacity: 0,
        y: 54,
        filter: "blur(16px)",
      });

      gsap.set(panel, {
        yPercent: 100,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 28,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: "top top",
          end: "+=420%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(letters, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "none",
        stagger: 0.045,
      })
        .to(
          panel,
          {
            yPercent: 0,
            duration: 1.1,
            ease: "none",
          },
          ">0.05",
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "none",
            stagger: 0.16,
          },
          ">0.1",
        );
    }, node);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f2e4] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(184,220,79,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(107,132,68,0.12),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9cfb7] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d9cfb7] to-transparent" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="relative min-h-[88vh]">
          <div className="absolute inset-0 z-10 flex items-center justify-center px-2 text-center">
            <div className="mx-auto flex max-w-[900px] flex-col items-center">
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

              <div className="mt-14 max-w-[1250px]">
                <p className="mb-14 font-heading text-[clamp(2.05rem,4vw,3.35rem)] leading-none font-normal tracking-[-0.03em] text-[#6b8444]">
                  Why Choose
                </p>

                <h2 className="font-anton text-[clamp(2.35rem,6vw,5.45rem)] leading-[0.88] tracking-[0.15em] text-[#4f6f1d] drop-shadow-[0_8px_22px_rgba(61,80,31,0.12)] lg:text-[5.9rem]">
                  <AnimatedText text={animatedText} letterRefs={letterRefs} />
                </h2>
              </div>
            </div>
          </div>

          <div
            ref={panelRef}
            className="absolute inset-0 z-20 rounded-t-[42px] bg-white shadow-[0_-20px_70px_rgba(0,0,0,0.08)]"
          >
            <div className="mx-auto flex h-full max-w-[1500px] items-center px-4 py-10 sm:px-6 lg:px-8">
              <div className="grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {highlights.map((item, index) => (
                  <div
                    key={item.title}
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                  >
                    <HighlightCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
