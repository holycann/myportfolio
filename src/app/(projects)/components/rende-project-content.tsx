"use client";
import React from "react";
import { motion } from "motion/react";
import { FaGithub, FaLink } from "react-icons/fa";
import { ProjectItem } from "@/types/project";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ProjectStatus } from "./project-status";
import { ProjectBadge } from "./project-badge";
import { AnimatedTechStack } from "./animated-tech-stack";
import {
  PhoneMockup,
  WindowMockup,
  BrowserMockup,
} from "@/components/ui/device-mockups";

// Utility function to render project links
const renderProjectLinks = (item: ProjectItem) => (
  <motion.div
    className="flex items-center space-x-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        type: "spring",
        stiffness: 250,
        damping: 15,
      },
    }}
  >
    {item.githubIcon && (
      <a
        href={item.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      >
        <FaGithub />
      </a>
    )}
    {item.webIcon && (
      <a
        href={item.webUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      >
        <FaLink />
      </a>
    )}
  </motion.div>
);

// Utility function to render project title
const renderProjectTitle = (item: ProjectItem) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.7,
        type: "spring",
        stiffness: 250,
        damping: 15,
      },
    }}
  >
    <h2 className="text-3xl font-bold">
      {item.title} - {item.subtitle}
    </h2>
  </motion.div>
);

// Utility function to render project badges
const renderProjectBadges = (item: ProjectItem) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        type: "spring",
        stiffness: 250,
        damping: 15,
      },
    }}
    className="flex items-start space-x-4"
  >
    <ProjectBadge title={item.category || "Other"} />
    {item.developmentStatus && item.progressStatus && (
      <ProjectStatus
        developmentStatus={item.developmentStatus}
        progressStatus={item.progressStatus}
      />
    )}
  </motion.div>
);

