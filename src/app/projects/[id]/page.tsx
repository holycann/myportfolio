import { Metadata } from "next";
import { getSEO } from "@/lib/seo";
import ProjectDetail from "./ProjectDetailPage";
import { deslugify } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const deslugifiedTitle = deslugify(slug);

  try {
    // Fetch project details to generate dynamic metadata
    const projectData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}`
    ).then((res) => res.json());

    return getSEO({
      title: projectData.title,
      description: projectData.description || `Details of ${deslugifiedTitle} project`,
      image: projectData.coverImage,
      type: "article"
    });
  } catch (error) {
    return getSEO({
      title: `${deslugifiedTitle} Project`,
      description: `Details of ${deslugifiedTitle} project`,
    });
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return <ProjectDetail id={slug} />;
}
