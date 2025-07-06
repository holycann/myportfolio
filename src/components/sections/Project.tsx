"use client";

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { ProjectData } from "@/data/projects";
import {
  TypewriterEffect,
  TypewriterEffectSmooth,
  TypewriterWord,
} from "../ui/typewriter-effect";

const typewriterWord: TypewriterWord[] = [
  {
    text: "Every finished project",
    className: "text-center text-xl md:text-2xl font-medium"
  },
  {
    text: "is just the tip of a mountain",
    className: "text-center text-xl md:text-2xl font-medium"
  },
  {
    text: "of learning.",
    className: "text-center text-xl md:text-2xl font-medium"
  }
];

export default function Project() {
  return (
    <div id="project" className="container mx-auto w-full overflow-clip pt-20 lg:py-20">
      <div className="flex flex-col gap-2 text-center justify-center items-center md:mx-20 lg:mx-0">
        <h1 className="text-5xl md:text-6xl leading-none block drop-shadow-[6px_6px_0px_rgba(0,0,0,0.3)] dark:drop-shadow-[6px_6px_0px_rgba(255,255,255,0.2)] font-['Cascadia_Code'] relative">
          Featured Projects
        </h1>
        <div className="max-w-2xl text-center">
          <TypewriterEffectSmooth 
            words={typewriterWord} 
            speed={5} 
            className="hidden font-['Poppins'] md:flex flex-wrap justify-center"
          />
          <TypewriterEffect
            words={typewriterWord} 
            speed={0.05} 
            className="flex font-['Poppins'] md:hidden flex-wrap justify-center pt-4" 
          />
        </div>
      </div>
      <div className="w-full py-4">
        <StickyScroll content={ProjectData} />
      </div>
    </div>
  );
}
