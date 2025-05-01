import Hero from "@/app/components/Hero";
import Experience from "@/app/components/Experience";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import { Education } from "./components/Education";
import { Project } from "./components/Project";

export default function Home() {
  return (
    <div className="pb-40">
      <section className="mx-auto p-4 h-[100vh]" id="home">
        <Hero />
      </section>

      <div className="flex items-center justify-center">
        <TextRevealCard
          text="Code →"
          revealText="Tentang logika, kegagalan, pencarian solusi, dan kemenangan kecil yang tak terlihat"
        ></TextRevealCard>
      </div>

      <section className="mx-auto p-4 mb-40" id="experience">
        <Experience />
      </section>

      <section className="mx-auto p-4" id="education">
        <Education />
      </section>

      <section className="mx-auto p-4" id="project">
        <Project />
      </section>
    </div>
  );
}
