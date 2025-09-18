"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { createPlaceHolder } from "@/lib/utils";

export type AboutImages = {
  url: string;
  alt: string;
};

export const AnimatedImageAbout = ({
  images,
  autoplay = true,
  children,
}: {
  images: AboutImages[];
  autoplay?: boolean;
  children?: React.ReactNode;
}) => {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    // Use Intersection Observer to only animate when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Only start autoplay when component is visible
    if (autoplay && isVisible) {
      intervalRef.current = setInterval(handleNext, 5000);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
    
    // Clear interval when not visible
    if (!isVisible && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, isVisible]);

  // Simplified animation - removed complex transforms
  return (
    <div 
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
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0,
                    scale: isActive(index) ? 1 : 0.95,
                    zIndex: isActive(index) ? 40 : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Image
                    src={image.url === "" ? createPlaceHolder(image.alt || "Default Image") : image.url}
                    alt={image.alt}
                    width={500}
                    height={500}
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
    </div>
  );
};
