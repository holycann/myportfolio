"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectItem } from "@/types/project";
import { cn } from "@/lib/utils";
import { FaGithub, FaLink } from "react-icons/fa";
import { Carousel } from "@/components/ui/carousel";
import { AnimatedTechStack } from "./animated-tech-stack";
import {
  BrowserMockup,
  PhoneMockup,
  WindowMockup,
} from "@/components/ui/device-mockups";
import { ProjectBadge } from "./ProjectBadge";
import { ProjectStatus } from "./ProjectStatus";
import { useMobileDetect, useDebounce } from "@/lib/performance-hooks";
import { FullDescriptionModal } from "./FullDescriptionModal";
import { ProgressBar } from "@/components/ui/progress-bar";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: ProjectItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentCarouselImages, setCurrentCarouselImages] = useState<
    {
      src: string;
      title: string;
      button: string;
      device?: "phone" | "window" | "default";
      deviceColor?: string;
    }[]
  >([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const stickyRef = React.useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(window.innerHeight);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const lastScrollTime = React.useRef(Date.now());
  const scrollTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const isMobile = useMobileDetect();
  const [layoutType, setLayoutType] = useState<
    "layout1" | "layout2" | "layout3"
  >("layout1");
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  // Debounce scroll progress to reduce unnecessary re-renders
  const debouncedScrollY = useDebounce(scrollY, 50);

  // Scroll tracking for the entire page
  const scrollYProgress = useRef(0);
  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const containerTop = containerRef.current?.offsetTop || 0;
      const containerHeight = containerRef.current?.offsetHeight || 0;
      const windowHeight = window.innerHeight;

      if (containerHeight > 0) {
        const progress = Math.min(
          1,
          Math.max(0, (currentScroll - containerTop) / containerHeight)
        );
        scrollYProgress.current = progress;
        setScrollY(progress * 100);

        const cardLength = content.length;
        const cardHeight = 1 / cardLength;

        // Calculate which card should be active based on scroll progress
        const newActiveCard = Math.min(
          cardLength - 1,
          Math.floor(progress / cardHeight)
        );

        if (newActiveCard !== activeCard) {
          setIsScrolling(true);
          setActiveCard(newActiveCard);

          // Reset scrolling state after animation
          setTimeout(() => {
            setIsScrolling(false);
          }, 600); // Match the animation duration
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      updateScrollProgress();
      window.addEventListener("scroll", updateScrollProgress);
      window.addEventListener("resize", updateScrollProgress);
    }

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [activeCard, content.length]);

  // Calculate content height
  React.useEffect(() => {
    const calculateHeight = () => {
      setContentHeight(window.innerHeight);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  // Set up wheel event for controlled scrolling
  React.useEffect(() => {
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
  React.useEffect(() => {
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

  // Cycle through layouts for each card
  React.useEffect(() => {
    // Cycle through different layouts based on activeCard
    const layoutIndex = activeCard % 3;
    setLayoutType(
      layoutIndex === 0 ? "layout1" : layoutIndex === 1 ? "layout2" : "layout3"
    );
  }, [activeCard]);

  // Calculate parallax transformations based on scroll position
  const getParallaxStyles = (index: number) => {
    // Calculate how far through this section we've scrolled (0 to 1)
    const cardLength = content.length;
    const cardHeight = 1 / cardLength;
    const cardStart = index * cardHeight;
    const cardEnd = (index + 1) * cardHeight;
    const cardProgress = Math.max(
      0,
      Math.min(1, (scrollYProgress.current - cardStart) / cardHeight)
    );

    // Different transformations based on layout type
    if (layoutType === "layout1") {
      return {
        phoneTransform: `translateY(${(cardProgress - 0.5) * -50}px) rotateY(${cardProgress * 10}deg)`,
        contentTransform: `translateY(${(cardProgress - 0.5) * 30}px)`,
      };
    } else if (layoutType === "layout2") {
      return {
        phoneTransform: `translateY(${(cardProgress - 0.5) * 30}px) rotateX(${cardProgress * 5}deg)`,
        contentTransform: `translateY(${(cardProgress - 0.5) * -20}px)`,
      };
    } else {
      return {
        phoneTransform: `translateX(${(cardProgress - 0.5) * -40}px) rotateZ(${cardProgress * 3}deg)`,
        contentTransform: `translateX(${(cardProgress - 0.5) * 20}px)`,
      };
    }
  };

  // Modify the renderContent function to handle tech stack icons
  const renderContent = (item: ProjectItem, index: number) => {
    const handleImageClick = () => {
      if (item.images && item.images.length > 0) {
        const carouselSlides = item.images.map((img, imgIndex) => ({
          title: `${item.title} - Image ${imgIndex + 1}`,
          button: "View Image",
          src: img.src,
        }));

        setCurrentCarouselImages(carouselSlides);
        setIsCarouselOpen(true);
      }
    };

    // Check if the current item is the active card
    if (index !== activeCard) return null;

    // Layout 1: Original layout (for first project)
    if (index === 0) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full relative">
          {/* Animated Tech Stack */}
          <AnimatedTechStack
            techStack={item.techStack}
            className="flex flex-col absolute top-1/2 left-0 transform -translate-y-1/2 z-20 space-y-4"
            iconSize="sm"
          />

          {/* Phone Mockup with Scrollable and Clickable Images */}
          {item.images && item.images.length > 0 ? (
            <PhoneMockup
              images={item.images.map((img) => ({
                src: img.src,
                alt: img.alt,
              }))}
              title={item.title}
              onImageClick={handleImageClick}
              orientation="vertical"
            />
          ) : (
            <div className="relative mockup-phone border-5 p-2 border-cyan-600 outline-cyan-600 mx-auto bg-gray-600 flex items-center justify-center">
              <p className="text-white text-center">No Images Available</p>
            </div>
          )}

          {/* Content Section - Emerge from behind phone */}
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{
              opacity: 0,
              x: -100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            {/* Project Links */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.6,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
            >
              {item.githubIcon && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <FaGithub />
                </a>
              )}
              {item.webIcon && (
                <a
                  href={item.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <FaLink />
                </a>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.7,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
            >
              <h2 className="text-3xl font-bold mb-2">
                {item.title} - {item.subtitle}
              </h2>
            </motion.div>

            {/* ProjectBadge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.6,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
              className="flex items-start space-x-4"
            >
              <ProjectBadge title={item.category || "Other"} />
              {item.developmentStatus && item.progressStatus && (
                <ProjectStatus
                  developmentStatus={item.developmentStatus}
                  progressStatus={item.progressStatus}
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.8,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
            >
              <motion.div
                className="bg-gradient-to-br from-[#120F1E] to-[#1A0F2E] p-4 rounded-xl shadow-lg relative overflow-hidden"
                whileHover={{
                  scale: 1.03,
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full 
                  bg-gradient-to-br from-purple-700/50 to-purple-900/50 
                  rounded-full opacity-70 blur-3xl origin-top"
                ></div>
                <div className="relative z-10 flex flex-col items-start space-y-4">
                  <p className="text-sm text-white flex-1 text-justify">
                    {item.description.length > 300
                      ? `${item.description.slice(0, 300)}...`
                      : item.description}
                  </p>
                  {item.description.length > 250 && (
                    <button
                      className="text-xs text-purple-300 hover:text-purple-200 transition-colors"
                      onClick={() => setSelectedProject(item)}
                    >
                      Show Full Description
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Features */}
            <motion.div
              className="mt-4 space-y-2 text-sm"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.9,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
            >
              <ProgressBar
                progress={item.progressPercentage}
                label="Progress"
                className="mt-4"
              />

              <div className="mt-2 space-y-2">
                {item.features.map((feature, featureIndex) => (
                  <div
                    key={`${item.title}-feature-${featureIndex}-${feature.text}`}
                    className="flex items-center justify-between text-gray-300"
                  >
                    <div className="flex items-center space-x-2">
                      {feature.icon}
                      <span>{feature.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      );
    }

    // Layout 2: Browser layout (for second project)
    else if (index === 1) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full relative">
          {/* Left side: Title, Description, etc. */}
          <motion.div
            className="flex flex-col justify-center space-y-4 p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {item?.title} -{" "}
                  <span className="text-gray-600 dark:text-gray-500 ">
                    {item?.subtitle}
                  </span>
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                {item.githubIcon && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaGithub />
                  </a>
                )}
                {item.webIcon && (
                  <a
                    href={item.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaLink />
                  </a>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.8,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
            >
              <motion.div
                className="bg-gradient-to-br from-[#120F1E] to-[#1A0F2E] p-4 rounded-xl shadow-lg relative overflow-hidden"
                whileHover={{
                  scale: 1.03,
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full 
                  bg-gradient-to-br from-purple-700/50 to-purple-900/50 
                  rounded-full opacity-70 blur-3xl origin-top"
                ></div>
                <div className="relative z-10 flex flex-col items-start space-y-4">
                  <p className="text-sm text-white flex-1 text-justify">
                    {item.description.length > 300
                      ? `${item.description.slice(0, 300)}...`
                      : item.description}
                  </p>
                  {item.description.length > 250 && (
                    <button
                      className="text-xs text-purple-300 hover:text-purple-200 transition-colors"
                      onClick={() => setSelectedProject(item)}
                    >
                      Show Full Description
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Features */}
            <motion.div
              className="mt-4 space-y-2 text-sm"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.9,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
            >
              <ProgressBar
                progress={item.progressPercentage}
                label="Progress"
                className="mt-4"
              />

              <div className="mt-2 space-y-2">
                {item.features.map((feature, featureIndex) => (
                  <div
                    key={`${item.title}-feature-${featureIndex}-${feature.text}`}
                    className="flex items-center justify-between text-gray-300"
                  >
                    <div className="flex items-center space-x-2">
                      {feature.icon}
                      <span>{feature.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side: Tech Stack with Slide to Change Image */}
          <motion.div
            className="flex flex-col relative justify-center items-center p-2 gap-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            }}
          >
            {/* Animated Tech Stack with Curved Layout */}
            <AnimatedTechStack
              techStack={item.techStack}
              className="flex relative gap-2"
              iconSize="md"
            />

            <PhoneMockup
              images={
                item.images?.map((img) => ({
                  src: img.src,
                  alt: img.alt,
                })) || []
              }
              title={item.title}
              onImageClick={handleImageClick}
              orientation="horizontal"
            />

            {/* ProjectBadge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.5,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
              className="flex items-start space-x-4"
            >
              <ProjectBadge title={item.category || "Other"} />
              {item.developmentStatus && item.progressStatus && (
                <ProjectStatus
                  developmentStatus={item.developmentStatus}
                  progressStatus={item.progressStatus}
                />
              )}
            </motion.div>
          </motion.div>
        </div>
      );
    }

    // Layout 3: Side-by-side layout with DaisyUI phone (for third project and beyond)
    else if (index === 2) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full relative">
          {/* Left side: DaisyUI Phone Mockup */}
          <motion.div
            className="flex flex-col relative justify-center items-center"
            initial={{
              opacity: 0,
              x: -100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            {/* ProjectBadge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.7,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
              className="flex items-start space-x-4 pb-8"
            >
              <ProjectBadge title={item.category || "Other"} />
              {item.developmentStatus && item.progressStatus && (
                <ProjectStatus
                  developmentStatus={item.developmentStatus}
                  progressStatus={item.progressStatus}
                />
              )}
            </motion.div>

            <PhoneMockup
              images={
                item.images?.map((img) => ({
                  src: img.src,
                  alt: img.alt,
                })) || []
              }
              title={item.title}
              onImageClick={handleImageClick}
              orientation="horizontal"
            />

            {/* Animated Tech Stack with Curved Layout */}
            <AnimatedTechStack
              techStack={item.techStack}
              className="flex relative top-8 gap-12"
              iconSize="lg"
            />
          </motion.div>

          {/* Right side: Content */}
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{
              opacity: 0,
              x: 100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            {/* Project Links */}
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: 0.6,
                    type: "spring",
                    stiffness: 250,
                    damping: 15,
                  },
                }}
              >
                <h2 className="text-3xl font-bold mb-2">
                  {item.title} -{" "}
                  <span className="text-gray-600 dark:text-gray-500 ">
                    {item?.subtitle}
                  </span>
                </h2>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.6,
                    type: "spring",
                    stiffness: 250,
                    damping: 15,
                  },
                }}
              >
                {item.githubIcon && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaGithub />
                  </a>
                )}
                {item.webIcon && (
                  <a
                    href={item.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaLink />
                  </a>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.8,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
            >
              <motion.div
                className="bg-gradient-to-br from-[#120F1E] to-[#1A0F2E] p-4 rounded-xl shadow-lg relative overflow-hidden"
                whileHover={{
                  scale: 1.03,
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full 
                  bg-gradient-to-br from-purple-700/50 to-purple-900/50 
                  rounded-full opacity-70 blur-3xl origin-top"
                ></div>
                <div className="relative z-10 flex flex-col items-start space-y-4">
                  <p className="text-sm text-white flex-1 text-justify">
                    {item.description.length > 300
                      ? `${item.description.slice(0, 300)}...`
                      : item.description}
                  </p>
                  {item.description.length > 250 && (
                    <button
                      className="text-xs text-purple-300 hover:text-purple-200 transition-colors"
                      onClick={() => setSelectedProject(item)}
                    >
                      Show Full Description
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Features */}
            <motion.div
              className="mt-4 space-y-2 text-sm"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.9,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
            >
              <ProgressBar
                progress={item.progressPercentage}
                label="Progress"
                className="mt-4"
              />

              <div className="mt-2 space-y-2">
                {item.features.map((feature, featureIndex) => (
                  <div
                    key={`${item.title}-feature-${featureIndex}-${feature.text}`}
                    className="flex items-center justify-between text-gray-300"
                  >
                    <div className="flex items-center space-x-2">
                      {feature.icon}
                      <span>{feature.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      );
    }

    // Layout 4: Side-by-side layout with DaisyUI phone (for third project and beyond)
    else if (index === 3) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full relative">
          {/* Left side: Content */}
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{
              opacity: 0,
              x: 100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            {/* Project Links */}
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: 0.6,
                    type: "spring",
                    stiffness: 250,
                    damping: 15,
                  },
                }}
              >
                <h2 className="text-3xl font-bold mb-2">
                  {item.title} -{" "}
                  <span className="text-gray-600 dark:text-gray-500 ">
                    {item?.subtitle}
                  </span>
                </h2>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.6,
                    type: "spring",
                    stiffness: 250,
                    damping: 15,
                  },
                }}
              >
                {item.githubIcon && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaGithub />
                  </a>
                )}
                {item.webIcon && (
                  <a
                    href={item.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaLink />
                  </a>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.8,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
            >
              <motion.div
                className="bg-gradient-to-br from-[#120F1E] to-[#1A0F2E] p-4 rounded-xl shadow-lg relative overflow-hidden"
                whileHover={{
                  scale: 1.03,
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full 
                  bg-gradient-to-br from-purple-700/50 to-purple-900/50 
                  rounded-full opacity-70 blur-3xl origin-top"
                ></div>
                <div className="relative z-10 flex flex-col items-start space-y-4">
                  <p className="text-sm text-white flex-1 text-justify">
                    {item.description.length > 300
                      ? `${item.description.slice(0, 300)}...`
                      : item.description}
                  </p>
                  {item.description.length > 250 && (
                    <button
                      className="text-xs text-purple-300 hover:text-purple-200 transition-colors"
                      onClick={() => setSelectedProject(item)}
                    >
                      Show Full Description
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Features */}
            <motion.div
              className="mt-4 space-y-2 text-sm"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.9,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
            >
              <ProgressBar
                progress={item.progressPercentage}
                label="Progress"
              />

              <div className="mt-2 space-y-2">
                {item.features.map((feature, featureIndex) => (
                  <div
                    key={`${item.title}-feature-${featureIndex}-${feature.text}`}
                    className="flex items-center justify-between text-gray-300"
                  >
                    <div className="flex items-center space-x-2">
                      {feature.icon}
                      <span>{feature.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side: DaisyUI Phone Mockup */}
          <motion.div
            className="flex flex-col relative justify-center items-center"
            initial={{
              opacity: 0,
              x: -100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            {/* ProjectBadge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.7,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
              className="flex items-start space-x-4 xl:mb-4"
            >
              <ProjectBadge title={item.category || "Other"} />
              {item.developmentStatus && item.progressStatus && (
                <ProjectStatus
                  developmentStatus={item.developmentStatus}
                  progressStatus={item.progressStatus}
                />
              )}
            </motion.div>

            <WindowMockup
              images={
                item.images?.map((img) => ({
                  src: img.src,
                  alt: img.alt,
                })) || []
              }
              onImageClick={handleImageClick}
              url={item.webUrl}
            />

            {/* Animated Tech Stack with Curved Layout */}
            <AnimatedTechStack
              techStack={item.techStack}
              className="flex relative xl:top-8 gap-10"
              iconSize="md"
            />
          </motion.div>
        </div>
      );
    }

    // Layout 5: Side-by-side layout with DaisyUI phone (for third project and beyond)
    else {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full relative">
          {/* left side: Content */}
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{
              opacity: 0,
              x: 100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            {/* Project Links */}
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: 0.6,
                    type: "spring",
                    stiffness: 250,
                    damping: 15,
                  },
                }}
              >
                <h2 className="text-3xl font-bold mb-2">
                  {item.title} -{" "}
                  <span className="text-gray-600 dark:text-gray-500 ">
                    {item?.subtitle}
                  </span>
                </h2>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.6,
                    type: "spring",
                    stiffness: 250,
                    damping: 15,
                  },
                }}
              >
                {item.githubIcon && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaGithub />
                  </a>
                )}
                {item.webIcon && (
                  <a
                    href={item.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaLink />
                  </a>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.8,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
            >
              <motion.div
                className="bg-gradient-to-br from-[#120F1E] to-[#1A0F2E] p-4 rounded-xl shadow-lg relative overflow-hidden"
                whileHover={{
                  scale: 1.03,
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full 
                  bg-gradient-to-br from-purple-700/50 to-purple-900/50 
                  rounded-full opacity-70 blur-3xl origin-top"
                ></div>
                <div className="relative z-10 flex flex-col items-start space-y-4">
                  <p className="text-sm text-white flex-1 text-justify">
                    {item.description.length > 300
                      ? `${item.description.slice(0, 300)}...`
                      : item.description}
                  </p>
                  {item.description.length > 250 && (
                    <button
                      className="text-xs text-purple-300 hover:text-purple-200 transition-colors"
                      onClick={() => setSelectedProject(item)}
                    >
                      Show Full Description
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Center side: DaisyUI Phone Mockup */}
          <motion.div
            className="flex flex-col relative justify-center items-center"
            initial={{
              opacity: 0,
              x: -100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            <BrowserMockup
              images={
                item.images?.map((img) => ({
                  src: img.src,
                  alt: img.alt,
                })) || []
              }
              onImageClick={handleImageClick}
              url={item.webUrl}
            />

            {/* Animated Tech Stack with Curved Layout */}
            <AnimatedTechStack
              techStack={item.techStack}
              className="flex relative top-8 xl:gap-8"
              iconSize="md"
            />
          </motion.div>

          {/* Right side: Content */}
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{
              opacity: 0,
              x: 100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            {/* ProjectBadge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.7,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
              className="flex items-start space-x-4"
            >
              <ProjectBadge title={item.category || "Other"} />
              {item.developmentStatus && item.progressStatus && (
                <ProjectStatus
                  developmentStatus={item.developmentStatus}
                  progressStatus={item.progressStatus}
                />
              )}
            </motion.div>
            {/* Features */}
            <motion.div
              className="mt-4 space-y-2 text-sm"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.9,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                },
              }}
            >
              <ProgressBar
                progress={item.progressPercentage}
                label="Progress"
              />

              <div className="mt-2 space-y-2">
                {item.features.map((feature, featureIndex) => (
                  <div
                    key={`${item.title}-feature-${featureIndex}-${feature.text}`}
                    className="flex items-center justify-between text-gray-300"
                  >
                    <div className="flex items-center space-x-2">
                      {feature.icon}
                      <span>{feature.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      );
    }
  };

  // Add handleCloseCarousel function
  const handleCloseCarousel = () => {
    setIsCarouselOpen(false);
  };

  // Render carousel as a modal when images are clicked
  const renderCarouselModal = () => {
    if (!isCarouselOpen) return null;

    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={handleCloseCarousel}
      >
        <div
          className="relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside carousel
        >
          <button
            className="absolute -top-10 right-0 text-white text-2xl hover:text-red-500 transition-colors"
            onClick={handleCloseCarousel}
          >
            ✕
          </button>
          <Carousel slides={currentCarouselImages} />
        </div>
      </div>
    );
  };

  // Render content for mobile
  if (isMobile) {
    return (
      <div className="w-full px-4 py-6 space-y-10">
        {content.map((item, index) => (
          <motion.div
            key={item.title + index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
                {item.title}
              </h2>
              <div className="flex space-x-3">
                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                  >
                    {item.githubIcon || (
                      <FaGithub className="text-2xl text-gray-800 dark:text-white hover:text-blue-600" />
                    )}
                  </a>
                )}
                {item.webUrl && (
                  <a
                    href={item.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                  >
                    {item.webIcon || (
                      <FaLink className="text-2xl text-gray-800 dark:text-white hover:text-green-600" />
                    )}
                  </a>
                )}
              </div>
            </div>
            {item.developmentStatus && item.progressStatus && (
              <div className="mb-4">
                <ProjectStatus
                  developmentStatus={item.developmentStatus}
                  progressStatus={item.progressStatus}
                />
              </div>
            )}
            {item.subtitle && (
              <h3 className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                {item.subtitle}
              </h3>
            )}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 text-justify text-neutral-600 dark:text-neutral-300">
              {item.description}
            </p>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
              Features:
            </h3>
            <ul className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 space-y-2">
              {item.features.map(
                (
                  feature: ProjectItem["features"][number],
                  featureIndex: number
                ) => (
                  <li
                    key={`${item.title}-feature-${featureIndex}-${feature.text}`}
                    className="flex items-center"
                  >
                    {feature.icon}
                    <span className="ml-2">{feature.text}</span>
                  </li>
                )
              )}
            </ul>

            {/* Add ProgressBar here */}
            <ProgressBar
              progress={item.progressPercentage}
              label="Progress"
              className="mt-4"
              labelClassName="text-neutral-800 dark:text-neutral-100"
            />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative"
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
          className="sticky w-full h-screen"
          style={{
            position: "sticky",
            top: 0,
          }}
        >
          <div className="w-full h-full py-10 px-4 md:px-10 lg:px-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-7xl mx-auto">
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
                          y: isScrolling
                            ? index > activeCard
                              ? -50
                              : 50
                            : -20,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                        }}
                        className={cn(
                          "absolute inset-0 p-6 md:p-10 rounded-2xl transition-all duration-300 overflow-y-auto"
                          // "bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 shadow-2xl"
                        )}
                      >
                        {renderContent(item, index)}

                        <div className="absolute bottom-4 right-4 bg-black/30 text-white px-2 py-1 rounded-lg text-sm backdrop-blur-sm">
                          {activeCard + 1} / {content.length}
                        </div>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Modal */}
      {renderCarouselModal()}

      {/* Animated Modal for Full Description */}
      <AnimatePresence>
        {selectedProject && (
          <FullDescriptionModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
