"use client";

import React from "react";
import { useMemo, useCallback } from "react";
import { 
  motion, 
  MotionValue, 
  useMotionValue, 
  useSpring,
} from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AnimationPresets } from "@/lib/animations";

/**
 * Configuration for hover animation
 * Allows customization of animation behavior
 */
const HOVER_CONFIG = {
  desktop: {
    rotateX: 0,
    scale: 1.05,
    stiffness: 200,
    damping: 20
  },
  mobile: {
    rotateX: 0,
    scale: 0.9,
    stiffness: 150,
    damping: 15
  }
};

/**
 * Header component for ContainerHoverAnimation
 * Renders the title component with motion
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.titleComponent - Title to be rendered
 */
const Header = React.memo(({
  titleComponent,
}: {
  titleComponent: React.ReactNode;
}) => (
  <motion.div 
    variants={AnimationPresets.fadeSlide()}
    initial="initial"
    animate="animate"
    className="max-w-5xl mx-auto text-center mb-4"
  >
    {titleComponent}
  </motion.div>
));
Header.displayName = "Header";

/**
 * Card component with hover and scale animations
 * Provides interactive 3D-like transformation
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {MotionValue} props.rotate - Rotation motion value
 * @param {MotionValue} props.scale - Scale motion value
 * @param {React.ReactNode} props.children - Card content
 * @param {() => void} props.onHoverStart - Hover start handler
 * @param {() => void} props.onHoverEnd - Hover end handler
 */
const Card = React.memo(({
  rotate,
  scale,
  children,
  onHoverStart,
  onHoverEnd,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) => {
  const cardVariants = useMemo(() => ({
    initial: { 
      boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 12px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003" 
    },
    hover: { 
      boxShadow: "0 0 #0000004d, 0 15px 30px #0000005a, 0 45px 45px #00000052, 0 20px 60px #00000036, 0 180px 70px #0000001a, 0 250px 75px #00000013" 
    }
  }), []);

  return (
    <motion.div
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      style={{
        rotateX: rotate,
        scale,
        willChange: "transform, box-shadow",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[20rem] lg:h-[25rem] w-full border-4 border-[#6C6C6C] p-2 lg:p-4 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl lg:p-4">
        {children}
      </div>
    </motion.div>
  );
});
Card.displayName = "Card";

/**
 * ContainerHoverAnimation provides an interactive hover effect
 * with 3D-like transformation and responsive behavior
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.titleComponent - Title to be rendered
 * @param {React.ReactNode} props.children - Content to be displayed
 */
export const ContainerHoverAnimation = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  // Use custom media query hook for better performance
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Memoize animation configuration based on device type
  const animationConfig = useMemo(() => 
    isMobile ? HOVER_CONFIG.mobile : HOVER_CONFIG.desktop, 
    [isMobile]
  );

  // Optimize motion values with spring physics
  const rotate = useSpring(
    useMotionValue(animationConfig.rotateX), 
    { 
      stiffness: animationConfig.stiffness, 
      damping: animationConfig.damping 
    }
  );
  const scale = useSpring(
    useMotionValue(1), 
    { 
      stiffness: animationConfig.stiffness, 
      damping: animationConfig.damping 
    }
  );

  // Memoized hover handlers to prevent unnecessary re-renders
  const handleHoverStart = useCallback(() => {
    requestAnimationFrame(() => {
      rotate.set(animationConfig.rotateX);
      scale.set(animationConfig.scale);
    });
  }, [rotate, scale, animationConfig]);

  const handleHoverEnd = useCallback(() => {
    requestAnimationFrame(() => {
      rotate.set(20);
      scale.set(1);
    });
  }, [rotate, scale]);

  return (
    <div className="flex lg:items-start lg:justify-start sm:items-center sm:justify-center relative p-2 md:px-20 lg:pb-20">
      <div className="w-full relative" style={{ perspective: "1000px" }}>
        <Header titleComponent={titleComponent} />
        <Card
          rotate={rotate}
          scale={scale}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

export default ContainerHoverAnimation;
