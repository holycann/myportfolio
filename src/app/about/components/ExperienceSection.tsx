"use client";

import React from "react";
import { Loading } from "@/components/ui/loading";
import { Timeline } from "@/components/ui/timeline";
import ShinyText from "@/components/ui/shiny-text";
import { experienceService } from "@/services/experienceService";
import { Experience } from "@/types/Experience";
import { useFetchData } from "@/hooks/useFetchData";

/**
 * Configuration for Experience section
 * Centralizes styling and performance settings
 */
const EXPERIENCE_CONFIG = {
  dataFetching: {
    initialPageSize: 10,
    sortBy: "start_date",
    sortOrder: "desc" as const,
  },
  styling: {
    container: "container mx-auto w-full overflow-clip px-8 lg:py-20",
    titleContainer: "flex flex-col gap-2 justify-start",
    subtitleClass: "text-lg md:text-2xl",
  },
};

/**
 * Experience section displaying professional journey
 * Supports lazy loading and performance optimization
 */
export default function Experience() {
  const { data: experiences, isLoading, error } = useFetchData(
    () => experienceService.getExperiences(
      { per_page: EXPERIENCE_CONFIG.dataFetching.initialPageSize },
      {
        sort_by: EXPERIENCE_CONFIG.dataFetching.sortBy,
        sort_order: EXPERIENCE_CONFIG.dataFetching.sortOrder,
      }
    ),
  );

  // Render loading or error states
  if (isLoading)
    return <Loading variant="solid" size="lg" label="Loading experiences..." />;
  if (error) return <div className="text-red-500 text-center">{error.message}</div>;

  return (
    <section
      id="experience"
      className={EXPERIENCE_CONFIG.styling.container}
      aria-labelledby="experience-title"
    >
      <div className={EXPERIENCE_CONFIG.styling.titleContainer}>
        <ShinyText
          id="experience-title"
          text="Experience"
          disabled={false}
          speed={3}
          className="text-4xl md:text-5xl lg:text-7xl font-bold"
        />
        <p className={EXPERIENCE_CONFIG.styling.subtitleClass}>
          Learning by Doing, Growing by Serving
        </p>
      </div>
      <Timeline data={experiences} />
    </section>
  );
}
