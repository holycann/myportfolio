"use client";

import React from "react";
import {
  FaFirefoxBrowser,
  FaServer,
  FaCloudUploadAlt,
  FaDatabase,
  FaTools,
  FaReact,
} from "react-icons/fa";

import { Loading } from "@/components/ui/loading";
import ShinyText from "@/components/ui/shiny-text";
import { techStackService } from "@/services/techStackService";
import { TechStack } from "@/types/TechStack";
import { FeaturedSectionProps } from "@/components/ui/featured-section";
import FeaturedSection from "@/components/ui/featured-section";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useFetchData } from "@/hooks/useFetchData";

/**
 * Configuration for TechStack section
 * Centralizes styling and performance settings
 */
const TECH_STACK_CONFIG = {
  pagination: {
    perPage: 100,
  },
  sorting: {
    sortBy: "category" as const,
    sortOrder: "asc" as const,
  },
  grid: {
    base: "grid-cols-2",
    md: "md:grid-cols-3",
    lg: "lg:grid-cols-4",
  },
  icons: {
    className: "text-[var(--color-secondary)]",
  },
};

/**
 * Memoized icon selection for tech stack categories
 * @param category Tech stack category
 * @returns Appropriate icon component
 */
const getIconForCategory = (category?: string) => {
  const iconMap = {
    "Frontend Technologies": FaFirefoxBrowser,
    "Backend Technologies": FaServer,
    Frameworks: FaReact,
    "Database Systems": FaDatabase,
    "Platforms & CMS": FaCloudUploadAlt,
    "Development Tools": FaTools,
    default: FaTools,
  };

  const IconComponent =
    iconMap[category as keyof typeof iconMap] || iconMap.default;
  return <IconComponent className={TECH_STACK_CONFIG.icons.className} />;
};

/**
 * TechStack section displaying categorized technology stacks
 * Supports lazy loading and performance optimization
 */
export default function TechStackSection() {
  const { data: techStackData, isLoading, error } = useFetchData(
    () => techStackService.getTechStacks(
      { per_page: TECH_STACK_CONFIG.pagination.perPage },
      {
        sort_by: TECH_STACK_CONFIG.sorting.sortBy,
        sort_order: TECH_STACK_CONFIG.sorting.sortOrder,
      }
    )
  );

  // Memoized data transformation
  const techStacks: FeaturedSectionProps[] = (() => {
    if (!techStackData || techStackData.length === 0) return [];

    const grouped = techStackData.reduce(
      (acc, tech) => {
        const category = tech.category || "Unknown Category";
        acc[category] = [...(acc[category] || []), tech];
        return acc;
      },
      {} as Record<string, TechStack[]>
    );

    return Object.entries(grouped).map(([category, techs]) => ({
      title: category,
      icon: getIconForCategory(category),
      children: (
        <div
          className={`grid gap-4 p-8 ${TECH_STACK_CONFIG.grid.base} ${TECH_STACK_CONFIG.grid.md} ${TECH_STACK_CONFIG.grid.lg}`}
        >
          {techs.map((tech, index) => (
            <HoverBorderGradient
              key={tech.id}
              containerClassName="w-full"
              className={`
                w-full py-2 
                text-[var(--color-text-primary)] 
                dark:text-[var(--color-text-secondary)] 
                ${
                  index % 2 === 0
                    ? "bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary-dark)]"
                    : "bg-gradient-to-br from-[var(--color-secondary-light)] to-[var(--color-secondary-dark)]"
                }
                text-xs rounded-full
                transition duration-300 
                hover:scale-105
              `}
              duration={1.5}
              clockwise={index % 2 === 0}
            >
              {tech.name}
            </HoverBorderGradient>
          ))}
        </div>
      ),
    }));
  })();

  // Render loading or error states
  if (isLoading)
    return <Loading variant="solid" size="lg" label="Loading..." />;
  if (error) return <div className="text-red-500 text-center">{error.message}</div>;

  return (
    <section
      className="container mx-auto py-10 md:py-20 lg:py-30 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]"
      id="tech-stack"
      aria-labelledby="tech-stack-title"
    >
      <div className="flex justify-center">
        <ShinyText
          id="tech-stack-title"
          text="Tech Stack"
          disabled={false}
          speed={3}
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--color-secondary)]"
        />
      </div>

      <div className="px-6 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
        {techStacks.map((techStack, index) => (
          <div key={techStack.title}>
            <FeaturedSection props={techStack} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
