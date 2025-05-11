"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { FaGithub, FaLink } from "react-icons/fa6";
import { MyButton } from "./mybutton";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    githubUrl?: string;
    webUrl?: string;
    description: string;
    features: string[];
    techStack: string[];
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="relative grid grid-cols-2 gap-4 h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md py-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="w-full">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-10">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100 mb-4"
              >
                {item.title}
              </motion.h2>
              <motion.a
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                href={item.githubUrl}
                className="text-2xl font-bold text-slate-10 flex mb-4"
              >
                {!item.githubUrl && <FaGithub />}
                {!item.webUrl && <FaLink className="ml-4" />}
              </motion.a>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg mb-4 text-justify text-slate-300"
              >
                {item.description}
              </motion.p>
              <motion.h3
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg mb-4 max-w-sm text-slate-300"
              >
                Feature:
              </motion.h3>
              <motion.ul
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg max-w-sm text-slate-300 mb-4"
              >
                {item.features.map((feature) => (
                  <li key={feature} className="list-disc ml-5">
                    {feature}
                  </li>
                ))}
              </motion.ul>
              <div className="mb-12">
                {item.techStack.map((item) => (
                  <MyButton key={item} text={item} />
                ))}
              </div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "sticky top-10 hidden h-100 w-full overflow-hidden rounded-md lg:block",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
