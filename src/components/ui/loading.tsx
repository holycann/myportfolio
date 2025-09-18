"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const loadingVariants = cva("animate-spin", {
  variants: {
    variant: {
      default:
        "text-primary h-8 w-8 border-2 border-current border-t-transparent rounded-full",
      solid:
        "text-primary h-12 w-12 border-4 border-current border-t-transparent rounded-full",
      large:
        "text-primary h-16 w-16 border-[6px] border-current border-t-transparent rounded-full",
      small:
        "text-primary h-4 w-4 border-2 border-current border-t-transparent rounded-full",
      spinner:
        "text-primary h-10 w-10 border-[3px] border-current border-t-transparent rounded-full",
      pulse: "animate-pulse bg-primary rounded-full",
      dots: "flex space-x-1",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      destructive: "text-destructive",
      muted: "text-muted-foreground",
    },
    size: {
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "primary",
    size: "md",
  },
});

interface LoadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof VariantProps<typeof loadingVariants>>,
    VariantProps<typeof loadingVariants> {
  label?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  className,
  variant,
  color = "primary",
  size = "md",
  label,
  ...props
}) => {
  if (variant === "dots") {
    return (
      <div className="flex items-center space-x-2">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className={cn(
              "h-2 w-2 rounded-full animate-pulse",
              color === "primary" && "bg-primary",
              color === "secondary" && "bg-secondary",
              color === "accent" && "bg-accent",
              color === "destructive" && "bg-destructive",
              color === "muted" && "bg-muted-foreground"
            )}
          />
        ))}
        {label && <span className="ml-2">{label}</span>}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div
        className={cn(loadingVariants({ variant, color, size, className }))}
        {...props}
      />
      {label && <span>{label}</span>}
    </div>
  );
};

// Example usage components
export const LoadingScreen: React.FC<LoadingProps> = (props) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <Loading {...props} variant="solid" size="lg" label="Loading..." />
  </div>
);

export const LoadingOverlay: React.FC<LoadingProps> = (props) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <Loading {...props} variant="spinner" />
  </div>
);

export const LoadingInline: React.FC<LoadingProps> = (props) => (
  <Loading {...props} variant="dots" size="sm" />
);
