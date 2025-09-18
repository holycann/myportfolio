"use client";

import { useEffect, useState } from "react";
import Hero from "@/app/components/HeroSection";
import { FeaturedSection } from "./components/FeaturedSection";
import FeaturedProject from "./components/FeaturedProject";
import { projectService } from "@/services/projectService";
import { Project } from "@/types/Project";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import FeaturedActivity from "./components/FeaturedActivity";

const quote = [
  {
    quote:
      "Code is like humor. When you have to explain it, it's bad. The best code tells a story so clear that even your future self will thank you.",
    name: "Cory House",
    title: "Clean Code Philosophy",
  },
  {
    quote:
      "Time in the market beats timing the market. But in coding, timing your commits and deployments can make or break your career.",
    name: "Peter Lynch (adapted)",
    title: "Investment & Development Wisdom",
  },
  {
    quote:
      "First, solve the problem. Then, write the code. Just like investing: first understand the business, then buy the stock.",
    name: "John Johnson",
    title: "Problem-First Approach",
  },
  {
    quote:
      "The stock market is a device for transferring money from the impatient to the patient. Code reviews are a device for transferring bugs from the careless to the careful.",
    name: "Warren Buffett (adapted)",
    title: "Patience in Markets & Code",
  },
  {
    quote:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. Any fool can buy stocks, but wise investors buy businesses.",
    name: "Martin Fowler (adapted)",
    title: "Understanding Over Complexity",
  },
  {
    quote:
      "Be fearful when others are greedy, and greedy when others are fearful. In coding: be simple when others are complex, and thorough when others rush.",
    name: "Warren Buffett (adapted)",
    title: "Contrarian Wisdom",
  },
  {
    quote:
      "The best investment you can make is in your ability to learn. The best code you can write is the one that teaches others.",
    name: "Modern Developer Wisdom",
    title: "Continuous Learning",
  },
  {
    quote:
      "Compound interest is the eighth wonder of the world. Compound learning is the eighth wonder of programming.",
    name: "Albert Einstein (adapted)",
    title: "The Power of Compounding",
  },
  {
    quote:
      "Don't put all your eggs in one basket, but don't put all your functions in one file either. Diversification is key in both portfolios and codebases.",
    name: "Investment & Code Architecture",
    title: "Diversification Principle",
  },
  {
    quote:
      "Price is what you pay, value is what you get. Lines of code is what you write, functionality is what you deliver.",
    name: "Warren Buffett (adapted)",
    title: "Value Over Metrics",
  },
];

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getProjects();
        if (response.data) {
          const featured = response.data
            .filter((project) => project.is_featured)
            .slice(0, 5);
          setFeaturedProjects(featured);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main>
      <header id="hero">
        <Hero />
      </header>

      <div className="container mx-auto max-w-7xl">
        <section
          id="featured-section"
          aria-labelledby="featured-section-title"
          className="py-40"
        >
          <h2 id="featured-section-title" className="sr-only">
            Featured Section
          </h2>
          <FeaturedSection />
        </section>

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
      </div>

      <aside
        className="h-[40rem] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden"
        aria-label="Inspirational Quotes"
      >
        <InfiniteMovingCards
          items={quote}
          direction="right"
          speed="slow"
          pauseOnHover={true}
          cardClassName="bg-gradient-to-br from-[var(--color-primary-light)]/10 to-[var(--color-secondary-light)]/10 border border-[var(--color-border)]/20 hover:border-[var(--color-accent)]/50 transition-all duration-300"
        />
      </aside>
    </main>
  );
}
