"use client";

import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.3;
    }
  }, []);

  const handleVideoEnd = () => {
    setIsFadingOut(true);
    window.setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#022514] transition-opacity duration-500 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      } overflow-hidden`}
    >
      <div className="flex w-full justify-center px-4">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          className="block h-auto w-full max-w-[240px] object-contain object-center sm:max-w-[470px] sm:max-h-[360px]"
        >
          <source src="/preloader/preloader.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
}
