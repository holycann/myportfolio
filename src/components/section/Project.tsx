"use client";

import React from "react";
import { motion } from "framer-motion";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { ProjectData } from "@/data/projects";

export default function Project() {
  const AnimatedProjectTitle = () => {
    const title = "A finished project is only the visible peak";
    const subtitle = "of a mountain built on learning and experience.";

    return (
      <motion.div 
        initial="hidden" 
        animate="visible"
        className="text-center mb-8 px-4"
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: {
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 10
              }
            }
          }}
        >
          {title.split(" ").map((word, index) => (
            <motion.span 
              key={index}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 200,
                    damping: 10,
                    delay: index * 0.1
                  }
                }
              }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
        <motion.h3
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mt-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            transition: {
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.5
            }
          }}
        >
          {subtitle}
        </motion.h3>
      </motion.div>
    );
  };

  return (
    <div 
      id="project"
      className="relative w-full overflow-clip"
    >
      <AnimatedProjectTitle />
      <div className="w-full py-4">
        <StickyScroll content={ProjectData} />
      </div>
    </div>
  );
};