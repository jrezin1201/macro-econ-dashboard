"use client";

/**
 * Bitcoin Portfolio Impact Component
 *
 * Shows which portfolio holdings are sensitive to Bitcoin trend
 */

import { useMemo } from "react";
import Link from "next/link";
import type { Portfolio, Holding } from "@/lib/portfolio/schema";
import { getEngineForHolding } from "@/lib/engines/engineConfig";

interface Props {
  btcTrendLevel: "GREEN" | "YELLOW" | "RED";
  portfolio: Portfolio;
}

export function BitcoinPortfolioImpact({ btcTrendLevel, portfolio }: Props) {
  // Find holdings that are Bitcoin-sensitive
  const btcSensitiveHoldings = useMemo(() => {
    return portfolio.holdings
      .map((holding) => {
        const classification = getEngineForHolding(holding);
        // Bitcoin-sensitive engines: Volatility/Optionality (MSTR, COIN, etc), Growth/Duration (high beta tech)
        const isSensitive =
          classification.engine === "VOLATILITY_OPTIONALITY" ||
          classification.engine === "GROWTH_DURATION";

        return {
          ...holding,
          engine: classification.engine,
          isSensitive,
        };
      })
      .filter((h) => h.isSensitive)
      .sort((a, b) => b.weightPct - a.weightPct);
  }, [portfolio.holdings]);

  const totalBtcExposure = btcSensitiveHoldings.reduce((sum, h) => sum + h.weightPct, 0);

  if (btcSensitiveHoldings.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Portfolio Impact</h2>
        <div className="text-center py-6">
          <p className="text-white/60 mb-4">No Bitcoin-sensitive holdings detected in your portfolio.</p>
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

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Portfolio Impact</h2>
        {portfolio.useDemoHoldings && (
          <span className="text-xs px-2 py-1 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30">
            Demo Holdings
          </span>
        )}
      </div>

      {/* Summary */}
      <div className="mb-6 p-4 bg-white/5 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60 mb-1">Total BTC Exposure</p>
            <p className="text-2xl font-bold text-white">{totalBtcExposure.toFixed(1)}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/60 mb-1">BTC Trend</p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                btcTrendLevel === "GREEN"
                  ? "bg-green-600/20 text-green-400"
                  : btcTrendLevel === "RED"
                  ? "bg-red-600/20 text-red-400"
                  : "bg-yellow-600/20 text-yellow-400"
              }`}
            >
              {btcTrendLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div
        className={`mb-6 p-4 rounded-lg border-l-4 ${
          btcTrendLevel === "GREEN"
            ? "bg-green-500/10 border-green-500"
            : btcTrendLevel === "RED"
            ? "bg-red-500/10 border-red-500"
            : "bg-yellow-500/10 border-yellow-500"
        }`}
      >
        <p className="text-sm font-semibold text-white mb-2">Recommendation</p>
        <p className="text-sm text-white/80">
          {btcTrendLevel === "GREEN" && (
            <>Bitcoin above 200D MA. Current exposure ({totalBtcExposure.toFixed(1)}%) can be maintained or increased.</>
          )}
          {btcTrendLevel === "YELLOW" && (
            <>Bitcoin near 200D MA with elevated volatility. Monitor closely. Consider trimming if breaks below support.</>
          )}
          {btcTrendLevel === "RED" && (
            <>
              Bitcoin below 200D MA in bearish trend. Consider reducing exposure ({totalBtcExposure.toFixed(1)}%) until trend improves.
            </>
          )}
        </p>
      </div>

      {/* Holdings Table */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-white/70">BTC-Sensitive Holdings</p>
        <div className="space-y-2">
          {btcSensitiveHoldings.map((holding) => (
            <div key={holding.ticker} className="flex items-center justify-between p-3 bg-white/5 rounded">
              <div className="flex-1">
                <p className="text-white font-medium">{holding.ticker}</p>
                <p className="text-xs text-white/50">{holding.name}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{holding.weightPct.toFixed(1)}%</p>
                <p className="text-xs text-white/50 capitalize">
                  {holding.engine.toLowerCase().replace(/_/g, " ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link
          href="/portfolio"
          className="block px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg text-center transition-colors"
        >
          View Portfolio
        </Link>
        <Link
          href="/engines"
          className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg text-center transition-colors"
        >
          Engine Scores
        </Link>
      </div>
    </div>
  );
}
