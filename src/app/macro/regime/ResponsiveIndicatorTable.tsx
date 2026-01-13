"use client";

/**
 * Responsive Indicator Table
 *
 * Shows traditional table on desktop, stacked cards on mobile
 */

import type { MacroIndicator } from "@/lib/macro/types";

interface Props {
  indicators: MacroIndicator[];
}

export function ResponsiveIndicatorTable({ indicators }: Props) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/60 font-medium pb-2 pr-4">
                Indicator
              </th>
              <th className="text-right text-white/60 font-medium pb-2 px-2">
                Latest
              </th>
              <th className="text-right text-white/60 font-medium pb-2 px-2">
                1m Δ
              </th>
              <th className="text-right text-white/60 font-medium pb-2 px-2">
                3m Δ
              </th>
              <th className="text-right text-white/60 font-medium pb-2 px-2">
                YoY
              </th>
              <th className="text-right text-white/60 font-medium pb-2 pl-2">
                z-score
              </th>
            </tr>
          </thead>
          <tbody>
            {indicators.map((ind) => (
              <tr key={ind.seriesId} className="border-b border-white/5">
                <td className="py-2 pr-4 text-white/90 font-medium">
                  {ind.name}
                </td>
                <td className="py-2 px-2 text-right text-white/80">
                  {formatValue(ind.latest, ind.units)}
                </td>
                <td
                  className={`py-2 px-2 text-right ${getDeltaColor(
                    ind.delta1m
                  )}`}
                >
                  {formatDelta(ind.delta1m)}
                </td>
                <td
                  className={`py-2 px-2 text-right ${getDeltaColor(
                    ind.delta3m
                  )}`}
                >
                  {formatDelta(ind.delta3m)}
                </td>
                <td className="py-2 px-2 text-right text-white/70">
                  {ind.yoy !== null
                    ? `${ind.yoy > 0 ? "+" : ""}${ind.yoy.toFixed(1)}%`
                    : "—"}
                </td>
                <td
                  className={`py-2 pl-2 text-right font-mono ${getZScoreColor(
                    ind.zScore
                  )}`}
                >
                  {ind.zScore !== null ? ind.zScore.toFixed(2) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-2">
        {indicators.map((ind) => (
          <div
            key={ind.seriesId}
            className="bg-white/5 rounded-lg p-3 border border-white/10"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm font-medium text-white/90">
                {ind.name}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-mono ${
                  ind.zScore !== null && Math.abs(ind.zScore) > 2
                    ? "bg-red-600/20 text-red-400"
                    : ind.zScore !== null && Math.abs(ind.zScore) > 1
                    ? "bg-yellow-600/20 text-yellow-400"
                    : "bg-green-600/20 text-green-400"
                }`}
              >
                {ind.zScore !== null ? `z=${ind.zScore.toFixed(1)}` : "—"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-white/50 mb-1">Latest</p>
                <p className="text-white/90 font-medium">
                  {formatValue(ind.latest, ind.units)}
                </p>
              </div>
              <div>
                <p className="text-white/50 mb-1">1m Δ</p>
                <p className={`font-medium ${getDeltaColor(ind.delta1m)}`}>
                  {formatDelta(ind.delta1m)}
                </p>
              </div>
              <div>
                <p className="text-white/50 mb-1">3m Δ</p>
                <p className={`font-medium ${getDeltaColor(ind.delta3m)}`}>
                  {formatDelta(ind.delta3m)}
                </p>
              </div>
            </div>

            {ind.yoy !== null && (
              <div className="mt-2 pt-2 border-t border-white/10">
                <span className="text-xs text-white/50">YoY: </span>
                <span className="text-xs text-white/70">
                  {ind.yoy > 0 ? "+" : ""}
                  {ind.yoy.toFixed(1)}%
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// Helper functions
function formatValue(value: number | null, units?: string): string {
  if (value === null) return "N/A";

  if (units === "%") return `${value.toFixed(2)}%`;
  if (units === "bps") return `${value.toFixed(0)}`;
  if (units?.includes("$B")) return `${(value / 1000).toFixed(1)}B`;

  return value.toFixed(2);
}

function formatDelta(delta: number | null): string {
  if (delta === null) return "—";
  const sign = delta > 0 ? "+" : "";
  return `${sign}${delta.toFixed(2)}`;
}

function getDeltaColor(delta: number | null): string {
  if (delta === null) return "text-white/50";
  if (Math.abs(delta) < 0.01) return "text-white/50";
  return delta > 0 ? "text-green-400" : "text-red-400";
}

function getZScoreColor(z: number | null): string {
  if (z === null) return "text-white/50";
  if (Math.abs(z) > 2) return "text-red-400";
  if (Math.abs(z) > 1) return "text-yellow-400";
  return "text-green-400";
}
