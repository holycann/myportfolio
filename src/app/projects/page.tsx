import { Metadata } from "next";
import { getSEO } from "@/lib/seo";
import ProjectPage from "./ProjectPage";

/**
 * Server-side Projects page component
 * Handles SEO metadata and server-side rendering strategy
 */
export const metadata: Metadata = getSEO({
  title: "Projects",
  description: "Explore my professional projects showcasing innovative solutions and creative problem-solving",
  keywords: ["software projects", "web development", "portfolio", "innovative solutions"],
  openGraph: {
    title: "Projects | Itsrama — Backend & Automation Engineer",
    description: "Explore my professional projects showcasing innovative solutions and creative problem-solving",
    type: "website",
    images: [
      {
        url: "https://itsrama.kawasan.digital/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Projects Overview"
      }
    ]
  }
});

/**
 * Projects page rendering strategy
 * Uses client-side ProjectPage component for dynamic content
 */
export default function Page() {
  return <ProjectPage />;
}
