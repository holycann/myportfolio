import type { TechStack } from "./TechStack";

export interface Experience {
  id: string;
  created_at?: string;
  updated_at?: string;

  // Job Details
  role: string;
  company: string;
  logo_url: string;
  job_type: string;

  // Timing and Location
  start_date: string;
  end_date?: string;
  location: string;
  arrangement: string;

  // Job Description
  work_description: string;
  impact: string[];
  images_url: string[];

  // Relationships
  experience_tech_stack: ExperienceTechStack[];
}

interface ExperienceTechStack {
  experience_id: string;
  tech_stack_id: string;
  tech_stack: TechStack;
}
