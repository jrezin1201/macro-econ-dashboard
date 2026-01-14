/**
 * Regime History Timeline
 *
 * Shows recent regime changes over time
 */

"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { getRegimeChanges, getRegimeStats, type RegimeSnapshot } from "@/lib/macro/regimeHistory";

export function RegimeHistoryTimeline() {
  const [changes] = useState<RegimeSnapshot[]>(() => getRegimeChanges());
  const [stats] = useState<ReturnType<typeof getRegimeStats> | null>(() => getRegimeStats());

  if (changes.length === 0) {
    return (
      <div className="bg-white/5 rounded-lg border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Regime History</h3>
        <div className="text-center py-8">
          <p className="text-white/60 mb-2">No regime history yet</p>
          <p className="text-white/40 text-sm">
            Regime changes will be tracked automatically as you refresh the dashboard
          </p>
        </div>
      </div>
    );
  }

  const getRegimeColor = (regime: string) => {
    const colors: Record<string, string> = {
      "Risk-On": "text-green-400 bg-green-600/20 border-green-500/30",
      "Risk-Off": "text-red-400 bg-red-600/20 border-red-500/30",
      "Inflationary": "text-yellow-400 bg-yellow-600/20 border-yellow-500/30",
      "Deflationary": "text-blue-400 bg-blue-600/20 border-blue-500/30",
      "Mixed": "text-purple-400 bg-purple-600/20 border-purple-500/30",
    };
    return colors[regime] || "text-gray-400 bg-gray-600/20 border-gray-500/30";
  };

  const getAlertColor = (level: string) => {
    const colors: Record<string, string> = {
      GREEN: "text-green-300",
      YELLOW: "text-yellow-300",
      RED: "text-red-300",
    };
    return colors[level] || "text-gray-300";
  };

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Regime History</h3>
        {stats && stats.totalSnapshots > 0 && (
          <span className="text-sm text-white/60">{stats.totalSnapshots} snapshots</span>
        )}
      </div>

      {/* Stats Summary */}
      {stats && stats.latestChange && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <div className="bg-white/5 rounded p-3">
            <p className="text-white/60 text-xs mb-1">Current Regime</p>
            <p className="text-white font-semibold text-sm">{stats.latestChange.regime}</p>
          </div>
          <div className="bg-white/5 rounded p-3">
            <p className="text-white/60 text-xs mb-1">Days Since Change</p>
            <p className="text-white font-semibold text-sm">
              {stats.daysSinceLastChange !== null ? `${stats.daysSinceLastChange}d` : "N/A"}
            </p>
          </div>
          <div className="bg-white/5 rounded p-3 col-span-2 md:col-span-1">
            <p className="text-white/60 text-xs mb-1">Most Common</p>
            <p className="text-white font-semibold text-sm">{stats.mostCommonRegime || "N/A"}</p>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {changes.slice().reverse().map((snapshot, index) => {
          const isLatest = index === 0;
          const date = new Date(snapshot.timestamp);

          return (
            <div
              key={snapshot.timestamp}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                isLatest ? "bg-blue-600/10 border border-blue-500/30" : "bg-white/5"
              }`}
            >
              {/* Timeline indicator */}
              <div className="flex flex-col items-center pt-1">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isLatest ? "bg-blue-500" : "bg-white/30"
                  }`}
                />
                {index < changes.length - 1 && (
                  <div className="w-0.5 h-full bg-white/10 mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold border ${getRegimeColor(snapshot.regime)}`}
                  >
                    {snapshot.regime}
                  </span>
                  <span className={`text-xs font-medium ${getAlertColor(snapshot.alertLevel)}`}>
                    {snapshot.alertLevel}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span>{formatDistanceToNow(date, { addSuffix: true })}</span>
                  <span>•</span>
                  <span>{snapshot.confidence}% confidence</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
