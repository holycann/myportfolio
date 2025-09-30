"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export const ProjectBadge = ({ 
  title, 
  className,
  variant = "default"
}: { 
  title: string; 
  className?: string;
  variant?: "default" | "outlined" | "subtle";
}) => {
  const variantStyles = {
    default: "bg-primary text-white",
    outlined: "border border-primary text-primary",
    subtle: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  };

  return (
    <motion.div
      className={`inline-flex items-center space-x-2 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
        },
      }}
    >
      <Button 
        variant={variant === "default" ? "primary" : variant === "outlined" ? "outline" : "ghost"}
        className={`${variantStyles[variant]} transition-all duration-300`}
      >
        {title}
      </Button>
    </motion.div>
  );
}; 