"use client";
import React, { JSX } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { AnimatedTooltip } from "./animated-tooltip";

export const SocialFloatingButton = ({
  socialItems,
}: {
  socialItems?: {
    name?: string;
    link: string;
    icon: JSX.Element;
  }[];
  className?: string;
}) => {
  return (
    <AnimatePresence mode="wait">
        <>
          {socialItems?.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: -10 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-2 right-4 sm:right-8 z-[5000] flex border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow px-3 py-2 sm:px-4 sm:py-3 items-center space-x-2 sm:space-x-3"
            >
              <AnimatedTooltip
                items={socialItems.map((item, idx) => ({
                  id: idx,
                  name: item.name || "",
                  designation: "",
                  element: (
                    <Link href={item.link} target="_blank">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-neutral-500 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 text-xs"
                      >
                        {item.icon}
                      </motion.div>
                    </Link>
                  ),
                }))}
              />
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-2 left-4 sm:left-8 z-[5000] flex px-2 py-2 sm:px-4 sm:py-3 items-center space-x-1 sm:space-x-3 text-xs sm:text-sm"
          >
          </motion.div>
        </>
    </AnimatePresence>
  );
};
