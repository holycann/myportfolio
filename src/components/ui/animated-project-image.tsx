"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ProjectImageCard = {
  alt: string;
  src: string;
};

export const AnimatedProjectImage = ({
  projectImage,
  autoplay = true,
}: {
  projectImage: ProjectImageCard[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % projectImage.length);
  };

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

  return (
    <div 
      className="px-4 font-sans antialiased md:max-w-4xl"
      ref={containerRef}
    >
      <div className="grid grid-cols-1">
        <div>
          <div className="w-full">
            <AnimatePresence>
              {projectImage.map((image, index) => (
                <motion.div
                  key={`${image.src}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0,
                    scale: isActive(index) ? 1 : 0.95,
                    zIndex: isActive(index) ? 40 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Image
                    src={image.src}
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
      </div>
    </div>
  );
};
