/**
 * Animation Web Worker
 * Handles complex animation calculations off the main thread
 */

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'CALCULATE_ANIMATION_FRAMES':
      // Calculate animation frames
      const frames = calculateAnimationFrames(payload);
      self.postMessage({ type: 'ANIMATION_FRAMES_RESULT', frames });
      break;

    case 'PROCESS_PARTICLES':
      // Process particle animations
      const particles = processParticles(payload);
      self.postMessage({ type: 'PARTICLES_RESULT', particles });
      break;

    default:
      console.error('Unknown message type:', type);
  }
});

/**
 * Calculate animation frames based on parameters
 * @param {Object} params Animation parameters
 * @returns {Array} Calculated animation frames
 */
function calculateAnimationFrames(params) {
  const { duration, frameCount, easing, start, end } = params;
  const frames = [];

  // Generate frames based on easing function
  for (let i = 0; i <= frameCount; i++) {
    const progress = i / frameCount;
    const easedProgress = applyEasing(progress, easing);
    const value = start + (end - start) * easedProgress;
    
    frames.push({
      progress,
      value,
      timestamp: progress * duration
    });
  }

  return frames;
}

/**
 * Process particle animations
 * @param {Object} params Particle parameters
 * @returns {Array} Processed particles
 */
function processParticles(params) {
  const { count, bounds, velocity } = params;
  const particles = [];

  // Generate particles with positions and velocities
  for (let i = 0; i < count; i++) {
    const x = Math.random() * bounds.width;
    const y = Math.random() * bounds.height;
    const vx = (Math.random() - 0.5) * velocity;
    const vy = (Math.random() - 0.5) * velocity;
    
    particles.push({ x, y, vx, vy });
  }

  return particles;
}

/**
 * Apply easing function to progress
 * @param {number} progress Linear progress (0-1)
 * @param {string} easingType Type of easing function
 * @returns {number} Eased progress
 */
function applyEasing(progress, easingType) {
  switch (easingType) {
    case 'linear':
      return progress;
    case 'easeInQuad':
      return progress * progress;
    case 'easeOutQuad':
      return progress * (2 - progress);
    case 'easeInOutQuad':
      return progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;
    case 'easeInCubic':
      return progress * progress * progress;
    case 'easeOutCubic':
      return (--progress) * progress * progress + 1;
    case 'easeInOutCubic':
      return progress < 0.5
        ? 4 * progress * progress * progress
        : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
    case 'spring':
      return 1 - (Math.cos(progress * Math.PI * 4) * Math.exp(-progress * 6));
    default:
      return progress;
  }
} 