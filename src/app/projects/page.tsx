"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { GoProjectTemplate } from "react-icons/go";
import { projectService } from "@/services/projectService";
import { Project } from "@/types/Project";
import { Loading } from "@/components/ui/loading";

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

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getProjects();
        if (response.data) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <div className="relative w-screen min-h-screen overflow-hidden flex items-center justify-center">
        <DarkVeil hueShift={210} />
        <div className="container absolute w-full flex flex-col items-center justify-center z-10 gap-8 -mt-50">
          <Badge className="bg-[var(--color-primary)] border rounded-2xl flex items-center gap-2 capitalize text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary)]">
            <GoProjectTemplate size={20} />
            Projects that tell my story
          </Badge>
          <ShinyText
            text="Every project is part of my creative journey."
            textColor="var(--color-text-muted)"
            shineColor="var(--color-accent)"
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary)]"
            disabled={false}
            speed={3}
          />
        </div>
      </div>
      <div className="w-full h-full relative flex items-center justify-center -mt-100 bg-gradient-to-b from-bg-black to-[var(--background)] mb-40">
        <ProjectCard projects={projects} />
      </div>
    </>
  );
};

export default Projects;
