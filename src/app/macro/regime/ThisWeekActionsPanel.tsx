"use client";

/**
 * This Week Actions Panel
 *
 * Shows concrete weekly actions based on the action policy
 */

import { ActionPolicy } from "@/lib/portfolio/actionPolicy";
import { LAYER_METADATA } from "@/lib/portfolio/portfolioConfig";

interface Props {
  actionPolicy: ActionPolicy;
}

export function ThisWeekActionsPanel({ actionPolicy }: Props) {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/30 p-6">
      <h2 className="text-xl font-bold text-white mb-4">This Week Actions</h2>

      {/* Header: This Week Bias */}
      <div className="mb-4 bg-white/5 rounded-lg p-3 border border-white/10">
        <p className="text-xs text-white/60 mb-1">This Week Bias</p>
        <p className="text-lg font-bold text-white">{actionPolicy.thisWeekBias}</p>
      </div>

      {/* Action Checklist */}
      <div className="space-y-3 mb-4">
        {/* Deploy new contributions */}
        <div className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">✓</span>
          <div className="flex-1">
            <p className="text-sm text-white font-medium">
              Deploy new contributions into:
            </p>
            <p className="text-sm text-white/80 mt-1">
              {actionPolicy.deployLayers.length > 0
                ? actionPolicy.deployLayers
                    .map((layer) => LAYER_METADATA[layer].shortName)
                    .join(", ")
                : "None (hold cash)"}
            </p>
          </div>
        </div>

        {/* Avoid adding to */}
        <div className="flex items-start gap-2">
          <span className="text-red-400 mt-0.5">✗</span>
          <div className="flex-1">
            <p className="text-sm text-white font-medium">Avoid adding to:</p>
            <p className="text-sm text-white/80 mt-1">
              {actionPolicy.avoidLayers.length > 0
                ? actionPolicy.avoidLayers
                    .map((layer) => LAYER_METADATA[layer].shortName)
                    .join(", ")
                : "None"}
            </p>
          </div>
        </div>

        {/* Stability buffer */}
        <div className="flex items-start gap-2">
          <span className="text-blue-400 mt-0.5">◆</span>
          <div className="flex-1">
            <p className="text-sm text-white font-medium">
              Maintain stability buffer at:
            </p>
            <p className="text-sm text-white/80 mt-1">
              {actionPolicy.stabilityMinimum}% minimum
            </p>
          </div>
        </div>
      </div>

      {/* Why Section */}
      <div className="mb-4 bg-white/5 rounded-lg p-3">
        <p className="text-xs text-white/70 font-semibold mb-2 uppercase">
          Why
        </p>
        <ul className="space-y-1">
          {actionPolicy.reasoningBullets.map((reason, i) => (
            <li key={i} className="text-xs text-white/80">
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Rebalance Triggers */}
      {actionPolicy.rebalanceTriggers.length > 0 && (
        <div className="bg-yellow-900/20 rounded-lg p-3 border border-yellow-500/30">
          <p className="text-xs text-yellow-400 font-semibold mb-2 uppercase">
            Rebalance Triggers
          </p>
          <ul className="space-y-1">
            {actionPolicy.rebalanceTriggers.map((trigger, i) => (
              <li key={i} className="text-xs text-yellow-300/90">
                • {trigger}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Example Tickers */}
      {actionPolicy.exampleTickers.length > 0 && (
        <div className="mt-4 bg-white/5 rounded-lg p-3">
          <p className="text-xs text-white/70 font-semibold mb-2">
            Suggested Buys (Examples)
          </p>
          <p className="text-xs text-white/60 mb-2">
            These are examples only, not mandates:
          </p>
          <div className="flex flex-wrap gap-1">
            {actionPolicy.exampleTickers.map((ticker) => (
              <span
                key={ticker}
                className="px-2 py-0.5 rounded text-xs font-mono bg-blue-600/20 text-blue-300 border border-blue-500/30"
              >
                {ticker}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
