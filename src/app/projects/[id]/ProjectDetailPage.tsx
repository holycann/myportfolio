"use client";

import React, { 
  useMemo 
} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { projectService } from "@/services/projectService";
import { Loading } from "@/components/ui/loading";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/hooks/useFetchData";

// Dynamically import heavy components
const LightRays = dynamic(() => import("@/components/ui/light-rays").then(mod => mod.default), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

const ShinyText = dynamic(() => import("@/components/ui/shiny-text").then(mod => mod.default), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

const Badge = dynamic(() => import("@/components/ui/badge").then(mod => mod.default), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

const ProgressBar = dynamic(() => import("@/components/ui/progress-bar").then(mod => mod.ProgressBar), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

const Carousel = dynamic(() => import("@/components/ui/carousel-image").then(mod => mod.Carousel), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

const FocusCards = dynamic(() => import("@/components/ui/focus-card").then(mod => mod.FocusCards), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

const AnimatedTechStack = dynamic(() => import("@/components/ui/animated-tech-stack").then(mod => mod.AnimatedTechStack), {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

// Icons
import { 
  PiGithubLogo, 
  PiGlobe, 
  PiTagChevron 
} from "react-icons/pi";

/**
 * Configuration for Project Detail page
 * Centralizes styling and performance settings
 */
const PROJECT_DETAIL_CONFIG = {
  dataFetching: {
    relatedProjectsPageSize: 16,
    sortBy: 'category',
    sortOrder: 'desc' as const
  },
  styling: {
    container: "container mx-auto max-w-7xl relative",
    heroSection: "flex flex-col justify-center items-center",
    projectImageContainer: "w-full h-full flex justify-center items-center perspective-1000 pb-10",
    projectImage: "max-w-full w-full h-auto rounded-xl shadow-lg object-cover"
  }
};

/**
 * Project Detail page component
 * Handles client-side data fetching and rendering
 */
export default function ProjectDetail({ slug }: { slug: string }) {
  // Fetch project details
  const { 
    data: projects, 
    isLoading, 
    error 
  } = useFetchData(
    () => projectService.getProjects(undefined, undefined, { slug }),
  );

  // Fetch related projects
  const { 
    data: relatedProjects 
  } = useFetchData(
    () => projectService.getProjects(
      { per_page: PROJECT_DETAIL_CONFIG.dataFetching.relatedProjectsPageSize },
      {
        sort_by: PROJECT_DETAIL_CONFIG.dataFetching.sortBy,
        sort_order: PROJECT_DETAIL_CONFIG.dataFetching.sortOrder
      },
      { category: projects?.[0]?.category }
    ),
  );

  // Memoized project
  const project = useMemo(() => projects?.[0] || null, [projects]);

  // Memoized project thumbnail
  const projectThumbnail = useMemo(() => 
    project?.images?.find((img) => img.is_thumbnail)?.src || project?.images?.[0]?.src
  , [project]);

  // Render loading state
  if (isLoading) return <Loading variant="solid" size="lg" label="Loading project details..." />;
  
  // Render error state
  if (error) return <div className="text-red-500 text-center">{error.message}</div>;

  // Render project details
  return (
    <main className={PROJECT_DETAIL_CONFIG.styling.container}>
      <section className={PROJECT_DETAIL_CONFIG.styling.heroSection}>
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
              className="text-7xl font-bold"
              speed={3}
              shineColor="rgba(139, 111, 71, 1)"
            />
            <h1 className="text-2xl text-muted-foreground">
              {project.subtitle}
            </h1>
            <nav className="flex gap-4 py-2">
              {project.github_url && (
                <div className="flex items-center space-x-2">
                  <a
                    href={project.github_url}
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
              )}
              {project.web_url && (
                <div className="flex items-center space-x-2">
                  <a
                    href={project.web_url}
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
              )}
            </nav>
          </header>
        )}
      </section>

      <article className={PROJECT_DETAIL_CONFIG.styling.projectImageContainer}>
        <div className="w-full h-full flex justify-center items-center transform transition-transform duration-300 hover:rotate-y-6 hover:rotate-x-2 hover:scale-105 hover:shadow-2xl">
          <figure className="relative w-full h-full flex justify-center items-center border-8 rounded-2xl border-amber-800 bg-amber-800/20 shadow-lg transform transition-transform">
            {projectThumbnail && (
              <Image
                src={projectThumbnail}
                alt={project?.title || "Project Image"}
                width={500}
                height={500}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={PROJECT_DETAIL_CONFIG.styling.projectImage}
              />
            )}
            {project?.progress_status && (
              <Badge
                variant="default"
                size="md"
                rounded="full"
                className="absolute top-4 left-4 opacity-70 hover:opacity-100 transition-opacity duration-300 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)]"
              >
                {project.progress_status}
              </Badge>
            )}
            {project?.development_status && (
              <Badge
                variant="default"
                size="md"
                rounded="full"
                className="absolute bottom-4 right-4 opacity-70 hover:opacity-100 transition-opacity duration-300 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)]"
              >
                {project.development_status}
              </Badge>
            )}

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

      {relatedProjects && relatedProjects.length > 0 && (
        <section className="flex flex-col gap-8 py-20">
          <h2 className="text-4xl">Related Projects</h2>
          <FocusCards
            cards={
              relatedProjects.map((project) => ({
                title: project.title,
                src:
                  project.images.find((img) => img.is_thumbnail)?.src ||
                  project.images[0]?.src,
              }))
            }
            enablePagination={true}
            itemsPerPage={4}
          />
        </section>
      )}
    </main>
  );
}
