"use client";

import Hero from "../components/sections/Hero";
import Experience from "../components/sections/Experience";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import Project from "../components/sections/Project";
import Contact from "../components/sections/Contact";
import About from "@/components/sections/About";
import TechStack from '../components/sections/TechStack';
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="pb-4">
      <Hero />
      <div className="flex items-center justify-center md:py-20">
        <TextRevealCard
          text="Code →"
          revealText="About logic, failure, the pursuit of solutions, and the unseen small victories."
          className="font-['Cascadia_Code']"
        ></TextRevealCard>
      </div>
      <About />
      <TechStack />
      <Experience />
      <Project />
      <Contact />
      <Footer />
    </div>
  );
}
