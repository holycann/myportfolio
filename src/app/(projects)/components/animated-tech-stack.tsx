"use client";

import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { TechStackIcon } from "./tech-stack-icon";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

export type AnimatedTechStackProps = {
  techStack: {
    name: string;
    icon: ReactNode;
    color?: string;
    className?: string;
  }[];
  className?: string;
  iconSize?: "sm" | "md" | "lg";
};

export const AnimatedTechStack = ({
  techStack,
  className,
  iconSize = "md",
}: AnimatedTechStackProps) => {
  // Convert tech stack to AnimatedTooltip compatible format
  const tooltipItems = techStack.map((tech, index) => ({
    id: index,
    name: tech.name,
    designation: "", // Optional additional text
    element: (
      <TechStackIcon
        name={tech.name}
        icon={tech.icon}
        color={tech.color}
        className={tech.className}
        size={iconSize}
      />
    ),
  }));

  return (
    <motion.div
      className={`flex items-center space-x-2 ${className}`}
      initial={{ opacity: 0, x: -20, scale: 1.5 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
          staggerChildren: 0.1,
        },
      }}
      whileHover={{
        scale: 1.1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      <AnimatedTooltip items={tooltipItems} />
    </motion.div>
  );
};
