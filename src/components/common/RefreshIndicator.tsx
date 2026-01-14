/**
 * Refresh Indicator Component
 *
 * Shows last refresh time and manual refresh button
 */

"use client";

import { formatDistanceToNow } from "date-fns";

interface Props {
  lastRefresh: Date | null;
  isRefreshing: boolean;
  onRefresh: () => void;
  autoRefreshEnabled: boolean;
  onToggleAutoRefresh: () => void;
}

export function RefreshIndicator({
  lastRefresh,
  isRefreshing,
  onRefresh,
  autoRefreshEnabled,
  onToggleAutoRefresh,
}: Props) {
  return (
    <div className="flex items-center gap-3 text-sm">
      {/* Last updated */}
      {lastRefresh && (
        <span className="text-white/40">
          Updated {formatDistanceToNow(lastRefresh, { addSuffix: true })}
        </span>
      )}

      {/* Auto-refresh toggle */}
      <button
        onClick={onToggleAutoRefresh}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
          autoRefreshEnabled
            ? "bg-green-600/20 text-green-300 border border-green-500/30"
            : "bg-white/5 text-white/60 border border-white/10"
        }`}
        title={autoRefreshEnabled ? "Auto-refresh enabled" : "Auto-refresh disabled"}
      >
        {autoRefreshEnabled ? "Auto ✓" : "Auto ✗"}
      </button>

      {/* Manual refresh button */}
      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
      >
        <svg
          className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {isRefreshing ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}
