"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Loading } from "@/components/ui/loading";
import { Timeline } from "@/components/ui/timeline";
import ShinyText from "@/components/ui/shiny-text";
import { experienceService } from "@/services/experienceService";
import type { Experience } from "@/types/Experience";

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
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized fetch experiences function
  const fetchExperiences = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await experienceService.getExperiences(
        {
          per_page: EXPERIENCE_CONFIG.dataFetching.initialPageSize,
        },
        {
          sort_by: EXPERIENCE_CONFIG.dataFetching.sortBy,
          sort_order: EXPERIENCE_CONFIG.dataFetching.sortOrder,
        }
      );

      const experienceData = response?.data ?? [];

      if (Array.isArray(experienceData) && experienceData.length > 0) {
        // Memoized data sorting and transformation
        const sortedExperiences = (() =>
          experienceData.sort(
            (a, b) =>
              new Date(b.start_date).getTime() -
              new Date(a.start_date).getTime()
          ))();

        setExperiences(sortedExperiences);
        setError(null);
      } else {
        setError("No experiences found.");
      }
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
      setError("Unable to load experiences. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch experiences on component mount
  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  // Render loading or error states
  if (isLoading)
    return <Loading variant="solid" size="lg" label="Loading experiences..." />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

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
