import { ReactNode } from 'react';

export interface ProjectItem {
  title: string;
  githubUrl: string;
  webUrl: string;
  description: string;
  features: string[];
  techStack: string[];
  imageUrl?: string; // Optional image for the project
  content?: ReactNode; // Optional content for the project
  githubIcon?: ReactNode; // Optional custom GitHub icon
  webIcon?: ReactNode; // Optional custom web icon
} 