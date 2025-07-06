"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export interface TypewriterWord {
  text: string;
  className?: string;
}

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  speed = 0.1,
  pauseBetweenWords = 1000,
  reverseOnComplete = true,
  containerStyle,
  textStyle,
}: {
  words: TypewriterWord[];
  className?: string;
  cursorClassName?: string;
  speed?: number;
  pauseBetweenWords?: number;
  reverseOnComplete?: boolean;
  containerStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let typingTimer: NodeJS.Timeout;
    let reverseTimer: NodeJS.Timeout;

    if (isTyping) {
      // Typing effect
      if (displayedText.length < words[currentWordIndex].text.length) {
        typingTimer = setTimeout(() => {
          setDisplayedText(
            words[currentWordIndex].text.slice(0, displayedText.length + 1)
          );
        }, speed * 1000);
      } else {
        // Pause before reversing or moving to next word
        reverseTimer = setTimeout(() => {
          if (reverseOnComplete) {
            setIsTyping(false);
          } else {
            // Move to next word
            setCurrentWordIndex((prev) => 
              (prev + 1) % words.length
            );
            setDisplayedText("");
          }
        }, pauseBetweenWords);
      }
    } else {
      // Reverse typing effect
      if (displayedText.length > 0) {
        reverseTimer = setTimeout(() => {
          setDisplayedText(
            words[currentWordIndex].text.slice(0, displayedText.length - 1)
          );
        }, speed * 1000);
      } else {
        // Move to next word after reversing
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsTyping(true);
      }
    }

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(reverseTimer);
    };
  }, [currentWordIndex, displayedText, isTyping, words]);

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center lg:text-start",
        className
      )}
      style={containerStyle}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={textStyle}
        className={cn(
          "inline-block",
          words[currentWordIndex].className
        )}
      >
        {displayedText}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      />
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  speed = 2,
  delay = 1,
  containerStyle,
  textStyle,
}: {
  words: TypewriterWord[];
  className?: string;
  cursorClassName?: string;
  speed?: number;
  delay?: number;
  containerStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}) => {
  return (
    <div 
      className={cn("flex space-x-1 my-6", className)}
      style={containerStyle}
    >
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: speed,
          ease: "linear",
          delay: delay,
        }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
          style={{
            whiteSpace: "nowrap",
            ...textStyle,
          }}
        >
          {words.map((word, idx) => (
            <span 
              key={idx} 
              className={word.className}
            >
              {word.text}{" "}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-blue-500",
          cursorClassName
        )}
      />
    </div>
  );
};