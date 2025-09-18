import Lenis, { LenisOptions } from "lenis";
import { useEffect } from "react";

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)), // Slightly custom easing
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
      infinite: false,
    } as LenisOptions);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Add global method for smooth scrolling to specific elements/sections
    (window as any).smoothScrollTo = (target: string, options?: { 
      duration?: number, 
      offset?: number, 
      easing?: (t: number) => number 
    }) => {
      const element = document.getElementById(target);
      if (element) {
        const { 
          duration = 1.2, 
          offset = 0, 
          easing = (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t))
        } = options || {};

        lenis.scrollTo(element, { 
          duration, 
          offset, 
          easing 
        });
      }
    };

    return () => {
      lenis.destroy();
    };
  }, []);
};
