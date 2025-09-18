import { TechStack } from "./TechStack";

export type DevelopmentStatus = "Alpha" | "Beta" | "MVP";
export type ProgressStatus =
  | "In Progress"
  | "In Revision"
  | "On Hold"
  | "Completed";

export interface ProjectImage {
  src: string;
  alt: string;
  is_thumbnail: boolean;
}

export interface Project {
  id: string;
  slug: string;
  created_at?: string;
  updated_at?: string;

  // Project Details
  title: string;
  subtitle: string;
  description: string;
  my_role: string[];
  category: string;
  github_url?: string;
  web_url?: string;
  is_featured: boolean;

  // Project Status
  development_status: DevelopmentStatus;
  progress_status: ProgressStatus;
  progress_percentage: number;

  // Project Media
  images: ProjectImage[];
  features: string[];

  // Relationships
  project_tech_stack: ProjectTechStack[];
}

export interface ProjectTechStack {
  project_id: string;
  tech_stack_id: string;
  tech_stack: TechStack;
}
