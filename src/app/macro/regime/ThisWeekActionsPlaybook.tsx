"use client";

/**
 * This Week Actions Playbook - Enhanced version for Beginner Mode
 *
 * More detailed, human-readable guidance with clear examples
 */

import { ActionPolicy } from "@/lib/portfolio/actionPolicy";
import { LAYER_METADATA } from "@/lib/portfolio/portfolioConfig";

interface Props {
  actionPolicy: ActionPolicy;
  isBeginnerMode: boolean;
}

export function ThisWeekActionsPlaybook({ actionPolicy, isBeginnerMode }: Props) {
  if (!isBeginnerMode) {
    // Expert mode: show compact version (original)
    return <CompactVersion actionPolicy={actionPolicy} />;
  }

  // Beginner mode: show detailed playbook
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/30 p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-white mb-3">This Week Actions</h2>

      {/* Intro text for beginners */}
      <div className="bg-white/5 rounded-lg p-3 mb-4 border border-white/10">
        <p className="text-sm text-white/80">
          Based on current conditions, here is the best way to deploy new money this week:
        </p>
      </div>

      {/* Main Actions Table */}
      <div className="space-y-4 mb-4">
        {/* What to Buy */}
        <ActionRow
          icon="✓"
          iconColor="text-green-400"
          title="Add to These Layers"
          description="Where to deploy new money"
          layers={actionPolicy.deployLayers}
          examples={getExamplesForLayers(actionPolicy.deployLayers)}
        />

        {/* What to Avoid */}
        <ActionRow
          icon="✗"
          iconColor="text-red-400"
          title="Avoid Adding to These"
          description="Don't buy these right now"
          layers={actionPolicy.avoidLayers}
          examples={getExamplesForLayers(actionPolicy.avoidLayers)}
        />

        {/* Stability Buffer */}
        <ActionRow
          icon="◆"
          iconColor="text-blue-400"
          title="Hold Stability Buffer"
          description={`Keep at least ${actionPolicy.stabilityMinimum}% in cash or T-bills`}
          layers={["STABILITY_DRY_POWDER"]}
          examples={["SGOV (T-bills)", "Cash", "USFR (ultra-short bonds)"]}
        />
      </div>

      {/* Why Section */}
      <div className="mb-4 bg-white/5 rounded-lg p-3 md:p-4 border border-white/10">
        <p className="text-xs text-white/70 font-semibold mb-2 uppercase">Why This Strategy?</p>
        <ul className="space-y-2">
          {actionPolicy.reasoningBullets.map((reason, i) => (
            <li key={i} className="text-sm text-white/80 flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-900/20 rounded-lg p-3 border border-yellow-500/30">
        <p className="text-xs text-yellow-300/90 italic">
          ⚠️ These are not predictions — they are probabilities based on current data. Signals can change,
          so check back weekly and adjust accordingly.
        </p>
      </div>

      {/* Rebalance Triggers */}
      {actionPolicy.rebalanceTriggers.length > 0 && (
        <div className="mt-4 bg-orange-900/20 rounded-lg p-3 border border-orange-500/30">
          <p className="text-xs text-orange-400 font-semibold mb-2 uppercase">
            ⚡ Rebalance Triggers
          </p>
          <p className="text-xs text-white/70 mb-2">Act immediately if these occur:</p>
          <ul className="space-y-1">
            {actionPolicy.rebalanceTriggers.map((trigger, i) => (
              <li key={i} className="text-xs text-orange-300/90 flex items-start gap-2">
                <span>→</span>
                <span>{trigger}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Example Tickers */}
      {actionPolicy.exampleTickers.length > 0 && (
        <div className="mt-4 bg-white/5 rounded-lg p-3 border border-white/10">
          <p className="text-xs text-white/70 font-semibold mb-2">Suggested Buys (Examples Only)</p>
          <p className="text-xs text-white/60 mb-2">
            These are examples that fit the current strategy, not mandates:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {actionPolicy.exampleTickers.map((ticker) => (
              <span
                key={ticker}
                className="px-2 py-1 rounded text-xs font-mono bg-blue-600/20 text-blue-300 border border-blue-500/30"
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

function ActionRow({
  icon,
  iconColor,
  title,
  description,
  layers,
  examples,
}: {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  layers: string[];
  examples?: string[];
}) {
  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
      <div className="flex items-start gap-3">
        <span className={`text-xl ${iconColor} mt-0.5`}>{icon}</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white mb-1">{title}</p>
          <p className="text-xs text-white/60 mb-2">{description}</p>

          {/* Layer Names */}
          {layers.length > 0 && (
            <div className="mb-2">
              <p className="text-xs text-white/80">
                {layers
                  .map((layer: string) => LAYER_METADATA[layer as keyof typeof LAYER_METADATA]?.shortName || layer)
                  .join(", ")}
              </p>
            </div>
          )}

          {/* Examples */}
          {examples && examples.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {examples.slice(0, 6).map((example, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 rounded text-xs bg-white/10 text-white/70 border border-white/20"
                >
                  {example}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CompactVersion({ actionPolicy }: { actionPolicy: ActionPolicy }) {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/30 p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-white mb-4">This Week Actions</h2>

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
            <p className="text-sm text-white font-medium">Deploy new contributions into:</p>
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
            <p className="text-sm text-white font-medium">Maintain stability buffer at:</p>
            <p className="text-sm text-white/80 mt-1">{actionPolicy.stabilityMinimum}% minimum</p>
          </div>
        </div>
      </div>

      {/* Why Section */}
      <div className="mb-4 bg-white/5 rounded-lg p-3">
        <p className="text-xs text-white/70 font-semibold mb-2 uppercase">Why</p>
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
          <p className="text-xs text-yellow-400 font-semibold mb-2 uppercase">Rebalance Triggers</p>
          <ul className="space-y-1">
            {actionPolicy.rebalanceTriggers.map((trigger, i) => (
              <li key={i} className="text-xs text-yellow-300/90">
                • {trigger}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * Helper to get example tickers for layers
 */
function getExamplesForLayers(layers: string[]): string[] {
  const examples: Record<string, string[]> = {
    VOLATILITY_ASYMMETRY: ["MSTR", "BTC", "ETH", "Options"],
    GROWTH_EQUITY: ["QQQ", "NVDA", "MSFT", "META"],
    CASHFLOW_EQUITY: ["UNH", "PG", "JNJ", "V"],
    HARD_ASSET_HEDGE: ["GLD", "SGOL", "DBC", "Real Estate"],
    STABILITY_DRY_POWDER: ["SGOV", "Cash", "USFR"],
  };

  const allExamples: string[] = [];
  layers.forEach((layer) => {
    if (examples[layer]) {
      allExamples.push(...examples[layer]);
    }
  });

  return allExamples.slice(0, 8); // Limit to 8 examples
}
