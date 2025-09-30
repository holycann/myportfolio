"use client";

import React, { ErrorInfo } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

// Custom Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error("Theme Provider Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong with theme provider</div>;
    }

    return this.props.children;
  }
}

// Default Fallback Component for Theme Errors
const ThemeFallback = () => (
  <div className="p-4 bg-red-50 text-red-800">
    <h2>Theme Loading Failed</h2>
    <p>Unable to load theme. Please refresh the page.</p>
  </div>
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<ThemeFallback />}>
      <NextThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemeProvider>
    </ErrorBoundary>
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
    <ErrorBoundary fallback={<ThemeFallback />}>
      <NextThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        {...props}
      >
        {children}
      </NextThemeProvider>
    </ErrorBoundary>
  );
}
