"use client";

import React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { LenisProvider } from "@/providers/LenisProvider";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LoadingProvider>
        <LenisProvider>
          {children}
        </LenisProvider>
      </LoadingProvider>
    </NextThemeProvider>
  );
}

export function ThemeProvider({ 
  children, 
  ...props 
}: { 
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <NextThemeProvider {...props}>
      {children}
    </NextThemeProvider>
  );
} 