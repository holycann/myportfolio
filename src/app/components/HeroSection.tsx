"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { HiOutlineEye } from "react-icons/hi";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import React, { useCallback, useMemo } from "react";
import { AnimatedButton } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import { AnimationPresets } from "@/lib/animations";

// Dynamically import components with ssr: false and error boundary
const ContainerHoverAnimation = dynamic(
  () => import("@/components/ui/container-hover-animation"),
  {
    loading: () => <Skeleton variant="rounded" />,
    ssr: false,
  }
);
const FavTechStack = dynamic(() => import("@/components/ui/animated-card"), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});
const Badge = dynamic(() => import("@/components/ui/badge"), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});
const TextType = dynamic(() => import("@/components/ui/text-type"), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});
const ShinyText = dynamic(() => import("@/components/ui/shiny-text"), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});
const Threads = dynamic(() => import("@/components/ui/threads-background"), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

/**
 * Animated text component with character-level reveal animation
 * Uses memoization to prevent unnecessary re-renders
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.children - Text to animate
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {number} [props.delay=0] - Base delay for animation
 * @param {number} [props.staggerDelay=0.05] - Delay between character animations
 * 
 * @returns {React.ReactElement} Animated text component
 */
const AnimatedText = React.memo(
  ({
    children,
    className = "",
    delay = 0,
    staggerDelay = 0.05,
  }: {
    children: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
  }) => {
    // Use memoized animation to prevent unnecessary computations
    const animatedCharacters = useMemo(
      () =>
        children.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={AnimationPresets.textReveal(delay, staggerDelay)}
            initial="initial"
            animate="animate"
            custom={index}
            className="inline-block origin-bottom"
            style={{
              display: "inline-block",
              transformOrigin: "bottom center",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        )),
      [children, delay, staggerDelay]
    );

    return <span className={className}>{animatedCharacters}</span>;
  }
);
AnimatedText.displayName = "AnimatedText";

/**
 * Hero section component with animated introduction and interactive elements
 * Showcases personal branding, skills, and provides navigation options
 * 
 * @component
 * @returns {React.ReactElement} Hero section with animations and interactions
 */
function Hero() {
  const router = useRouter();

  // Memoized event handlers to prevent unnecessary re-renders
  const handleResumeClick = useCallback(() => {
    router.push("/MuhamadRamadhanResume.pdf");
  }, [router]);

  const handleScrollToBottom = useCallback(() => {
    const featuredSection = document.getElementById("featured-section");
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Memoized background styles to prevent recomputation
  const backgroundStyles = useMemo(
    () => ({
      gridBackground: cn(
        "absolute inset-0",
        "[background-size:40px_40px]",
        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
      ),
      radialGradient: "pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
    }),
    []
  );

  return (
    <main
      role="main"
      aria-label="Hero Section"
      className="w-full h-screen relative overflow-hidden"
    >
      <section className="absolute top-0 left-0 w-full h-full z-1">
        <Threads amplitude={2} distance={0.1} enableMouseInteraction={false} />
      </section>

      <div className="container mx-auto relative z-2 flex flex-col justify-center items-center min-h-screen w-full overflow-hidden py-25 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center">
          <article className="flex flex-col overflow-hidden">
            <ContainerHoverAnimation
              titleComponent={
                <>
                  <header className="text-2xl font-semibold text-black dark:text-white">
                    <span className="text-[var(--color-secondary)] drop-shadow-[4px_4px_0px_rgba(139,111,71,0.3)]">
                      Hi, Im -
                    </span>
                    <AnimatedText
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold mt-1 leading-none block drop-shadow-[6px_6px_0px_rgba(0,0,0,0.3)] dark:drop-shadow-[6px_6px_0px_rgba(255,255,255,0.2)]"
                      delay={0.5}
                    >
                      Muhamad
                    </AnimatedText>
                    <AnimatedText
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold mt-1 leading-none block drop-shadow-[6px_6px_0px_rgba(0,0,0,0.3)] dark:drop-shadow-[6px_6px_0px_rgba(255,255,255,0.2)]"
                      delay={0.5}
                    >
                      Ramadhan
                    </AnimatedText>
                  </header>
                </>
              }
            >
              <div className="relative flex w-full items-center justify-center bg-white dark:bg-black">
                <div className={backgroundStyles.gridBackground} />
                <div className={backgroundStyles.radialGradient} />
                <div className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-4xl font-bold text-transparent sm:text-7xl">
                  <div className="relative">
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        variant="outline-default"
                        className="absolute m-5 flex text-green-600 rounded-2xl z-10 items-center gap-2 px-4 py-2 text-xs cursor-pointer hover:bg-green-50 dark:hover:bg-green-950/20 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 border-green-500/50 hover:border-green-500"
                      >
                        <div className="relative">
                          <motion.div
                            className="absolute w-3 h-3 bg-green-200 rounded-full animate-ping opacity-75"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute w-3 h-3 bg-green-300 rounded-full animate-ping opacity-50"
                            style={{ animationDelay: "0.5s" }}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 0.5,
                            }}
                          />
                          <motion.div
                            className="absolute w-3 h-3 bg-green-400 rounded-full animate-ping opacity-25"
                            style={{ animationDelay: "1s" }}
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 1,
                            }}
                          />
                          <motion.div
                            className="relative w-3 h-3 bg-green-600 rounded-full"
                            animate={{
                              boxShadow: [
                                "0 0 0 0 rgba(34, 197, 94, 0.7)",
                                "0 0 0 10px rgba(34, 197, 94, 0)",
                                "0 0 0 0 rgba(34, 197, 94, 0)",
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        <motion.span
                          animate={{
                            color: ["#16a34a", "#22c55e", "#16a34a"],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Open For Internship
                        </motion.span>
                      </Badge>
                    </motion.div>
                    <motion.div
                      className="absolute text-xs right-8 top-16 md:right-25 md:top-20"
                      animate={{
                        rotate: [0, -10, 10, -10, 10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <div className="text-5xl text-cyan-200">👋</div>
                    </motion.div>
                    <Image
                      src="/images/hero.png"
                      alt="Hero Image"
                      width={500}
                      height={500}
                      priority
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMiEeHBwZIS0iJjFHLDRCRy9LUUxbRkdCN0FMWU5QX1VXbWVvZDRAYmJiZWJlf//bAEMBFRcXHhoeNyEhNWxsZGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbP/AABEIAAUACgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AlgAH/9k="
                      className="h-96 object-contain object-center"
                      sizes="(max-width: 768px) 100vw, 500px"
                      quality={75}
                      loading="eager"
                      style={{
                        willChange: "transform",
                      }}
                    />
                  </div>
                </div>
              </div>
            </ContainerHoverAnimation>
          </article>

          <div className="w-full max-w-2xl text-center lg:text-left py-6 lg:py-10">
            <div className="lg:py-10">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.8,
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    },
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white  font-['Montserrat']"
                >
                  <ShinyText
                    text="Backend & Automation"
                    disabled={false}
                    speed={3}
                    shineColor="var(--color-text-secondary)"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
                  />
                  <AnimatedText
                    delay={1}
                    className="font-bold mt-1 leading-none block"
                  >
                    Developer
                  </AnimatedText>
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 1.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  },
                }}
                className="text-sm sm:text-base md:text-lg lg:text-[1.1rem] text-gray-600 dark:text-gray-300 p-6 lg:px-0 text-justify font-['Montserrat'] font-light"
              >
                With a strong focus on clean architecture and practical
                automation. Dedicated to building systems that are efficient,
                maintainable, and scalable through smart, automated solutions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 1.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  },
                }}
                className="pb-8 px-6 lg:px-0"
              >
                <TextType
                  text={[
                    "API Engineer",
                    "Automation & Tooling Thinker",
                    "Problem Solver",
                    "Quick Learner",
                    "Crypto & AI Enthusiast",
                  ]}
                  typingSpeed={150}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="_"
                  className="font-bold leading-none text-2xl text-color-secondary"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 0.7,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    delay: 2,
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  },
                }}
                whileHover={{
                  opacity: 1,
                }}
                className="flex lg:justify-start justify-center items-center"
              >
                <AnimatedButton
                  onClick={handleResumeClick}
                  variant="glassmorphic"
                  color="var(--color-text-primary)"
                  bgColor="var(--color-bg-secondary)"
                  borderColor="var(--color-border)"
                  className="cursor-pointer"
                >
                  Resume <HiOutlineEye />
                </AnimatedButton>
                <button
                  onClick={() => {
                    router.push("/contact");
                  }}
                  className="px-4 text-xs sm:text-sm md:text-base lg:text-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary)] dark:hover:text-[var(--color-text-primary)] cursor-pointer transition duration-500"
                >
                  Let&apos;s Connect
                </button>
              </motion.div>
            </div>

            <div className="w-full max-w-lg mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 2.4,
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  },
                }}
                className="text-xs sm:text-sm md:text-xl font-bold text-center pt-8 lg:pt-0 font-['Cascadia_Code']"
              >
                Fav Tech Stack
              </motion.h2>
              <FavTechStack />
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              delay: 3,
              type: "spring",
              stiffness: 100,
              damping: 10,
            },
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            whileHover={{
              scale: 1.2,
              y: -8,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={handleScrollToBottom}
            className="hidden lg:flex cursor-pointer p-2 rounded-full bg-gradient-to-r from-[var(--color-secondary)]/20 to-[var(--color-primary)]/20 backdrop-blur-md border border-[var(--color-accent)]/30 hover:from-[var(--color-secondary)]/30 hover:to-[var(--color-primary)]/30 hover:border-[var(--color-accent)]/50 transition-all duration-300 shadow-lg hover:shadow-[var(--color-primary)]/25"
          >
            <motion.div
              animate={{
                y: [-3, 5, -3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L12 18L17 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

// Wrap Hero component with error boundary for enhanced error handling
export default withErrorBoundary(Hero, (
  <div className="flex items-center justify-center min-h-screen bg-red-50 dark:bg-red-900">
    <p className="text-red-600 dark:text-red-300">Failed to load Hero section</p>
  </div>
));
