"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "motion/react";
import { HiSparkles } from "react-icons/hi";

// Centralized configuration and utility imports
import { experienceService } from "@/services/experienceService";
import { Experience } from "@/types/Experience";
import { TechStack } from "@/types/TechStack";
import { Skeleton } from "@/components/ui/skeleton";
import { Step } from "@/components/ui/stepper";
import { useFetchData } from "@/hooks/useFetchData";

// Dynamic imports with loading states
const MagicBento = dynamic(() => import("@/components/ui/magic-bento"), {
  loading: () => <Skeleton variant="default" height="500px" />,
  ssr: false,
});
const Stepper = dynamic(() => import("@/components/ui/stepper"), {
  loading: () => <Skeleton variant="default" height="300px" />,
  ssr: false,
});
const InfiniteMenu = dynamic(() => import("@/components/ui/infinite-menu"), {
  loading: () => <Skeleton variant="default" height="200px" />,
  ssr: false,
});
const Badge = dynamic(() => import("@/components/ui/badge"), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});
const ShinyText = dynamic(() => import("@/components/ui/shiny-text"), {
  loading: () => <Skeleton variant="default" height="100px" />,
  ssr: false,
});
const GitHubGlobe = dynamic(() => import("@/components/ui/github-globe").then((mod) => mod.World), {
  loading: () => <Skeleton variant="default" height="400px" />,
  ssr: false,
});

// Skeleton component with memoization
const SkeletonOne = React.memo(() => {
  const variants = useMemo(() => ({
    initial: { x: 0 },
    animate: {
      x: 10,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  }), []);

  const variantsSecond = useMemo(() => ({
    initial: { x: 0 },
    animate: {
      x: -10,
      rotate: -5,
      transition: { duration: 0.2 },
    },
  }), []);

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-secondary-light)] shrink-0" />
        <div className="w-full rounded-full text-start ps-2">
          <h1 className="text-xs">Vibe Code</h1>
        </div>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full rounded-full text-start ps-2">
          <h1 className="text-xs">Cryptocurrency & Trading</h1>
        </div>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-secondary-light)] shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-secondary-light)] shrink-0" />
        <div className="w-full rounded-full text-start ps-2">
          <h1 className="text-xs">Learning New Tech & AI</h1>
        </div>
      </motion.div>
    </motion.div>
  );
});
SkeletonOne.displayName = 'SkeletonOne';

/**
 * Featured Section Component
 * Displays a comprehensive overview of personal and professional highlights
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {TechStack[]} props.techStack - Array of tech stack items
 */
