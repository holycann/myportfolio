"use client";

import React from "react";
import { motion } from "motion/react";
import { DevelopmentStatus, ProgressStatus } from "@/types/project";

export const ProjectStatus = ({
  developmentStatus,
  progressStatus,
  className,
}: {
  developmentStatus: DevelopmentStatus;
  progressStatus: ProgressStatus;
  className?: string;
}) => {
  const developmentStatusConfig = {
    Development: {
      color: "bg-gradient-to-r from-blue-500 to-blue-700",
      textColor: "text-white",
      icon: "🛠️",
      description: "Active Development",
    },
    Alpha: {
      color: "bg-gradient-to-r from-purple-500 to-purple-700",
      textColor: "text-white",
      icon: "🧪",
      description: "Early Prototype",
    },
    Beta: {
      color: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      textColor: "text-black",
      icon: "🚧",
      description: "Feature Testing",
    },
    MVP: {
      color: "bg-gradient-to-r from-green-500 to-green-700",
      textColor: "text-white",
      icon: "🚀",
      description: "Minimum Viable Product",
    },
    Scaling: {
      color: "bg-gradient-to-r from-indigo-500 to-indigo-700",
      textColor: "text-white",
      icon: "📈",
      description: "Growth Phase",
    },
    Completed: {
      color: "bg-gradient-to-r from-emerald-500 to-emerald-700",
      textColor: "text-white",
      icon: "✅",
      description: "Project Finished",
    },
    Delivered: {
      color: "bg-gradient-to-r from-purple-600 to-indigo-600",
      textColor: "text-white",
      icon: "🎉",
      description: "Project Finished",
    }
  };

  const progressStatusConfig = {
    "In Progress": {
      color: "bg-gradient-to-r from-cyan-500 to-blue-500",
      textColor: "text-white",
      icon: "⚙️",
      description: "Active Work",
    },
    "On Hold": {
      color: "bg-gradient-to-r from-orange-500 to-orange-700",
      textColor: "text-white",
      icon: "⏸️",
      description: "Temporarily Paused",
    },
    "In Revision": {
      color: "bg-gradient-to-r from-pink-500 to-pink-700",
      textColor: "text-white",
      icon: "🔄",
      description: "Iterative Improvements",
    },
    Completed: {
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      textColor: "text-white",
      icon: "✅",
      description: "Project Finished",
    },
    Delivered: {
      color: "bg-gradient-to-r from-purple-600 to-indigo-600",
      textColor: "text-white",
      icon: "🎉",
      description: "Deployed & Live",
    },
  };

  const devStatus = developmentStatusConfig[developmentStatus];
  const progStatus = progressStatusConfig[progressStatus];

  return (
    <motion.div
      className={`flex items-center space-x-2 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
        },
      }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className={`
          relative 
          px-4 py-2
          rounded-full 
          flex items-center 
          space-x-4
          shadow-md 
          transform 
          transition-all 
          duration-300 
          ${devStatus.color} 
          ${devStatus.textColor}
          hover:scale-105
        `}
        title={devStatus.description}
      >
        <span className="text-xs">{devStatus.icon}</span>
        <span className="font-semibold text-xs">{developmentStatus}</span>
        <div className="absolute -top-0 -right-0 w-2 h-2 bg-cyan-600/30 rounded-full animate-ping" />
      </motion.div>

      <motion.div
        className={`
          relative
          px-4 py-2 
          rounded-full 
          flex items-center 
          space-x-4 
          shadow-md 
          transform 
          transition-all 
          duration-300 
          ${progStatus.color} 
          ${progStatus.textColor}
          hover:scale-105
        `}
        title={progStatus.description}
      >
        <span className="text-xs">{progStatus.icon}</span>
        <span className="font-semibold text-xs">{progressStatus}</span>
        <div className="absolute -top-0 -right-0 w-2 h-2 bg-cyan-600/30 rounded-full animate-ping" />
      </motion.div>
    </motion.div>
  );
}; 