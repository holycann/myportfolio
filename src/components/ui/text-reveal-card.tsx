"use client";
import React, { useEffect, useRef, useState, memo, useMemo } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
  variant = 'default',
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'dark' | 'light';
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  // Advanced reveal text animation with extended delay
  const revealChars = useMemo(() => {
    return revealText.split('').map((char, index) => ({
      char,
      index,
      delay: index * 0.1, // Increased delay for slower reveal
    }));
  }, [revealText]);

  // Advanced motion values for more dynamic interactions
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  // Variant-based styling
  const variantStyles = {
    default: {
      background: "bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700",
      textColor: "text-white",
      overlayGradient: "from-neutral-900 via-neutral-800 to-neutral-700",
    },
    gradient: {
      background: "bg-gradient-brand",
      textColor: "text-white",
      overlayGradient: "from-brand-100 via-brand-200 to-brand-300",
    },
    dark: {
      background: "bg-custom-300",
      textColor: "text-custom-50",
      overlayGradient: "from-custom-300 via-custom-200 to-custom-100",
    },
    light: {
      background: "bg-custom-50",
      textColor: "text-custom-300",
      overlayGradient: "from-custom-50 via-custom-100 to-custom-200",
    }
  };

  const currentVariant = variantStyles[variant];

  // Transform values for 3D effect
  const boxShadow = useTransform(
    [rotateX, rotateY],
    ([rx, ry]) => `
      ${-ry / 10}px ${rx / 10}px 20px rgba(0,0,0,0.1),
      ${ry / 15}px ${-rx / 15}px 30px rgba(0,0,0,0.05)
    `
  );

  useEffect(() => {
    if (cardRef.current) {
      const { left, width: localWidth } =
        cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  }, []);

  function mouseMoveHandler(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);

    // Reset motion values
    animate(rotateX, 0, { duration: 0.5 });
    animate(rotateY, 0, { duration: 0.5 });
    animate(scale, 1, { duration: 0.5 });
  }

  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  function touchMoveHandler(event: React.TouchEvent<HTMLDivElement>) {
    event.preventDefault();
    const clientX = event.touches[0]!.clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        scale,
        boxShadow,
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      className={cn(
        "lg:rounded-3xl rounded-2xl p-6 md:p-8 relative overflow-hidden flex justify-center items-center w-full cursor-pointer lg:mx-12 mx-6 lg:mt-0 mt-12 h-20 lg:h-40",
        "transition-all duration-300 ease-out",
        "group hover:scale-[1.02] hover:shadow-2xl",
        "shadow-lg hover:shadow-xl",
        currentVariant.background,
        className
      )}
    >
      {children}

      {/* Enhanced Reveal Text Layer */}
      <motion.div
        style={{
          width: "100%",
        }}
        animate={
          isMouseOver
            ? {
                opacity: widthPercentage > 0 ? 1 : 0,
                clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
              }
            : {
                clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
              }
        }
        transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
        className="absolute inset-0 z-20 will-change-transform"
      >
        {/* Overlay to fade out original text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isMouseOver ? 1 : 0,
            transition: { 
              duration: 0.3,
              delay: isMouseOver ? 0.2 : 0 // Slight delay when revealing
            }
          }}
          className={`absolute inset-0 bg-gradient-to-br ${currentVariant.overlayGradient} z-10`}
        />

        <div className={`relative z-20 text-center text-md md:text-5xl lg:text-3xl mx-4 md:mx-10 font-bold ${currentVariant.textColor} h-full flex items-center justify-center px-4`}>
          <div className="max-w-full break-words text-center">
            {revealChars.map(({ char, index, delay }) => (
              <motion.span
                key={index}
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  scale: 0.6,
                  filter: 'blur(15px)'
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)'
                }}
                transition={{
                  delay: delay + 0.3, // Added delay to match overlay fade
                  duration: 0.8, // Slower animation
                  type: "spring",
                  stiffness: 70, // Softer spring
                  damping: 12
                }}
                className="inline-block origin-bottom"
                style={{
                  display: 'inline-block',
                  transformOrigin: 'bottom center'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Moving Gradient Line */}
      <motion.div
        animate={{
          left: `${widthPercentage}%`,
          rotate: `${rotateDeg}deg`,
          opacity: widthPercentage > 0 ? 1 : 0,
        }}
        transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
        className="h-20 lg:h-40 w-[8px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform"
      ></motion.div>

      {/* Stars Background */}
      <MemoizedStars />

      {/* Base Text Layer */}
      <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
        <p className={`text-3xl lg:text-5xl py-10 font-bold bg-clip-text text-transparent ${variant === 'light' ? 'bg-[#040D12]' : 'bg-[#323238]'}`}>
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className,
  variant = 'default'
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'dark' | 'light';
}) => {
  const variantStyles = {
    default: "text-white hover:text-blue-300",
    gradient: "text-white hover:text-brand-50",
    dark: "text-custom-50 hover:text-custom-100",
    light: "text-custom-300 hover:text-custom-200"
  };

  return (
    <h2 className={twMerge(
      "text-lg md:text-xl lg:text-2xl mb-2 transition-colors duration-300", 
      variantStyles[variant],
      className
    )}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className,
  variant = 'default'
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'dark' | 'light';
}) => {
  const variantStyles = {
    default: "text-neutral-300 hover:text-purple-300",
    gradient: "text-brand-50 hover:text-white",
    dark: "text-custom-100 hover:text-custom-50",
    light: "text-custom-200 hover:text-custom-300"
  };

  return (
    <p className={twMerge(
      "text-sm md:text-base lg:text-lg transition-colors duration-300", 
      variantStyles[variant],
      className
    )}>
      {children}
    </p>
  );
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0 overflow-hidden opacity-50 group-hover:opacity-70 transition-opacity duration-300">
      {[...Array(80)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
