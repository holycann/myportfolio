import { Variants, TargetAndTransition, Transition } from "framer-motion";

/**
 * Animation configurations for consistent and reusable animations
 */
export const AnimationPresets = {
  /**
   * Fade in and slide up animation
   * @param delay - Optional delay for the animation
   * @param direction - Direction of the slide (default: 'up')
   */
  fadeSlide: (delay = 0, direction: 'up' | 'down' | 'left' | 'right' = 'up'): Variants => {
    const directionMap = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 }
    };

    return {
      initial: { 
        opacity: 0, 
        ...directionMap[direction],
        scale: 0.95 
      },
      animate: { 
        opacity: 1, 
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          delay,
          type: "spring",
          stiffness: 100,
          damping: 10,
        }
      },
      hover: {
        scale: 1.05,
        transition: { duration: 0.3 }
      },
      tap: { scale: 0.95 }
    };
  },

  /**
   * Character-level text animation
   * @param delay - Base delay for the animation
   * @param staggerDelay - Delay between characters
   */
  textReveal: (delay = 0, staggerDelay = 0.05): Variants => ({
    initial: { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)",
      scale: 0.8 
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        delay: delay + index * staggerDelay,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }
    })
  }),

  /**
   * Pulsing animation for attention-grabbing elements
   */
  pulse: {
    animate: {
      scale: [1, 1.1, 1],
      transition: { 
        duration: 2, 
        repeat: Infinity 
      }
    }
  },

  /**
   * Hover and tap interactions
   */
  interactiveHover: {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 } 
    },
    tap: { 
      scale: 0.95 
    }
  }
};

/**
 * Utility to generate staggered animations for lists or character sequences
 * @param baseAnimation - Base animation configuration
 * @param staggerDelay - Delay between items
 */
export function staggerAnimation(
  baseAnimation: TargetAndTransition, 
  staggerDelay = 0.1
): Variants {
  return {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    },
    variants: {
      ...baseAnimation
    }
  };
}

/**
 * Create a custom transition with optional parameters
 * @param duration - Animation duration
 * @param type - Transition type
 * @param stiffness - Spring stiffness
 * @param damping - Spring damping
 */
export function createTransition(
  duration = 0.6, 
  type: Transition['type'] = "spring", 
  stiffness = 100, 
  damping = 10
): Transition {
  return {
    duration,
    type,
    stiffness,
    damping
  };
} 