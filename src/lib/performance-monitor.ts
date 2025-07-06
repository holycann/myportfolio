/**
 * Utility for monitoring animation performance
 * This helps identify when animations are causing performance issues
 */

// Only enable in development
const isDev = process.env.NODE_ENV === 'development';

// Track frame rate over time
type FrameData = {
  timestamp: number;
  fps: number;
};

class PerformanceMonitor {
  private isRunning = false;
  private frameData: FrameData[] = [];
  private lastFrameTime = 0;
  private frameCount = 0;
  private animationFrameId: number | null = null;
  private warningThreshold = 45; // FPS below this will trigger warnings
  private criticalThreshold = 30; // FPS below this will trigger critical warnings
  private sampleSize = 60; // Number of frames to keep for analysis
  private listeners: Array<(fps: number, status: 'good' | 'warning' | 'critical') => void> = [];

  constructor() {
    // Only initialize in browser
    if (isDev && typeof window !== 'undefined') {
      this.lastFrameTime = performance.now();
    }
  }

  /**
   * Start monitoring performance
   */
  start(): void {
    if (this.isRunning || !isDev || typeof window === 'undefined') return;
    
    this.isRunning = true;
    this.frameData = [];
    this.frameCount = 0;
    this.lastFrameTime = performance.now();
    this.tick();
    
    console.log('🔍 Performance monitoring started');
  }

  /**
   * Stop monitoring performance
   */
  stop(): void {
    if (!this.isRunning || !isDev || typeof window === 'undefined') return;
    
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    console.log('🛑 Performance monitoring stopped');
  }

  /**
   * Add a listener for performance updates
   */
  addListener(callback: (fps: number, status: 'good' | 'warning' | 'critical') => void): () => void {
    if (typeof window === 'undefined') {
      // Return no-op for SSR
      return () => {};
    }
    
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  /**
   * Measure frame rate on each animation frame
   */
  private tick = (): void => {
    if (!this.isRunning || typeof window === 'undefined') return;
    
    const now = performance.now();
    const delta = now - this.lastFrameTime;
    this.lastFrameTime = now;
    
    // Calculate FPS (with a minimum delta to avoid division by zero)
    const fps = 1000 / Math.max(delta, 1);
    
    // Add to frame data, keeping only the most recent samples
    this.frameData.push({ timestamp: now, fps });
    if (this.frameData.length > this.sampleSize) {
      this.frameData.shift();
    }
    
    this.frameCount++;
    
    // Every 60 frames, analyze performance
    if (this.frameCount % 60 === 0) {
      this.analyzePerformance();
    }
    
    this.animationFrameId = requestAnimationFrame(this.tick);
  };

  /**
   * Analyze collected performance data
   */
  private analyzePerformance(): void {
    if (this.frameData.length < 10 || typeof window === 'undefined') return;
    
    // Calculate average FPS
    const totalFps = this.frameData.reduce((sum, frame) => sum + frame.fps, 0);
    const avgFps = totalFps / this.frameData.length;
    
    // Determine status based on thresholds
    let status: 'good' | 'warning' | 'critical' = 'good';
    if (avgFps < this.criticalThreshold) {
      status = 'critical';
      console.warn(`⚠️ CRITICAL PERFORMANCE ISSUE: ${avgFps.toFixed(1)} FPS`);
    } else if (avgFps < this.warningThreshold) {
      status = 'warning';
      console.warn(`⚠️ Performance warning: ${avgFps.toFixed(1)} FPS`);
    }
    
    // Notify listeners
    this.listeners.forEach(listener => listener(avgFps, status));
  }

  /**
   * Get current performance data
   */
  getPerformanceData(): { 
    averageFps: number;
    status: 'good' | 'warning' | 'critical';
    isMonitoring: boolean;
  } {
    if (typeof window === 'undefined' || this.frameData.length === 0) {
      return { averageFps: 60, status: 'good', isMonitoring: this.isRunning };
    }
    
    const totalFps = this.frameData.reduce((sum, frame) => sum + frame.fps, 0);
    const avgFps = totalFps / this.frameData.length;
    
    let status: 'good' | 'warning' | 'critical' = 'good';
    if (avgFps < this.criticalThreshold) {
      status = 'critical';
    } else if (avgFps < this.warningThreshold) {
      status = 'warning';
    }
    
    return { averageFps: avgFps, status, isMonitoring: this.isRunning };
  }
}

// Create singleton instance with lazy initialization for SSR compatibility
let performanceMonitorInstance: PerformanceMonitor | null = null;

export const getPerformanceMonitor = (): PerformanceMonitor => {
  if (!performanceMonitorInstance) {
    performanceMonitorInstance = new PerformanceMonitor();
  }
  return performanceMonitorInstance;
};

// React hook for components to access performance data
export const usePerformanceMonitor = () => {
  if (!isDev || typeof window === 'undefined') {
    // Return dummy data in production or during SSR
    return { 
      averageFps: 60, 
      status: 'good' as const, 
      isMonitoring: false,
      startMonitoring: () => {},
      stopMonitoring: () => {}
    };
  }
  
  const performanceMonitor = getPerformanceMonitor();
  
  return {
    ...performanceMonitor.getPerformanceData(),
    startMonitoring: () => performanceMonitor.start(),
    stopMonitoring: () => performanceMonitor.stop()
  };
}; 