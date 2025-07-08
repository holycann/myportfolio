import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { createPlaceHolder } from "@/lib/utils";

export const WindowMockup = ({
  images,
  url,
  onImageClick,
}: {
  images: {
    src: string;
    alt: string;
  }[];
  url?: string;
  onImageClick: (
    images: {
      src: string;
      alt: string;
    }[]
  ) => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageContainerRef.current) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imageContainerRef.current) return;
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageClick = () => {
    onImageClick(images);
  };

  return (
    <div className="mockup-window border bg-base-300 w-full max-w-3xl mx-auto shadow-xl xl:h-[60vh]">
      <div className="mockup-browser-toolbar">
        <div className="input border border-base-300 bg-base-200 px-4">
          {url}
        </div>
      </div>
      <div
        ref={imageContainerRef}
        className="relative overflow-hidden h-[400px] bg-base-200"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="relative w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center">
          <img
            src={images[currentImageIndex]?.src === "" ? createPlaceHolder(images[currentImageIndex]?.alt || "Default Image") : images[currentImageIndex]?.src}
            alt={images[currentImageIndex]?.alt || "Default Image"}
            className="w-full h-full object-cover object-center"
          />
          <p
            className="absolute bottom-2 text-center text-xs text-white z-10 bg-black rounded-full p-2 px-4 outline-2 outline-cyan-600 cursor-pointer hover:bg-black/80 transition-colors"
            onClick={handleImageClick}
          >
            Click Here to View
          </p>
        </div>
      </div>
    </div>
  );
}; 