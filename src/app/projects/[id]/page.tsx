import { Metadata } from "next";
import { getSEO } from "@/lib/seo";
import ProjectDetail from "./ProjectDetailPage";
import { deslugify } from "@/lib/utils";
import { projectService } from "@/services/projectService";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const slug = (await params).slug;
    const { data: project } = await projectService.getProjectBySlug(slug);

    if (!project) return { 
      title: "404", 
      description: "Project Not Found" 
    };

    const deslugifiedTitle = deslugify(slug);
    const thumbnailImage = project.images?.find((img) => img.is_thumbnail)?.src;

    return getSEO({
      title: `${deslugifiedTitle} Project`,
      description: project.description || `Details of ${deslugifiedTitle} project`,
      keywords: project.project_tech_stack?.map((tech) => tech.tech_stack.name) || [],
      type: "article",
      openGraph: {
        title: `${deslugifiedTitle} - Muhamad Ramadhan's Project`,
        description: project.description || `Explore the ${deslugifiedTitle} project`,
        images: thumbnailImage ? [{ 
          url: thumbnailImage, 
          width: 1200, 
          height: 630,
          alt: `${deslugifiedTitle} project thumbnail`
        }] : undefined,
        type: "article"
      }
    });
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Project Not Found",
      description: "Unable to retrieve project details",
    };
  }
}

export default async function Page({ params }: Props) {
  return <ProjectDetail slug={(await params).slug} />;
}