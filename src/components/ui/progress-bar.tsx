"use client";

import React from "react";
import { motion, MotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends MotionProps {
  progress: number;
  label?: string;
  className?: string;
  barClassName?: string;
  labelClassName?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  className,
  barClassName,
  labelClassName,
  showPercentage = true,
  ...motionProps
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn("w-full space-y-2", className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && (
            <span className={cn("text-neutral-600 dark:text-neutral-300", labelClassName)}>
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-purple-400 font-semibold">
              {clampedProgress}%
            </span>
          )}
        </div>
      )}
      
      <motion.div
        className={cn(
          "w-full bg-gray-700 rounded-full h-1.5 overflow-hidden",
          barClassName
        )}
        {...motionProps}
      >
        <motion.div
          className="bg-purple-500 h-1.5 rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `${clampedProgress}%`,
            transition: {
              duration: 1,
              type: "tween",
            },
          }}
        />
      </motion.div>
    </div>
  );
}; 