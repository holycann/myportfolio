"use client";

import React, { useState, ReactElement, useCallback } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

// Throttle function to limit execution frequency
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation?: string;
    element: ReactElement;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  // Use lighter spring animation
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-20, 20]), // Reduced rotation range
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-25, 25]), // Reduced translation range
    springConfig
  );

  // Throttled mouse move handler
  const handleMouseMove = useCallback(
    throttle((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = event.currentTarget;
      const halfWidth = target.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    }, 16), // ~60fps
    [x]
  );

  return (
    <>
      {items.map((item) => (
        <div
          className="group relative inline-block"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX,
                  rotate,
                  whiteSpace: "nowrap",
                  willChange: "transform, opacity",
                }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="relative z-30 text-xs font-bold text-white">
                  {item.name}
                </div>
                <div className="text-xs text-white">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="transition group-hover:scale-105 group-hover:z-30"
            style={{
              willChange: hoveredIndex === item.id ? "transform" : "auto",
            }}
          >
            {item.element}
          </div>
        </div>
      ))}
    </>
  );
};
