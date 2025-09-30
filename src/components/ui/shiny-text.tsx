import React, { useMemo } from "react";

/**
 * Configuration for shiny text animation
 * Provides default and customizable settings
 */
const SHINY_TEXT_CONFIG = {
  defaults: {
    speed: 5,
    textColor: "#b5b5b5a4",
    shineColor: "rgba(255, 255, 255, 0.8)",
    animationAngle: 120,
    backgroundSize: "200% 100%"
  }
};

/**
 * Properties for ShinyText component
 * Defines configuration for animated shiny text effect
 */
interface ShinyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  disabled?: boolean;
  speed?: number;
  textColor?: string;
  shineColor?: string;
  animationAngle?: number;
}

/**
 * ShinyText Component
 * Renders text with a dynamic, animated shine effect
 * 
 * @component
 * @param {ShinyTextProps} props - Configuration for shiny text
 * @returns {React.ReactElement} Animated shiny text
 */
const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = SHINY_TEXT_CONFIG.defaults.speed,
  className = "",
  textColor = SHINY_TEXT_CONFIG.defaults.textColor,
  shineColor = SHINY_TEXT_CONFIG.defaults.shineColor,
  animationAngle = SHINY_TEXT_CONFIG.defaults.animationAngle,
  ...divProps
}) => {
  // Memoize animation styles to prevent unnecessary recomputations
  const animationStyles = useMemo(() => ({
    color: textColor,
    backgroundImage: `linear-gradient(${animationAngle}deg, rgba(255, 255, 255, 0) 40%, ${shineColor} 50%, rgba(255, 255, 255, 0) 60%)`,
    backgroundSize: SHINY_TEXT_CONFIG.defaults.backgroundSize,
    WebkitBackgroundClip: "text",
    animationDuration: `${speed}s`
  }), [textColor, shineColor, speed, animationAngle]);

  return (
    <div
      {...divProps}
      className={`
        bg-clip-text 
        inline-block 
        ${disabled ? "" : "animate-shine"} 
        ${className}
      `}
      style={animationStyles}
    >
      {text}
    </div>
  );
};

ShinyText.displayName = 'ShinyText';

export default ShinyText;