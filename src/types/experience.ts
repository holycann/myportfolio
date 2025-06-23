import { ReactNode } from 'react';

export interface ExperienceItem {
  role: string;
  company: string;
  logo: string;
  jobType: string;
  start: string;
  end: string;
  location: string;
  arragement: string;
  content: ReactNode;
} 