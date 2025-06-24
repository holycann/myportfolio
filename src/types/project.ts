import { ReactNode } from 'react';

interface TechStack {
  name: string;
  icon: ReactNode;
}

export interface ProjectItem {
  title: string;
  description: string;
  content: React.ReactNode;
  features: {
    text: string;
    icon: React.ReactNode;
  }[];
  techStack: TechStack[];
  githubUrl?: string;
  webUrl?: string;
  githubIcon?: React.ReactNode;
  webIcon?: React.ReactNode;
} 