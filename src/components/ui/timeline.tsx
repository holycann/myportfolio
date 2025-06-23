"use client";

import { useScroll, useTransform, motion } from "motion/react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { TextGenerateEffect } from './text-generate-effect';

export interface TimelineEntry {
  role: string;
  company: string;
  logo: string;
  jobType: string;
  start: string;
  end: string;
  location: string;
  arragement: string;
  content: React.ReactNode;
}

export const Timeline = ({ title, data }: { title: string, data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 100%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full md:px-10" ref={containerRef}>
      <div className="flex justify-center items-center lg:py-20 px-4 md:px-8 lg:px-10">
        <TextGenerateEffect words={title} />
      </div>

      <div className="relative max-w-7xl mx-auto pb-20" ref={ref}>
        {data.map((item, index) => (
          <div
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
            key={index}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <Image
                  src={item.logo}
                  alt={item.company}
                  width={56}
                  height={28}
                />
              </div>
              <div className="hidden md:block pl-20">
                <h3 className="text-md md:text-4xl font-bold text-neutral-800 dark:text-white ">
                  {item.role}
                </h3>
                <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-300 ">
                  {item.company} <span className="mx-2">·</span> {item.jobType}
                </h4>
                <div className="flex justify-start items-center gap-2">
                  <HiOutlineCalendarDateRange />
                  <h5 className="text-md text-neutral-800 dark:text-neutral-300">
                    {item.start} <span className="mx-1 font-semibold">-</span>{" "}
                    {item.end}
                  </h5>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <HiOutlineLocationMarker />
                  <h5 className="text-md text-neutral-800 dark:text-neutral-300 ">
                    {item.location} <span className="mx-2 font-bold">·</span>{" "}
                    {item.arragement}
                  </h5>
                </div>
              </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.role}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
