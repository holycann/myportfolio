"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ProjectItem } from "@/types/project";
import { Carousel } from "@/components/ui/carousel";
import { ProjectDescriptionModal } from "./project-description-modal";
import { useScrollManagement } from "@/context/use-scroll-management";
import { useLayoutManagement } from "@/context/use-layout-management";
import { renderDesktopContent } from "./rende-project-content";

export const ProjectDesktopLayout = ({
  content,
}: {
  content: ProjectItem[];
}) => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentCarouselImages, setCurrentCarouselImages] = useState<
    {
      src: string;
      title: string;
      button: string;
      device?: "phone" | "window" | "default";
      deviceColor?: string;
    }[]
  >([]);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  const contentHeight = window.innerHeight;
  const { activeCard, isScrolling, containerRef, stickyRef } =
    useScrollManagement(content, contentHeight);

  const { layoutType, getParallaxStyles } = useLayoutManagement(activeCard);

  const handleImageClick = (item: ProjectItem) => {
    if (item.images && item.images.length > 0) {
      const carouselSlides = item.images.map((img, imgIndex) => ({
        title: `${item.title} - Image ${imgIndex + 1}`,
        button: "View Image",
        src: img.src,
      }));

      setCurrentCarouselImages(carouselSlides);
      setIsCarouselOpen(true);
    }
  };

  const handleCloseCarousel = () => {
    setIsCarouselOpen(false);
  };

  const renderCarouselModal = () => {
    if (!isCarouselOpen) return null;

    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={handleCloseCarousel}
      >
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            className="absolute -top-10 right-0 text-white text-2xl hover:text-red-500 transition-colors"
            onClick={handleCloseCarousel}
          >
            ✕
          </button>
          <Carousel slides={currentCarouselImages} />
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative"
        style={{
          height: `${contentHeight * content.length}px`,
          position: "relative",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {content.map((_, index) => (
          <div
            key={`scroll-anchor-${index}`}
            className="absolute w-full"
            style={{
              top: `${index * contentHeight}px`,
              height: "2px",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
              zIndex: -1,
            }}
          />
        ))}
        <div
          ref={stickyRef}
          className="sticky w-full h-screen"
          style={{
            position: "sticky",
            top: 0,
          }}
        >
          <div className="w-full h-full py-10 px-4 md:px-10 lg:px-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                {content.map(
                  (item, index) =>
                    index === activeCard && (
                      <motion.div
                        key={item.title + index}
                        initial={{
                          opacity: 0,
                          y: isScrolling ? (index > activeCard ? 50 : -50) : 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: isScrolling
                            ? index > activeCard
                              ? -50
                              : 50
                            : -20,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                        }}
                        className={cn(
                          "absolute inset-0 p-6 md:p-10 rounded-2xl transition-all duration-300 overflow-y-auto"
                        )}
                      >
                        {renderDesktopContent(
                          item,
                          index,
                          handleImageClick,
                          setSelectedProject,
                          layoutType,
                          getParallaxStyles
                        )}

                        <div className="absolute bottom-4 right-4 bg-black/30 text-white px-2 py-1 rounded-lg text-sm backdrop-blur-sm">
                          {activeCard + 1} / {content.length}
                        </div>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Modal */}
      {renderCarouselModal()}

      {/* Animated Modal for Full Description */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDescriptionModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