// Utility function to render project description
const renderProjectDescription = (
  item: ProjectItem,
  setSelectedProject: (project: ProjectItem | null) => void
) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.8,
        type: "spring",
        stiffness: 250,
        damping: 15,
      },
    }}
  >
    <motion.div
      className="bg-gradient-to-br from-[#120F1E] to-[#1A0F2E] p-4 rounded-xl shadow-lg relative overflow-hidden"
      whileHover={{
        scale: 1.03,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      whileTap={{
        scale: 0.97,
      }}
    >
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full 
         bg-gradient-to-br from-purple-700/50 to-purple-900/50 
         rounded-full opacity-70 blur-3xl origin-top"
      ></div>
      <div className="relative z-10 flex flex-col items-start space-y-4">
        <p className="text-sm text-white flex-1 text-justify">
          {item.description.length > 300
            ? `${item.description.slice(0, 300)}...`
            : item.description}
        </p>
        {item.description.length > 250 && (
          <button
            className="text-xs text-purple-300 hover:text-purple-200 transition-colors"
            onClick={() => setSelectedProject(item)}
          >
            Show Full Description
          </button>
        )}
      </div>
    </motion.div>
  </motion.div>
);

// Utility function to render project features
const renderProjectFeatures = (item: ProjectItem) => (
  <motion.div
    className="space-y-2 text-sm"
    initial={{ opacity: 0, x: -50 }}
    animate={{
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.9,
        type: "spring",
        stiffness: 250,
        damping: 15,
      },
    }}
  >
    <ProgressBar
      progress={item.progressPercentage}
      label="Progress"
      className="mt-4"
    />

    <div className="mt-2 space-y-2">
      {item.features.map((feature, featureIndex) => (
        <div
          key={`${item.title}-feature-${featureIndex}-${feature.text}`}
          className="flex items-center justify-between text-gray-300"
        >
          <div className="flex items-center space-x-2">
            {feature.icon}
            <span>{feature.text}</span>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// Utility function to render project mockup
const renderProjectMockup = (
  item: ProjectItem,
  handleImageClick: (item: ProjectItem) => void,
  mockupType: "phone" | "window" | "browser" = "phone",
  orientation: "vertical" | "horizontal" = "vertical"
) => {
  if (item.images && item.images.length > 0) {
    const images = item.images.map((img) => ({
      src: img.src,
      alt: img.alt,
    }));

    switch (mockupType) {
      case "phone":
        return (
          <PhoneMockup
            images={images}
            title={item.title}
            onImageClick={() => handleImageClick(item)}
            orientation={orientation}
          />
        );
      case "window":
        return (
          <WindowMockup
            images={images}
            onImageClick={() => handleImageClick(item)}
            url={item.webUrl}
          />
        );
      case "browser":
        return (
          <BrowserMockup
            images={images}
            onImageClick={() => handleImageClick(item)}
            url={item.webUrl}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="relative mockup-phone border-5 p-2 border-cyan-600 outline-cyan-600 mx-auto bg-gray-600 flex items-center justify-center">
      <p className="text-white text-center">No Images Available</p>
    </div>
  );
};

export const renderDesktopContent = (
  item: ProjectItem,
  index: number,
  handleImageClick: (item: ProjectItem) => void,
  setSelectedProject: (project: ProjectItem | null) => void,
  layoutType: "layout1" | "layout2" | "layout3" | "layout4" | "layout5",
  getParallaxStyles?: (
    index: number,
    scrollYProgress: number
  ) => {
    phoneTransform: string;
    contentTransform: string;
  }
) => {
  // Render different layouts based on index
  switch (index) {
    case 0:
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full relative">
          <AnimatedTechStack
            techStack={item.techStack}
            className="flex flex-col absolute top-1/2 left-0 transform -translate-y-1/2 z-20 space-y-4"
            iconSize="sm"
          />
          {renderProjectMockup(item, handleImageClick, "phone", "vertical")}
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{
              opacity: 0,
              x: -100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            {renderProjectLinks(item)}
            {renderProjectTitle(item)}
            {renderProjectBadges(item)}
            {renderProjectDescription(item, setSelectedProject)}
            {renderProjectFeatures(item)}
          </motion.div>
        </div>
      );

    case 1:
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full relative">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            }}
          >
            {renderProjectLinks(item)}
            {renderProjectTitle(item)}
            {renderProjectDescription(item, setSelectedProject)}
            {renderProjectFeatures(item)}
          </motion.div>
          <motion.div
            className="flex flex-col relative justify-center items-center gap-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            }}
          >
            <AnimatedTechStack
              techStack={item.techStack}
              className="flex relative gap-2"
              iconSize="md"
            />
            {renderProjectMockup(item, handleImageClick, "phone", "horizontal")}
            {renderProjectBadges(item)}
          </motion.div>
        </div>
      );

    case 2:
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full relative">
          <motion.div
            className="flex flex-col relative justify-center items-center"
            initial={{
              opacity: 0,
              x: -100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            <div className="mb-4">{renderProjectBadges(item)}</div>
            {renderProjectMockup(item, handleImageClick, "phone", "horizontal")}
            <AnimatedTechStack
              techStack={item.techStack}
              className="flex relative top-8 gap-12"
              iconSize="lg"
            />
          </motion.div>
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{
              opacity: 0,
              x: 100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            <div className="flex justify-between items-center">
              {renderProjectTitle(item)}
              {renderProjectLinks(item)}
            </div>
            {renderProjectDescription(item, setSelectedProject)}
            {renderProjectFeatures(item)}
          </motion.div>
        </div>
      );

    case 3:
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full relative">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{
              opacity: 0,
              x: 100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            <div className="flex justify-between items-center">
              {renderProjectTitle(item)}
              {renderProjectLinks(item)}
            </div>
            {renderProjectDescription(item, setSelectedProject)}
            {renderProjectFeatures(item)}
          </motion.div>
          <motion.div
            className="flex flex-col relative justify-center items-center"
            initial={{
              opacity: 0,
              x: -100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            <div className="mb-4">{renderProjectBadges(item)}</div>
            {renderProjectMockup(item, handleImageClick, "window")}
            <AnimatedTechStack
              techStack={item.techStack}
              className="flex relative xl:top-8 gap-10"
              iconSize="md"
            />
          </motion.div>
        </div>
      );

    case 4:
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full relative">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{
              opacity: 0,
              x: 100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            <div className="flex justify-between items-center">
              {renderProjectTitle(item)}
              {renderProjectLinks(item)}
            </div>
            {renderProjectDescription(item, setSelectedProject)}
          </motion.div>
          <motion.div
            className="flex flex-col relative justify-center items-center"
            initial={{
              opacity: 0,
              x: -100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            {renderProjectMockup(item, handleImageClick, "browser")}
            <AnimatedTechStack
              techStack={item.techStack}
              className="flex relative top-8 xl:gap-8"
              iconSize="md"
            />
          </motion.div>
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{
              opacity: 0,
              x: 100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: 0.5,
              },
            }}
          >
            {renderProjectBadges(item)}
            {renderProjectFeatures(item)}
          </motion.div>
        </div>
      );

    default:
      return null;
  }
};
