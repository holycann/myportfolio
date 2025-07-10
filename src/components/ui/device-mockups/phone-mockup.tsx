import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MyButton } from "../mybutton";
import { FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa6";
import { createPlaceHolder } from "@/lib/utils";

export const PhoneMockup = ({
  thumbnails,
  imageCarousel,
  title,
  orientation = "vertical",
  onImageClick,
}: {
  thumbnails: {
    src: string;
    alt: string;
  }[];
  imageCarousel: {
    src: string;
    alt: string;
  }[];
  title: string;
  orientation?: "vertical" | "horizontal";
  onImageClick: (
    images: {
      src: string;
      alt: string;
    }[]
  ) => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Auto play and image cycling logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 10000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const handleNextImage = () => {
    setDirection("next");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === thumbnails.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setDirection("prev");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? thumbnails.length - 1 : prevIndex - 1
    );
  };

  const handleImageClick = () => {
    onImageClick(imageCarousel);
  };

  return (
    <div
      className={`flex justify-center items-center relative mockup-phone border-5 p-2 border-cyan-600 outline-cyan-600 mx-auto ${orientation === "horizontal" ? "xl:w-full h-72" : "xl:w-1/2 2xl:w-110"}`}
    >
      <div
        className={`absolute mockup-phone-camera z-10 flex items-center justify-evenly p-2 ${orientation === "horizontal" ? "top-30 -left-8 rotate-90" : "top-2"}`}
      >
        <div className="w-2 h-2 bg-gray-300 rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
        </div>
        <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        </div>
        <div className="w-2 h-2 bg-gray-300 rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
        </div>
      </div>
      <div
        ref={imageContainerRef}
        // className={`relative mockup-phone-display overflow-hidden ${orientation === 'horizontal' ? 'h-full w-full' : 'h-full'}`}
        className={`relative mockup-phone-display overflow-hidden h-full w-full`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{
              opacity: 0,
              x: direction === "next" ? 100 : -100,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: direction === "next" ? -100 : 100,
            }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <motion.img
              src={
                thumbnails[currentImageIndex]?.src === "" ||
                thumbnails[currentImageIndex]?.src === undefined
                  ? createPlaceHolder(
                    thumbnails[currentImageIndex]?.alt || "Default Image"
                    )
                  : thumbnails[currentImageIndex]?.src
              }
              alt={thumbnails[currentImageIndex]?.alt || "Default Image"}
              className="w-full h-full object-cover object-top"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center-safe gap-4">
          <MyButton
            icon={<FaArrowLeft />}
            onClick={handlePreviousImage}
            iconClassName="lg:text-sm"
            buttonClassName="w-8"
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <MyButton
              icon={<FaEye />}
              onClick={handleImageClick}
              iconClassName="lg:text-sm"
            />
          </motion.div>
          <MyButton
            icon={<FaArrowRight />}
            onClick={handleNextImage}
            iconClassName="lg:text-sm"
            buttonClassName="w-8"
          />
        </div>
      </div>
    </div>
  );
};
