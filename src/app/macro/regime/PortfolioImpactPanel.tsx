"use client";

/**
 * Portfolio Impact Panel
 *
 * Shows current layer weights vs targets, with delta visualization
 */

import { LAYER_METADATA } from "@/lib/portfolio/portfolioConfig";
import { LayerDelta, getTopOverweights, getTopUnderweights } from "@/lib/portfolio/portfolioStore";

interface Props {
  layerDeltas: LayerDelta[];
  useDemoHoldings: boolean;
}

export function PortfolioImpactPanel({ layerDeltas, useDemoHoldings }: Props) {
  const overweights = getTopOverweights(layerDeltas, 2);
  const underweights = getTopUnderweights(layerDeltas, 2);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Portfolio Impact</h2>
        {useDemoHoldings && (
          <span className="text-xs px-2 py-1 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30">
            Demo Holdings
          </span>
        )}
      </div>

      {/* Layer Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/60 font-medium pb-2 pr-4">Layer</th>
              <th className="text-right text-white/60 font-medium pb-2 px-2">Current</th>
              <th className="text-right text-white/60 font-medium pb-2 px-2">Target</th>
              <th className="text-right text-white/60 font-medium pb-2 px-2">Δ</th>
              <th className="text-right text-white/60 font-medium pb-2 pl-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {layerDeltas.map((delta) => {
              const metadata = LAYER_METADATA[delta.layer];
              return (
                <tr key={delta.layer} className="border-b border-white/5">
                  <td className="py-2 pr-4 text-white/90 font-medium">
                    {metadata.shortName}
                  </td>
                  <td className="py-2 px-2 text-right text-white/80">
                    {delta.current.toFixed(1)}%
                  </td>
                  <td className="py-2 px-2 text-right text-white/70">
                    {delta.min.toFixed(1)}-{delta.max.toFixed(1)}%
                  </td>
                  <td
                    className={`py-2 px-2 text-right font-medium ${
                      Math.abs(delta.deltaToTarget) < 2
                        ? "text-green-400"
                        : Math.abs(delta.deltaToTarget) < 5
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {delta.deltaToTarget > 0 ? "+" : ""}
                    {delta.deltaToTarget.toFixed(1)}
                  </td>
                  <td className="py-2 pl-2 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        delta.status === "IN_RANGE"
                          ? "bg-green-600/20 text-green-400"
                          : delta.status === "OVER"
                          ? "bg-red-600/20 text-red-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {delta.status === "IN_RANGE"
                        ? "OK"
                        : delta.status === "OVER"
                        ? "OVER"
                        : "UNDER"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delta Visualization */}
      <div className="space-y-3 mb-4">
        {layerDeltas.map((delta) => {
          const metadata = LAYER_METADATA[delta.layer];
          const scale = 40; // Max % for scale

          const minPos = (delta.min / scale) * 100;
          const maxPos = (delta.max / scale) * 100;
          const currentPos = Math.min((delta.current / scale) * 100, 100);

          return (
            <div key={delta.layer} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">{metadata.shortName}</span>
                <span className="text-xs text-white/60">{delta.current.toFixed(1)}%</span>
              </div>
              <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                {/* Target range band */}
                <div
                  className="absolute h-full bg-green-500/20"
                  style={{
                    left: `${minPos}%`,
                    width: `${maxPos - minPos}%`,
                  }}
                />
                {/* Current marker */}
                <div
                  className={`absolute h-full w-1 ${
                    delta.status === "IN_RANGE"
                      ? "bg-green-400"
                      : delta.status === "OVER"
                      ? "bg-red-400"
                      : "bg-yellow-400"
                  }`}
                  style={{ left: `${currentPos}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Overweights / Underweights */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-red-400 font-semibold mb-2">Top Overweights</p>
          {overweights.length > 0 ? (
            <ul className="space-y-1">
              {overweights.map((delta) => (
                <li key={delta.layer} className="text-xs text-white/70">
                  • {LAYER_METADATA[delta.layer].shortName} (+
                  {delta.deltaToTarget.toFixed(1)}%)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-white/50">None</p>
          )}
        </div>
        <div>
          <p className="text-sm text-yellow-400 font-semibold mb-2">Top Underweights</p>
          {underweights.length > 0 ? (
            <ul className="space-y-1">
              {underweights.map((delta) => (
                <li key={delta.layer} className="text-xs text-white/70">
                  • {LAYER_METADATA[delta.layer].shortName} (
                  {delta.deltaToTarget.toFixed(1)}%)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-white/50">None</p>
          )}
        </div>
      </div>
    </div>
  );
}
