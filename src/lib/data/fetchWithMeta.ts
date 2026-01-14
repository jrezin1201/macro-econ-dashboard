/**
 * Fetch with Metadata
 *
 * Wrapper for data fetching that tracks timestamps and metadata
 */

import { getSeriesMeta, type DataSource } from "./dataSourceRegistry";

export interface FetchMetadata {
  fetchedAt: Date;
  source: DataSource;
  seriesId: string;
  cacheRevalidateSeconds?: number;
}

export interface FetchResult<T> {
  data: T;
  metadata: FetchMetadata;
}

// In-memory cache of last fetch times (server-side only)
const fetchTimestamps = new Map<string, Date>();

/**
 * Get the most recent fetch timestamp for a series
 */
export function getLastFetchTime(seriesId: string): Date | null {
  return fetchTimestamps.get(seriesId) || null;
}

/**
 * Get the most recent timestamp across multiple series
 */
export function getMostRecentFetchTime(seriesIds: string[]): Date | null {
  const times = seriesIds
    .map((id) => fetchTimestamps.get(id))
    .filter((time): time is Date => time !== null && time !== undefined);

  if (times.length === 0) return null;

  return new Date(Math.max(...times.map((t) => t.getTime())));
}

/**
 * Record a fetch timestamp for a series
 */
export function recordFetchTime(seriesId: string, timestamp: Date = new Date()): void {
  fetchTimestamps.set(seriesId, timestamp);
}

/**
 * Wrap a fetch operation with metadata tracking
 */
export async function fetchWithMeta<T>(
  seriesId: string,
  fetchFn: () => Promise<T>
): Promise<FetchResult<T>> {
  const startTime = new Date();

  try {
    const data = await fetchFn();
    const fetchedAt = new Date();

    // Get series metadata
    const seriesMeta = getSeriesMeta(seriesId);

    // Record the fetch time
    recordFetchTime(seriesId, fetchedAt);

    return {
      data,
      metadata: {
        fetchedAt,
        source: seriesMeta?.source || "Other",
        seriesId,
        cacheRevalidateSeconds: seriesMeta?.revalidateSeconds,
      },
    };
  } catch (error) {
    // Still record the attempt time even on failure
    recordFetchTime(seriesId, startTime);
    throw error;
  }
}

/**
 * Batch fetch multiple series with metadata
 */
export async function fetchMultipleWithMeta<T>(
  requests: Array<{ seriesId: string; fetchFn: () => Promise<T> }>
): Promise<Array<FetchResult<T>>> {
  return Promise.all(
    requests.map(({ seriesId, fetchFn }) => fetchWithMeta(seriesId, fetchFn))
  );
}

/**
 * Format a timestamp for display
 */
export function formatFetchTime(date: Date | null): string {
  if (!date) return "Never";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleString();
}

/**
 * Get a readable "last updated" string
 */
export function getLastUpdatedString(seriesIds: string[]): string {
  const mostRecent = getMostRecentFetchTime(seriesIds);
  if (!mostRecent) return "Not yet fetched";

  return formatFetchTime(mostRecent);
}
