"use client";

import { Suspense, lazy } from "react";
import { projectService } from "@/services/projectService";
import { techStackService } from "@/services/techStackService";
import LoadingScreen from "@/components/ui/loading-screen";
import { Loading, LoadingOverlay } from "@/components/ui/loading";

// Lazy load heavy components
const Hero = lazy(() =>
  import("@/app/components/HeroSection").then((mod) => ({
    default: mod.default,
  }))
);
const FeaturedSection = lazy(() =>
  import("@/app/components/FeaturedSection").then((mod) => ({
    default: mod.FeaturedSection,
  }))
);
const FeaturedProject = lazy(() =>
  import("@/app/components/FeaturedProject").then((mod) => ({
    default: mod.default,
  }))
);
const FeaturedActivity = lazy(() =>
  import("@/app/components/FeaturedActivity").then((mod) => ({
    default: mod.default,
  }))
);
const InfiniteMovingCards = lazy(() =>
  import("@/components/ui/infinite-moving-cards").then((mod) => ({
    default: mod.InfiniteMovingCards,
  }))
);

// Extract quotes to a separate file or constant
import { INSPIRATIONAL_QUOTES } from "@/data/quotes";
import { useFetchData } from "@/hooks/useFetchData";

export default function HomePage() {
  const { data: featuredProjects, isLoading: projectsLoading } = useFetchData(
    () => projectService.getProjects(),
    (project) => project.is_featured
  );

  const { data: coreTechStacks, isLoading: techStackLoading } = useFetchData(
    () => techStackService.getTechStacks({ page: 1, per_page: 50 }),
    (tech) => tech.is_core_skill
  );

  if (projectsLoading || techStackLoading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <Suspense fallback={<LoadingOverlay />}>
        <header id="hero">
          <Hero />
        </header>
      </Suspense>

      <div className="container mx-auto max-w-7xl">
        <Suspense fallback={<LoadingOverlay />}>
          <section
            id="featured-section"
            aria-labelledby="featured-section-title"
            className="py-40"
          >
            <h2 id="featured-section-title" className="sr-only">
              Featured Section
            </h2>
            <FeaturedSection techStack={coreTechStacks} />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingOverlay />}>
          <section
            id="featured-project"
            aria-labelledby="featured-project-title"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full h-[80vh] items-center py-40"
          >
            <h2 id="featured-project-title" className="sr-only">
              Featured Projects
            </h2>
            <FeaturedProject projects={featuredProjects} />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingOverlay />}>
          <section
            id="featured-activity"
            aria-labelledby="featured-activity-title"
            className="py-20"
          >
            <h2 id="featured-activity-title" className="sr-only">
              Featured Activity
            </h2>
            <FeaturedActivity />
          </section>
        </Suspense>
      </div>

      <aside
        className="h-[40rem] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden"
        aria-label="Inspirational Quotes"
      >
        <Suspense fallback={<Loading label="Loading quotes..." />}>
          <InfiniteMovingCards
            items={INSPIRATIONAL_QUOTES}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            cardClassName="bg-gradient-to-br from-[var(--color-primary-light)]/10 to-[var(--color-secondary-light)]/10 border border-[var(--color-border)]/20 hover:border-[var(--color-accent)]/50 transition-all duration-300"
          />
        </Suspense>
      </aside>
    </main>
  );
}
