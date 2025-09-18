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

export interface AnimatedTooltipProps {
  items: {
    id: number;
    name: string;
    designation?: string;
    element: ReactElement;
  }[];
  tooltipClassName?: string;
  tooltipContentClassName?: string;
  tooltipNameClassName?: string;
  tooltipDesignationClassName?: string;
  springConfig?: { stiffness: number; damping: number };
  rotationRange?: number;
  translationRange?: number;
  throttleLimit?: number;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  tooltipStyle?: React.CSSProperties;
  itemWrapperClassName?: string;
  itemWrapperStyle?: React.CSSProperties;
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  items,
  tooltipClassName = "absolute z-50 flex flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl -top-16 left-1/2 -translate-x-1/2",
  tooltipContentClassName = "relative z-30 text-xs font-bold text-white",
  tooltipNameClassName = "",
  tooltipDesignationClassName = "text-xs text-white",
  springConfig = { stiffness: 100, damping: 5 },
  rotationRange = 20,
  translationRange = 25,
  throttleLimit = 16,
  tooltipPosition = 'top',
  tooltipStyle = {},
  itemWrapperClassName = "group relative inline-block",
  itemWrapperStyle = {},
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const x = useMotionValue(0);

  // Use configurable spring animation
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-rotationRange, rotationRange]), 
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-translationRange, translationRange]), 
    springConfig
  );

  // Throttled mouse move handler
  const handleMouseMove = useCallback(
    throttle((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = event.currentTarget;
      const halfWidth = target.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    }, throttleLimit),
    [x]
  );

  // Dynamic positioning classes
  const positionClasses = {
    top: "-top-16 left-1/2 -translate-x-1/2",
    bottom: "-bottom-16 left-1/2 -translate-x-1/2",
    left: "left-full top-1/2 -translate-y-1/2 ml-2",
    right: "right-full top-1/2 -translate-y-1/2 mr-2"
  };

  return (
    <>
      {items.map((item) => (
        <div
          className={itemWrapperClassName}
          style={itemWrapperStyle}
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
                  ...tooltipStyle
                }}
                className={`${tooltipClassName} ${positionClasses[tooltipPosition]}`}
              >
                <div className={`${tooltipContentClassName} ${tooltipNameClassName}`}>
                  {item.name}
                </div>
                {item.designation && (
                  <div className={tooltipDesignationClassName}>
                    {item.designation}
                  </div>
                )}
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
