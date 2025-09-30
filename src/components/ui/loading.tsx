"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Configuration for loading variants
 * Provides a flexible and extensible loading state system
 */
const LOADING_CONFIG = {
  variants: {
    default: {
      base: "text-primary h-8 w-8 border-2 border-current border-t-transparent rounded-full",
      colors: {
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        destructive: "text-destructive",
        muted: "text-muted-foreground"
      }
    },
    solid: {
      base: "text-primary h-12 w-12 border-4 border-current border-t-transparent rounded-full",
      colors: {
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        destructive: "text-destructive",
        muted: "text-muted-foreground"
      }
    },
    // Additional variants can be added here
  }
};

/**
 * Generate loading variant classes using class-variance-authority
 */
const loadingVariants = cva("animate-spin", {
  variants: {
    variant: {
      default: LOADING_CONFIG.variants.default.base,
      solid: LOADING_CONFIG.variants.solid.base,
      large: "text-primary h-16 w-16 border-[6px] border-current border-t-transparent rounded-full",
      small: "text-primary h-4 w-4 border-2 border-current border-t-transparent rounded-full",
      spinner: "text-primary h-10 w-10 border-[3px] border-current border-t-transparent rounded-full",
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

/**
 * Loading component properties
 * Extends HTML div attributes and supports variant configurations
 */
interface LoadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  variant?: VariantProps<typeof loadingVariants>['variant'];
  color?: VariantProps<typeof loadingVariants>['color'];
  size?: VariantProps<typeof loadingVariants>['size'];
  label?: string;
}

/**
 * Flexible and customizable Loading component
 * Supports multiple variants, colors, and sizes
 * 
 * @component
 * @param {LoadingProps} props - Loading component configuration
 */
export const Loading: React.FC<LoadingProps> = React.memo(({
  className,
  variant,
  color = "primary",
  size = "md",
  label,
  ...props
}) => {
  // Memoize dot rendering to prevent unnecessary re-renders
  const dotElements = useMemo(() => 
    variant === "dots" ? (
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
    ) : null,
    [variant, color, label]
  );

  // Render loading indicator
  return variant === "dots" ? (
    dotElements
  ) : (
    <div className="flex items-center space-x-2">
      <div
        className={cn(loadingVariants({ variant, color, size, className }))}
        {...props}
      />
      {label && <span>{label}</span>}
    </div>
  );
});

Loading.displayName = 'Loading';

/**
 * Loading overlay component for section-level loading states
 */
export const LoadingOverlay: React.FC<LoadingProps> = (props) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <Loading {...props} variant="spinner" />
  </div>
);

/**
 * Inline loading component for small, inline loading indicators
 */
export const LoadingInline: React.FC<LoadingProps> = (props) => (
  <Loading {...props} variant="dots" size="sm" />
);
