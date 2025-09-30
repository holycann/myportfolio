import { ApiResponse } from "@/types/ApiResponse";
import { useEffect, useState } from "react";

// Custom hook for data fetching
export function useFetchData<T>(
  fetchFn: () => Promise<ApiResponse<T[]>>,
  filterFn: (item: T) => boolean = () => true
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchFn();
        if (response.data) {
          const filteredData = response.data.filter(filterFn);
          setData(filteredData);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}