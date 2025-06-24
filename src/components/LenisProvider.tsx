"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent multiple Lenis instances
    if ((window as any).lenisInstance) {
      return;
    }

    // Create Lenis instance with performance optimizations
    const lenisInstance = new Lenis({
      duration: 0.6, // Reduced duration for faster scrolling
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)), // Optimized easing
      smoothWheel: true,
      infinite: false,
      lerp: 0.1, // Lower lerp for smoother scrolling
      wheelMultiplier: 0.8, // Reduced multiplier for more controlled scrolling
    });

    // Raf for smooth scrolling with performance optimization
    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Store instance to prevent multiple initializations
    (window as any).lenisInstance = lenisInstance;

    // Optional: Add global scroll method with performance considerations
    (window as any).smoothScrollTo = (target: string | number) => {
      if (typeof target === 'string') {
        const element = document.getElementById(target);
        if (element) {
          lenisInstance.scrollTo(element, { 
            duration: 0.6,
            easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t))
          });
        }
      } else {
        lenisInstance.scrollTo(target, { 
          duration: 0.6,
          easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t))
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