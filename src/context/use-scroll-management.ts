"use client";

import { useState, useEffect, useRef } from 'react';
import { useMobileDetect, useDebounce } from '@/lib/performance-hooks';

export const useScrollManagement = (content: any[], contentHeight: number) => {
  const [activeCard, setActiveCard] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(Date.now());
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollYProgress = useRef(0);
  const isMobile = useMobileDetect();
  const debouncedScrollY = useDebounce(scrollY, 50);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const containerTop = containerRef.current?.offsetTop || 0;
      const containerHeight = containerRef.current?.offsetHeight || 0;

      if (containerHeight > 0) {
        const progress = Math.min(
          1,
          Math.max(0, (currentScroll - containerTop) / containerHeight)
        );
        scrollYProgress.current = progress;
        setScrollY(progress * 100);

        const cardLength = content.length;
        const cardHeight = 1 / cardLength;

        const newActiveCard = Math.min(
          cardLength - 1,
          Math.floor(progress / cardHeight)
        );

        if (newActiveCard !== activeCard) {
          setIsScrolling(true);
          setActiveCard(newActiveCard);

          setTimeout(() => {
            setIsScrolling(false);
          }, 600);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      updateScrollProgress();
      window.addEventListener('scroll', updateScrollProgress);
      window.addEventListener('resize', updateScrollProgress);
    }

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [activeCard, content.length]);

  // Scroll snapping logic
  useEffect(() => {
    const handleScrollSnap = () => {
      if (!containerRef.current || isSnapping) return;

      const containerHeight = contentHeight * content.length;
      const scrollPosition =
        window.scrollY - (containerRef.current.offsetTop || 0);
      const currentSection = Math.round(scrollPosition / contentHeight);

      if (currentSection >= 0 && currentSection < content.length) {
        setIsSnapping(true);
        const targetScrollPosition =
          (containerRef.current.offsetTop || 0) +
          currentSection * contentHeight;

        window.scrollTo({
          top: targetScrollPosition,
          behavior: 'smooth',
        });

        setTimeout(() => {
          setIsSnapping(false);
        }, 800);
      }
    };

    let scrollDebounce: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(handleScrollSnap, 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollDebounce);
    };
  }, [content.length, contentHeight, isSnapping]);

  return {
    activeCard,
    isScrolling,
    isSnapping,
    scrollY,
    containerRef,
    stickyRef,
    isMobile,
    debouncedScrollY,
  };
}; 