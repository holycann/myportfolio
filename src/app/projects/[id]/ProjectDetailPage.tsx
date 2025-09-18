"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/types/Project";
import { projectService } from "@/services/projectService";
import LightRays from "@/components/ui/light-rays";
import ShinyText from "@/components/ui/shiny-text";
import Badge from "@/components/ui/badge";
import { PiGithubLogo, PiGlobe, PiTagChevron } from "react-icons/pi";
import Image from "next/image";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Carousel } from "@/components/ui/carousel-image";
import { AnimatedTechStack } from "../components";
import { FocusCards } from "@/components/ui/focus-card";

const cards = [
  {
    title: "Forest Adventure",
    src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Valley of life",
    src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Sala behta hi jayega",
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Camping is for pros",
    src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The road not taken",
    src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The First Rule",
    src: "https://assets.aceternity.com/the-first-rule.png",
  },
];

const ProjectDetail = ({ id }: { id: string }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[] | null>(
    null
  );

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectService.getProjectById(id);
        setProject(response.data!);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProjects = async () => {
      try {
        if (project) {
          const response = await projectService.getProjects(
            undefined,
            undefined,
            { category: project.category }
          );
          setRelatedProjects(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch related projects:", error);
      }
    };

    fetchRelatedProjects();
  }, [project]);

  return (
    <main className="container mx-auto max-w-7xl relative">
      <section className="flex flex-col justify-center items-center">
        <LightRays
          raysOrigin="top-center"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
        {project && (
          <header className="absolute flex flex-col justify-center items-center text-center gap-4">
            <Badge
              variant="default"
              icon={<PiTagChevron size={24} />}
              size="lg"
              rounded="full"
              className="bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary-dark)] text-[var(--color-text-secondary)] hover:opacity-90 transition-opacity duration-300"
            >
              {project.category}
            </Badge>
            <ShinyText
              text={project.title}
              className="text-9xl font-bold"
              speed={3}
              shineColor="rgba(139, 111, 71, 1)"
            />
            <h1 className="text-2xl text-muted-foreground">
              {project.subtitle}
            </h1>
            <nav className="flex gap-4 py-2">
              <div className="flex items-center space-x-2">
                <a
                  href={project?.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-lg animate-shine cursor-pointer"
                >
                  <PiGithubLogo
                    size={64}
                    className="text-[var(--color-primary-light)] dark:text-[var(--color-secondary-light)] opacity-80 hover:opacity-100"
                  />
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={project?.web_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-lg animate-shine cursor-pointer"
                >
                  <PiGlobe
                    size={64}
                    className="text-[var(--color-primary-light)] dark:text-[var(--color-secondary-light)] opacity-80 hover:opacity-100"
                  />
                </a>
              </div>
            </nav>
          </header>
        )}
      </section>
      <article className="w-full h-full flex justify-center items-center perspective-1000 -mt-30 pb-10">
        <div className="w-full h-full flex justify-center items-center transform transition-transform duration-300 hover:rotate-y-6 hover:rotate-x-2 hover:scale-105 hover:shadow-2xl">
          <figure className="relative w-full h-full flex justify-center items-center border-8 rounded-2xl border-amber-800 bg-amber-800/20 shadow-lg transform transition-transform">
            <Image
              src={"/images/projects/asamedia/thumbnail.png"}
              alt={project?.title || "Project Image"}
              width={500}
              height={500}
              className="max-w-full w-full h-auto rounded-xl shadow-lg object-cover"
            />
            <Badge
              variant="default"
              size="md"
              rounded="full"
              className="absolute top-4 left-4 opacity-70 hover:opacity-100 transition-opacity duration-300 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)]"
            >
              {project?.progress_status}
            </Badge>
            <Badge
              variant="default"
              size="md"
              rounded="full"
              className="absolute bottom-4 right-4 opacity-70 hover:opacity-100 transition-opacity duration-300 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)]"
            >
              {project?.development_status}
            </Badge>

            <AnimatedTechStack
              techStack={
                project?.project_tech_stack.map(({ tech_stack }) => ({
                  name: tech_stack.name,
                })) || []
              }
              className="absolute bottom-2"
              iconSize="lg"
              containerProps={{
                initial: { opacity: 0, x: -20, scale: 1.5 },
                animate: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    delayChildren: 0.2,
                    staggerChildren: 0.1,
                  },
                },
                whileHover: {
                  scale: 1.1,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  },
                },
                whileTap: {
                  scale: 0.95,
                },
              }}
              tooltipProps={{
                tooltipPosition: "top",
                springConfig: { stiffness: 260, damping: 10 },
              }}
            />
          </figure>
        </div>
      </article>

      <section className="project-description">
        <p className="text-2xl py-10">{project?.description}</p>
        <ProgressBar
          progress={project?.progress_percentage || 0}
          label="Progress"
          showPercentage={true}
          labelClassName="text-xl"
        />
      </section>

      <section className="grid grid-cols-2 gap-4 py-10">
        <article className="flex flex-col text-justify gap-4">
          <h2 className="text-4xl">My Role</h2>
          <ul className="list-disc list-inside space-y-2">
            {project?.my_role?.map((role, index) => (
              <li key={index} className="text-xl">
                {role}
              </li>
            ))}
          </ul>
        </article>
        <article className="flex flex-col">
          <h2 className="text-4xl">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            {project?.features?.map((feature, index) => (
              <li key={index} className="text-xl">
                {feature}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="flex flex-col gap-8 py-20">
        <h2 className="text-4xl">Gallery</h2>
        <Carousel
          slides={
            project?.images.map((image) => ({
              title: image.alt,
              button: "View Image",
              src: image.src,
            })) || []
          }
        />
      </section>
      <section className="flex flex-col gap-8 py-20">
        <h2 className="text-4xl">Related Projects</h2>
        <FocusCards cards={cards} enablePagination={true} itemsPerPage={4} />
      </section>
    </main>
  );
};

export default ProjectDetail;
