/**
 * FRED API Client
 *
 * Handles all API requests to the Federal Reserve Economic Data API
 */

import type {
  FREDSeriesObservationsResponse,
  FREDSeriesResponse,
  TimeSeriesDataPoint,
} from "../types";

const FRED_API_BASE = "https://api.stlouisfed.org/fred";

/**
 * Get the FRED API key from environment variables
 */
function getApiKey(): string {
  const apiKey = process.env.FRED_API_KEY;
  if (!apiKey) {
    throw new Error("FRED_API_KEY environment variable is not set");
  }
  return apiKey;
}

/**
 * Fetch series observations (time series data)
 *
 * @param seriesId - FRED series ID (e.g., "GDP", "UNRATE")
 * @param options - Optional query parameters
 */
export async function getSeriesObservations(
  seriesId: string,
  options?: {
    observationStart?: string; // YYYY-MM-DD
    observationEnd?: string;   // YYYY-MM-DD
    units?: "lin" | "chg" | "ch1" | "pch" | "pc1" | "pca" | "cch" | "cca" | "log";
    frequency?: "d" | "w" | "bw" | "m" | "q" | "sa" | "a";
    limit?: number;
  }
): Promise<FREDSeriesObservationsResponse> {
  const params = new URLSearchParams({
    api_key: getApiKey(),
    series_id: seriesId,
    file_type: "json",
  });

  if (options?.observationStart) params.append("observation_start", options.observationStart);
  if (options?.observationEnd) params.append("observation_end", options.observationEnd);
  if (options?.units) params.append("units", options.units);
  if (options?.frequency) params.append("frequency", options.frequency);
  if (options?.limit) params.append("limit", options.limit.toString());

  const url = `${FRED_API_BASE}/series/observations?${params}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`FRED API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Fetch series metadata/info
 *
 * @param seriesId - FRED series ID
 */
export async function getSeriesInfo(seriesId: string): Promise<FREDSeriesResponse> {
  const params = new URLSearchParams({
    api_key: getApiKey(),
    series_id: seriesId,
    file_type: "json",
  });

  const url = `${FRED_API_BASE}/series?${params}`;

  const response = await fetch(url, {
    next: { revalidate: 86400 }, // Cache for 24 hours (metadata changes rarely)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`FRED API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Parse FRED observations into chart-friendly format
 */
export function parseObservations(
  response: FREDSeriesObservationsResponse
): TimeSeriesDataPoint[] {
  return response.observations
    .filter((obs) => obs.value !== ".")
    .map((obs) => ({
      date: new Date(obs.date),
      value: parseFloat(obs.value),
      dateString: obs.date,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Fetch and parse series data in one call
 */
export async function getSeriesData(
  seriesId: string,
  options?: Parameters<typeof getSeriesObservations>[1]
): Promise<TimeSeriesDataPoint[]> {
  const response = await getSeriesObservations(seriesId, options);
  return parseObservations(response);
}
