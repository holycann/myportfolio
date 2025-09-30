"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { projectService } from "@/services/projectService";
import { Loading } from "@/components/ui/loading";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/hooks/useFetchData";
import { FocusCardProps } from "@/components/ui/focus-card"; // Import type definition

// Dynamically import heavy components
const LightRays = dynamic(async () => {
  const mod = await import("@/components/ui/light-rays");
  return mod.default;
}, {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

const ShinyText = dynamic(async () => {
  const mod = await import("@/components/ui/shiny-text");
  return mod.default;
}, {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

const Badge = dynamic(async () => {
  const mod = await import("@/components/ui/badge");
  return mod.default;
}, {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

const ProgressBar = dynamic(async () => {
  const mod = await import("@/components/ui/progress-bar");
  return mod.ProgressBar;
}, {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

const Carousel = dynamic(async () => {
  const mod = await import("@/components/ui/carousel-image");
  return mod.Carousel;
}, {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

const FocusCards = dynamic(async () => {
  const mod = await import("@/components/ui/focus-card");
  return mod.FocusCards;
}, {
  loading: () => <Skeleton variant="rounded" />,
  ssr: false,
});

const AnimatedTechStack = dynamic(async () => {
  const mod = await import("@/components/ui/animated-tech-stack");
  return mod.AnimatedTechStack;
}, {
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
    container: "container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
    heroSection: "flex flex-col justify-center items-center py-12 md:py-16 lg:py-20",
    projectImageContainer: "w-full h-full flex justify-center items-center perspective-1000 pb-10",
    projectImage: "max-w-full w-full h-auto rounded-xl shadow-lg object-cover transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl",
    sectionTitle: "text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary-dark)] animate-text-shimmer",
    listItem: "text-base sm:text-lg transition-all duration-300 hover:translate-x-2 hover:text-[var(--color-primary-light)] before:content-['→'] before:mr-2 before:text-[var(--color-primary-light)]",
    description: "text-base sm:text-lg md:text-xl leading-relaxed tracking-wide text-justify mb-6",
    badge: "text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5",
    iconLink: "transform transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-lg"
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

  // Prepare related projects for FocusCards
  const relatedProjectCards: FocusCardProps[] = useMemo(() => 
    relatedProjects?.map((project) => ({
      title: project.title,
      url: `/projects/${project.slug}` || '', // Provide a fallback URL
      image: 
        project.images.find((img) => img.is_thumbnail)?.src ||
        project.images[0]?.src ||
        '', // Provide a fallback image
    })) || [], 
    [relatedProjects]
  );

  // Render loading state
  if (isLoading) return <Loading variant="solid" size="lg" label="Loading project details..." />;
  
  // Render error state
  if (error) return <div className="text-red-500 text-center">{error.message}</div>;

  // Render project details
  return (
    <main className={`${PROJECT_DETAIL_CONFIG.styling.container} scroll-smooth`}>
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
          <header 
            className="absolute flex flex-col justify-center items-center text-center gap-3 sm:gap-4 
            transition-all duration-500 hover:scale-[1.01] hover:shadow-lg"
          >
            <Badge
              variant="default"
              icon={<PiTagChevron size={20} />}
              size="md"
              rounded="full"
              className={`${PROJECT_DETAIL_CONFIG.styling.badge} bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary-dark)] 
              text-[var(--color-text-secondary)] hover:opacity-90 transition-opacity duration-300 
              animate-pulse-slow`}
            >
              {project.category}
            </Badge>
            <ShinyText
              text={project.title}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
              speed={3}
              shineColor="rgba(139, 111, 71, 1)"
            />
            <h1 className="text-xl sm:text-2xl text-muted-foreground animate-fade-in-up">
              {project.subtitle}
            </h1>
            <nav className="flex gap-4 py-2">
              {project.github_url && (
                <div className="flex items-center space-x-2">
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${PROJECT_DETAIL_CONFIG.styling.iconLink} animate-shine cursor-pointer group`}
                  >
                    <PiGithubLogo
                      size={48}
                      className="text-[var(--color-primary-light)] dark:text-[var(--color-secondary-light)] 
                      opacity-80 hover:opacity-100 group-hover:rotate-12 transition-all duration-300"
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
                    className={`${PROJECT_DETAIL_CONFIG.styling.iconLink} animate-shine cursor-pointer group`}
                  >
                    <PiGlobe
                      size={48}
                      className="text-[var(--color-primary-light)] dark:text-[var(--color-secondary-light)] 
                      opacity-80 hover:opacity-100 group-hover:rotate-12 transition-all duration-300"
                    />
                  </a>
                </div>
              )}
            </nav>
          </header>
        )}
      </section>

      <article className={`${PROJECT_DETAIL_CONFIG.styling.projectImageContainer} mb-8 sm:mb-12`}>
        <div className="w-full h-full flex justify-center items-center transform transition-transform duration-300 hover:rotate-y-6 hover:rotate-x-2 hover:scale-105 hover:shadow-2xl">
          <figure className="relative w-full h-full flex justify-center items-center border-4 sm:border-6 rounded-2xl border-amber-800 bg-amber-800/20 shadow-lg transform transition-transform">
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
                size="sm"
                rounded="full"
                className={`${PROJECT_DETAIL_CONFIG.styling.badge} absolute top-2 sm:top-4 left-2 sm:left-4 opacity-70 hover:opacity-100 transition-opacity duration-300 
                bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)] 
                animate-bounce-slow`}
              >
                {project.progress_status}
              </Badge>
            )}
            {project?.development_status && (
              <Badge
                variant="default"
                size="sm"
                rounded="full"
                className={`${PROJECT_DETAIL_CONFIG.styling.badge} absolute bottom-2 sm:bottom-4 right-2 sm:right-4 opacity-70 hover:opacity-100 transition-opacity duration-300 
                bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)] 
                animate-bounce-slow`}
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

      <section className="project-description px-4 sm:px-6 lg:px-8">
        <p className={`${PROJECT_DETAIL_CONFIG.styling.description} transition-all duration-500 hover:text-[var(--color-primary-light)]`}>
          {project?.description}
        </p>
        <ProgressBar
          progress={project?.progress_percentage || 0}
          label="Progress"
          showPercentage={true}
          labelClassName="text-base sm:text-lg"
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 py-10 px-4 sm:px-6 lg:px-8">
        <article className="flex flex-col text-justify gap-4">
          <h2 className={PROJECT_DETAIL_CONFIG.styling.sectionTitle}>My Role</h2>
          <ul className="space-y-2">
            {project?.my_role?.map((role, index) => (
              <li 
                key={index} 
                className={PROJECT_DETAIL_CONFIG.styling.listItem}
                aria-label={`Role: ${role}`}
              >
                {role}
              </li>
            ))}
          </ul>
        </article>
        <article className="flex flex-col">
          <h2 className={PROJECT_DETAIL_CONFIG.styling.sectionTitle}>Features</h2>
          <ul className="space-y-2">
            {project?.features?.map((feature, index) => (
              <li 
                key={index} 
                className={PROJECT_DETAIL_CONFIG.styling.listItem}
                aria-label={`Feature: ${feature}`}
              >
                {feature}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="flex flex-col gap-6 sm:gap-8 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <h2 className={PROJECT_DETAIL_CONFIG.styling.sectionTitle}>Gallery</h2>
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
        <section className="flex flex-col gap-6 sm:gap-8 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <h2 className={PROJECT_DETAIL_CONFIG.styling.sectionTitle}>Related Projects</h2>
          <FocusCards
            cards={relatedProjectCards}
            enablePagination={true}
            itemsPerPage={4}
          />
        </section>
      )}
    </main>
  );
}
