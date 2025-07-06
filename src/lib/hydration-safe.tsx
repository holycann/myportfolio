"use client";

import React, { useState, useEffect, ReactNode } from "react";

interface HydrationSafeProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * A component that safely handles hydration issues by only rendering children on the client
 * This is useful for components that use browser APIs or have different server/client renders
 */
export function HydrationSafe({ children, fallback = null }: HydrationSafeProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <>{children}</> : <>{fallback}</>;
}

/**
 * A hook to safely use browser APIs without causing hydration mismatches
 * Returns a boolean indicating if code is running on client and the value is safe to use
 */
export function useHydrationSafe<T>(clientValue: T, serverValue: T): [T, boolean] {
  const [isClient, setIsClient] = useState(false);
  const [value, setValue] = useState<T>(serverValue);

  useEffect(() => {
    setIsClient(true);
    setValue(clientValue);
  }, [clientValue]);

  return [value, isClient];
}

/**
 * A hook to safely use browser APIs with a function that returns a value
 * The function will only be called on the client side
 */
export function useClientValue<T>(fn: () => T, defaultValue: T): T {
  const [value, setValue] = useState<T>(defaultValue);
  
  useEffect(() => {
    setValue(fn());
  }, [fn]);
  
  return value;
}

/**
 * A hook to safely use Date.now() or Math.random() without causing hydration mismatches
 * Returns a consistent value for server rendering and the actual value after hydration
 */
export function useVariableValue<T>(
  variableValueFn: () => T, 
  serverConstantValue: T
): T {
  return useClientValue(variableValueFn, serverConstantValue);
}

/**
 * A hook to safely use window.matchMedia without causing hydration mismatches
 */
export function useMediaQuery(query: string): boolean {
  return useClientValue(
    () => window.matchMedia(query).matches,
    false
  );
}

/**
 * A hook to safely use localStorage without causing hydration mismatches
 */
export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, [key]);
  
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };
  
  return [storedValue, setValue];
} 