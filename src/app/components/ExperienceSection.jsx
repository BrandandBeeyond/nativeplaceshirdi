"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  { value: "15+", label: "Acres of Natural Beauty", icon: Trees },
  { value: "20+", label: "Premium Amenities", icon: Sparkles },
  { value: "1000+", label: "Happy Guests", icon: Users },
  { value: "Forever", label: "Memories That Last", icon: Sparkles },
];

function FeaturePill({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 rounded-[1.5rem] bg-white/72 px-4 py-4 shadow-[0_10px_30px_rgba(31,46,26,0.06)] backdrop-blur-sm">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f4f1e3] text-[#768f54]">
        <Icon className="h-6 w-6" strokeWidth={1.6} />
      </span>
      <span className="text-[15px] leading-6 text-[#48554d]">{label}</span>
    </div>
  );
}

export default function ExperienceSection() {
  const videoRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

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

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#fbf8ef] px-4 py-14 sm:px-6 sm:py-16 lg:px-0 lg:py-0">
      <div className="mx-auto grid min-h-screen max-w-[1600px] items-stretch lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-10 flex flex-col justify-center px-3 py-8 sm:px-6 lg:px-16 xl:px-20" data-aos="fade-right">
          <div className="max-w-[650px]">
            <div className="flex items-center gap-4 text-[#6b8444]">
              <span className="h-px w-10 bg-[#d9d2c4]" />
              <span className="font-subheading text-[12px] font-semibold uppercase tracking-[0.35em]">
                Resort Experience
              </span>
              <span className="h-px w-10 bg-[#d9d2c4]" />
            </div>

            <h2 className="mt-6 font-heading text-5xl leading-[1.02] text-[#20342b] sm:text-6xl lg:text-[4.4rem]">
              More Than a Stay.
              <br />
              It&apos;s an Experience.
            </h2>

            <div className="mt-5 h-px w-14 bg-[#d9d2c4]" />

            <p className="mt-5 max-w-[470px] text-[16px] leading-8 text-[#5b655d] sm:text-[17px]">
              Tucked away in nature&apos;s embrace, The Native Place Shirdi offers a refreshing
              escape from the everyday. Wake up to birdsong, breathe in the fresh air, and
              unwind in the lap of nature.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {experienceFeatures.map((feature) => (
                <FeaturePill key={feature.label} icon={feature.icon} label={feature.label} />
              ))}
            </div>

            <p className="mt-10 text-sm text-[#5b655d]">
              A glimpse of serenity and unforgettable moments
            </p>
          </div>
        </div>

        <div className="relative min-h-[640px] lg:min-h-screen" data-aos="fade-left">
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
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-4 rounded-full bg-black/28 px-4 py-3 text-white shadow-[0_20px_40px_rgba(0,0,0,0.22)] backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="flex h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-black/22">
              <Play className="ml-1 h-10 w-10 fill-current" />
            </span>
            <span className="font-script text-4xl leading-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]">
              Play Video
            </span>
          </button>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 max-w-[1600px] px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8" data-aos="fade-up">
        <div className="rounded-[22px] bg-white/82 p-4 shadow-[0_12px_32px_rgba(36,46,32,0.06)] sm:p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div key={stat.label} className="flex items-center gap-4 rounded-2xl px-3 py-2">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f3f0e3] text-[#7b8f58]">
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                  <div>
                    <div className="font-heading text-4xl leading-none text-[#20342b]">
                      {stat.value}
                    </div>
                    <div className="text-[13px] leading-5 text-[#5a645d]">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
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
