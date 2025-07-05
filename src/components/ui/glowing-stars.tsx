"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useEffect, useMemo, useRef, useState } from "react";

export const GlowingStarsBackground = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[-1] overflow-hidden pointer-events-none",
        className
      )}
    >
      <div 
        className="absolute inset-0"
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        <Illustration mouseEnter={mouseEnter} />
      </div>
      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export const Illustration = React.memo(({ mouseEnter }: { mouseEnter: boolean }) => {
  const stars = 250;
  const columns = 25;

  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const highlightedStars = useRef<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 5 }, () => 
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const starGrid = useMemo(() => {
    return [...Array(stars)].map((_, starIdx) => {
      const isGlowing = glowingStars.includes(starIdx);
      const delay = (starIdx % 10) * 0.1;
      const staticDelay = starIdx * 0.01;

      return (
        <div
          key={starIdx}
          className="relative flex items-center justify-center"
        >
          <Star
            isGlowing={mouseEnter ? true : isGlowing}
            delay={mouseEnter ? staticDelay : delay}
          />
          {(mouseEnter || isGlowing) && <Glow delay={delay} />}
        </div>
      );
    });
  }, [glowingStars, mouseEnter]);

  return (
    <div
      className="absolute inset-0 opacity-50"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `1px`,
      }}
    >
      {starGrid}
    </div>
  );
});

Illustration.displayName = 'Illustration';

const Star = React.memo(({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
  return (
    <motion.div
      key={delay}
      initial={{ scale: 2 }}
      animate={{
        scale: isGlowing ? [1, 2, 3, 4, 1] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn("bg-[#666] h-[1px] w-[1px] rounded-full relative z-20")}
    />
  );
});

Star.displayName = 'Star';

const Glow = React.memo(({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        delay: delay,
      }}
      className="absolute left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-blue-500 blur-[1px] shadow-2xl shadow-blue-400"
    />
  );
});

Glow.displayName = 'Glow';

export default GlowingStarsBackground;