"use client";

import React from "react";
import { ProjectItem } from "@/types/project";
import { ProjectCard } from "./project-card";
import { useMobileDetect } from "@/lib/performance-hooks";
import { ProjectMobileLayout } from "./project-mobile-layout";
import { ProjectDesktopLayout } from "./project-desktop-kayout";

export const ProjectsList: React.FC<{ projects: ProjectItem[] }> = ({
  projects,
}) => {
  // Mobile view
  const renderMobileProjects = () => (
    <div className="w-full px-4 py-6 space-y-10">
      {projects.map((project, index) => (
        <ProjectCard key={project.title + index} project={project} />
      ))}
    </div>
  );

  // Desktop view with sticky scroll
  const renderDesktopProjects = () => {
    const isMobile = useMobileDetect();

    // If mobile, render mobile layout
    if (isMobile) {
      return <ProjectMobileLayout content={projects} />;
    }

    // If desktop, render desktop layout
    return <ProjectDesktopLayout content={projects} />;
  };

  return (
    <>
      <div className="lg:hidden">{renderMobileProjects()}</div>
      <div className="hidden lg:block">{renderDesktopProjects()}</div>
    </>
  );
};
