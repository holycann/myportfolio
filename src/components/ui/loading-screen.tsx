"use client";

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Transition, Easing } from 'motion/react';

export const LoadingScreen = React.memo(() => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize progress calculation to reduce unnecessary re-renders
  const calculateProgress = useCallback((prev: number) => {
    const newProgress = prev + Math.random() * 10;
    return newProgress >= 100 ? 100 : newProgress;
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame for smoother progress updates
    let animationFrameId: number;
    let startTime: number | null = null;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      setProgress(prev => {
        const newProgress = calculateProgress(prev);
        
        if (newProgress >= 100) {
          // Add small delay before hiding loading screen
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        
        // Continue animation if not complete
        animationFrameId = requestAnimationFrame(updateProgress);
        return newProgress;
      });
    };

    // Start progress animation
    animationFrameId = requestAnimationFrame(updateProgress);

    // Cleanup function
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [calculateProgress]);

  // Memoize logo animation properties
  const logoAnimation = useMemo(() => ({
    scale: [1, 1.2, 1],
    rotate: [0, 10, -10, 0]
  }), []);

  const logoTransition: Transition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as Easing
  };

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      // Added fixed positioning with z-index for proper overlay
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-black"
    >
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          animate={logoAnimation}
          transition={logoTransition}
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={256}
            height={256}
            priority
            quality={100}
            className="object-contain w-full h-full"
          />
        </motion.div>
      </div>

      <div className="w-64 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary-dark)]"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <motion.p 
        className="mt-4 text-sm text-gray-600 dark:text-gray-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Loading...
      </motion.p>
    </motion.div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen; 