"use client";
import React, { useRef, useState, useEffect } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { FaGithub, FaLink, FaCode } from "react-icons/fa6";
import { MyButton } from "./mybutton";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    githubUrl?: string;
    webUrl?: string;
    description: string;
    features: string[];
    techStack: string[];
    content?: React.ReactNode;
    backgroundImage?: string;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(500);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const lastScrollTime = useRef(Date.now());
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll tracking for the entire page
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate content height
  useEffect(() => {
    const calculateHeight = () => {
      const estimatedHeight = Math.max(
        500, // Minimum height
        Math.min(
          window.innerHeight * 0.8, // Maximum height (80% of viewport)
          content.reduce((max, item) => {
            const tempDiv = document.createElement("div");
            tempDiv.style.position = "absolute";
            tempDiv.style.visibility = "hidden";
            tempDiv.style.width = "calc(50% - 40px)";
            tempDiv.innerHTML = `
              <h2>${item.title}</h2>
              <p>${item.description}</p>
              <ul>${item.features.map((f) => `<li>${f}</li>`).join("")}</ul>
            `;
            document.body.appendChild(tempDiv);
            const height = tempDiv.scrollHeight;
            document.body.removeChild(tempDiv);
            return Math.max(max, height);
          }, 0) + 100 // Add some padding
        )
      );

      setContentHeight(estimatedHeight);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, [content]);

  // Set up wheel event for controlled scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isSnapping) {
        e.preventDefault();
        return;
      }

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;

      // If we've recently scrolled and changed sections, prevent immediate scrolling
      if (timeSinceLastScroll < 800 && isScrolling) {
        e.preventDefault();
        return;
      }

      lastScrollTime.current = now;

      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };

    const container = containerRef.current;
    if (container) {
      // Using passive: false to allow preventDefault
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isScrolling, isSnapping]);

  // Handle scroll snapping
  useEffect(() => {
    const handleScrollSnap = () => {
      if (!containerRef.current || isSnapping) return;

      const containerHeight = contentHeight * content.length;
      const scrollPosition =
        window.scrollY - (containerRef.current.offsetTop || 0);
      const currentSection = Math.round(scrollPosition / contentHeight);

      if (currentSection >= 0 && currentSection < content.length) {
        setIsSnapping(true);
        const targetScrollPosition =
          (containerRef.current.offsetTop || 0) +
          currentSection * contentHeight;

        window.scrollTo({
          top: targetScrollPosition,
          behavior: "smooth",
        });

        // After scrolling completes
        setTimeout(() => {
          setIsSnapping(false);
        }, 800); // Slightly longer than scroll animation
      }
    };

    // Debounce scroll events
    let scrollDebounce: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(handleScrollSnap, 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollDebounce);
    };
  }, [content.length, contentHeight, isSnapping]);

  // Track active card based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardLength = content.length;
    const cardHeight = 1 / cardLength;

    // Calculate which card should be active based on scroll progress
    const newActiveCard = Math.min(
      cardLength - 1,
      Math.floor(latest / cardHeight)
    );

    if (newActiveCard !== activeCard) {
      setIsScrolling(true);
      setActiveCard(newActiveCard);

      // Reset scrolling state after animation
      setTimeout(() => {
        setIsScrolling(false);
      }, 600); // Match the animation duration
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        height: `${contentHeight * content.length}px`,
        position: "relative",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      {content.map((_, index) => (
        <div
          key={`scroll-anchor-${index}`}
          className="absolute w-full"
          style={{
            top: `${index * contentHeight}px`,
            height: "2px",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            zIndex: -1,
          }}
        />
      ))}
      <div
        ref={stickyRef}
        className="sticky w-full"
        style={{
          height: `${contentHeight}px`,
          position: "sticky",
          top: `calc(50% - ${contentHeight / 2}px)`,
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center space-x-0 md:space-x-10 py-10 px-4 md:px-10"
          style={{
            height: "100%",
            maxHeight: `${contentHeight}px`,
          }}
        >
          <div className="relative items-center px-2 md:px-4 w-full">
            <AnimatePresence mode="wait">
              {content.map(
                (item, index) =>
                  index === activeCard && (
                    <motion.div
                      key={item.title + index}
                      initial={{
                        opacity: 0,
                        y: isScrolling ? (index > activeCard ? 50 : -50) : 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: isScrolling ? (index > activeCard ? -50 : 50) : -20,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className={cn(
                        "absolute inset-0 p-6 rounded-2xl transition-all duration-300 overflow-y-auto flex flex-col justify-center items-start",
                        "bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 shadow-2xl"
                      )}
                      style={{
                        maxHeight: `${contentHeight}px`,
                      }}
                    >
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center"
                      >
                        {item.title}
                        {item.githubUrl && (
                          <motion.a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="ml-4 text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400"
                          >
                            <FaGithub size={24} />
                          </motion.a>
                        )}
                        {item.webUrl && (
                          <motion.a
                            href={item.webUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="ml-2 text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400"
                          >
                            <FaLink size={24} />
                          </motion.a>
                        )}
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-base mb-4 text-justify text-neutral-600 dark:text-neutral-300"
                      >
                        {item.description}
                      </motion.p>

                      <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-lg mb-2 font-semibold text-neutral-700 dark:text-neutral-200"
                      >
                        Features:
                      </motion.h3>
                      <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-base max-w-sm text-neutral-600 dark:text-neutral-300 mb-4 space-y-2"
                      >
                        {item.features.map((feature, featureIndex) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay: 0.5 + featureIndex * 0.1,
                              duration: 0.3,
                            }}
                            className="flex items-center"
                          >
                            <FaCode className="mr-2 text-blue-500" />
                            {feature}
                          </motion.li>
                        ))}
                      </motion.ul>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.techStack.map((tech) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                          >
                            <MyButton
                              text={tech}
                              className="text-xs px-2 py-1"
                            />
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex justify-end items-center">
                        <div className="text-sm text-neutral-500">
                          {activeCard + 1} / {content.length}
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          <div
            className={cn(
              "sticky top-0 hidden w-full overflow-hidden rounded-3xl lg:block",
              contentClassName
            )}
            style={{
              height: `${contentHeight}px`,
            }}
          >
            <AnimatePresence mode="wait">
              {content.map(
                (item, index) =>
                  index === activeCard && (
                    <motion.div
                      key={`content-${index}`}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        y: isScrolling ? (index > activeCard ? 50 : -50) : 0,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        backgroundImage: item.backgroundImage
                          ? `url(${item.backgroundImage})`
                          : "none",
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        y: isScrolling ? (index > activeCard ? -50 : 50) : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="w-full h-full bg-cover bg-center rounded-3xl shadow-2xl"
                      style={{
                        height: `${contentHeight}px`,
                      }}
                    >
                      <div className="absolute bottom-4 right-4 bg-black/30 text-white px-2 py-1 rounded-lg text-sm backdrop-blur-sm">
                        {activeCard + 1} / {content.length}
                      </div>
                      {item.content ?? null}
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
