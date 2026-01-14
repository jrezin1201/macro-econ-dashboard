"use client";

/**
 * Portfolio Client Component
 *
 * Main portfolio management interface (client-side for localStorage access)
 */

import { useState, useEffect } from "react";
import {
  getPortfolio,
  updateHoldings,
  validatePortfolio,
  normalizeWeights,
  addHolding,
  updateHolding,
  removeHolding,
  toggleDemoMode,
  resetToDefaults
} from "@/lib/portfolio/store";
import { generatePortfolioSummary } from "@/lib/portfolio/calc";
import { getEngine, getEngineForHolding } from "@/lib/engines/engineConfig";
import { PortfolioAllocationChart } from "./PortfolioAllocationChart";
import { HoldingEditorModal } from "./HoldingEditorModal";
import type { Portfolio, Holding } from "@/lib/portfolio/schema";

export function PortfolioClient() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHolding, setEditingHolding] = useState<Holding | undefined>();
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  // Load portfolio on mount
  useEffect(() => {
    const loadPortfolio = () => {
      const loaded = getPortfolio();
      setPortfolio(loaded);
      setIsLoaded(true);
    };

    loadPortfolio();
  }, []);

  const refreshPortfolio = () => {
    setPortfolio(getPortfolio());
  };

  if (!isLoaded || !portfolio) {
    return <div className="text-white">Loading portfolio...</div>;
  }

  const summary = generatePortfolioSummary(portfolio);
  const validation = validatePortfolio(portfolio.holdings);

  const handleNormalizeWeights = () => {
    const normalized = normalizeWeights(portfolio.holdings);
    updateHoldings(normalized);
    refreshPortfolio();
  };

  const handleAddHolding = () => {
    setEditingHolding(undefined);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditHolding = (holding: Holding) => {
    setEditingHolding(holding);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteHolding = (id: string, ticker: string) => {
    if (confirm(`Delete ${ticker}?`)) {
      removeHolding(id);
      refreshPortfolio();
    }
  };

  const handleSaveHolding = (holdingData: Partial<Holding>) => {
    if (modalMode === "add") {
      addHolding(
        holdingData.ticker!,
        holdingData.account!,
        holdingData.weightPct!
      );
    } else if (editingHolding) {
      updateHolding(editingHolding.id, holdingData);
    }
    refreshPortfolio();
  };

  const handleToggleDemo = () => {
    toggleDemoMode(!portfolio!.useDemoHoldings);
    refreshPortfolio();
  };

  const handleResetToDefaults = () => {
    if (confirm("Reset to demo portfolio? This will overwrite your current holdings.")) {
      resetToDefaults();
      refreshPortfolio();
    }
  };

  return (
    <>
      <HoldingEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveHolding}
        existingHolding={editingHolding}
        mode={modalMode}
      />

      <div className="space-y-6">
        {/* Status Header */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-white">Portfolio Status</h2>
            <div className="flex flex-wrap gap-2">
            {validation.ok ? (
              <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-sm font-semibold">
                ✓ Valid
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-sm font-semibold">
                ⚠ Needs Attention
              </span>
            )}
              {portfolio.useDemoHoldings && (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full text-sm">
                  Demo Data
                </span>
              )}
              <button
                onClick={handleToggleDemo}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded transition-colors"
              >
                {portfolio.useDemoHoldings ? "Use My Portfolio" : "Use Demo"}
              </button>
              <button
                onClick={handleResetToDefaults}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold rounded transition-colors"
              >
                Reset to Demo
              </button>
            </div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-white/40">Total Holdings</p>
            <p className="text-2xl font-bold text-white">{portfolio.holdings.length}</p>
          </div>
          <div>
            <p className="text-white/40">Total Weight</p>
            <p className="text-2xl font-bold text-white">
              {summary.totalWeight.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-white/40">Last Updated</p>
            <p className="text-sm text-white/80">
              {new Date(portfolio.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Validation Messages */}
        {validation.errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded">
            <p className="text-sm font-semibold text-red-300 mb-1">Errors:</p>
            <ul className="text-sm text-red-200/70 list-disc list-inside">
              {validation.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {validation.warnings.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
            <p className="text-sm font-semibold text-yellow-300 mb-1">Warnings:</p>
            <ul className="text-sm text-yellow-200/70 list-disc list-inside">
              {validation.warnings.map((warn, i) => (
                <li key={i}>{warn}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Portfolio Allocation Chart */}
      <PortfolioAllocationChart
        allocations={summary.totalByEngine.map((a) => ({
          engine: a.engine,
          percentage: a.totalPct,
        }))}
      />

        {/* Holdings Table */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold text-white">Holdings</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleAddHolding}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Holding
              </button>
              <button
                onClick={handleNormalizeWeights}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Normalize to 100%
              </button>
            </div>
          </div>

          {portfolio.holdings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60 mb-4">No holdings yet</p>
              <button
                onClick={handleAddHolding}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                Add Your First Holding
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/60 font-semibold py-2 px-2">Ticker</th>
                    <th className="text-left text-white/60 font-semibold py-2 px-2">Account</th>
                    <th className="text-right text-white/60 font-semibold py-2 px-2">Weight %</th>
                    <th className="text-left text-white/60 font-semibold py-2 px-2">Engine</th>
                    <th className="text-right text-white/60 font-semibold py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  {portfolio.holdings.map((holding) => (
                    <tr key={holding.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-2 font-mono font-semibold">{holding.ticker}</td>
                      <td className="py-3 px-2">{holding.account}</td>
                      <td className="py-3 px-2 text-right">{holding.weightPct.toFixed(2)}%</td>
                      <td className="py-3 px-2">
                        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                          {getEngineClassificationLabel(holding)}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditHolding(holding)}
                            className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteHolding(holding.id, holding.ticker)}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      {/* Engine Allocation */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Engine Allocation</h2>

        <div className="space-y-3">
          {summary.totalByEngine.map((allocation) => {
            const engine = getEngine(allocation.engine);
            const delta = summary.engineDeltas.find((d) => d.engine === allocation.engine);

            return (
              <div key={allocation.engine} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">{engine?.label || allocation.engine}</span>
                  <span className="text-white font-semibold">
                    {allocation.totalPct.toFixed(1)}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="relative h-6 bg-white/5 rounded-full overflow-hidden">
                  {/* Target band (min-max) */}
                  {delta && (
                    <div
                      className="absolute h-full bg-white/10"
                      style={{
                        left: `${delta.minPct}%`,
                        width: `${delta.maxPct - delta.minPct}%`,
                      }}
                    />
                  )}

                  {/* Current allocation */}
                  <div
                    className={`absolute h-full ${
                      delta?.status === "OVER"
                        ? "bg-red-500/60"
                        : delta?.status === "UNDER"
                        ? "bg-yellow-500/60"
                        : "bg-green-500/60"
                    }`}
                    style={{
                      width: `${Math.min(allocation.totalPct, 100)}%`,
                    }}
                  />

                  {/* Labels */}
                  {delta && (
                    <div className="absolute inset-0 flex items-center justify-between px-2 text-xs text-white/60">
                      <span>Min: {delta.minPct}%</span>
                      <span>Target: {delta.targetPct}%</span>
                      <span>Max: {delta.maxPct}%</span>
                    </div>
                  )}
                </div>

                {/* Status */}
                {delta && delta.status !== "IN_RANGE" && (
                  <div className="text-xs">
                    {delta.status === "OVER" && (
                      <span className="text-red-300">
                        ▲ {Math.abs(delta.delta).toFixed(1)}% over target
                      </span>
                    )}
                    {delta.status === "UNDER" && (
                      <span className="text-yellow-300">
                        ▼ {Math.abs(delta.delta).toFixed(1)}% under target
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Over/Underweights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-red-200 mb-3">
            Top Overweights
          </h3>
          {summary.topOverweights.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {summary.topOverweights.map((delta) => (
                <li key={delta.engine} className="text-red-200/80">
                  <span className="font-semibold">
                    {getEngine(delta.engine)?.label}
                  </span>
                  : +{delta.delta.toFixed(1)}% (at {delta.currentPct.toFixed(1)}%, target{" "}
                  {delta.targetPct}%)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-red-200/50">No overweights</p>
          )}
        </div>

        <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-200 mb-3">
            Top Underweights
          </h3>
          {summary.topUnderweights.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {summary.topUnderweights.map((delta) => (
                <li key={delta.engine} className="text-yellow-200/80">
                  <span className="font-semibold">
                    {getEngine(delta.engine)?.label}
                  </span>
                  : {delta.delta.toFixed(1)}% (at {delta.currentPct.toFixed(1)}%, target{" "}
                  {delta.targetPct}%)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-yellow-200/50">No underweights</p>
          )}
        </div>
        </div>
      </div>
    </>
  );
}

function getEngineClassificationLabel(holding: Holding): string {
  // Use the real classification system
  const classification = getEngineForHolding(holding);
  const engine = getEngine(classification.engine);

  // Return a short label based on the engine
  return engine?.label || "Unknown";
}
