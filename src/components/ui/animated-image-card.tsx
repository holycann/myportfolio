"use client";

import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPlaceHolder } from "@/lib/utils";

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Utility function to generate consistent random rotation
const getConsistentRandomRotation = (seed: string, maxRotation: number = 5) => {
  // Simple hash function to generate a consistent "random" number
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  // Use the hash to generate a consistent rotation between -maxRotation and +maxRotation
  const rotation = (hashCode(seed) % (maxRotation * 2)) - maxRotation;
  return rotation;
};

export const AnimatedImageCard = ({ images }: { images: ImageProps[] }) => {
  const [active, setActive] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleActive = useCallback(() => {
    setActive((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const isActive = (index: number) => {
    return index === active;
  };

  // Use Intersection Observer to only animate when visible
  useEffect(() => {
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
    if (images.length <= 0) return;
    
    // Only animate when visible
    if (isVisible) {
      timerRef.current = setInterval(handleActive, 5000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [handleActive, images.length, isVisible]);

  return (
    <div 
      className="mx-auto max-w-sm px-4 py-10 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12"
      ref={containerRef}
    >
      <div className="relative">
        <div>
          <div className="relative h-120 w-80">
            <AnimatePresence>
              {images.map((image, i) => (
                <motion.div
                  key={image.src}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.9,
                    rotateY: getConsistentRandomRotation(image.src)
                  }}
                  animate={{
                    opacity: isActive(i) ? 1 : 0,
                    scale: isActive(i) ? 1 : 0.95,
                    zIndex: isActive(i) ? 40 : 0,
                    rotateY: isActive(i) ? 0 : getConsistentRandomRotation(image.src)
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.9,
                    rotateY: getConsistentRandomRotation(image.src)
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Image
                    src={image.src === "" ? createPlaceHolder(image.alt || "Default Image") : image.src}
                    alt={image.alt}
                    width={image.width || 800}
                    height={image.height || 600}
                    loading={i === 0 ? "eager" : "lazy"}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