export function FeaturedSection({ techStack }: { techStack: TechStack[] }) {
  // Use useFetchData hook to fetch experiences
  const { data: featuredExperiences, isLoading, error } = useFetchData(
    () => experienceService.getExperiences(),
  );

  // Memoized infinite menu items
  const infiniteMenuItems = useMemo(() => 
    techStack?.map((tech) => ({
      image: tech.image_url || "https://picsum.photos/900/900?grayscale",
      title: tech.name || "",
    })) || [], 
    [techStack]
  );

  // Memoized card data with error handling
  const cardData = useMemo(() => [
    {
      color: "var(--background)",
      title: "About",
      description: "A glimpse into my journey, passion, and vision in tech.",
      link: { href: "/about", is_external: false },
      content: (
        <div className="flex justify-center items-center w-[80%] h-[80%]">
          <Badge
            variant="warning"
            size="md"
            rounded="full"
            blur={true}
            icon={<HiSparkles />}
            iconPosition="left"
            className="absolute left-0 top-0 text-white hidden xs:inline-flex"
          >
            ITSRAMA
          </Badge>
          <Image
            src="/images/logo.png"
            alt="About Section Image"
            width={500}
            height={300}
            sizes="(max-width: 768px) 100vw, 500px"
            className="w-full h-auto object-cover rounded-lg opacity-80"
          />
        </div>
      ),
    },
    {
      color: "var(--background)",
      title: "Enthusiast",
      description: "Coding, crypto, and lifelong learning fuel my curiosity and drive.",
      content: <SkeletonOne />,
    },
    {
      color: "var(--background)",
      title: "Tech Stack",
      description: "The tools and technologies I use to build scalable, modern solutions.",
      content: <InfiniteMenu items={infiniteMenuItems} />,
    },
    {
      color: "var(--background)",
      title: "Countries Explored",
      description: "Places I've visited that shaped my perspective and global mindset.",
      content: (
        <GitHubGlobe
          globeConfig={{
            pointSize: 1,
            globeColor: "#1d072e",
            showAtmosphere: true,
            atmosphereColor: "#ffffff",
            atmosphereAltitude: 0.1,
            emissive: "#000000",
            emissiveIntensity: 0.1,
            shininess: 0.9,
            polygonColor: "rgba(255,255,255,0.7)",
            ambientLight: "#ffffff",
            directionalLeftLight: "#ffffff",
            directionalTopLight: "#ffffff",
            pointLight: "#ffffff",
            arcTime: 2000,
            arcLength: 0.9,
            rings: 1,
            maxRings: 3,
            autoRotate: true,
            autoRotateSpeed: 1,
          }}
          data={[
            {
              order: 1,
              startLat: -6.2088, // Jawa Barat (Bandung)
              startLng: 106.8456,
              endLat: -8.65, // Bali (Denpasar)
              endLng: 115.2167,
              arcAlt: 0.3,
              color: "#B16CEA",
            },
            {
              order: 2,
              startLat: 3.139, // Kuala Lumpur, Malaysia
              startLng: 101.6869,
              endLat: 4.2105, // Penang, Malaysia
              endLng: 100.2048,
              arcAlt: 0.4,
              color: "#A855F7", // Equivalent to var(--color-accent-light)
            },
            {
              order: 3,
              startLat: -0.7893, // Jakarta
              startLng: 106.6059,
              endLat: 1.4419, // Batam
              endLng: 104.2385,
              arcAlt: 0.5,
              color: "#8B5CF6", // Equivalent to var(--color-primary-light)
            },
            {
              order: 4,
              startLat: 5.4164, // Langkawi, Malaysia
              startLng: 100.2048,
              endLat: 2.2899, // Singapore
              endLng: 103.8519,
              arcAlt: 0.6,
              color: "#0EA5E9", // Equivalent to var(--color-info)
            },
            {
              order: 5,
              startLat: -7.2575, // Surabaya, East Java
              startLng: 112.7521,
              endLat: 3.5952, // Medan, North Sumatra
              endLng: 98.6722,
              arcAlt: 0.4,
              color: "#10B981", // Equivalent to var(--color-success)
            },
          ]}
        />
      ),
    },
    {
      color: "var(--background)",
      title: "Experience",
      description: "A timeline of growth: internships, projects, and continuous development.",
      content: isLoading ? (
        <Skeleton variant="default" height="300px" />
      ) : error ? (
        <div className="text-red-500">Failed to load experiences</div>
      ) : (
        <Stepper
          initialStep={0}
          contentClassName="text-white"
          backButtonText=""
          nextButtonText=""
          stepText={featuredExperiences.reduce(
            (acc: Record<number, string>, experience, index) => {
              acc[index + 1] = experience?.start_date || `202${5 - index}`;
              return acc;
            },
            {}
          )}
          backButtonProps={{
            className: "text-neutral-300 hover:text-white transition-colors",
          }}
          nextButtonProps={{
            className: "bg-purple-700 hover:bg-purple-600 text-white rounded-md",
          }}
        >
          {featuredExperiences.map((experience) => (
            <Step key={experience.id}>
              <p className="text-sm">{experience.company}</p>
              <h3 className="text-xl font-semibold">{experience.role}</h3>
            </Step>
          ))}
        </Stepper>
      ),
      link: {
        href: "/about#experience",
        is_external: false,
      },
    },
  ], [infiniteMenuItems, featuredExperiences, isLoading, error]);

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 py-8">
        <ShinyText
          text="A Universe of Mine"
          textColor="#b5b5b5a4"
          shineColor="rgba(255, 255, 255, 0.8)"
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-center xl:text-start"
          disabled={false}
          speed={3}
        />
        <p className="flex justify-center items-center text-center xl:text-justify">
          As a
          backend developer and crypto enthusiast from Indonesia, I strive to
          create scalable systems, explore financial technology, and keep
          learning every day. My goal is to transform ideas into digital
          solutions while growing into a long term investor.
        </p>
      </div>
      <MagicBento
        cardData={cardData}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        glowColor="140, 111, 71"
      />
    </>
  );
}
