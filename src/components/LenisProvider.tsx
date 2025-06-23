"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent multiple Lenis instances
    if ((window as any).lenisInstance) {
      return;
    }

    // Create Lenis instance
    const lenisInstance = new Lenis({
      duration: 0.8, // Reduced duration for faster scrolling
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)), // Slightly modified easing
    });

    // Raf for smooth scrolling
    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Store instance to prevent multiple initializations
    (window as any).lenisInstance = lenisInstance;

    // Optional: Add global scroll method
    (window as any).smoothScrollTo = (target: string | number) => {
      if (typeof target === 'string') {
        const element = document.getElementById(target);
        if (element) {
          lenisInstance.scrollTo(element, { 
            duration: 0.8,
            easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t))
          });
        }
      } else {
        lenisInstance.scrollTo(target, { 
          duration: 0.8,
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