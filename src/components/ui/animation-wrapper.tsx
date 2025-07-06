"use client";

import React, { ReactNode } from "react";
import ErrorBoundary from "./error-boundary";
import { AnimationLoader } from "./animation-loader";

interface AnimationWrapperProps {
  // The full animation component
  children: ReactNode;
  // A simplified version for low-end devices
  simplifiedVersion?: ReactNode;
  // A static fallback for when animations are disabled
  staticFallback?: ReactNode;
  // A server-side placeholder to avoid hydration issues
  serverPlaceholder?: ReactNode;
  // Optional error fallback component
  errorFallback?: ReactNode;
  // Optional className
  className?: string;
}

/**
 * A wrapper component that provides:
 * 1. Error boundary for animations
 * 2. Device capability detection
 * 3. Server/client hydration handling
 * 4. Simplified versions for low-power devices
 * 5. Static fallbacks for reduced motion preferences
 */
const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  simplifiedVersion,
  staticFallback,
  serverPlaceholder,
  errorFallback,
  className
}) => {
  // Handle errors with custom fallback
  const handleError = (error: Error) => {
    console.error("Animation error:", error);
  };

  return (
    <div className={className}>
      <ErrorBoundary 
        fallback={errorFallback} 
        onError={handleError}
      >
        <AnimationLoader
          fullAnimation={children}
          simplifiedAnimation={simplifiedVersion}
          fallback={staticFallback}
          serverPlaceholder={serverPlaceholder}
        />
      </ErrorBoundary>
    </div>
  );
};

export default AnimationWrapper; 