"use client";
import React, { JSX } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { AnimatedTooltip } from "./animated-tooltip";

export const SocialFloatingButton = ({
  socialItems,
  className = "",
}: {
  socialItems?: {
    name?: string;
    link: string;
    icon: JSX.Element;
  }[];
  className?: string;
}) => {
  return (
    <div className={`fixed bottom-4 left-4 z-[9999] w-auto ${className}`}>
      {socialItems?.length ? (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex items-center space-x-3 bg-white/30 dark:bg-black/30 
          backdrop-blur-md rounded-full p-2 border border-gray-200 dark:border-gray-800 
          shadow-lg"
        >
          {socialItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              target="_blank"
              aria-label={item.name}
              className="text-neutral-600 dark:text-neutral-300 
              hover:text-blue-500 dark:hover:text-blue-400 
              transition-all duration-300 ease-in-out"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-xl"
              >
                <AnimatedTooltip
                  items={[
                    {
                      id: idx,
                      name: item.name || "",
                      element: item.icon,
                    },
                  ]}
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      ) : null}
    </div>
  );
};
