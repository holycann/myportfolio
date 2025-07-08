import { ReactNode } from 'react';

export type DevelopmentStatus = 
  | 'Alpha' 
  | 'Beta' 
  | 'MVP' 
  | 'Scaling' 
  | 'Completed';

export type ProgressStatus = 
  | 'In Progress' 
  | 'In Revision' 
  | 'On Hold' 
  | 'Delivered' 
  | 'Completed';

export interface ProjectImage {
  src: string;
  alt: string;
  device: 'browser' | 'phone' | 'window';
  deviceColor: string;
}

export interface ProjectTechStack {
  name: string;
  icon: ReactNode;
}

export interface ProjectFeature {
  text: string;
  icon: ReactNode;
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  githubUrl?: string;
  webUrl?: string;
  githubIcon?: ReactNode;
  webIcon?: ReactNode;
  images: ProjectImage[];
  techStack: ProjectTechStack[];
  features: ProjectFeature[];
  developmentStatus: DevelopmentStatus;
  progressStatus: ProgressStatus;
  progressPercentage: number; // New field for progress percentage
}