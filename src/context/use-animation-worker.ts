"use client";

import { useState, useEffect, useRef } from 'react';

type WorkerMessageType = 'calculateStarPositions' | 'calculateBoxColors';
type WorkerResultType = 'starPositionsResult' | 'boxColorsResult';

interface UseAnimationWorkerProps<T> {
  type: WorkerMessageType;
  payload: any;
  dependencies?: any[];
  fallbackData?: T | null; // Optional fallback data for server rendering
}

/**
 * A React hook that offloads heavy animation calculations to a Web Worker
 * 
 * @param type The type of calculation to perform
 * @param payload The data needed for the calculation
 * @param dependencies Optional array of dependencies to trigger recalculation
 * @param fallbackData Optional data to use during server rendering or before worker loads
 * @returns The result of the worker calculation and loading state
 */
export function useAnimationWorker<T>({ 
  type, 
  payload, 
  dependencies = [],
  fallbackData = null as T | null
}: UseAnimationWorkerProps<T>): { 
  result: T | null; 
  loading: boolean;
  error: Error | null;
  isClient: boolean;
} {
  const [result, setResult] = useState<T | null>(fallbackData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  
  // Use ref for stable worker reference
  const workerRef = useRef<Worker | null>(null);

  // Initialize worker on client-side only
  useEffect(() => {
    setIsClient(true);
    
    // Create worker only on client side
    if (typeof window === 'undefined') return;
    
    let animationWorker: Worker;
    
    try {
      // Create a new worker instance
      animationWorker = new Worker(new URL('./animation-worker.ts', import.meta.url));
      setWorker(animationWorker);
      workerRef.current = animationWorker;
      
      // Set up message handler
      animationWorker.onmessage = (event: MessageEvent) => {
        const { type: resultType, payload: resultPayload } = event.data;
        
        // Map worker message types to result types
        const resultTypeMap: Record<WorkerResultType, WorkerMessageType> = {
          'starPositionsResult': 'calculateStarPositions',
          'boxColorsResult': 'calculateBoxColors',
        };
        
        // Check if this is the result we're waiting for
        if (resultTypeMap[resultType as WorkerResultType] === type) {
          setResult(resultPayload as T);
          setLoading(false);
        }
      };
      
      // Handle errors
      animationWorker.onerror = (err) => {
        console.error('Animation worker error:', err);
        setError(new Error('Worker calculation failed'));
        setLoading(false);
      };
      
      // Send the calculation request to the worker
      animationWorker.postMessage({ type, payload });
      
    } catch (err) {
      console.error('Failed to initialize animation worker:', err);
      setError(err instanceof Error ? err : new Error('Unknown worker error'));
      setLoading(false);
    }
    
    // Clean up worker on unmount
    return () => {
      if (animationWorker) {
        animationWorker.terminate();
        workerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  
  // Send new calculation when payload or dependencies change
  useEffect(() => {
    if (!workerRef.current) return;
    
    setLoading(true);
    workerRef.current.postMessage({ type, payload });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, JSON.stringify(payload), ...dependencies]);
  
  return { result, loading, error, isClient };
} 