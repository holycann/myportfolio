"use client";

import React, { useEffect, useState } from "react";
import { motion, MotionValue, useMotionValue, useSpring } from "motion/react";

// ✅ Custom hook untuk deteksi mobile secara clean
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update(); // initial check
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
};

export const ContainerHoverAnimation = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const isMobile = useIsMobile();

  const rotate = useSpring(useMotionValue(20), { stiffness: 200, damping: 20 });
  const scale = useSpring(useMotionValue(1), { stiffness: 200, damping: 20 });

  const handleHoverStart = () => {
    requestAnimationFrame(() => {
      rotate.set(0);
      scale.set(isMobile ? 0.9 : 1.05);
    });
  };

  const handleHoverEnd = () => {
    requestAnimationFrame(() => {
      rotate.set(20);
      scale.set(1); // reset ke normal
    });
  };

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

export const Header = ({ titleComponent }: { titleComponent: React.ReactNode }) => (
  <motion.div className="max-w-5xl mx-auto text-center mb-4">
    {titleComponent}
  </motion.div>
);

export const Card = ({
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
  return (
    <motion.div
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      style={{
        rotateX: rotate,
        scale,
        willChange: "transform, box-shadow", // ✅ GPU-accelerated
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 12px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[20rem] lg:h-[25rem] w-full border-4 border-[#6C6C6C] p-2 lg:p-4 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl lg:p-4">
        {children}
      </div>
    </motion.div>
  );
};
