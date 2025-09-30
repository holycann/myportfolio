"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(timer);
          // Add a small delay before hiding the loading screen
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-black"
    >
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
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
};

export default LoadingScreen; 