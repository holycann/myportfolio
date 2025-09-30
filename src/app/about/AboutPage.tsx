"use client";

import React, { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/loading-screen";
import { Loading } from "@/components/ui/loading";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

// Centralized configuration for About page
const ABOUT_PAGE_CONFIG = {
  images: [
    {
      url: "/images/me/about-5.jpg",
      alt: "Professional Portrait",
      priority: true
    },
    {
      url: "/images/me/about-4.png",
      alt: "Work Environment",
      priority: false
    },
    {
      url: "/images/me/about-1.jpg",
      alt: "Personal Moment",
      priority: false
    },
  ]
};

// Dynamic imports with optimized loading
const HeroAbout = dynamic(() => import("./components/HeroAbout"), {
  loading: () => <Loading variant="default" size="lg" label="Loading Hero Section..." />,
  ssr: true
});

const TechStack = dynamic(() => import("./components/TechStackSection"), {
  loading: () => <Loading variant="default" size="lg" label="Loading Tech Stack..." />,
  ssr: true
});

const Experience = dynamic(() => import("./components/ExperienceSection"), {
  loading: () => <Loading variant="default" size="lg" label="Loading Experience..." />,
  ssr: false // Complex animations, load client-side
});

/**
 * AboutPage Component
 * Provides additional page-level logic and state management
 * 
 * @component
 * @returns {React.ReactElement} Comprehensive about page with dynamic sections
 */
export default function AboutPage() {
  const { smoothScrollTo } = useSmoothScroll();

  useEffect(() => {
    // Scroll to the appropriate section after page load
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      smoothScrollTo(hash);
    } else {
      smoothScrollTo('#about');
    }
  }, [smoothScrollTo]);

  return (
    <main>
      <Suspense fallback={<LoadingScreen />}>
        <HeroAbout images={ABOUT_PAGE_CONFIG.images} />
        <TechStack />
        <Experience />
      </Suspense>
    </main>
  );
}