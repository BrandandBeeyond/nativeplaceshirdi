"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

function AnimatedText({ text, active, reduceMotion }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active || reduceMotion) {
      return undefined;
    }

    let index = 0;
    const intervalId = window.setInterval(() => {
      index += 1;
      setVisibleCount(index);

      if (index >= text.length) {
        window.clearInterval(intervalId);
      }
    }, 85);

    return () => window.clearInterval(intervalId);
  }, [active, reduceMotion, text]);

  const visibleText = !active || reduceMotion ? text : text.slice(0, visibleCount);
  const isComplete = visibleCount >= text.length;

  return (
    <span className="inline-flex items-center justify-center whitespace-nowrap">
      <span className="inline-block">{visibleText}</span>
      {!reduceMotion && active && !isComplete ? (
        <span className="ml-1 inline-block h-[0.95em] w-[0.12em] translate-y-[0.08em] animate-pulse bg-current" />
      ) : null}
    </span>
  );
}

function HighlightCard({ item, visible, delay }) {
  return (
    <article
      className={`group overflow-hidden rounded-[26px] border border-[#e8dfcb] bg-[#fffdf6] shadow-[0_12px_28px_rgba(40,55,35,0.08)] transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
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
  const cardsTimerRef = useRef(null);
  const [textActive, setTextActive] = useState(false);
  const [cardsActive, setCardsActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = () => {
      setReduceMotion(mediaQuery.matches);
    };

    handleMotionChange();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return undefined;
    }

    const activateSection = () => {
      setTextActive(true);

      if (reduceMotion) {
        setCardsActive(true);
        return;
      }

      if (!cardsTimerRef.current) {
        cardsTimerRef.current = window.setTimeout(() => {
          setCardsActive(true);
          cardsTimerRef.current = null;
        }, animatedText.length * 85 + 260);
      }
    };

    const deactivateSection = () => {
      setTextActive(false);

      if (cardsTimerRef.current) {
        window.clearTimeout(cardsTimerRef.current);
        cardsTimerRef.current = null;
      }
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            activateSection();
          } else {
            deactivateSection();
          }
        },
        {
          threshold: 0.35,
        },
      );

      observer.observe(node);

      return () => {
        observer.disconnect();

        if (cardsTimerRef.current) {
          window.clearTimeout(cardsTimerRef.current);
          cardsTimerRef.current = null;
        }
      };
    }

    const updateState = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const isVisible = rect.top < viewportHeight * 0.72 && rect.bottom > viewportHeight * 0.18;

      if (isVisible) {
        activateSection();
      } else {
        deactivateSection();
      }
    };

    const rafId = window.requestAnimationFrame(updateState);
    window.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);

      if (cardsTimerRef.current) {
        window.clearTimeout(cardsTimerRef.current);
        cardsTimerRef.current = null;
      }
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-visible bg-[#f7f2e4]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(184,220,79,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(107,132,68,0.12),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9cfb7] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d9cfb7] to-transparent" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="relative min-h-[160vh] sm:min-h-[165vh] lg:min-h-[175vh]">
          <div className="sticky top-0 z-10 flex h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
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
                  <AnimatedText
                    key={textActive ? "typing" : "idle"}
                    text={animatedText}
                    active={textActive}
                    reduceMotion={reduceMotion}
                  />
                </h2>
              </div>
            </div>
          </div>

          <div className="pointer-events-none h-[55vh]" aria-hidden="true" />
        </div>

        <div
          className={`relative z-30 -mt-[100vh] min-h-screen rounded-t-[42px] bg-white px-4 py-12 shadow-[0_-20px_70px_rgba(0,0,0,0.08)] transition-all duration-700 ease-out sm:px-6 sm:py-14 lg:px-8 lg:py-16 ${
            cardsActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="mx-auto grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item, index) => (
              <HighlightCard
                key={item.title}
                item={item}
                visible={cardsActive}
                delay={index * 140}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
