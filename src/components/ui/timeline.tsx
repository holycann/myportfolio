"use client";

import { useScroll, useTransform, motion } from "motion/react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { createPlaceHolder } from "@/lib/utils";
import { MyButton } from "./mybutton";
import { Experience } from "@/types/Experience";

export const Timeline = ({ data }: { data: Experience[] }) => {
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
    offset: ["start 80%", "end 100%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full md:px-10" ref={containerRef}>
      <div className="relative max-w-7xl mx-auto pb-20" ref={ref}>
        {data.map((item, index) => (
          <div
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
            key={index}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs md:w-8 lg:max-w-sm lg:w-full">
              <div className="h-10 relative left-3 md:left-4 w-10 rounded-full bg-[var(--color-bg-secondary)] dark:bg-[var(--color-bg-primary)] flex items-center justify-center">
                <Image
                  src={
                    item.logo_url === ""
                      ? createPlaceHolder(item.company || "Default Image")
                      : item.logo_url
                  }
                  alt={item.company}
                  width={56}
                  height={28}
                />
              </div>
              <div className="hidden lg:block lg:pl-20">
                <h3 className="text-md md:text-4xl font-bold text-neutral-800 dark:text-white ">
                  {item.role}
                </h3>
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-muted)]">
                  {item.company} <span className="mx-2">·</span> {item.job_type}
                </h4>
                <div className="flex justify-start items-center gap-2">
                  <HiOutlineCalendarDateRange className="text-[var(--color-text-muted)] dark:text-[var(--color-text-muted)]" />
                  <h5 className="text-md text-[var(--color-text-primary)] dark:text-[var(--color-text-muted)]">
                    {item.start_date}{" "}
                    <span className="mx-1 font-semibold">-</span>{" "}
                    {item.end_date || "Present"}
                  </h5>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <HiOutlineLocationMarker className="text-[var(--color-text-muted)] dark:text-[var(--color-text-muted)]" />
                  <h5 className="text-md text-[var(--color-text-primary)] dark:text-[var(--color-text-muted)]">
                    {item.location} <span className="mx-2 font-bold">·</span>{" "}
                    {item.arrangement}
                  </h5>
                </div>
              </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <div className="pb-6 lg:hidden ">
                <h3 className="text-md md:text-4xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary)]">
                  {item.role}
                </h3>
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-muted)]">
                  {item.company} <span className="mx-2">·</span> {item.job_type}
                </h4>
                <div className="flex justify-start items-center gap-2">
                  <HiOutlineCalendarDateRange className="text-[var(--color-text-muted)] dark:text-[var(--color-text-muted)]" />
                  <h5 className="text-md text-[var(--color-text-primary)] dark:text-[var(--color-text-muted)]">
                    {item.start_date}{" "}
                    <span className="mx-1 font-semibold">-</span>{" "}
                    {item.end_date || "Present"}
                  </h5>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <HiOutlineLocationMarker className="text-[var(--color-text-muted)] dark:text-[var(--color-text-muted)]" />
                  <h5 className="text-md text-[var(--color-text-primary)] dark:text-[var(--color-text-muted)]">
                    {item.location} <span className="mx-2 font-bold">·</span>{" "}
                    {item.arrangement}
                  </h5>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {item.images_url && item.images_url.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src={item.images_url[0]}
                        alt={`${item.company} workspace`}
                        width={500}
                        height={500}
                        className="w-full rounded-lg object-cover shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform duration-300 hover:scale-[1.02]"
                      />
                    </motion.div>
                  )}
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-4 text-xs md:text-sm font-normal text-[var(--color-text-primary)] dark:text-[var(--color-text-muted)] text-justify"
                >
                  {item.work_description}
                </motion.p>
                <motion.ul
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="list-none ml-4 text-xs md:text-sm mb-4 space-y-2"
                >
                  {item.impact.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center text-neutral-600 dark:text-neutral-400 before:content-['▶'] before:mr-2 before:text-amber-100"
                    >
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2"
                >
                  {item.experience_tech_stack?.map((tech) => (
                    <MyButton
                      key={tech.tech_stack.id}
                      text={tech.tech_stack.name}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[var(--color-border)] dark:via-[var(--color-border)] to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-secondary)] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
