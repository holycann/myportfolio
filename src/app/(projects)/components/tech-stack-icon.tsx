"use client";

import React, { ReactNode } from "react";
import { motion } from "motion/react";

export type TechStackIconProps = {
  name: string;
  icon: ReactNode;
  color?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export const TechStackIcon: React.FC<TechStackIconProps> = ({
  name,
  icon,
  color = "bg-gray-100 dark:bg-gray-800",
  className = "",
  size = "md",
}) => {
  const sizeVariants = {
    sm: "w-6 h-6 p-1",
    md: "w-10 h-10 p-2",
    lg: "w-14 h-14 p-3",
  };

  return (
    <motion.div
      className={`
        ${sizeVariants[size]} 
        ${color} 
        rounded-full 
        flex items-center 
        justify-center 
        shadow-md 
        transition-all 
        duration-300 
        hover:scale-110 
        hover:shadow-lg 
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
        }
      }}
      whileHover={{ 
        scale: 1.1,
        rotate: 360,
        transition: { duration: 0.5 }
      }}
      title={name}
    >
      <div className="flex items-center justify-center text-xl">
        {icon}
      </div>
    </motion.div>
  );
}; 