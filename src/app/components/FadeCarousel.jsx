"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FadeCarousel({
  images = [],
  alt,
  className = "",
  imageClassName = "",
  aspectClassName = "aspect-[1.18/1]",
  showThumbs = true,
  showControls = true,
  autoPlayDelay = 4500,
  thumbAspectClassName = "aspect-[1.2/0.82]",
  thumbClassName = "",
  thumbActiveClassName = "border-[#d8cdb6] ring-1 ring-[#d8cdb6]",
  thumbInactiveClassName = "border-[#eadfca]",
  containerRoundedClassName = "rounded-[22px]",
  controlsClassName = "",
  controlButtonClassName = "",
}) {
  const slides = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentIndex = slides.length > 0 ? activeIndex % slides.length : 0;

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, autoPlayDelay);

    return () => window.clearInterval(timer);
  }, [autoPlayDelay, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const goToSlide = (nextIndex) => {
    setActiveIndex((nextIndex + slides.length) % slides.length);
  };

  const handlePrevious = () => {
    goToSlide(currentIndex - 1);
  };

  const handleNext = () => {
    goToSlide(currentIndex + 1);
  };

  return (
    <div className={`relative w-full min-w-0 max-w-full ${className}`}>
      <div className={`relative overflow-hidden ${containerRoundedClassName}`}>
        <div className={`relative ${aspectClassName}`}>
          {slides.map((src, index) => {
            const isActive = index === currentIndex;

            return (
              <div
                key={`${src}-${index}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? "z-10 opacity-100" : "z-0 opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`${alt || "Carousel image"} ${index + 1}`}
                  fill
                  priority={index === 0}
                  className={`object-cover ${imageClassName}`}
                />
              </div>
            );
          })}
        </div>

        {showControls && slides.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={handlePrevious}
              className={`absolute left-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#20342b] shadow-[0_8px_22px_rgba(20,28,17,0.18)] transition-transform duration-300 hover:scale-105 max-[380px]:left-2 max-[380px]:h-9 max-[380px]:w-9 ${controlsClassName} ${controlButtonClassName}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={handleNext}
              className={`absolute right-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#20342b] shadow-[0_8px_22px_rgba(20,28,17,0.18)] transition-transform duration-300 hover:scale-105 max-[380px]:right-2 max-[380px]:h-9 max-[380px]:w-9 ${controlsClassName} ${controlButtonClassName}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      {showThumbs && slides.length > 1 ? (
        <div className="mt-3 flex max-w-full gap-3 overflow-x-auto pb-1 max-[380px]:mt-2 max-[380px]:gap-2">
          {slides.map((src, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={`${src}-thumb-${index}`}
                type="button"
                aria-label={`Show image ${index + 1}`}
                onClick={() => goToSlide(index)}
                className={`relative w-[84px] flex-none overflow-hidden rounded-[12px] border bg-white shadow-[0_10px_22px_rgba(44,56,38,0.06)] sm:w-[96px] max-[380px]:w-[68px] ${thumbAspectClassName} ${
                  isActive ? thumbActiveClassName : thumbInactiveClassName
                } ${thumbClassName}`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
