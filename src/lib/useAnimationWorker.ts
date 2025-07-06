"use client";

import { useState, useEffect, useRef } from 'react';

type AnimationFrameParams = {
  duration: number;
  frameCount: number;
  easing: string;
  start: number;
  end: number;
};

type ParticleParams = {
  count: number;
  bounds: {
    width: number;
    height: number;
  };
  velocity: number;
};

type WorkerMessage = {
  type: string;
  frames?: any[];
  particles?: any[];
};

export function useAnimationWorker() {
  const [isSupported, setIsSupported] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const callbacksRef = useRef<Map<string, (data: any) => void>>(new Map());

  useEffect(() => {
    // Check if Web Workers are supported
    if (typeof window !== 'undefined' && 'Worker' in window) {
      setIsSupported(true);
      
      // Create worker
      workerRef.current = new Worker('/workers/animation-worker.js');
      
      // Set up message handler
      workerRef.current.onmessage = (event: MessageEvent<WorkerMessage>) => {
        const { type, frames, particles } = event.data;
        
        // Call the appropriate callback
        if (type === 'ANIMATION_FRAMES_RESULT' && callbacksRef.current.has(type)) {
          callbacksRef.current.get(type)?.(frames);
        } else if (type === 'PARTICLES_RESULT' && callbacksRef.current.has(type)) {
          callbacksRef.current.get(type)?.(particles);
        }
      };
      
      // Clean up worker on unmount
      return () => {
        workerRef.current?.terminate();
      };
    }
  }, []);

  /**
   * Calculate animation frames using the worker
   */
  const calculateAnimationFrames = (
    params: AnimationFrameParams,
    callback: (frames: any[]) => void
  ) => {
    if (!isSupported || !workerRef.current) {
      // Fallback calculation if worker is not supported
      const { duration, frameCount, easing, start, end } = params;
      const frames = [];
      
      for (let i = 0; i <= frameCount; i++) {
        const progress = i / frameCount;
        const value = start + (end - start) * progress;
        frames.push({ progress, value, timestamp: progress * duration });
      }
      
      callback(frames);
      return;
    }
    
    // Register callback
    callbacksRef.current.set('ANIMATION_FRAMES_RESULT', callback);
    
    // Send message to worker
    workerRef.current.postMessage({
      type: 'CALCULATE_ANIMATION_FRAMES',
      payload: params
    });
  };

  /**
   * Process particles using the worker
   */
  const processParticles = (
    params: ParticleParams,
    callback: (particles: any[]) => void
  ) => {
    if (!isSupported || !workerRef.current) {
      // Fallback calculation if worker is not supported
      const { count, bounds, velocity } = params;
      const particles = [];
      
      for (let i = 0; i < count; i++) {
        const x = Math.random() * bounds.width;
        const y = Math.random() * bounds.height;
        const vx = (Math.random() - 0.5) * velocity;
        const vy = (Math.random() - 0.5) * velocity;
        particles.push({ x, y, vx, vy });
      }
      
      callback(particles);
      return;
    }
    
    // Register callback
    callbacksRef.current.set('PARTICLES_RESULT', callback);
    
    // Send message to worker
    workerRef.current.postMessage({
      type: 'PROCESS_PARTICLES',
      payload: params
    });
  };

  return {
    isSupported,
    calculateAnimationFrames,
    processParticles
  };
} 