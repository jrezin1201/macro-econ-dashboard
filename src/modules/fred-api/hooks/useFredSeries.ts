/**
 * React hooks for fetching FRED data
 */

"use client";

import { useState, useEffect } from "react";
import type { TimeSeriesDataPoint } from "../types";

interface UseFredSeriesOptions {
  observationStart?: string;
  observationEnd?: string;
  enabled?: boolean;
}

interface UseFredSeriesResult {
  data: TimeSeriesDataPoint[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to fetch FRED time series data
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useFredSeries("GDP", {
 *   observationStart: "2020-01-01",
 * });
 * ```
 */
export function useFredSeries(
  seriesId: string,
  options?: UseFredSeriesOptions
): UseFredSeriesResult {
  const [data, setData] = useState<TimeSeriesDataPoint[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const enabled = options?.enabled !== false;

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          seriesId,
        });

        if (options?.observationStart) {
          params.append("observationStart", options.observationStart);
        }
        if (options?.observationEnd) {
          params.append("observationEnd", options.observationEnd);
        }

        const response = await fetch(`/api/fred/series?${params}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();

        if (!cancelled) {
          // Parse date strings back to Date objects
          const parsedData = result.data.map((point: any) => ({
            ...point,
            date: new Date(point.date),
          }));
          setData(parsedData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [seriesId, options?.observationStart, options?.observationEnd, enabled, refetchTrigger]);

  const refetch = () => setRefetchTrigger((prev) => prev + 1);

  return { data, loading, error, refetch };
}

/**
 * Hook to fetch multiple FRED series at once
 */
export function useFredMultipleSeries(
  seriesIds: string[],
  options?: UseFredSeriesOptions
): Record<string, UseFredSeriesResult> {
  const results: Record<string, UseFredSeriesResult> = {};

  // Note: In production, you'd want to optimize this with Promise.all
  // or a dedicated multi-series endpoint
  seriesIds.forEach((id) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    results[id] = useFredSeries(id, options);
  });

  return results;
}
