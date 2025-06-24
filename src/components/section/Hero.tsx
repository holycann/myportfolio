"use client";

import { ContainerHoverAnimation } from "@/components/ui/container-hover-animation";
import Image from "next/image";
import { MyButton } from "@/components/ui/mybutton";
import { HiOutlineEye } from "react-icons/hi";
import { FavTechStack } from "@/components/ui/animated-card";
import Lenis from "lenis";
import { motion } from "motion/react";

export default function Hero() {
  const handleResumeClick = () => {
    // Open resume in new tab
    window.open("/resume.pdf", "_blank");
  };

  const handleConnectClick = () => {
    // Smooth scroll to contact section using Lenis
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const lenis = new Lenis();
      lenis.scrollTo(contactSection, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

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
      className="relative flex flex-col justify-center items-center min-h-screen w-full overflow-hidden"
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-end justify-items-center">
        <div className="flex flex-col overflow-hidden">
          <ContainerHoverAnimation
            titleComponent={
              <>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black dark:text-white">
                  Hi, Im <br />
                  <AnimatedText
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] font-bold mt-1 leading-none block"
                    delay={0.5}
                  >
                    Muhamad
                  </AnimatedText>
                  <AnimatedText
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] font-bold mt-1 leading-none block"
                    delay={0.5}
                  >
                    Ramadhan
                  </AnimatedText>
                </h1>
              </>
            }
          >
            <Image
              src="/images/hero.png"
              alt="Hero Image"
              width={500}
              height={500}
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMiEeHBwZIS0iJjFHLDRCRy9LUUxbRkdCN0FMWU5QX1VXbWVvZDRAYmJiZWJlf//bAEMBFRcXHhoeNyEhNWxsZGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbP/AABEIAAUACgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AlgAH/9k="
              className="mx-auto rounded-2xl object-contain h-full object-center"
            />
          </ContainerHoverAnimation>
        </div>

        <div className="w-full max-w-xl text-center lg:text-left py-6 lg:py-10">
          <div className="lg:py-20">
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
              <AnimatedText delay={1}>Fullstack Developer</AnimatedText>
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
              <AnimatedText delay={1.5}>& Crypto Enthusiast</AnimatedText>
            </motion.h3>
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
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 p-6 lg:py-6 lg:px-0 text-justify"
            >
              Professional junior web developer with experience creating and maintaining responsive, user-friendly web applications. Strong focus on team collaboration and delivering results. Skilled in JavaScript, HTML, CSS, React, Node.js, Go and database management. Known for adaptability and reliability in dynamic environments.Outside of tech, I actively trade
              crypto as an intraday trader, combining data-driven strategies
              with modern tools.
            </motion.p>
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
              />
              <button
                onClick={handleConnectClick}
                className="px-4 text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 dark:hover:text-white cursor-pointer transition duration-500"
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
              className="text-xs sm:text-sm md:text-base font-semibold text-center pt-8 lg:pt-0"
            >
              Fav Tech Stack
            </motion.h2>
            <FavTechStack />
          </div>
        </div>
      </div>
    </div>
  );
}
