"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LenisProvider() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/console/nativeplace");

  useEffect(() => {
    if (isAdminRoute) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let frameId;

    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [isAdminRoute]);

  useEffect(() => {
    if (isAdminRoute) {
      return;
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, isAdminRoute]);

  return null;
}
