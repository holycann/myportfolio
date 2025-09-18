import {
  ApiResponse,
  Pagination,
  Sorting,
  ApiError,
} from "@/types/ApiResponse";
import { logger } from "@/lib/logger";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * Interface for defining request fields with optional pagination and sorting
 */
interface ApiRequestConfig {
  endpoint: string;
  baseUrl?: string;
  config?: AxiosRequestConfig;
  pagination?: Pagination;
  sorting?: Sorting;
  query?: Record<string, string>;
}

export class BaseApiService {
  // Store multiple axios instances for different base URLs
  private static axiosInstances: Map<string, AxiosInstance> = new Map();

  protected static defaultParams = {
    pagination: {
      per_page: 10,
      page: 1,
    } as Pagination,
    sorting: {
      sort_by: "created_at",
      sort_order: "desc",
    } as Sorting,
  };

  /**
   * Get the configured axios instance
   * @param baseURL Optional custom base URL to override default
   */
  protected static getAxiosInstance(baseURL?: string): AxiosInstance {
    const finalBaseURL =
      baseURL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

    if (!this.axiosInstances.has(finalBaseURL)) {
      const newAxiosInstance = this.createAxiosInstance(finalBaseURL);
      this.axiosInstances.set(finalBaseURL, newAxiosInstance);
    }

    return this.axiosInstances.get(finalBaseURL)!;
  }

  /**
   * Create a new axios instance with interceptors
   * @param baseURL Base URL for the axios instance
   */
  private static createAxiosInstance(baseURL: string): AxiosInstance {
    const axiosInstance = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor for token
    axiosInstance.interceptors.request.use(
      (config) => config,
      this.requestErrorInterceptor
    );

    // Add response interceptor for error handling
    axiosInstance.interceptors.response.use(
      (response) => response,
      this.handleResponseError
    );

    return axiosInstance;
  }

  /**
   * Request error interceptor
   */
  private static requestErrorInterceptor(error: any) {
    logger.error("BaseApiService", "API Request Error", error);
    return Promise.reject(error);
  }

  /**
   * Response error interceptor
   */
  private static handleResponseError(error: any) {
    logger.error("BaseApiService", "API Response Error", error);
    return Promise.reject(error);
  }

  /**
   * Perform GET request with optional pagination and sorting
   */
  protected static async get<T>(
    requestFields: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    const { baseUrl, endpoint, config, pagination, sorting, query } =
      requestFields;

    const mergedConfig = {
      ...config,
      params: {
        ...(pagination || this.defaultParams.pagination),
        ...(sorting || this.defaultParams.sorting),
        ...(query || {}),
      },
    };

    try {
      const response = await this.getAxiosInstance(baseUrl).get(
        endpoint,
        mergedConfig
      );
      return this.normalizeResponse<T>(response.data);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  /**
   * Perform POST request
   */
  protected static async post<T, R = T>(
    requestConfig: ApiRequestConfig,
    data?: T
  ): Promise<ApiResponse<R>> {
    const { baseUrl, endpoint, config } = requestConfig;

    try {
      const response = await this.getAxiosInstance(baseUrl).post(
        endpoint,
        data,
        config
      );
      return this.normalizeResponse<R>(response.data);
    } catch (error) {
      return this.handleError<R>(error);
    }
  }

  /**
   * Perform PUT request
   */
  protected static async put<T, R = T>(
    requestConfig: ApiRequestConfig,
    data?: T
  ): Promise<ApiResponse<R>> {
    const { baseUrl, endpoint, config } = requestConfig;

    try {
      const response = await this.getAxiosInstance(baseUrl).put(
        endpoint,
        data,
        config
      );
      return this.normalizeResponse<R>(response.data);
    } catch (error) {
      return this.handleError<R>(error);
    }
  }

  /**
   * Perform DELETE request
   */
  protected static async delete<T = any>(
    requestConfig: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    const { baseUrl, endpoint, config } = requestConfig;

    try {
      const response = await this.getAxiosInstance(baseUrl).delete(
        endpoint,
        config
      );
      return this.normalizeResponse<T>(response.data);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  /**
   * Normalize API response to a consistent structure
   */
  private static normalizeResponse<T>(data: any): ApiResponse<T> {
    const pagination = data?.pagination || data?.metadata?.pagination;
    return {
      success: Boolean(data?.success ?? (data?.error ? false : true)),
      message: data?.message,
      pagination,
      data: (data?.data ?? null) as T | null,
      error: undefined,
    };
  }

  /**
   * Handle API errors with detailed logging and error response
   */
  private static handleError<T>(error: any): ApiResponse<T> {
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      const message: string =
        errorData?.message || errorData?.error?.details || "An error occurred";

      const structuredDetails: ApiError = {
        code: errorData?.error?.code,
        details: errorData?.error?.details,
      };

      const errorResponse: ApiResponse<T> = {
        success: false,
        message,
        data: null,
        error: structuredDetails,
      };

      logger.error("BaseApiService", "API Error", errorResponse);
      return errorResponse;
    }

    // Network or other errors
    const networkMessage = error?.message || "An unexpected error occurred";
    const networkErrorResponse: ApiResponse<T> = {
      success: false,
      message: networkMessage,
      data: null,
      error: networkMessage,
    };

    logger.error("BaseApiService", "Network Error", networkMessage);
    return networkErrorResponse;
  }
}
