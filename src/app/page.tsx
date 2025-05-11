import Hero from "@/app/section/Hero";
import Experience from "@/app/section/Experience";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import { Project } from "./section/Project";
import { Contact } from "./section/Contact";
import {HeroUIProvider} from "@heroui/system";

export default function Home() {
  return (
    <HeroUIProvider>
    <div className="pb-4">
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

      <section className="mx-auto p-4 mb-40" id="project">
        <Project />
      </section>

      <section className="mx-auto p-4 m-40" id="contact">
        <Contact />
      </section>
    </div>
    </HeroUIProvider>
  );
}
