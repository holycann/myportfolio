"use client";
import { animate } from "motion/react";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { FaDocker, FaGolang, FaPython } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiFirebase, SiNextdotjs, SiTailwindcss } from 'react-icons/si';

export default function FavTechStack() {
  return <Skeleton />;
}

const Skeleton = () => {
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [
      ".circle-1",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-2",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-3",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-4",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-5",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    animate(sequence, {
      // @ts-expect-error ts-migrate(2345)
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);
  return (
    <div className="p-8 pb-0 lg:pb-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row shrink-0 justify-center items-center gap-2">
        <Container className="h-8 w-8 circle-1">
          <SiFirebase className="h-4 w-4 " />
        </Container>
        <Container className="h-12 w-12 circle-2">
          <BiLogoPostgresql className="h-6 w-6 dark:text-white" />
        </Container>
        <Container className="circle-3">
          <FaGolang className="h-8 w-8 dark:text-white" />
        </Container>
        <Container className="h-12 w-12 circle-4">
          <SiNextdotjs className="h-6 w-6 " />
        </Container>
        <Container className="h-8 w-8 circle-5">
          <SiTailwindcss className="h-4 w-4 " />
        </Container>
      </div>
    </div>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
      shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
      `,
        className
      )}
    >
      {children}
    </div>
  );
};