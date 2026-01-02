/**
 * React hooks for Blockchain.com data
 */

"use client";

import { useState, useEffect } from "react";
import type { BlockchainStats, TickerPrice, ChartData } from "../lib/blockchain-api";

interface UseBlockchainStatsResult {
  data: BlockchainStats | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch blockchain statistics
 */
export function useBlockchainStats(): UseBlockchainStatsResult {
  const [data, setData] = useState<BlockchainStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("/api/blockchain/stats");

        if (!response.ok) {
          throw new Error("Failed to fetch blockchain stats");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Refresh every minute
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}

interface UseTickerResult {
  data: TickerPrice | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch Bitcoin ticker price
 */
export function useTicker(currency: string = "USD"): UseTickerResult {
  const [data, setData] = useState<TickerPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/blockchain/ticker?currency=${currency}`);

        if (!response.ok) {
          throw new Error("Failed to fetch ticker");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [currency]);

  return { data, loading, error };
}

interface UseChartDataResult {
  data: ChartData | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch chart data
 */
export function useChartData(
  chartName: string,
  timespan: string = "1year"
): UseChartDataResult {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/blockchain/charts/${chartName}?timespan=${timespan}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chart data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [chartName, timespan]);

  return { data, loading, error };
}
