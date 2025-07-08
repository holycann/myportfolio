"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLink } from 'react-icons/fa';
import { ProjectItem } from '@/types/project';
import { ProjectBadge } from './ProjectBadge';
import { ProjectStatus } from './ProjectStatus';

export const ProjectCard: React.FC<{ project: ProjectItem }> = ({ project }) => {
  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
          {project.title}
        </h2>
        <div className="flex space-x-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              {project.githubIcon}
            </a>
          )}
          {project.webUrl && (
            <a
              href={project.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              {project.webIcon}
            </a>
          )}
        </div>
      </div>

      {project.developmentStatus && project.progressStatus && (
        <div className="mb-4">
          <ProjectStatus
            developmentStatus={project.developmentStatus}
            progressStatus={project.progressStatus}
          />
        </div>
      )}

      {project.subtitle && (
        <h3 className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          {project.subtitle}
        </h3>
      )}

      <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 text-justify text-neutral-600 dark:text-neutral-300">
        {project.description}
      </p>

      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
        Features:
      </h3>
      <ul className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 space-y-2">
        {project.features.map((feature, featureIndex) => (
          <li
            key={`${project.title}-feature-${featureIndex}-${feature.text}`}
            className="flex items-center"
          >
            {feature.icon}
            <span className="ml-2">{feature.text}</span>
          </li>
        ))}
      </ul>

      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-200 mt-4 mb-2">
        Tech Stack:
      </h3>
      <div className="flex flex-wrap gap-4">
        {project.techStack.map((tech, techIndex) => (
          <div 
            key={`${project.title}-tech-${techIndex}`} 
            className="flex flex-col items-center"
          >
            <div className="text-2xl mb-1">{tech.icon}</div>
            <span className="text-xs">{tech.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}; 