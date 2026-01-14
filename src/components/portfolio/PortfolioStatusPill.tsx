"use client";

/**
 * Portfolio Status Pill
 *
 * Shows portfolio summary in header with click to open quick drawer
 */

import { useState, useEffect } from "react";
import { getPortfolio } from "@/lib/portfolio/store";
import { generatePortfolioSummary, type PortfolioSummary } from "@/lib/portfolio/calc";

interface Props {
  onClick: () => void;
}

export function PortfolioStatusPill({ onClick }: Props) {
  const [summary, setSummary] = useState<PortfolioSummary | null>(null);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const loadPortfolio = () => {
      const portfolio = getPortfolio();
      const portfolioSummary = generatePortfolioSummary(portfolio);
      setSummary(portfolioSummary);
      setIsValid(portfolioSummary.isValid);
    };

    loadPortfolio();

    // Refresh when portfolio changes (listen to storage events)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "portfolio_v1") {
        loadPortfolio();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!summary) {
    return null;
  }

  const overweightCount = summary.topOverweights.length;
  const underweightCount = summary.topUnderweights.length;

  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs transition-all"
      aria-label="View portfolio summary"
    >
      {/* Status indicator */}
      <div
        className={`w-2 h-2 rounded-full ${
          isValid ? "bg-green-400" : "bg-yellow-400"
        }`}
      />

      {/* Summary text */}
      <div className="flex items-center gap-1.5 text-white/80 font-medium">
        <span className="hidden sm:inline">Portfolio:</span>
        {overweightCount > 0 && (
          <span className="text-red-300">{overweightCount} OW</span>
        )}
        {underweightCount > 0 && (
          <span className="text-yellow-300">{underweightCount} UW</span>
        )}
        {overweightCount === 0 && underweightCount === 0 && (
          <span className="text-green-300">Balanced</span>
        )}
      </div>

      {/* Hover tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 border border-white/20 rounded text-xs text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
        Click for details
      </div>
    </button>
  );
}
