"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa6";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Check if user has scrolled to the bottom of the page
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      // Show button when scrolled down 300 pixels or at bottom of page
      if (window.scrollY > 300 || scrolledToBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    // Use global smoothScrollTo method from Lenis provider
    if ((window as any).smoothScrollTo) {
      (window as any).smoothScrollTo("hero", {
        duration: 1.2,
        offset: 0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
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
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-cyan-500/30 backdrop-blur-lg border border-cyan-400/40 
          hover:bg-cyan-500/40 text-cyan-600 dark:text-cyan-300 
          rounded-full p-3 shadow-xl hover:shadow-cyan-500/35 
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
