import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { ExperienceData as data } from "@/data/experiences";

export default function Experience() {
  return (
    <div
      id="experience"
      className="container mx-auto w-full overflow-clip px-8"
    >
      <div className="flex flex-col gap-2 justify-start">
        <h1 className="text-4xl md:text-6xl leading-none block drop-shadow-[6px_6px_0px_rgba(0,0,0,0.3)] dark:drop-shadow-[6px_6px_0px_rgba(255,255,255,0.2)] font-['Cascadia_Code'] relative">
          Experience
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-lg md:text-3xl font-['Poppins']">
            Learning by Doing, Growing by Serving
          </p>
          <div className="hidden lg:flex items-center overflow-hidden">
            {[...Array(30)].map((_, index) => (
              <div
                key={index}
                className="w-1 md:w-2 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-2 animate-ping"
                style={{
                  animationDelay: `${index * 0.4}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <Timeline data={data} />
    </div>
  );
}
