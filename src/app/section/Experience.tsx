import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { ExperienceData as data } from "@/app/config/ExperienceData";

export default function Experience() {
  return (
    <div 
      id="experience"
      className="relative w-full overflow-clip"
    >
      <Timeline title={"Learning by Doing, Growing by Serving"} data={data} />
    </div>
  );
}
