"use client";

import { useState, useEffect } from "react";

export const useLayoutManagement = (activeCard: number) => {
  const [layoutType, setLayoutType] = useState<
    "layout1" | "layout2" | "layout3"
  >("layout1");

  useEffect(() => {
    // Cycle through different layouts based on activeCard
    const layoutIndex = activeCard % 3;
    setLayoutType(
      layoutIndex === 0 ? "layout1" : layoutIndex === 1 ? "layout2" : "layout3"
    );
  }, [activeCard]);

  const getParallaxStyles = (index: number, scrollYProgress: number) => {
    const cardLength = 3; // Assuming 3 layouts
    const cardHeight = 1 / cardLength;
    const cardStart = index * cardHeight;
    const cardEnd = (index + 1) * cardHeight;
    const cardProgress = Math.max(
      0,
      Math.min(1, (scrollYProgress - cardStart) / cardHeight)
    );

    // Different transformations based on layout type
    if (layoutType === "layout1") {
      return {
        phoneTransform: `translateY(${(cardProgress - 0.5) * -50}px) rotateY(${cardProgress * 10}deg)`,
        contentTransform: `translateY(${(cardProgress - 0.5) * 30}px)`,
      };
    } else if (layoutType === "layout2") {
      return {
        phoneTransform: `translateY(${(cardProgress - 0.5) * 30}px) rotateX(${cardProgress * 5}deg)`,
        contentTransform: `translateY(${(cardProgress - 0.5) * -20}px)`,
      };
    } else {
      return {
        phoneTransform: `translateX(${(cardProgress - 0.5) * -40}px) rotateZ(${cardProgress * 3}deg)`,
        contentTransform: `translateX(${(cardProgress - 0.5) * 20}px)`,
      };
    }
  };

  return {
    layoutType,
    getParallaxStyles,
  };
};
