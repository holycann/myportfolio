"use client";
import React, { JSX, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { AnimatedTooltip } from "./animated-tooltip";
import { ContainerTextFlip } from "./container-text-flip";

export const BottomNavbar = ({
  navItems,
  socialItems,
  className,
}: {
  navItems: {
    name?: string;
    link: string;
    icon?: JSX.Element;
  }[];
  socialItems?: {
    name?: string;
    link: string;
    icon: JSX.Element;
  }[];
  className?: string;
}) => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("navbarAnimated");

    if (!hasAnimated) {
      setTimeout(() => {
        setVisible(true);
        sessionStorage.setItem("navbarAnimated", "true");
      }, 1000);
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "fixed bottom-2 left-1/2 transform -translate-x-1/2",
              "flex border border-transparent dark:border-white/[0.2] rounded-full",
              "dark:bg-black bg-white shadow items-center space-x-3 z-[5000]",
              "px-4 py-2 sm:px-6 sm:py-3",
              "max-w-[95%] sm:max-w-none", // Lebar terbatas di layar kecil
              className
            )}
          >
            {navItems.map((navItem, idx) => (
              <React.Fragment key={`link-${idx}`}>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center"
                >
                  <Link
                    href={navItem.link}
                    className={cn(
                      "relative dark:text-neutral-50 text-neutral-600",
                      "hover:text-blue-500 dark:hover:text-blue-400",
                      "transition-colors duration-300",
                      "flex items-center space-x-1 group"
                    )}
                  >
                    <motion.span
                      className="block"
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {navItem.icon}
                    </motion.span>
                    <span className="hidden sm:inline text-sm relative">
                      {navItem.name}
                      {idx !== 0 && pathname === navItem.link && (
                        <motion.span
                          layoutId="underline"
                          className={cn(
                            "absolute inset-x-0 mx-auto -bottom-px h-px",
                            "bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                          )}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </span>
                  </Link>
                </motion.div>
                {idx === 0 && <RxDividerVertical size={20} className="hidden sm:block" />}
              </React.Fragment>
            ))}
          </motion.div>

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
            ©2025 - Muhamad Ramadhan Made
            <ContainerTextFlip
              words={["With Love", "With ❤️", "With 💖", "With 🤍", "With 😘", "With 😊", "With 😎", "With 😂", "With 😁", "with 🙃", "with 😵‍💫", "with 🤩", "with 🤗", "with 😘", "with 😍", "with 😚", "with 👌", "with 👏", "with 💪", "with 🙋‍♂️", "with 🙋‍♀️", "With 🥰"]}
              className="ml-1 sm:ml-2"
              textClassName="font-semibold"
              interval={3000}
              animationDuration={700}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};