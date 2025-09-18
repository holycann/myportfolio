import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "rounded" | "circle";
  width?: number | string;
  height?: number | string;
  minHeight?: number | string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "default",
  width = "full",
  height = "full",
  minHeight = "6rem",
  ...props
}) => {
  const variantStyles = {
    default: "rounded-md",
    rounded: "rounded-xl",
    circle: "rounded-full",
  };

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700 flex flex-1 animate-pulse",
        variantStyles[variant],
        className
      )}
      style={{
        width: width,
        height: height,
        minHeight: minHeight,
      }}
      {...props}
    />
  );
};
