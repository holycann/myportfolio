"use client";

import React, { 
  useState, 
  useEffect, 
  useCallback 
} from "react";
import dynamic from "next/dynamic";
import { GoProjectTemplate } from "react-icons/go";
import { projectService } from "@/services/projectService";
import { Project } from "@/types/Project";
import { Loading } from "@/components/ui/loading";
import LoadingScreen from "@/components/ui/loading-screen";

// Dynamically import heavy components
const DarkVeil = dynamic(() => import("@/components/ui/dark-veil-background"), {
  loading: () => <Loading variant="solid" size="lg" label="Loading..." />,
  ssr: false,
});

const ShinyText = dynamic(() => import("@/components/ui/shiny-text"), {
  loading: () => <Loading variant="solid" size="lg" label="Loading..." />,
  ssr: false,
});

const Badge = dynamic(() => import("@/components/ui/badge"), {
  loading: () => <Loading variant="solid" size="lg" label="Loading..." />,
  ssr: false,
});

const ProjectCard = dynamic(
  () => import("./components/ProjectCard").then((mod) => mod.ProjectCard),
  {
    loading: () => <Loading variant="solid" size="lg" label="Loading..." />,
    ssr: false,
  }
);

/**
 * Configuration for Projects page
 * Centralizes styling and performance settings
 */
const PROJECTS_CONFIG = {
  dataFetching: {
    initialPageSize: 10,
    sortBy: 'progress_status',
    sortOrder: 'desc' as const
  },
  styling: {
    heroSection: "relative w-screen min-h-screen overflow-hidden flex items-center justify-center",
    heroContent: "container absolute w-full flex flex-col items-center justify-center z-10 gap-8 -mt-50",
    projectSection: "w-full h-full relative flex items-center justify-center -mt-80 bg-gradient-to-b from-bg-black to-[var(--background)] mb-40"
  }
};

/**
 * Projects page component
 * Handles client-side data fetching and rendering
 */
export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized fetch projects function
  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await projectService.getProjects({
        per_page: PROJECTS_CONFIG.dataFetching.initialPageSize
      }, {
        sort_by: PROJECTS_CONFIG.dataFetching.sortBy,
        sort_order: PROJECTS_CONFIG.dataFetching.sortOrder
      });

      const projectData = response?.data ?? [];
      
      if (Array.isArray(projectData) && projectData.length > 0) {
        setProjects(projectData);
        setError(null);
      } else {
        setError("No projects found.");
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError("Unable to load projects. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Render loading or error states
  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      <section 
        className={PROJECTS_CONFIG.styling.heroSection} 
        aria-labelledby="projects-title"
      >
        <DarkVeil hueShift={210} />
        <div className={PROJECTS_CONFIG.styling.heroContent}>
          <Badge 
            className="bg-[var(--color-primary)] border rounded-2xl flex items-center gap-2 capitalize text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary)]"
          >
            <GoProjectTemplate size={20} />
            Projects that tell my story
          </Badge>
          <ShinyText
            id="projects-title"
            text="Every project is part of my creative journey."
            textColor="var(--color-text-muted)"
            shineColor="var(--color-accent)"
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary)]"
            disabled={false}
            speed={3}
          />
        </div>
      </section>
      <section 
        className={PROJECTS_CONFIG.styling.projectSection}
        aria-label="Project Showcase"
      >
        <ProjectCard projects={projects} />
      </section>
    </>
  );
}
