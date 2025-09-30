"use client";

import React, { 
  useEffect, 
  useState, 
  useRef, 
  useMemo, 
  useCallback 
} from "react";
import { motion, AnimatePresence, Transition, Easing } from "framer-motion";
import Image from "next/image";
import { createPlaceHolder } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

/**
 * Configuration for animated image carousel
 * Provides default settings and performance optimizations
 */
const ANIMATED_IMAGE_CONFIG = {
  autoplay: {
    interval: 5000,
    threshold: 0.1
  },
  image: {
    width: 500,
    height: 500,
    sizes: "(max-width: 768px) 100vw, 500px"
  },
  animation: {
    duration: 0.4,
    ease: "easeInOut" as Easing
  }
};

/**
 * Image configuration for About section
 * Provides type safety and additional metadata
 */
export interface AboutImages {
  url: string;
  alt: string;
  priority?: boolean;
}

/**
 * Props for AnimatedImageAbout component
 * Supports flexible image carousel configuration
 */
interface AnimatedImageAboutProps {
  images: AboutImages[];
  autoplay?: boolean;
  children?: React.ReactNode;
}

/**
 * Animated Image Carousel Component
 * Displays a dynamic, responsive image carousel with visibility-based autoplay
 * 
 * @component
 * @param {AnimatedImageAboutProps} props - Configuration for image carousel
 */
export const AnimatedImageAbout: React.FC<AnimatedImageAboutProps> = React.memo(({
  images,
  autoplay = true,
  children,
}) => {
  // Use react-intersection-observer for visibility tracking
  const { ref: containerRef, inView } = useInView({
    threshold: ANIMATED_IMAGE_CONFIG.autoplay.threshold,
    triggerOnce: false
  });

  // State and refs for image cycling
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoized image cycling handler
  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Memoized active state checker
  const isActive = useCallback((index: number) => index === active, [active]);

  // Manage autoplay based on visibility
  useEffect(() => {
    if (autoplay && inView) {
      intervalRef.current = setInterval(handleNext, ANIMATED_IMAGE_CONFIG.autoplay.interval);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
    
    // Clear interval when not visible
    if (!inView && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, inView, handleNext]);

  // Memoized animation variants
  const animationVariants = useMemo(() => {
    const transition: Transition = {
      duration: ANIMATED_IMAGE_CONFIG.animation.duration,
      ease: ANIMATED_IMAGE_CONFIG.animation.ease
    };

    return {
      initial: {
        opacity: 0,
        scale: 0.9,
      },
      animate: (index: number) => ({
        opacity: isActive(index) ? 1 : 0,
        scale: isActive(index) ? 1 : 0.95,
        zIndex: isActive(index) ? 40 : 0,
      }),
      exit: {
        opacity: 0,
        scale: 0.9,
      },
      transition
    };
  }, [isActive]);

  return (
    <section 
      className="mx-auto max-w-sm p-4 font-sans antialiased md:max-w-7xl"
      ref={containerRef}
    >
      <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-96 md:h-[36rem] w-full">
            <AnimatePresence>
              {images.map((image, index) => (
                <motion.div
                  key={image.url}
                  initial={animationVariants.initial}
                  animate={animationVariants.animate(index)}
                  exit={animationVariants.exit}
                  transition={animationVariants.transition}
                  className="absolute inset-0 origin-bottom"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Image
                    src={image.url === "" ? createPlaceHolder(image.alt || "Default Image") : image.url}
                    alt={image.alt}
                    width={ANIMATED_IMAGE_CONFIG.image.width}
                    height={ANIMATED_IMAGE_CONFIG.image.height}
                    sizes={ANIMATED_IMAGE_CONFIG.image.sizes}
                    priority={image.priority || index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
});

AnimatedImageAbout.displayName = 'AnimatedImageAbout';
