import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Project } from "@/types/Project";
import Image from "next/image";
import Link from "next/link";
import { FaCode } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryTabs from "@/components/ui/category-tabs";

interface ProjectCardProps {
  projects: Project[];
}

export function ProjectCard({ projects }: ProjectCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extract unique categories from projects
  const categories = [
    { label: "All", value: "all" },
    ...Array.from(
      new Set(projects.flatMap((project) => project.category || []))
    ).map((category) => ({
      label: category,
      value: category.toLowerCase(),
    })),
  ];

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter(
          (project) => project.category?.toLowerCase() === selectedCategory
        );

  const projectItems = filteredProjects.map((project) => ({
    title: (
      <div className="flex justify-between items-center">
        {project.title || "Untitled Project"}
      </div>
    ),
    description: (
      <div>
        <p className="text-sm text-neutral-500">
          {project.subtitle || "No subtitle available"}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <FaCode className="h-4 w-4 text-neutral-500" />
          <span className="text-xs">
            {project.development_status || "Status"} |{" "}
            {project.progress_status || "Progress"}
          </span>
        </div>
      </div>
    ),
    header:
      project.images && project.images.find((img) => img.is_thumbnail) ? (
        <Image
          src={project.images.find((img) => img.is_thumbnail)!.src}
          alt={project.title || "Project Image"}
          width={300}
          height={270}
          className="w-full h-full max-h-[270px] object-cover rounded-xl"
        />
      ) : (
        <Skeleton variant="default" width={300} height={270} />
      ),
    icon: <FaCode className="h-4 w-4 text-neutral-500" />,
    link: `/projects/${project.slug}`,
  }));

  return (
    <div className="flex flex-col items-center gap-8">
      <CategoryTabs
        items={categories}
        onTabChange={(value) => setSelectedCategory(value)}
        particleCount={10}
        timeVariance={1000}
        colors={[4, 2, 3, 4, 2, 3, 4, 4]}
      />
      <BentoGrid className="mx-auto">
        {projectItems.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            rel="noopener noreferrer"
            className="hover:cursor-pointer"
          >
            <BentoGridItem
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={`${i === 3 || i === 6 ? "md:col-span-2" : ""} hover:cursor-pointer`}
            />
          </Link>
        ))}
      </BentoGrid>
    </div>
  );
}
