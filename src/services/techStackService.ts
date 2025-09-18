import { BaseApiService } from "./baseApiService";
import type { TechStack } from "@/types/TechStack";
import { ApiResponse } from "@/types/ApiResponse";

export class TechStackService extends BaseApiService {
  /**
   * Fetch all tech stacks with optional pagination and sorting
   */
  static async getTechStacks(
    pagination?: { page?: number; per_page?: number },
    sorting?: { sort_by?: string; sort_order?: "asc" | "desc" },
    query?: {
      category?: string;
    }
  ): Promise<ApiResponse<TechStack[]>> {
    return this.get<TechStack[]>({
      endpoint: "/tech-stacks",
      query: query,
      pagination,
      sorting,
    });
  }

  /**
   * Get details of a specific tech stack
   */
  static async getTechStackById(id: string): Promise<ApiResponse<TechStack>> {
    return this.get<TechStack>({
      endpoint: `/tech-stacks/${id}`,
    });
  }
}

export const techStackService = TechStackService;
