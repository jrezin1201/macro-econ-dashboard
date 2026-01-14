"use client";

/**
 * Company Portfolio Impact Component
 *
 * Shows if the company is in the user's portfolio and its allocation details
 */

import Link from "next/link";
import type { Portfolio } from "@/lib/portfolio/schema";
import { getEngineForHolding } from "@/lib/engines/engineConfig";
import { getEngine } from "@/lib/engines/engineConfig";

interface Props {
  ticker: string;
  portfolio: Portfolio;
}

export function CompanyPortfolioImpact({ ticker, portfolio }: Props) {
  const upperTicker = ticker.toUpperCase();

  // Find this company in the portfolio
  const holding = portfolio.holdings.find(
    (h) => h.ticker.toUpperCase() === upperTicker
  );

  // Not in portfolio
  if (!holding) {
    return (
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Portfolio Status</h3>
        <div className="text-center py-4">
          <p className="text-white/60 mb-4">Not currently in your portfolio</p>
          <Link
            href="/portfolio"
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Manage Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Get classification
  const classification = getEngineForHolding(holding);
  const engine = getEngine(classification.engine);

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Portfolio Status</h3>
        {portfolio.useDemoHoldings && (
          <span className="text-xs px-2 py-1 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30">
            Demo
          </span>
        )}
      </div>

      {/* Weight */}
      <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">
            {holding.weightPct.toFixed(1)}%
          </span>
          <span className="text-sm text-white/60">of portfolio</span>
        </div>
      </div>

      {/* Classification */}
      <div className="space-y-3">
        <div>
          <p className="text-xs text-white/40 mb-1">Economic Engine</p>
          <p className="text-white font-semibold capitalize">
            {engine?.label || classification.engine.toLowerCase().replace(/_/g, " ")}
          </p>
        </div>

        <div>
          <p className="text-xs text-white/40 mb-1">Account</p>
          <p className="text-white font-semibold">{holding.account}</p>
        </div>

        {holding.name && (
          <div>
            <p className="text-xs text-white/40 mb-1">Name</p>
            <p className="text-white/80 text-sm">{holding.name}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link
          href="/portfolio"
          className="block px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg text-center transition-colors"
        >
          Full Portfolio
        </Link>
        <Link
          href="/engines"
          className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg text-center transition-colors"
        >
          Engine Scores
        </Link>
      </div>
    </div>
  );
}
