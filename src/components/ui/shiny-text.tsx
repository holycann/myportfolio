import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  textColor?: string;
  shineColor?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  textColor = "#b5b5b5a4",
  shineColor = "rgba(255, 255, 255, 0.8)",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`bg-clip-text inline-block ${disabled ? "" : "animate-shine"} ${className}`}
      style={{
        color: textColor,
        backgroundImage: `linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, ${shineColor} 50%, rgba(255, 255, 255, 0) 60%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;