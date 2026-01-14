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

export function EnginesClient() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    const loadPortfolio = () => {
      const loaded = getPortfolio();
      setPortfolio(loaded);
    };

    loadPortfolio();
  }, []);

  if (!portfolio) {
    return <div className="text-white">Loading...</div>;
  }

  const summary = generatePortfolioSummary(portfolio);

  return (
    <div className="space-y-6">
      {/* Current Macro Case */}
      <div className="p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-2">Current Macro Case</h2>
        <p className="text-white/80 text-lg mb-4">
          Risk-Off / Credit Stress Elevated
        </p>
        <p className="text-white/60">
          Current regime favors defensive positioning. Growth & Volatility engines gated.
          Cashflow Compounders and Credit Carry supported.
        </p>
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

              // Mock macro favored status (would come from engine scoring in full implementation)
              const favored = getMockFavoredStatus(engine.id);

              return (
                <tr key={engine.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-2 font-semibold">{engine.label}</td>
                  <td className="py-3 px-2 text-center">
                    {favored === "OVERWEIGHT" && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                        ▲ OVER
                      </span>
                    )}
                    {favored === "NEUTRAL" && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs">
                        — NEUTRAL
                      </span>
                    )}
                    {favored === "UNDERWEIGHT" && (
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
                  <td className="py-3 px-2 text-xs text-white/60">
                    {getMockReason(engine.id)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Action Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-green-200 mb-3">
            ✓ Add (Favored + Under)
          </h3>
          <ul className="space-y-2 text-sm text-green-200/80">
            <li>Cashflow Compounders</li>
            <li>Credit & Carry</li>
            <li>Gold & Scarcity</li>
          </ul>
        </div>

        <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-200 mb-3">
            — Hold (In Range)
          </h3>
          <ul className="space-y-2 text-sm text-blue-200/80">
            <li>Growth & Duration (wait for regime shift)</li>
            <li>Infrastructure & Capex</li>
          </ul>
        </div>

        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-red-200 mb-3">
            ✗ Avoid (Gated or Over)
          </h3>
          <ul className="space-y-2 text-sm text-red-200/80">
            <li>Volatility & Optionality (BTC bearish)</li>
            <li>Small Caps (credit stress)</li>
          </ul>
        </div>
      </div>

      {/* Watch Triggers */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Watch Triggers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-white/80">
              <span className="font-semibold text-blue-300">If BTC &gt; 200D MA:</span>{" "}
              Volatility engine turns ON
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-white/80">
              <span className="font-semibold text-blue-300">If HY OAS spikes &gt;500bp:</span>{" "}
              Shift to Cashflow + Credit
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-white/80">
              <span className="font-semibold text-blue-300">If inflation re-accelerates:</span>{" "}
              Energy/Gold ON
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-white/80">
              <span className="font-semibold text-blue-300">If liquidity rises materially:</span>{" "}
              Growth/Small Caps ON
            </p>
          </div>
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

// Mock functions (would be replaced by real engine scoring in full implementation)
function getMockFavoredStatus(engineId: string): "OVERWEIGHT" | "NEUTRAL" | "UNDERWEIGHT" {
  // Simulate Risk-Off regime favoring defensive engines
  if (engineId === "CASHFLOW_COMPOUNDERS" || engineId === "CREDIT_CARRY" || engineId === "GOLD_SCARCITY") {
    return "OVERWEIGHT";
  }
  if (engineId === "VOLATILITY_OPTIONALITY" || engineId === "SMALL_CAPS_DOMESTIC") {
    return "UNDERWEIGHT";
  }
  return "NEUTRAL";
}

function getMockReason(engineId: string): string {
  const reasons: Record<string, string> = {
    VOLATILITY_OPTIONALITY: "BTC below 200D MA - gated",
    GROWTH_DURATION: "Rates elevated - neutral",
    CASHFLOW_COMPOUNDERS: "Defensive bid strong",
    CREDIT_CARRY: "High rates support carry",
    ENERGY_COMMODITIES: "Oil stable - neutral",
    GOLD_SCARCITY: "Real rates falling - supportive",
    REAL_ESTATE_RENT: "Long rates elevated - headwind",
    DEFENSE_GEOPOLITICS: "Geopolitical premium persists",
    INFRASTRUCTURE_CAPEX: "Fiscal support continues",
    SMALL_CAPS_DOMESTIC: "Credit stress - avoid",
    INTERNATIONAL_FX_EM: "USD strong - headwind",
    SPECIAL_SITUATIONS: "Low correlation to macro",
  };

  return reasons[engineId] || "No signal";
}
