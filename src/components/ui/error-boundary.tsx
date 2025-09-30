"use client";

import React, { ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Comprehensive Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Renders a fallback UI instead of the component tree that crashed
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    
    // Optional custom error handling
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom error fallback can be provided, otherwise use default
      const DefaultErrorFallback = (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center min-h-screen bg-red-50 dark:bg-red-900 p-4"
        >
          <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">
            Something went wrong
          </h1>
          <p className="text-red-600 dark:text-red-400 mb-4 text-center">
            An unexpected error occurred. Please try again or contact support.
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Reload Page
            </button>
            <button 
              onClick={this.handleRetry}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Retry
            </button>
          </div>
          {this.state.error && (
            <details className="mt-4 text-xs text-gray-600 dark:text-gray-300">
              <summary>Error Details</summary>
              <pre className="bg-red-100 dark:bg-red-800 p-2 rounded mt-2">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </motion.div>
      );

      return this.props.fallback || DefaultErrorFallback;
    }

    return this.props.children;
  }
}

/**
 * Higher-order component to wrap components with error boundary
 * @param Component - React component to wrap
 * @param fallbackComponent - Optional custom fallback component
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>, 
  fallbackComponent?: ReactNode
) {
  return (props: P) => (
    <ErrorBoundary fallback={fallbackComponent}>
      <Component {...props} />
    </ErrorBoundary>
  );
} 