"use client";

import { useCallback, useRef, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Smooth Scrolling Configuration
 */
const SMOOTH_SCROLL_CONFIG = {
  duration: 800,
  offset: 80,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  scrollToTopThreshold: 300,
  maxRetries: 5,
  retryDelay: 300
};

/**
 * Custom hook for advanced smooth scrolling functionality
 */
export const useSmoothScroll = () => {
  const router = useRouter();
  const pathname = usePathname();
  const scrollRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

  /**
   * Advanced ref registration with retry mechanism
   * @param id Unique identifier for the section
   * @returns Ref callback to attach to the element
   */
  const registerScrollRef = useCallback((id: string) => {
    return (element: HTMLElement | null) => {
      if (element) {
        scrollRefs.current[id] = element;
      }
    };
  }, []);

  /**
   * Retry mechanism for finding scroll target
   * @param target Target section ID
   * @param maxRetries Number of retry attempts
   * @returns Promise resolving to the target element
   */
  const findScrollTarget = useCallback((target: string, maxRetries = SMOOTH_SCROLL_CONFIG.maxRetries): Promise<HTMLElement | null> => {
    return new Promise((resolve) => {
      let attempts = 0;

      const attemptFind = () => {
        // Try ref-based lookup first
        const refElement = scrollRefs.current[target];
        const idElement = document.getElementById(target);
        const foundElement = refElement || idElement;

        if (foundElement) {
          resolve(foundElement);
        } else if (attempts < maxRetries) {
          attempts++;
          setTimeout(attemptFind, SMOOTH_SCROLL_CONFIG.retryDelay);
        } else {
          resolve(null);
        }
      };

      attemptFind();
    });
  }, []);

  /**
   * Advanced smooth scroll implementation with retry mechanism
   * @param target Target element or section ID
   * @param options Scroll configuration
   */
  const smoothScrollTo = useCallback(async (
    target: string | HTMLElement, 
    options: {
      offset?: number,
      behavior?: 'smooth' | 'auto',
      duration?: number
    } = {}
  ) => {
    if (typeof window === 'undefined') {
      return;
    }

    const { 
      offset = SMOOTH_SCROLL_CONFIG.offset, 
      behavior = 'smooth',
      duration = SMOOTH_SCROLL_CONFIG.duration 
    } = options;

    let targetElement: HTMLElement | null = null;

    // Determine target element with retry mechanism
    if (typeof target === 'string') {
      targetElement = await findScrollTarget(target);
    } else {
      targetElement = target;
    }

    if (!targetElement) {
      return;
    }

    // Calculate precise scroll position
    const targetPosition = targetElement.getBoundingClientRect().top + 
                           window.pageYOffset - 
                           offset;

    // Native smooth scroll with fallback
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: targetPosition,
        behavior: behavior
      });
    } else {
      // Fallback for browsers without smooth scroll support
      smoothScrollPolyfill(targetPosition, duration);
    }
  }, [findScrollTarget]);

  /**
   * Polyfill for smooth scrolling in browsers without native support
   * @param targetPosition Target scroll position
   * @param duration Animation duration
   */
  const smoothScrollPolyfill = useCallback((targetPosition: number, duration: number) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(Math.min(timeElapsed / duration, 1));
      
      window.scrollTo(0, startPosition + distance * run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    // Easing function (similar to cubic-bezier)
    function ease(t: number) {
      return 1 - Math.pow(1 - t, 4);
    }

    requestAnimationFrame(animation);
  }, []);

  /**
   * Check and update scroll to top button visibility
   */
  const checkScrollToTopVisibility = useCallback(() => {
    if (typeof window === 'undefined') return;

    const scrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

    // Show button when scrolled down threshold or at bottom of page
    setIsScrollToTopVisible(
      window.scrollY > SMOOTH_SCROLL_CONFIG.scrollToTopThreshold || 
      scrolledToBottom
    );
  }, []);

  /**
   * Scroll to top with advanced smooth scrolling
   * @param options Scroll configuration
   */
  const scrollToTop = useCallback((
    options: {
      offset?: number,
      duration?: number
    } = {}
  ) => {
    if (typeof window === 'undefined') return;

    const { 
      offset = 0, 
      duration = SMOOTH_SCROLL_CONFIG.duration 
    } = options;

    // Try to scroll to 'hero' section first
    const heroElement = scrollRefs.current['hero'] || 
                        document.getElementById('hero');

    if (heroElement) {
      const targetPosition = heroElement.getBoundingClientRect().top + 
                             window.pageYOffset - 
                             offset;

      // Native smooth scroll with fallback
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback for browsers without smooth scroll support
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime: number | null = null;

        function animation(currentTime: number) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = Math.min(timeElapsed / duration, 1);
          
          window.scrollTo(0, startPosition + distance * run);
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }

        requestAnimationFrame(animation);
      }
    } else {
      // Fallback to default smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, []);

  /**
   * Navigate and scroll across pages with retry mechanism
   * @param link Target link or section
   */
  const navigateAndScroll = useCallback(async (link: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    // Reset scroll position
    window.scrollTo(0, 0);

    // Split path and hash
    const [path, hash] = link.split('#');

    // Navigation logic
    const navigateWithScroll = async () => {
      // Delay to ensure page is loaded
      await new Promise(resolve => setTimeout(resolve, 300));

      if (hash) {
        await smoothScrollTo(hash, {
          offset: SMOOTH_SCROLL_CONFIG.offset
        });
      }
    };

    // If different path, use router
    if (path && path !== pathname) {
      router.push(link, { scroll: false });
      await navigateWithScroll();
    } else {
      // Same page scroll
      await smoothScrollTo(hash || 'hero');
    }
  }, [router, pathname, smoothScrollTo]);

  // Optional: Add global scroll event listener for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        smoothScrollTo(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [smoothScrollTo]);

  // Add scroll event listener for scroll to top visibility
  useEffect(() => {
    window.addEventListener("scroll", checkScrollToTopVisibility);
    return () => {
      window.removeEventListener("scroll", checkScrollToTopVisibility);
    };
  }, [checkScrollToTopVisibility]);

  return {
    smoothScrollTo,
    navigateAndScroll,
    registerScrollRef,
    scrollToTop,
    isScrollToTopVisible
  };
}; 