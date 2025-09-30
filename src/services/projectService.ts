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
      slug?: string;
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
   * Get details of a specific project
   */
  static async getProjectBySlug(slug: string): Promise<ApiResponse<Project>> {
    const projectsResponse = await this.getProjects(undefined, undefined, {
      slug: slug,
    });

    if (!projectsResponse.data || projectsResponse.data.length === 0) {
      return {
        ...projectsResponse,
        data: null,
      };
    }
    
    return {
      ...projectsResponse,
      data: projectsResponse.data[0],
    };
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
