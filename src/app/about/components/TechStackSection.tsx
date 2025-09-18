import {
  IconBrandFramer,
  IconBrowser,
  IconCloud,
  IconDatabase,
  IconServer2,
  IconTools,
} from "@tabler/icons-react";
import FeaturedSection, { FeaturedSectionProps } from "@/components/ui/featured-section";
import { techStackService } from "@/services/techStackService";
import { useState, useEffect } from "react";
import ShinyText from "@/components/ui/shiny-text";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function TechStack() {
  const [techStacks, setTechStacks] = useState<FeaturedSectionProps[]>([]);

  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        const response = await techStackService.getTechStacks(
          {
            per_page: 100,
          },
          {
            sort_by: "category",
            sort_order: "asc",
          }
        );
        if (response.data) {
          // Group tech stacks by category
          const categorizedTechStacks = response.data.reduce(
            (acc, tech) => {
              const category = tech.category || "Unknown Category";
              if (!acc[category]) {
                acc[category] = [];
              }
              acc[category].push(tech);
              return acc;
            },
            {} as Record<string, any[]>
          );

          // Convert to FeaturedSectionProps
          const formattedTechStacks: FeaturedSectionProps[] = Object.entries(
            categorizedTechStacks
          ).map(([category, techs], _) => ({
            title: category,
            icon: getIconForCategory(category),
            children: (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
                {techs.map((tech, index) => (
                  <HoverBorderGradient
                    key={tech.id}
                    as="button"
                    containerClassName="w-full"
                    className={`
                      w-full
                      py-2 
                      text-[var(--color-text-primary)] 
                      dark:text-[var(--color-text-secondary)] 
                      ${
                        index % 2 === 0
                          ? "bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary-dark)]"
                          : "bg-gradient-to-br from-[var(--color-secondary-light)] to-[var(--color-secondary-dark)]"
                      }
                      text-xs
                      rounded-full
                      transition 
                      duration-300 
                      hover:scale-105
                    `}
                    duration={1.5}
                    clockwise={index % 2 === 0}
                  >
                    {tech.name}
                  </HoverBorderGradient>
                ))}
              </div>
            ),
          }));
          setTechStacks(formattedTechStacks);
        }
      } catch (error) {
        console.error("Failed to fetch tech stacks", error);
      }
    };

    fetchTechStacks();
  }, []);

  const getIconForCategory = (category?: string) => {
    switch (category) {
      case "Frontend Technologies":
        return <IconBrowser className="text-[var(--color-secondary)]" />;
      case "Backend Technologies":
        return <IconServer2 className="text-[var(--color-secondary)]" />;
      case "Frameworks":
        return <IconBrandFramer className="text-[var(--color-secondary)]" />;
      case "Database Systems":
        return <IconDatabase className="text-[var(--color-secondary)]" />;
      case "Platforms & CMS":
        return <IconCloud className="text-[var(--color-secondary)]" />;
      case "Development Tools":
        return <IconTools className="text-[var(--color-secondary)]" />;
      default:
        return <IconTools className="text-[var(--color-secondary)]" />;
    }
  };

  return (
    <div
      className="container mx-auto py-10 md:py-20 lg:py-30 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]"
      id="tech-stack"
    >
      <div className="flex justify-center">
        <ShinyText
          text="Tech Stack"
          disabled={false}
          speed={3}
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--color-secondary)]"
        />
      </div>

      <div className="px-6 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
        {techStacks.map((techStack, index) => (
          <FeaturedSection
            key={techStack.title}
            props={techStack}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
