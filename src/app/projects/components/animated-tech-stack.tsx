"use client";

import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { TechStackIcon } from "./tech-stack-icon";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiJavascript,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiRedux,
  SiExpress,
  SiJest,
  SiPrisma,
  SiFirebase,
  SiSocketdotio,
  SiGit,
  SiHtml5,
  SiCss3,
  SiSass,
  SiBootstrap,
  SiChakraui,
  SiStrapi,
  SiSupabase,
} from "react-icons/si";

// Mapping of tech names to their corresponding icons
const techIconMap = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  "Tailwind CSS": SiTailwindcss,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  JavaScript: SiJavascript,
  Docker: SiDocker,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  GraphQL: SiGraphql,
  Redux: SiRedux,
  Express: SiExpress,
  Jest: SiJest,
  Prisma: SiPrisma,
  Firebase: SiFirebase,
  "Socket.io": SiSocketdotio,
  Git: SiGit,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  Sass: SiSass,
  Bootstrap: SiBootstrap,
  "Chakra UI": SiChakraui,
  Strapi: SiStrapi,
  Supabase: SiSupabase,
};

export type AnimatedTechStackProps = {
  techStack: {
    name: string;
    className?: string;
  }[];
  className?: string;
  iconSize?: "sm" | "md" | "lg";
  containerProps?: React.ComponentProps<typeof motion.div>;
  tooltipProps?: Omit<React.ComponentProps<typeof AnimatedTooltip>, "items">;
  iconProps?: Partial<React.ComponentProps<typeof TechStackIcon>>;
};

export const AnimatedTechStack = ({
  techStack,
  className,
  iconSize = "md",
  containerProps = {},
  tooltipProps = {},
  iconProps = {},
}: AnimatedTechStackProps) => {
  // Convert tech stack to AnimatedTooltip compatible format
  const tooltipItems = techStack.map((tech, index) => {
    // Get the icon based on the tech name, default to a generic icon if not found
    const TechIcon =
      techIconMap[tech.name as keyof typeof techIconMap] || SiReact;

    return {
      id: index,
      name: tech.name,
      designation: "", // Optional additional text
      element: (
        <TechStackIcon
          name={tech.name}
          icon={<TechIcon />}
          className={tech.className}
          size={iconSize}
          {...iconProps}
        />
      ),
    };
  });

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
      {...containerProps}
    >
      <AnimatedTooltip items={tooltipItems} {...tooltipProps} />
    </motion.div>
  );
};
