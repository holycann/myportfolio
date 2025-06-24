"use client";

import Hero from "../components/section/Hero";
import Experience from "../components/section/Experience";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import Project from "../components/section/Project";
import Contact from "../components/section/Contact";

export default function Home() {
  return (
    <div className="pb-4">
      <section className="mx-auto p-4 lg:h-screen h-auto" id="home">
        <Hero />
      </section>

      <div className="flex items-center justify-center">
        <TextRevealCard
          text="Code →"
          revealText="Tentang logika, kegagalan, pencarian solusi, dan kemenangan kecil yang tak terlihat"
        ></TextRevealCard>
      </div>

      <section className="mx-auto p-4 mb-20 md:mb-40" id="experience">
        <Experience />
      </section>

      <section className="mx-auto p-4" id="project">
        <Project />
      </section>

      <section className="mx-auto p-4 md:m-20" id="contact">
        <Contact />
      </section>
    </div>
  );
}
