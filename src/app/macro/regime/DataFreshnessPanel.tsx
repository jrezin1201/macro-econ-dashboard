"use client";

/**
 * Data Freshness Panel
 *
 * Displays data source information, update cadences, and last refresh times
 */

import { getSeriesMeta } from "@/lib/data/dataSourceRegistry";
import { getLastFetchTime, formatFetchTime } from "@/lib/data/fetchWithMeta";
import type { MacroIndicator } from "@/lib/macro/types";

interface Props {
  indicators: MacroIndicator[];
}

export function DataFreshnessPanel({ indicators }: Props) {
  // Get unique series from indicators
  const uniqueSeries = Array.from(
    new Set(indicators.map((ind) => ind.seriesId))
  );

  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-4">
      <h3 className="text-lg font-semibold text-white mb-3">Data Freshness</h3>
      <p className="text-xs text-white/60 mb-4">
        Update schedules and last refresh times for each data source
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-white/10">
              <th className="pb-2 text-xs font-semibold text-white/70">Indicator</th>
              <th className="pb-2 text-xs font-semibold text-white/70">Source</th>
              <th className="pb-2 text-xs font-semibold text-white/70 hidden md:table-cell">Update Cadence</th>
              <th className="pb-2 text-xs font-semibold text-white/70">Last Refreshed</th>
            </tr>
          </thead>
          <tbody>
            {uniqueSeries.map((seriesId) => {
              const meta = getSeriesMeta(seriesId);
              const lastFetch = getLastFetchTime(seriesId);
              const indicator = indicators.find((ind) => ind.seriesId === seriesId);

              if (!meta) return null;

              return (
                <tr key={seriesId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-2 text-white/90 text-xs">
                    {indicator?.name || meta.displayName}
                  </td>
                  <td className="py-2 text-white/70 text-xs">
                    {meta.source}
                  </td>
                  <td className="py-2 text-white/60 text-xs hidden md:table-cell">
                    {meta.updateCadence}
                  </td>
                  <td className="py-2 text-white/60 text-xs">
                    {formatFetchTime(lastFetch)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: Show typical lag info in collapsed accordion */}
      <details className="mt-4 md:hidden">
        <summary className="text-xs text-blue-400 cursor-pointer hover:text-blue-300">
          Show update schedules
        </summary>
        <div className="mt-2 space-y-2">
          {uniqueSeries.map((seriesId) => {
            const meta = getSeriesMeta(seriesId);
            if (!meta || !meta.typicalLag) return null;

            return (
              <div key={seriesId} className="text-xs text-white/60 border-l-2 border-white/10 pl-2">
                <span className="font-semibold text-white/80">{meta.displayName}:</span>{" "}
                {meta.updateCadence} - {meta.typicalLag}
              </div>
            );
          })}
        </div>
      </details>

      {/* Desktop: Show typical lag in tooltip or expanded section */}
      <details className="mt-4 hidden md:block">
        <summary className="text-xs text-blue-400 cursor-pointer hover:text-blue-300">
          Show detailed update schedules
        </summary>
        <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
          {uniqueSeries.map((seriesId) => {
            const meta = getSeriesMeta(seriesId);
            if (!meta) return null;

            return (
              <div key={seriesId} className="rounded bg-white/5 p-2">
                <div className="font-semibold text-white/90 text-xs mb-1">
                  {meta.displayName}
                </div>
                <div className="text-xs text-white/60 space-y-1">
                  <div>
                    <span className="text-white/40">Source:</span> {meta.source}
                  </div>
                  <div>
                    <span className="text-white/40">Updates:</span> {meta.updateCadence}
                  </div>
                  {meta.typicalLag && (
                    <div>
                      <span className="text-white/40">Typical lag:</span> {meta.typicalLag}
                    </div>
                  )}
                  {meta.notes && (
                    <div className="text-white/50 italic mt-1">
                      {meta.notes}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}
