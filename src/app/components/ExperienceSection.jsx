"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  Coffee,
  Pause,
  Mountain,
  Play,
  Sparkles,
  Trees,
  Users,
  X,
} from "lucide-react";

const experienceFeatures = [
  { icon: Mountain, label: "Expansive Greenery" },
  { icon: Sparkles, label: "Peaceful Ambience" },
  { icon: Coffee, label: "Nature & Comfort" },
  { icon: Users, label: "Memorable Moments" },
];

const stats = [
  { target: 15, suffix: "+", label: "Acres of Natural Beauty", icon: Trees },
  { target: 20, suffix: "+", label: "Premium Amenities", icon: Sparkles },
  { target: 1000, suffix: "+", label: "Happy Guests", icon: Users, format: "compact" },
  { value: "Forever", label: "Memories That Last", icon: Sparkles },
];

function FeaturePill({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 rounded-[1.3rem] bg-white/72 px-3.5 py-3.5 shadow-[0_10px_30px_rgba(31,46,26,0.06)] backdrop-blur-sm sm:rounded-[1.5rem] sm:px-4 sm:py-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f1e3] text-[#768f54] sm:h-11 sm:w-11">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} />
      </span>
      <span className="text-[14px] leading-6 text-[#48554d] sm:text-[15px]">{label}</span>
    </div>
  );
}

export default function ExperienceSection() {
  const videoRef = useRef(null);
  const statsRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasCounted, setHasCounted] = useState(false);
  const isMobile = useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia("(max-width: 767px)");
      mediaQuery.addEventListener("change", onStoreChange);

      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );

  const closeVideo = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
    setIsVideoOpen(false);
  };

  const toggleVideo = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isVideoOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVideoOpen]);

  useEffect(() => {
    if (!isVideoOpen || !videoRef.current) {
      return;
    }

    setIsPlaying(true);
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {
      setIsPlaying(false);
    });
  }, [isVideoOpen]);

  useEffect(() => {
    const node = statsRef.current;

    if (!node || hasCounted) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setHasCounted(true);

        const startTime = performance.now();
        const duration = 1400;

        const animate = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setCounts(
            stats.map((stat) =>
              typeof stat.target === "number" ? Math.round(stat.target * eased) : 0,
            ),
          );

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasCounted]);

  const formatCount = (value, stat) => {
    if (stat.value) {
      return stat.value;
    }

    if (stat.format === "compact") {
      return `${Math.round(value / 1000)}K${stat.suffix ?? ""}`;
    }

    return `${value}${stat.suffix ?? ""}`;
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#fbf8ef] px-4 py-12 sm:px-6 sm:py-16 lg:px-0 lg:py-0">
      <div className="mx-auto grid min-h-screen max-w-[1600px] items-stretch lg:grid-cols-[0.92fr_1.08fr]">
        <div
          className="relative z-10 flex flex-col justify-center px-2 py-6 sm:px-6 lg:px-16 xl:px-20"
          data-aos={isMobile ? undefined : "fade-right"}
        >
          <div className="max-w-[650px]">
            <div className="flex items-center gap-4 text-[#6b8444]">
              <span className="h-px w-10 bg-[#d9d2c4]" />
              <span className="font-subheading text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-[12px] sm:tracking-[0.35em]">
                Resort Experience
              </span>
              <span className="h-px w-10 bg-[#d9d2c4]" />
            </div>

            <h2 className="mt-5 font-heading text-[clamp(2.2rem,7vw,4.4rem)] leading-[1.02] text-[#20342b] sm:mt-6 sm:text-6xl lg:text-[4.4rem]">
              More Than a Stay.
              <br />
              It&apos;s an Experience.
            </h2>

            <div className="mt-5 h-px w-14 bg-[#d9d2c4]" />

            <p className="mt-5 max-w-[470px] text-[14px] leading-7 text-[#5b655d] sm:text-[17px] sm:leading-8">
              Tucked away in nature&apos;s embrace, The Native Place Shirdi offers a refreshing
              escape from the everyday. Wake up to birdsong, breathe in the fresh air, and
              unwind in the lap of nature.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {experienceFeatures.map((feature) => (
                <FeaturePill key={feature.label} icon={feature.icon} label={feature.label} />
              ))}
            </div>

            <p className="mt-8 text-sm text-[#5b655d] sm:mt-10">
              A glimpse of serenity and unforgettable moments
            </p>
          </div>
        </div>

        <div
          className="relative min-h-[420px] sm:min-h-[560px] lg:min-h-screen"
          data-aos={isMobile ? undefined : "fade-left"}
        >
          <Image
            src="/images/amenities/pool2.jpeg"
            alt="Resort experience"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
            priority={false}
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,248,239,0.98)_0%,rgba(251,248,239,0.88)_14%,rgba(251,248,239,0.5)_28%,rgba(251,248,239,0.12)_48%,rgba(251,248,239,0)_62%)]" />

          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full bg-black/28 px-3 py-2.5 text-white shadow-[0_20px_40px_rgba(0,0,0,0.22)] backdrop-blur-md transition-transform duration-300 hover:scale-[1.02] sm:gap-4 sm:px-4 sm:py-3"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-black/22 sm:h-24 sm:w-24">
              <Play className="ml-1 h-7 w-7 fill-current sm:h-10 sm:w-10" />
            </span>
            <span className="font-script text-2xl leading-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] sm:text-4xl">
              Play Video
            </span>
          </button>
        </div>
      </div>

    

      {isVideoOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 px-4 py-4">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[1.25rem] bg-black shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
            <button
              type="button"
              aria-label="Close video"
              onClick={closeVideo}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/25"
            >
              <X className="h-5 w-5" />
            </button>

            <video
              ref={videoRef}
              className="block h-auto max-h-[68vh] w-full object-contain bg-black"
              controls
              autoPlay
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/videos/property_full.mp4" type="video/mp4" />
            </video>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black px-4 py-3 text-white">
              <button
                type="button"
                onClick={toggleVideo}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium transition-colors duration-300 hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? "Pause" : "Play"}
              </button>

              <button
                type="button"
                onClick={closeVideo}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#18352A] transition-colors duration-300 hover:bg-[#dff1bf]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
