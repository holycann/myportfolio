"use client";

import React from 'react';
import { ProjectItem } from '@/types/project';
import { ProjectCard } from './ProjectCard';
import { StickyScroll } from '@/app/(projects)/components/sticky-scroll-reveal';

export const ProjectsList: React.FC<{ projects: ProjectItem[] }> = ({ projects }) => {
  // Mobile view
  const renderMobileProjects = () => (
    <div className="w-full px-4 py-6 space-y-10">
      {projects.map((project, index) => (
        <ProjectCard key={project.title + index} project={project} />
      ))}
    </div>
  );

  // Desktop view with sticky scroll
  const renderDesktopProjects = () => (
    <StickyScroll 
      content={projects} 
      contentClassName="max-w-7xl mx-auto" 
    />
  );

  return (
    <>
      <div className="lg:hidden">
        {renderMobileProjects()}
      </div>
      <div className="hidden lg:block">
        {renderDesktopProjects()}
      </div>
    </>
  );
}; 