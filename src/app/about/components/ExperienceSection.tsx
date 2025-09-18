import React, { useState, useEffect } from "react";
import { Timeline } from "@/components/ui/timeline";
import { experienceService } from "@/services/experienceService";
import type { Experience } from "@/types/Experience";
import ShinyText from "@/components/ui/shiny-text";

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await experienceService.getExperiences();
        if (response.data) {
          setExperiences(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div
      id="experience"
      className="container mx-auto w-full overflow-clip px-8 lg:py-20"
    >
      <div className="flex flex-col gap-2 justify-start">
        <ShinyText
          text="Experience"
          disabled={false}
          speed={3}
          className="text-4xl md:text-5xl lg:text-7xl font-bold"
        />
        <p className="text-lg md:text-2xl">
          Learning by Doing, Growing by Serving
        </p>
      </div>
      <Timeline data={experiences} />
    </div>
  );
}
