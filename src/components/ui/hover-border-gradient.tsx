"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

interface HoverBorderGradientProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
  children?: React.ReactNode;
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  duration = 1,
  clockwise = true,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (current: Direction): Direction => {
    const dirs: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const i = dirs.indexOf(current);
    return clockwise
      ? dirs[(i - 1 + dirs.length) % dirs.length]
      : dirs[(i + 1) % dirs.length];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, white 0%, transparent 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, white 0%, transparent 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, white 0%, transparent 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.2% at 100% 50%, white 0%, transparent 100%)",
  };

  const highlight =
    "radial-gradient(75% 181% at 50% 50%, #3275F8 0%, transparent 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prev) => rotateDirection(prev));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration]);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center justify-center p-px w-fit overflow-visible",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10 bg-black py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden"
        style={{ filter: "blur(2px)" }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />
      <div className="absolute inset-[2px] z-1 bg-black rounded-[100px]" />
    </button>
  );
}