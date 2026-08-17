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
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
          className="mx-4 h-auto w-full max-w-[470px] max-h-[200px] object-contain sm:max-h-[360px]"
        >
        <source src="/preloader/preloader.webm" type="video/webm" />
      </video>
    </div>
  );
}
