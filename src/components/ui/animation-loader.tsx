"use client";

import React, { useEffect, useState } from 'react';

// Helper to detect device capabilities
const detectDeviceCapabilities = (): { 
  isLowPowerDevice: boolean;
  canUseWebWorker: boolean;
  preferReducedMotion: boolean;
} => {
  if (typeof window === 'undefined') {
    return {
      isLowPowerDevice: false,
      canUseWebWorker: true,
      preferReducedMotion: false
    };
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for low-end devices
  // This is a simple heuristic - could be improved with more sophisticated detection
  const isLowPowerDevice = 
    // Check if mobile device
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
    // Check if low memory (if available)
    ('deviceMemory' in navigator && (navigator as any).deviceMemory < 4);
  
  // Check if Web Workers are supported
  const canUseWebWorker = typeof Worker !== 'undefined';

  return {
    isLowPowerDevice,
    canUseWebWorker,
    preferReducedMotion: prefersReducedMotion
  };
};

interface AnimationLoaderProps {
  // The full animation component
  fullAnimation: React.ReactNode;
  // A simplified version for low-end devices
  simplifiedAnimation?: React.ReactNode;
  // A static fallback for when animations are disabled
  fallback?: React.ReactNode;
  // Optional server-side placeholder to avoid hydration issues
  serverPlaceholder?: React.ReactNode;
}

export const AnimationLoader: React.FC<AnimationLoaderProps> = ({
  fullAnimation,
  simplifiedAnimation,
  fallback,
  serverPlaceholder
}) => {
  const [capabilities, setCapabilities] = useState({
    isLowPowerDevice: false,
    canUseWebWorker: true,
    preferReducedMotion: false
  });
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);
    
    // Detect capabilities after mounting
    setCapabilities(detectDeviceCapabilities());
    
    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMediaChange = () => {
      setCapabilities(prev => ({
        ...prev,
        preferReducedMotion: mediaQuery.matches
      }));
    };
    
    // Use modern event listener API with fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => {
        mediaQuery.removeEventListener('change', handleMediaChange);
      };
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleMediaChange);
      return () => {
        mediaQuery.removeListener(handleMediaChange);
      };
    }
  }, []);

  // Don't render animation content on server to avoid hydration issues
  if (!isClient) {
    // Return server placeholder if provided, otherwise null
    return serverPlaceholder ? <>{serverPlaceholder}</> : null;
  }

  // If user prefers reduced motion, show static fallback
  if (capabilities.preferReducedMotion && fallback) {
    return <>{fallback}</>;
  }
  
  // If low-power device and simplified version available, show that
  if (capabilities.isLowPowerDevice && simplifiedAnimation) {
    return <>{simplifiedAnimation}</>;
  }
  
  // Otherwise show full animation
  return <>{fullAnimation}</>;
};

// Export a hook to access device capabilities
export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    isLowPowerDevice: false,
    canUseWebWorker: true,
    preferReducedMotion: false
  });
  
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    setCapabilities(detectDeviceCapabilities());
    
    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMediaChange = () => {
      setCapabilities(prev => ({
        ...prev,
        preferReducedMotion: mediaQuery.matches
      }));
    };
    
    // Use modern event listener API with fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => {
        mediaQuery.removeEventListener('change', handleMediaChange);
      };
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleMediaChange);
      return () => {
        mediaQuery.removeListener(handleMediaChange);
      };
    }
  }, []);
  
  return {
    ...capabilities,
    isClient
  };
}; 