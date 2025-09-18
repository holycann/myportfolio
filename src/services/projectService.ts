import { BaseApiService } from "./baseApiService";
import type { Project } from "@/types/Project";
import { ApiResponse } from "@/types/ApiResponse";

export class ProjectService extends BaseApiService {
  /**
   * Fetch all projects with optional pagination and sorting
   */
  static async getProjects(
    pagination?: { page?: number; per_page?: number },
    sorting?: { sort_by?: string; sort_order?: "asc" | "desc" },
    query?: {
      category?: string;
    }
  ): Promise<ApiResponse<Project[]>> {
    return this.get<Project[]>({
      endpoint: "/projects",
      query: query,
      pagination,
      sorting,
    });
  }

  /**
   * Get details of a specific project
   */
  static async getProjectById(id: string): Promise<ApiResponse<Project>> {
    return this.get<Project>({
      endpoint: `/projects/${id}`,
    });
  }

  /**
   * Search projects by keyword
   */
  static async searchProjects(
    query: string,
    pagination?: { page?: number; per_page?: number },
    sorting?: { sort_by?: string; sort_order?: "asc" | "desc" }
  ): Promise<ApiResponse<Project[]>> {
    return this.get<Project[]>({
      endpoint: "/projects/search",
      query: { q: query },
      pagination,
      sorting,
    });
  }
}

export const projectService = ProjectService;
