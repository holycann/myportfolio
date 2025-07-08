import { useState, useEffect, useCallback, useRef } from 'react';

// Hook to detect mobile devices
export const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Memoized scroll progress calculation
export const useScrollProgress = (ref: React.RefObject<HTMLElement>, offset: [string, string] = ['start start', 'end end']) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const calculateScrollProgress = useCallback(() => {
    if (!ref.current) return 0;

    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    const progress = scrollTop / (scrollHeight - clientHeight);
    return Math.min(1, Math.max(0, progress));
  }, [ref]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(calculateScrollProgress());
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      return () => currentRef.removeEventListener('scroll', handleScroll);
    }
  }, [ref, calculateScrollProgress]);

  return scrollProgress;
};

// Debounce function for performance-critical events
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle function to limit event frequency
export const useThrottle = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now - lastRan.current >= limit) {
      setThrottledValue(value);
      lastRan.current = now;
    }
  }, [value, limit]);

  return throttledValue;
}; 