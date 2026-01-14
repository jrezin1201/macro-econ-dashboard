"use client";

/**
 * Engines Client Component
 *
 * Shows engine allocation matrix and macro-driven recommendations
 */

import { useState, useEffect } from "react";
import { getPortfolio } from "@/lib/portfolio/store";
import { generatePortfolioSummary } from "@/lib/portfolio/calc";
import { engines } from "@/lib/engines/engineConfig";
import type { Portfolio } from "@/lib/portfolio/schema";
import type { ScoringResult, EngineScore, MacroCase } from "@/lib/engines/engineScoring";

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

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Load portfolio
        const loaded = getPortfolio();
        setPortfolio(loaded);

        // Fetch engine scoring
        const response = await fetch("/api/engines/score?mock=true"); // Use mock=true for now
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
    };

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

      {/* Engine Matrix */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg overflow-x-auto">
        <h2 className="text-xl font-bold text-white mb-4">Engine Allocation Matrix</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/60 font-semibold py-2 px-2">Engine</th>
              <th className="text-center text-white/60 font-semibold py-2 px-2">Favored?</th>
              <th className="text-right text-white/60 font-semibold py-2 px-2">Your %</th>
              <th className="text-right text-white/60 font-semibold py-2 px-2">Target</th>
              <th className="text-center text-white/60 font-semibold py-2 px-2">Status</th>
              <th className="text-left text-white/60 font-semibold py-2 px-2">Why</th>
            </tr>
          </thead>
          <tbody className="text-white/80">
            {engines.map((engine) => {
              const allocation = summary.totalByEngine.find((a) => a.engine === engine.id);
              const delta = summary.engineDeltas.find((d) => d.engine === engine.id);
              const currentPct = allocation?.totalPct || 0;

              // Get real engine score
              const score = getEngineScore(engine.id);
              const stance = score?.stance || "NEUTRAL";
              const reason = score?.reasons[0] || "No signal";

              return (
                <tr key={engine.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-2 font-semibold">{engine.label}</td>
                  <td className="py-3 px-2 text-center">
                    {stance === "OVERWEIGHT" && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                        ▲ OVER
                      </span>
                    )}
                    {stance === "NEUTRAL" && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs">
                        — NEUTRAL
                      </span>
                    )}
                    {stance === "UNDERWEIGHT" && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">
                        ▼ UNDER
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-right font-mono">
                    {currentPct.toFixed(1)}%
                  </td>
                  <td className="py-3 px-2 text-right text-white/60">
                    {delta?.targetPct.toFixed(0)}%
                  </td>
                  <td className="py-3 px-2 text-center">
                    {delta?.status === "OVER" && (
                      <span className="text-red-300 text-xs">OVER</span>
                    )}
                    {delta?.status === "UNDER" && (
                      <span className="text-yellow-300 text-xs">UNDER</span>
                    )}
                    {delta?.status === "IN_RANGE" && (
                      <span className="text-green-300 text-xs">OK</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-xs text-white/60">{reason}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
                <li key={engine.id}>{engine.label}</li>
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
                <li key={engine.id}>{engine.label}</li>
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
                    {engine.label}
                    {score?.status === "GATED" && (
                      <span className="text-xs ml-1">(gated)</span>
                    )}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {macroCase.watchTriggers.map((trigger, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-lg">
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

      {/* Engine Details (Expandable) */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Engine Details</h2>
        <p className="text-sm text-white/60">
          Click an engine above to see detailed description, examples, and macro drivers.
          (Full implementation pending)
        </p>
      </div>
    </div>
  );
}
