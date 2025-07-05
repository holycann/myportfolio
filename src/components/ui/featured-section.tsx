import { cn } from "@/lib/utils";
import React from "react";

export type FeaturedSectionProps = {
  title: string;
  icon: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  hoverOverlayClassName?: string;
  indicatorClassName?: string;
};

export default function FeaturedSection({
  props,
  index,
}: {
  index: number;
  props: FeaturedSectionProps;
}) {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800",
        props.className
      )}
    >
      {index < 4 && (
        <div
          className={cn(
            "opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none",
            props.hoverOverlayClassName
          )}
        />
      )}
      {index >= 4 && (
        <div
          className={cn(
            "opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none",
            props.hoverOverlayClassName
          )}
        />
      )}
      <div
        className={cn(
          "mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400",
          props.iconClassName
        )}
      >
        {props.icon}
      </div>
      <div
        className={cn(
          "text-lg font-bold mb-2 relative z-10 px-10",
          props.titleClassName
        )}
      >
        <div
          className={cn(
            "absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center",
            props.indicatorClassName
          )}
        />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {props.title}
        </span>
      </div>
      <p
        className={cn(
          "text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10",
          props.descriptionClassName
        )}
      >
        {props.description}
      </p>
      <div className="max-w-7xl">
        {props.children}
      </div>
    </div>
  );
}
