"use client";

import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { TextGenerateEffect } from '../../components/ui/text-generate-effect';
import { ProjectData } from "../config/ProjectData";

export const Project = () => {
  return (
    <>
      <TextGenerateEffect words="A finished project is only the visible peak of a mountain built on
        learning and experience." />

      <div className="w-full py-4">
        <StickyScroll content={ProjectData} />
      </div>
    </>
  );
};