"use client";

import React from "react";
import { motion } from "motion/react";
import { ProjectItem } from "@/types/project";
import { HiXCircle } from "react-icons/hi";
import { ProjectStatus } from "./ProjectStatus";

export interface FullDescriptionModalProps {
  project: ProjectItem;
  onClose: () => void;
}

export const FullDescriptionModal: React.FC<FullDescriptionModalProps> = ({
  project,
  onClose,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }}
    exit={{
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
    >
      <HiXCircle className="text-2xl" />
    </button>

    <motion.div
      className="relative bg-gradient-to-br from-[#120F1E] to-[#1A0F2E] 
      p-6 rounded-xl shadow-2xl max-w-xl w-full max-h-[80vh] overflow-y-auto"
      initial={{ y: 50, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          delay: 0.1,
          type: "spring",
          stiffness: 250,
          damping: 20,
        },
      }}
      exit={{
        y: 50,
        opacity: 0,
        transition: {
          duration: 0.2,
        },
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold text-white mb-4">
        {project.title} - {project.subtitle}
      </h2>

      <div className="flex items-center space-x-2 mb-4">
        <ProjectStatus
          developmentStatus={project.developmentStatus}
          progressStatus={project.progressStatus}
        />
      </div>

      <p className="text-white/80 text-base leading-relaxed text-justify">
        {project.description}
      </p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white mb-3">Features</h3>
        <ul className="space-y-2">
          {project.features.map((feature, index) => (
            <li key={index} className="flex items-center text-white/80">
              <span className="mr-3">{feature.icon}</span>
              {feature.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white mb-3">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <div
              key={index}
              className="flex items-center bg-white/10 px-3 py-1 rounded-full"
            >
              <span className="mr-2">{tech.icon}</span>
              <span className="text-white/80 text-sm">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);
