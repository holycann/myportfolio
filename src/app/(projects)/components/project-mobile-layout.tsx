"use client";
import React from "react";
import { motion } from "motion/react";
import { FaGithub, FaLink } from "react-icons/fa";
import { ProjectItem } from "@/types/project";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ProjectStatus } from "./project-status";

export const ProjectMobileLayout = ({
  content,
}: {
  content: ProjectItem[];
}) => {
  return (
    <div className="w-full px-4 py-6 space-y-10">
      {content.map((item, index) => (
        <motion.div
          key={item.title + index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
              {item.title}
            </h2>
            <div className="flex space-x-3">
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  {item.githubIcon || (
                    <FaGithub className="text-2xl text-gray-800 dark:text-white hover:text-blue-600" />
                  )}
                </a>
              )}
              {item.webUrl && (
                <a
                  href={item.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  {item.webIcon || (
                    <FaLink className="text-2xl text-gray-800 dark:text-white hover:text-green-600" />
                  )}
                </a>
              )}
            </div>
          </div>
          {item.developmentStatus && item.progressStatus && (
            <div className="mb-4">
              <ProjectStatus
                developmentStatus={item.developmentStatus}
                progressStatus={item.progressStatus}
              />
            </div>
          )}
          {item.subtitle && (
            <h3 className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              {item.subtitle}
            </h3>
          )}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 text-justify text-neutral-600 dark:text-neutral-300">
            {item.description}
          </p>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
            Features:
          </h3>
          <ul className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 space-y-2">
            {item.features.map(
              (
                feature: ProjectItem["features"][number],
                featureIndex: number
              ) => (
                <li
                  key={`${item.title}-feature-${featureIndex}-${feature.text}`}
                  className="flex items-center"
                >
                  {feature.icon}
                  <span className="ml-2">{feature.text}</span>
                </li>
              )
            )}
          </ul>

          {/* Add ProgressBar here */}
          <ProgressBar
            progress={item.progressPercentage}
            label="Progress"
            className="mt-4"
            labelClassName="text-neutral-800 dark:text-neutral-100"
          />
        </motion.div>
      ))}
    </div>
  );
};
