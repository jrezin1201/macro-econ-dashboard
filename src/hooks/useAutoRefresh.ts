/**
 * Auto-refresh hook
 *
 * Provides periodic data refresh with user control
 */

import { useEffect, useState, useCallback } from "react";

interface UseAutoRefreshOptions {
  intervalMs?: number; // Default: 5 minutes
  enabled?: boolean; // Default: true
  onRefresh?: () => void | Promise<void>;
}

interface UseAutoRefreshReturn {
  isRefreshing: boolean;
  lastRefresh: Date | null;
  refresh: () => Promise<void>;
  toggleAutoRefresh: () => void;
  autoRefreshEnabled: boolean;
}

export function useAutoRefresh({
  intervalMs = 5 * 60 * 1000, // 5 minutes default
  enabled = true,
  onRefresh,
}: UseAutoRefreshOptions = {}): UseAutoRefreshReturn {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(enabled);

  const refresh = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      if (onRefresh) {
        await onRefresh();
      }
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Auto-refresh error:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, onRefresh]);

  const toggleAutoRefresh = useCallback(() => {
    setAutoRefreshEnabled((prev) => !prev);
  }, []);

  // Auto-refresh timer
  useEffect(() => {
    if (!autoRefreshEnabled) return;

    const timer = setInterval(() => {
      refresh();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoRefreshEnabled, intervalMs, refresh]);

  return {
    isRefreshing,
    lastRefresh,
    refresh,
    toggleAutoRefresh,
    autoRefreshEnabled,
  };
}
