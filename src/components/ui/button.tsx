"use client";

import React, { forwardRef, useState, ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "./hover-border-gradient";
import { motion, TargetAndTransition } from 'motion/react';

// Adjust sound feedback type
type SoundFeedbackConfig = {
  src: string;
  volume?: number;
};

// Adjust ButtonConfig interface
export interface ButtonConfig {
  // Accessibility
  "aria-label"?: string;

  // Performance
  debounceTime?: number;
  throttleTime?: number;

  // Interaction Feedback
  hapticFeedback?: boolean;
  soundFeedback?: boolean | SoundFeedbackConfig;

  // Animation
  animationVariants?: {
    hover?: object;
    tap?: object;
    disabled?: object;
  };

  // Error Handling
  errorHandling?: {
    retryAttempts?: number;
    fallbackContent?: ReactNode;
    onErrorCallback?: (error: Error) => void;
  };
}

// Enhanced Button Variants
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "gradient"
  | "success"
  | "destructive"
  | "link"
  | "tailwind"
  | "modern"
  | "neomorphic"
  | "glassmorphic";

// Button Sizes with Responsive Considerations
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "responsive";

// Adjust Button Component Props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  fullWidth?: boolean;
  customClasses?: string;
  config?: ButtonConfig;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
}

// Default Button Configuration
const DEFAULT_BUTTON_CONFIG: ButtonConfig = {
  debounceTime: 300,
  throttleTime: 0,
  hapticFeedback: false,
  soundFeedback: false,
  animationVariants: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5 },
  },
  errorHandling: {
    retryAttempts: 0,
  },
};

// Variant Styles with Enhanced Theming
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
  secondary: "bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white",
  outline: "border border-black dark:border-white bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
  ghost: "bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
  gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600",
  success: "bg-green-500 text-white hover:bg-green-600",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  link: "text-blue-600 hover:underline bg-transparent p-0",
  tailwind: "px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200",
  modern: "bg-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transform transition hover:-translate-y-1",
  neomorphic: "bg-gray-100 text-black shadow-[6px_6px_12px_#b8b9be,-6px_-6px_12px_#ffffff] dark:bg-gray-800 dark:text-white dark:shadow-[6px_6px_12px_#1a1a1a,-6px_-6px_12px_#2c2c2c]",
  glassmorphic: "bg-white/20 backdrop-blur-lg border border-white/30 text-black dark:text-white hover:bg-white/30",
};

// Size Styles with Responsive Design
const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-4 text-xl",
  responsive: "px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg md:px-8 md:py-4 md:text-xl",
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// Sound feedback handling
const handleSoundFeedback = (soundFeedback: boolean | SoundFeedbackConfig) => {
  if (typeof soundFeedback === "object") {
    const sound = new Audio(soundFeedback.src);
    sound.volume = soundFeedback.volume ?? 0.5;
    sound.play();
  }
};

// Enhanced Button Component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      icon,
      iconPosition = "left",
      isLoading = false,
      fullWidth = false,
      customClasses,
      config = {},
      textColor,
      bgColor,
      borderColor,
      ...props
    },
    ref
  ) => {
    // Merge default and provided configurations
    const buttonConfig: ButtonConfig = {
      ...DEFAULT_BUTTON_CONFIG,
      ...config,
      animationVariants: {
        ...DEFAULT_BUTTON_CONFIG.animationVariants,
        ...config.animationVariants,
      },
      errorHandling: {
        ...DEFAULT_BUTTON_CONFIG.errorHandling,
        ...config.errorHandling,
      },
    };

    const [errorCount, setErrorCount] = useState(0);

    // Enhanced click handler with error handling and retry mechanism
    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
      // Debounce click
      if (buttonConfig.debounceTime) {
        event.preventDefault();
        return;
      }

      // Haptic feedback
      if (buttonConfig.hapticFeedback && "vibrate" in navigator) {
        navigator.vibrate(50);
      }

      // Sound feedback
      if (buttonConfig.soundFeedback) {
        handleSoundFeedback(buttonConfig.soundFeedback);
      }

      try {
        if (props.onClick) {
          await props.onClick(event);
        }
      } catch (error) {
        // Error handling with retry mechanism
        if (
          buttonConfig.errorHandling?.retryAttempts &&
          errorCount < buttonConfig.errorHandling.retryAttempts
        ) {
          setErrorCount((prev) => prev + 1);
          buttonConfig.errorHandling.onErrorCallback?.(error as Error);
        }
      }
    };

    // Render button with comprehensive styling and configuration
    const renderButton = () => {
      const buttonClasses = cn(
        "rounded-full transition duration-200 flex items-center justify-center gap-2",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        isLoading && "opacity-50 cursor-wait",
        customClasses,
        className
      );

      // Custom color handling
      const dynamicStyles = {
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
      };

      // Render button with icon positioning
      const buttonContent = (
        <div className="flex items-center justify-center gap-2">
          {icon && iconPosition === "left" && !isLoading && icon}
          {isLoading ? <LoadingSpinner /> : children}
          {icon && iconPosition === "right" && !isLoading && icon}
        </div>
      );

      // Special handling for specific variants
      if (variant === "primary" || variant === "gradient") {
        return (
          <HoverBorderGradient
            className={cn(buttonClasses, "bg-white text-black")}
            onClick={handleClick}
            style={dynamicStyles}
            aria-label={props["aria-label"] || String(children)}
            {...props}
          >
            {buttonContent}
          </HoverBorderGradient>
        );
      }

      return (
        <motion.button
          ref={ref}
          className={buttonClasses}
          disabled={isLoading}
          onClick={handleClick}
          style={dynamicStyles}
          aria-label={props["aria-label"] || String(children)}
          whileHover={buttonConfig.animationVariants?.hover as TargetAndTransition}
          whileTap={buttonConfig.animationVariants?.tap as TargetAndTransition}
          {...Object.fromEntries(
            Object.entries(props).filter(
              ([key]) => !["onDrag", "onDragStart", "onDragEnd"].includes(key)
            )
          )}
        >
          {buttonContent}
        </motion.button>
      );
    };

    return renderButton();
  }
);

Button.displayName = "Button";

// Button Group Component for organizing multiple buttons
export const ButtonGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {children}
    </div>
  );
};

// Animated Button Component with loading and success states
export const AnimatedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsLoading(true);
      try {
        await onClick?.(event);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Button ref={ref} {...props} onClick={handleClick} isLoading={isLoading}>
        {isLoading ? (
          <LoadingSpinner />
        ) : isSuccess ? (
          <div className="text-green-500">✓</div>
        ) : (
          children
        )}
      </Button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";