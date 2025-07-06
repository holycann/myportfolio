"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

// Import Hero component with proper error boundary
import Hero from "@/components/sections/Hero";
import { useLoading } from "@/providers/LoadingProvider";

// Create a simple loading component
const LoadingSection = ({ text }: { text: string }) => (
  <div className="h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      <p>{text}</p>
    </div>
  </div>
);

// Lazy load sections below the fold
const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <LoadingSection text="Loading About..." />,
  ssr: true,
});

const TechStack = dynamic(() => import("@/components/sections/TechStack"), {
  loading: () => <LoadingSection text="Loading Tech Stack..." />,
  ssr: true,
});

const Experience = dynamic(() => import("@/components/sections/Experience"), {
  loading: () => <LoadingSection text="Loading Experience..." />,
  ssr: false, // Complex animations, load client-side only
});

const Project = dynamic(() => import("@/components/sections/Project"), {
  loading: () => <LoadingSection text="Loading Projects..." />,
  ssr: false, // Complex animations, load client-side only
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <LoadingSection text="Loading Contact..." />,
  ssr: true,
});

const Footer = dynamic(() => import("@/components/sections/Footer"), {
  loading: () => <div className="h-40 flex items-center justify-center">Loading Footer...</div>,
  ssr: true,
});

export default function Home() {
  const { setIsLoading } = useLoading();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);
    
    // Preload critical components
    const preloadComponents = async () => {
      // Simulate checking if all critical components are loaded
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    preloadComponents();
  }, [setIsLoading]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      
      <About />
      <TechStack />
      
      {/* Only render complex sections on client-side */}
      {isClient && (
        <>
          <Experience />
          <Project />
        </>
      )}
      
      <Contact />
      <Footer />
    </main>
  );
}
