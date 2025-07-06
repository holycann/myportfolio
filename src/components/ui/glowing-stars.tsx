"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAnimationWorker } from "@/lib/use-animation-worker";

// Star position type from worker
type StarPosition = {
  x: number;
  y: number;
  size: number;
  delay: number;
  glowChance: boolean;
};

// Throttle function to limit execution frequency
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const GlowingStarsBackground = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  // Add client-side rendering state to avoid hydration issues
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Throttle the mouse events to improve performance
  const handleMouseEnter = useCallback(
    throttle(() => setMouseEnter(true), 100),
    []
  );
  
  const handleMouseLeave = useCallback(
    throttle(() => setMouseEnter(false), 100),
    []
  );

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[-1] overflow-hidden pointer-events-none",
        className
      )}
    >
      <div 
        className="absolute inset-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Illustration mouseEnter={mouseEnter} isClient={isClient} />
      </div>
      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export const Illustration = React.memo(({ 
  mouseEnter, 
  isClient 
}: { 
  mouseEnter: boolean;
  isClient: boolean;
}) => {
  // Reduced from 250 to 100 stars (60% reduction)
  const stars = 100;
  const columns = 20;
  // Use consistent seed for deterministic rendering
  const SEED = 42;

  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const [starPositions, setStarPositions] = useState<StarPosition[]>([]);
  const highlightedStars = useRef<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get container dimensions for star positioning
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
  
  useEffect(() => {
    if (!isClient) return;
    
    if (containerRef.current) {
      const updateDimensions = throttle(() => {
        const { width, height } = containerRef.current?.getBoundingClientRect() || { width: 1000, height: 1000 };
        setDimensions({ width, height });
      }, 200);
      
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, [isClient]);
  
  // Use web worker to calculate star positions with consistent seed
  const { result: workerStarPositions } = useAnimationWorker<StarPosition[]>({
    type: 'calculateStarPositions',
    payload: { 
      count: stars,
      width: dimensions.width,
      height: dimensions.height,
      seed: SEED // Use consistent seed for server/client rendering
    },
    dependencies: [dimensions.width, dimensions.height]
  });
  
  // Update star positions when worker results are available
  useEffect(() => {
    if (isClient && workerStarPositions) {
      setStarPositions(workerStarPositions);
    }
  }, [workerStarPositions, isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    // Initial random stars with deterministic seed for consistency
    const seed = SEED;
    let randomValue = seed;
    
    // Simple deterministic random function
    const seededRandom = () => {
      randomValue = (randomValue * 9301 + 49297) % 233280;
      return randomValue / 233280;
    };
    
    // Generate consistent initial glowing stars
    highlightedStars.current = Array.from({ length: 5 }, () => 
      Math.floor(seededRandom() * stars)
    );
    setGlowingStars([...highlightedStars.current]);
    
    // Set interval for star animation
    intervalRef.current = setInterval(() => {
      // For subsequent animations, we can use Math.random() since hydration is complete
      highlightedStars.current = Array.from({ length: 5 }, () => 
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 5000);

    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stars, isClient, SEED]);

  // Render stars based on calculated positions
  const renderedStars = useMemo(() => {
    // Server-side or initial client render before worker results
    if (!isClient || !starPositions || starPositions.length === 0) {
      // Fallback simple grid if worker results aren't available yet
      return (
        <div
          className="absolute inset-0 opacity-50"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `1px`,
            transformStyle: 'preserve-3d',
          }}
          ref={containerRef}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`loading-star-${i}`} className="relative">
              <div className="bg-[#666] h-[1px] w-[1px] rounded-full" />
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div
        className="absolute inset-0 opacity-50"
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
        ref={containerRef}
      >
        {starPositions.map((position, index) => {
          const isGlowing = glowingStars.includes(index) || position.glowChance;
          
          return (
            <div
              key={`star-${index}`}
              style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translateZ(0)',
                willChange: 'transform',
              }}
            >
              <Star
                isGlowing={mouseEnter ? true : isGlowing}
                delay={mouseEnter ? position.delay * 0.5 : position.delay}
                size={position.size}
              />
              {(mouseEnter || isGlowing) && <Glow delay={position.delay} />}
            </div>
          );
        })}
      </div>
    );
  }, [starPositions, glowingStars, mouseEnter, columns, isClient]);

  return renderedStars;
});

Illustration.displayName = 'Illustration';

const Star = React.memo(({ 
  isGlowing, 
  delay, 
  size = 1 
}: { 
  isGlowing: boolean; 
  delay: number;
  size?: number;
}) => {
  return (
    <motion.div
      key={delay}
      initial={{ scale: size }}
      animate={{
        scale: isGlowing ? [size, size * 2, size * 3, size * 2, size] : size,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn("bg-[#666] h-[1px] w-[1px] rounded-full relative z-20")}
      style={{ willChange: 'transform, background' }}
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
      style={{ willChange: 'opacity' }}
    />
  );
});

Glow.displayName = 'Glow';

export default GlowingStarsBackground;