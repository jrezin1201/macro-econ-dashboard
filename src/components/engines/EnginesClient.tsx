"use client";

/**
 * Engines Client Component
 *
 * Shows engine allocation matrix and macro-driven recommendations
 */

import { useState, useEffect, useCallback } from "react";
import { getPortfolio } from "@/lib/portfolio/store";
import { generatePortfolioSummary } from "@/lib/portfolio/calc";
import { engines } from "@/lib/engines/engineConfig";
import { EngineDetailCard } from "@/components/engines/EngineDetailCard";
import { EngineScoresChart } from "@/components/engines/EngineScoresChart";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import { RefreshIndicator } from "@/components/common/RefreshIndicator";
import { EngineTooltip } from "@/components/ui/EngineTooltip";
import type { Portfolio } from "@/lib/portfolio/schema";
import type { ScoringResult, EngineScore } from "@/lib/engines/engineScoring";

interface ApiResponse {
  success: boolean;
  data: ScoringResult;
  usedMockData?: boolean;
  fallback?: boolean;
}

export function EnginesClient() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [scoringData, setScoringData] = useState<ScoringResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      if (!scoringData) {
        setIsLoading(true);
      }

      // Load portfolio
      const loaded = getPortfolio();
      setPortfolio(loaded);

      // Fetch engine scoring
      const response = await fetch("/api/engines/score"); // Use real data
      if (!response.ok) {
        throw new Error("Failed to fetch engine scores");
      }

      const apiData: ApiResponse = await response.json();
      setScoringData(apiData.data);
    } catch (err) {
      console.error("Error loading engine data:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [scoringData]);

  const { isRefreshing, lastRefresh, refresh, toggleAutoRefresh, autoRefreshEnabled } =
    useAutoRefresh({
      intervalMs: 5 * 60 * 1000, // 5 minutes
      onRefresh: loadData,
    });

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-lg">Loading engine scores...</div>
      </div>
    );
  }

  if (error || !portfolio || !scoringData) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
        <p className="text-red-300">
          Error loading engine data: {error || "Unknown error"}
        </p>
      </div>
    );
  }

  const summary = generatePortfolioSummary(portfolio);
  const { macroCase, engineScores } = scoringData;

  // Helper function to get score for an engine
  const getEngineScore = (engineId: string): EngineScore | undefined => {
    return engineScores.find((s) => s.engine === engineId);
  };

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="flex items-center justify-end">
        <RefreshIndicator
          lastRefresh={lastRefresh}
          isRefreshing={isRefreshing}
          onRefresh={refresh}
          autoRefreshEnabled={autoRefreshEnabled}
          onToggleAutoRefresh={toggleAutoRefresh}
        />
      </div>

      {/* Current Macro Case */}
      <div className="p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-2">Current Macro Case</h2>
        <p className="text-white/80 text-lg mb-4">{macroCase.regime}</p>
        <p className="text-white/60 mb-4">{macroCase.description}</p>

        {/* Primary Drivers */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-white/70">Key Drivers:</p>
          <ul className="text-sm text-white/60 space-y-1">
            {macroCase.primaryDrivers.map((driver, i) => (
              <li key={i}>• {driver}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Engine Scores Chart */}
      <EngineScoresChart scores={new Map(engineScores.map((s) => [s.engine, s]))} />

      {/* Engine Details Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">All Engines</h2>
        <div className="grid grid-cols-1 gap-3">
          {engines.map((engine) => {
            const allocation = summary.totalByEngine.find((a) => a.engine === engine.id);
            const delta = summary.engineDeltas.find((d) => d.engine === engine.id);
            const currentPct = allocation?.totalPct || 0;
            const score = getEngineScore(engine.id);

            if (!score || !delta) return null;

            return (
              <EngineDetailCard
                key={engine.id}
                engineId={engine.id}
                score={score}
                currentPct={currentPct}
                targetPct={delta.targetPct}
                deltaStatus={delta.status}
              />
            );
          })}
        </div>
      </div>

      {/* Action Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add: Favored engines that are underweight */}
        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-green-200 mb-3">
            ✓ Add (Favored + Under)
          </h3>
          <ul className="space-y-2 text-sm text-green-200/80">
            {engines
              .filter((engine) => {
                const score = getEngineScore(engine.id);
                const delta = summary.engineDeltas.find((d) => d.engine === engine.id);
                return score?.stance === "OVERWEIGHT" && delta?.status === "UNDER";
              })
              .map((engine) => (
                <li key={engine.id}>
                  <EngineTooltip engineId={engine.id}>
                    <span className="cursor-help">{engine.label}</span>
                  </EngineTooltip>
                </li>
              ))}
          </ul>
          {engines.filter((e) => {
            const score = getEngineScore(e.id);
            const delta = summary.engineDeltas.find((d) => d.engine === e.id);
            return score?.stance === "OVERWEIGHT" && delta?.status === "UNDER";
          }).length === 0 && (
            <p className="text-sm text-green-200/50">No underweight favored engines</p>
          )}
        </div>

        {/* Hold: In range or neutral */}
        <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-200 mb-3">
            — Hold (In Range)
          </h3>
          <ul className="space-y-2 text-sm text-blue-200/80">
            {engines
              .filter((engine) => {
                const delta = summary.engineDeltas.find((d) => d.engine === engine.id);
                return delta?.status === "IN_RANGE";
              })
              .slice(0, 5)
              .map((engine) => (
                <li key={engine.id}>
                  <EngineTooltip engineId={engine.id}>
                    <span className="cursor-help">{engine.label}</span>
                  </EngineTooltip>
                </li>
              ))}
          </ul>
        </div>

        {/* Avoid: Gated or overweight unfavored */}
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-red-200 mb-3">
            ✗ Avoid (Gated or Over)
          </h3>
          <ul className="space-y-2 text-sm text-red-200/80">
            {engines
              .filter((engine) => {
                const score = getEngineScore(engine.id);
                const delta = summary.engineDeltas.find((d) => d.engine === engine.id);
                return (
                  score?.status === "GATED" ||
                  (score?.stance === "UNDERWEIGHT" && delta?.status === "OVER")
                );
              })
              .map((engine) => {
                const score = getEngineScore(engine.id);
                return (
                  <li key={engine.id}>
                    <EngineTooltip engineId={engine.id}>
                      <span className="cursor-help">
                        {engine.label}
                        {score?.status === "GATED" && (
                          <span className="text-xs ml-1">(gated)</span>
                        )}
                      </span>
                    </EngineTooltip>
                  </li>
                );
              })}
          </ul>
          {engines.filter((e) => {
            const score = getEngineScore(e.id);
            const delta = summary.engineDeltas.find((d) => d.engine === e.id);
            return (
              score?.status === "GATED" ||
              (score?.stance === "UNDERWEIGHT" && delta?.status === "OVER")
            );
          }).length === 0 && (
            <p className="text-sm text-red-200/50">No engines to avoid</p>
          )}
        </div>
      </div>

      {/* Watch Triggers */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Watch Triggers</h2>
        <p className="text-sm text-white/60 mb-4">
          Conditions that could shift engine allocations
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {macroCase.watchTriggers.map((trigger, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/80">
                <span className="font-semibold text-blue-300">
                  {trigger.condition}
                  {trigger.threshold && ` (${trigger.threshold})`}:
                </span>{" "}
                {trigger.impact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
