"use client";

import { ContainerHoverAnimation } from "@/components/ui/container-hover-animation";
import Image from "next/image";
import { MyButton } from "@/components/ui/mybutton";
import { HiOutlineEye } from "react-icons/hi";
import { FavTechStack } from "@/components/ui/animated-card";
import Lenis from "lenis";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  TypewriterEffect,
  TypewriterWord,
} from "@/components/ui/typewriter-effect";
import Badge from "@/components/ui/badge";

export default function Hero() {
  const handleResumeClick = () => {
    // Open resume in new tab
    window.open("/MuhamadRamadhanResume.pdf", "_blank");
  };

  const handleConnectClick = () => {
    // Use global smoothScrollTo method from Lenis provider
    if ((window as any).smoothScrollTo) {
      (window as any).smoothScrollTo('contact', {
        duration: 1.2,
        offset: 100,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  };

  const handleScrollToAbout = () => {
    // Use global smoothScrollTo method from Lenis provider
    if ((window as any).smoothScrollTo) {
      (window as any).smoothScrollTo('about', {
        duration: 1.2,
        offset: 100,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  };

  const words: TypewriterWord[] = [
    {
      text: "Currently Study At",
      className: "text-sm md:text-2xl",
    },
    {
      text: "Widyatama Univesity",
      className: "text-sm md:text-2xl",
    },
    {
      text: "Bachelor Of Information System",
      className: "text-sm md:text-2xl",
    },
  ];

  // Split text into characters for advanced animation
  const AnimatedText = ({
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
    return (
      <span className={className}>
        {children.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              y: 20,
              filter: "blur(10px)",
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              scale: 1,
              transition: {
                delay: delay + index * staggerDelay,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 10,
              },
            }}
            className="inline-block origin-bottom"
            style={{
              display: "inline-block",
              transformOrigin: "bottom center",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    );
  };

  return (
    <div
      id="hero"
      className="container mx-auto relative flex flex-col justify-center items-center min-h-screen w-full overflow-hidden py-25 lg:py-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center">
        <div className="flex flex-col overflow-hidden">
          <ContainerHoverAnimation
            titleComponent={
              <>
                <h1 className="text-2xl font-semibold text-black dark:text-white">
                  <span className="text-cyan-600 drop-shadow-[4px_4px_0px_rgba(6,182,212,0.3)]">
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
                </h1>
              </>
            }
          >
            <div className="relative flex w-full items-center justify-center bg-white dark:bg-black">
              <div
                className={cn(
                  "absolute inset-0",
                  "[background-size:40px_40px]",
                  "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                  "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                )}
              />
              {/* Radial gradient for the container to give a faded look */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
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
                    quality={85}
                    loading="eager"
                    style={{
                      willChange: 'transform',
                    }}
                  />
                </div>
              </div>
            </div>
          </ContainerHoverAnimation>
        </div>

        <div className="w-full max-w-xl text-center lg:text-left py-6 lg:py-10">
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
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white"
              >
                <AnimatedText
                  delay={1}
                  className="font-bold mt-1 leading-none block drop-shadow-[6px_6px_0px_rgba(0,0,0,0.3)] dark:drop-shadow-[6px_6px_0px_rgba(255,255,255,0.2)] font-['Cascadia_Code']"
                >
                  Fullstack Developer
                </AnimatedText>
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    delay: 1.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  },
                }}
                className="text-xl sm:text-2xl md:text-3xl font-semibold"
              >
                <AnimatedText
                  delay={1.5}
                  className="text-md text-cyan-600 underline decoration-2 underline-offset-4 font-semibold tracking-wide animate-pulse drop-shadow-[4px_4px_0px_rgba(6,182,212,0.3)] font-['Cascadia_Code']"
                >
                  & Automation Engineer
                </AnimatedText>
              </motion.h3>
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
              className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-gray-300 p-6 lg:py-6 lg:px-0 text-justify font-['Poppins'] font-medium"
            >
              Strong focus on clean architecture and practical automation.
              Dedicated to building systems that are efficient, maintainable,
              and scalable through smart, automated solutions.
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
              <TypewriterEffect
                words={words}
                speed={0.08}
                cursorClassName="lg:h-6 bg-cyan-600"
                className="font-['Cascadia_Code']"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.6,
                  delay: 2,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                },
              }}
            >
              <MyButton
                text="Resume"
                icon={<HiOutlineEye />}
                onClick={handleResumeClick}
                textClassName="md:text-lg font-['Cascadia_COde']"
              />
              <button
                onClick={handleConnectClick}
                className="px-4 text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-500 dark:hover:text-white cursor-pointer transition duration-500"
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
          onClick={handleScrollToAbout}
          className="hidden lg:flex cursor-pointer p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-cyan-400/30 hover:from-cyan-400/30 hover:to-blue-400/30 hover:border-cyan-300/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
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
            className="text-cyan-300 hover:text-cyan-200 transition-colors duration-300"
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
  );
}
