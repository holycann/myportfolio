"use client";

import { motion, AnimatePresence } from "motion/react";

import { useEffect, useState } from "react";

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

  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div className="mx-auto max-w-sm px-4 pt-10 md:pt-30 font-sans antialiased md:max-w-7xl">
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
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : images.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    width={500}
                    height={500}
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
