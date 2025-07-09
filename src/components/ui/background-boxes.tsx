"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAnimationWorker } from "@/context/use-animation-worker";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  // Reduced from 150x100 to 50x30 (85% reduction in DOM elements)
  const rows = new Array(50).fill(1);
  const cols = new Array(30).fill(1);
  const colors = [
    "#93c5fd",
    "#f9a8d4",
    "#86efac",
    "#fde047",
    "#fca5a5",
    "#d8b4fe",
    "#93c5fd",
    "#a5b4fc",
    "#c4b5fd",
  ];
  
  // Added state for client-side rendering to avoid hydration issues
  const [isClient, setIsClient] = useState(false);
  
  // Use web worker to calculate colors with a consistent seed
  const { result: colorCache, loading, isClient: workerIsClient } = useAnimationWorker<string[][]>({
    type: 'calculateBoxColors',
    payload: { 
      rows: rows.length, 
      cols: cols.length, 
      colors,
      seed: 42 // Use consistent seed for server/client rendering
    },
    dependencies: []
  });

  // Fallback to client-side calculation if worker fails
  const colorCacheRef = useRef<string[][]>([]);
  
  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);
    
    // If worker result is available, use it
    if (colorCache) {
      colorCacheRef.current = colorCache;
    } 
    // Otherwise calculate on client side if needed
    else if (colorCacheRef.current.length === 0) {
      // Use a deterministic seed for server/client consistency
      const seed = 42;
      let randomValue = seed;
      
      // Simple deterministic random function
      const seededRandom = () => {
        randomValue = (randomValue * 9301 + 49297) % 233280;
        return randomValue / 233280;
      };
      
      rows.forEach((_, i) => {
        colorCacheRef.current[i] = [];
        cols.forEach((_, j) => {
          const colorIndex = Math.floor(seededRandom() * colors.length);
          colorCacheRef.current[i][j] = colors[colorIndex];
        });
      });
    }
  }, [colorCache, colors, rows, cols]);

  const getRandomColor = (i: number, j: number) => {
    if (!isClient) return colors[0]; // Default color for server rendering
    return colorCacheRef.current[i]?.[j] || colors[0];
  };

  // Show a reduced version while loading or during server rendering
  if (!isClient || loading) {
    return (
      <div
        style={{
          transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
          willChange: "transform",
        }}
        className={cn(
          "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
          className,
        )}
        {...rest}
      >
        {/* Simplified version while loading */}
        {new Array(10).fill(1).map((_, i) => (
          <div
            key={`row-loading-${i}`}
            className="relative h-8 w-16 border-l border-slate-700"
          >
            {new Array(10).fill(1).map((_, j) => (
              <div
                key={`col-loading-${j}`}
                className="relative h-8 w-16 border-t border-r border-slate-700"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
        willChange: "transform", // Hardware acceleration hint
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="relative h-8 w-16 border-l border-slate-700"
          style={{ contain: "paint" }} // Optimize paint performance
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(i, j),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="relative h-8 w-16 border-t border-r border-slate-700"
              style={{ 
                willChange: "background-color",
                // Only show + icon on every 4th element to reduce DOM complexity
                backgroundImage: j % 4 === 0 && i % 4 === 0 ? "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"%23475569\" class=\"w-6 h-6\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 6v12m6-6H6\" /></svg>')" : "none",
                backgroundPosition: "-6px -6px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "24px 24px",
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export const Boxes = React.memo(BoxesCore);