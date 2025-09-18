"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent multiple Lenis instances
    if ((window as any).lenisInstance) {
      return;
    }

    // Create Lenis instance with enhanced smoothness
    const lenisInstance = new Lenis({
      duration: 1.2, // Increased duration for smoother scroll
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)), // Soft easing
      smoothWheel: true,
      syncTouch: true, // Smooth scrolling for touch devices
      infinite: false,
      lerp: 0.08, // Even smoother lerp
      wheelMultiplier: 0.7, // Controlled wheel sensitivity
    });

    // Raf for smooth scrolling with performance optimization
    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Store instance to prevent multiple initializations
    (window as any).lenisInstance = lenisInstance;

    // Enhanced global scroll method with more robust handling
    (window as any).smoothScrollTo = (
      target: string | number,
      options?: {
        offset?: number;
        duration?: number;
        easing?: (t: number) => number;
      }
    ) => {
      const offset = options?.offset || 80; // Default navbar offset
      const duration = options?.duration ?? 1.2; // Default duration
      const easing =
        options?.easing || ((t) => Math.min(1, 1 - Math.pow(2, -10 * t)));

      if (typeof target === "string") {
        const element = document.getElementById(target);
        if (element) {
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;

          lenisInstance.scrollTo(offsetPosition, {
            duration,
            easing,
          });
        }
      } else {
        lenisInstance.scrollTo(target, {
          duration,
          easing,
        });
      }
    };

    return () => {
      lenisInstance.destroy();
      delete (window as any).lenisInstance;
      delete (window as any).smoothScrollTo;
    };
  }, []);

  return <>{children}</>;
}
