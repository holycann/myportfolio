import { BaseApiService } from "./baseApiService";
import type { Experience } from "@/types/Experience";
import { ApiResponse } from "@/types/ApiResponse";

export class ExperienceService extends BaseApiService {
  /**
   * Fetch all experiences with optional pagination and sorting
   */
  static async getExperiences(
    pagination?: { page?: number; per_page?: number },
    sorting?: { sort_by?: string; sort_order?: "asc" | "desc" },
    query?: {
      company?: string;
    }
  ): Promise<ApiResponse<Experience[]>> {
    return this.get<Experience[]>({
      endpoint: "/experiences",
      query: query,
      pagination,
      sorting,
    });
  }

  /**
   * Get details of a specific experience
   */
  static async getExperienceById(id: string): Promise<ApiResponse<Experience>> {
    return this.get<Experience>({
      endpoint: `/experiences/${id}`,
    });
  }

  /**
   * Search experiences by keyword
   */
  static async searchExperiences(
    query: string,
    pagination?: { page?: number; per_page?: number },
    sorting?: { sort_by?: string; sort_order?: "asc" | "desc" }
  ): Promise<ApiResponse<Experience[]>> {
    return this.get<Experience[]>({
      endpoint: "/experiences/search",
      query: { q: query },
      pagination,
      sorting,
    });
  }
}

export const experienceService = ExperienceService;
