"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export const ScrollToTop = () => {
  const { scrollToTop, isScrollToTopVisible } = useSmoothScroll();

  return (
    <AnimatePresence>
      {isScrollToTopVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ 
            duration: 0.5, 
            ease: "anticipate",
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
          onClick={() => scrollToTop()}
          className="fixed bottom-6 right-6 z-50 
          bg-[var(--color-secondary-light)] bg-opacity-30 backdrop-blur-lg 
          border border-[var(--color-secondary-dark)]/40 
          hover:bg-[var(--color-secondary-light)]/40 
          text-[var(--color-text-primary)] 
          dark:bg-[var(--color-secondary-dark)] dark:bg-opacity-30 
          dark:border-[var(--color-secondary-light)]/40 
          dark:hover:bg-[var(--color-secondary-dark)]/40 
          dark:text-[var(--color-text-secondary)] 
          rounded-full p-3 
          shadow-xl hover:shadow-[var(--color-secondary-dark)]/35 
          dark:hover:shadow-[var(--color-secondary-light)]/35 
          transition-all duration-400 ease-in-out 
          flex items-center justify-center"
          aria-label="Scroll to Top"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 11L12 6L17 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 7L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;