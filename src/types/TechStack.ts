export interface TechStack {
  id: string;
  name: string;
  category?: string;
  version?: string;
  role?: string;
  image_url?: string;
  is_core_skill: boolean;
  created_at?: Date;
  updated_at?: Date;
}