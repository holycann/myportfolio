"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { HiArrowNarrowRight } from "react-icons/hi";
import { TbWorldSearch } from "react-icons/tb";
import { PiTagChevronFill } from "react-icons/pi";
import Image from "next/image";
import { Project } from "@/types/Project";
import CardSwap, { Card } from "../../components/ui/card-swap";
import Link from "next/link";
import Badge from "@/components/ui/badge";
import { AnimatedButton, Button } from "@/components/ui/button";

const ShinyText = dynamic(() => import("@/components/ui/shiny-text"), {
  ssr: false,
});

const FeaturedProject = React.memo(({ projects }: { projects: Project[] }) => {
  const projectCards = useMemo(
    () =>
      projects && projects.length > 0
        ? projects.map((project, _) => (
            <Card
              key={project.id}
              className="border-6 border-[var(--color-border)] bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-secondary-light)] backdrop-blur-lg shadow-3xl shadow-[var(--color-shadow)] hover:shadow-[var(--color-secondary)] hover:scale-[1.05] hover:rotate-2 animate-pulse-shadow overflow-hidden group dark:from-[var(--color-primary-dark)] dark:to-[var(--color-secondary-dark)] dark:border-[var(--color-border)] dark:shadow-[var(--color-shadow)]"
            >
              <div className="flex justify-center items-center gap-2 p-2 text-center border-b-2 border-[var(--color-border)]/20 dark:border-[var(--color-border)]/40">
                <Link
                  href={
                    project.web_url || project.github_url || "http://localhost"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-light)] bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] px-8 py-1 rounded-2xl"
                >
                  <p className="opacity-80">
                    {project.web_url ||
                      project.github_url ||
                      "http://localhost"}
                  </p>
                  <TbWorldSearch
                    size={24}
                    className="text-[var(--color-secondary)] dark:text-[var(--color-secondary-light)]"
                  />
                </Link>
              </div>
              <div className="relative w-full h-full overflow-hidden">
                <Link 
                  href={
                    `projects/${project.slug}` || "http://localhost"
                  }
                  rel="noopener noreferrer"
                >
                  <Image
                    src={
                      project.images?.find((img) => img.is_thumbnail)?.src ||
                      "/images/logo.png"
                    }
                    alt={project.title}
                    width={600}
                    height={400}
                    priority
                    quality={100}
                    placeholder="blur"
                    blurDataURL="/images/logo.png"
                    className="object-cover w-full h-full aspect-video transition-all duration-300 hover:scale-105"
                  />
                </Link>
                <div className="absolute top-0 left-0 p-2 flex justify-center items-center">
                  <Badge
                    variant="secondary"
                    size="md"
                    rounded="full"
                    className="z-10 bg-[var(--color-bg-secondary)]"
                  >
                    {project.title}
                  </Badge>
                </div>
                <div className="absolute bottom-12 right-0 p-2 flex justify-center items-center">
                  <Badge
                    variant="secondary"
                    size="md"
                    rounded="full"
                    className="z-10 bg-[var(--color-secondary)] text-[var(--color-text-primary)] dark:bg-[var(--color-secondary-dark)] dark:text-[var(--color-text-secondary)]"
                    icon={
                      <PiTagChevronFill className="animate-pulse text-[var(--color-text-primary)]/80 dark:text-[var(--color-text-secondary)]/80 transition-all duration-300 group-hover:scale-110" />
                    }
                  >
                    {project.category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))
        : [],
    [projects]
  );

  return (
    <>
      <div className="flex flex-col justify-center items-start gap-8">
        <ShinyText
          text="Systems That Matter"
          className="text-5xl font-bold capitalize"
          speed={3}
        />
        <p className="text-lg text-gray-300 text-justify">
          What started as curiosity quickly grew into a universe of experiments
          and solutions. These featured projects capture my passion across
          backend, frontend, and technology. Each one highlighting my pursuit of
          scalable, maintainable, and innovative systems. Every idea becomes a
          chance to solve real problems with technology that lasts.
        </p>
        <AnimatedButton
          variant="glassmorphic"
          size="md"
          icon={<HiArrowNarrowRight size={24} />}
        >
          <Link href={"/projects"}>View All Projects</Link>
        </AnimatedButton>
      </div>
      <div className="relative h-auto min-h-[25rem] max-h-[35rem]">
        <CardSwap
          cardDistance={50}
          verticalDistance={90}
          delay={5000}
          pauseOnHover={false}
          skewAmount={5}
          easing="elastic"
        >
          {projectCards}
        </CardSwap>
      </div>
    </>
  );
});

FeaturedProject.displayName = "FeaturedProject";

export default FeaturedProject;
