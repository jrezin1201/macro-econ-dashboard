/**
 * Bitcoin Client Component with Auto-Refresh
 */

"use client";

import { useState, useCallback } from "react";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import { RefreshIndicator } from "@/components/common/RefreshIndicator";
import { BitcoinPortfolioImpact } from "./BitcoinPortfolioImpact";
import { BitcoinPriceChart } from "./BitcoinPriceChart";
import type { Portfolio } from "@/lib/portfolio/schema";
import { WorkflowBreadcrumb } from "@/components/workflow/WorkflowBreadcrumb";
import { PagePurpose, PAGE_PURPOSES } from "@/components/workflow/PagePurpose";

interface BitcoinAnalysis {
  trendLevel: string;
  reasons: string[];
  metrics: {
    currentPrice: number | null;
    ma20: number | null;
    ma50: number | null;
    ma200: number | null;
    distanceFrom200D: number | null;
    realizedVol30D: number | null;
    drawdown365D: number | null;
    momentum90D: number | null;
  };
  macdStatus?: {
    isAbove50D: boolean;
    isAbove200D: boolean;
    golden: boolean;
    death: boolean;
  } | null;
  lastUpdated: string;
}

interface MSTRGuidance {
  alertLevel: string;
  recommendation: string;
  reasoning: string[];
}

interface BitcoinPrice {
  date: string;
  price: number;
}

interface Props {
  initialAnalysis: BitcoinAnalysis;
  initialGuidance: MSTRGuidance;
  initialPrices: BitcoinPrice[];
  portfolio: Portfolio;
}

export function BitcoinClient({ initialAnalysis, initialGuidance, initialPrices, portfolio }: Props) {
  const [analysis, setAnalysis] = useState<BitcoinAnalysis>(initialAnalysis);
  const [mstrGuidance, setMSTRGuidance] = useState<MSTRGuidance>(initialGuidance);
  const [prices, setPrices] = useState<BitcoinPrice[]>(initialPrices);

  const fetchData = useCallback(async () => {
    try {
      // Add cache-busting timestamp to force fresh data
      const res = await fetch(`/api/bitcoin/analysis?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setAnalysis(data.analysis);
      setMSTRGuidance(data.mstrGuidance);
      setPrices(data.prices);
    } catch (error) {
      console.error("Failed to refresh Bitcoin data:", error);
    }
  }, []);

  const { isRefreshing, lastRefresh, refresh, toggleAutoRefresh, autoRefreshEnabled } =
    useAutoRefresh({
      intervalMs: 5 * 60 * 1000, // 5 minutes
      onRefresh: fetchData,
    });

  const { metrics, macdStatus } = analysis;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Workflow Breadcrumb */}
      <WorkflowBreadcrumb currentKey="confirmations" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Bitcoin Analysis</h1>
          <PagePurpose purpose={PAGE_PURPOSES.bitcoin} />
        </div>
        <RefreshIndicator
          lastRefresh={lastRefresh}
          isRefreshing={isRefreshing}
          onRefresh={refresh}
          autoRefreshEnabled={autoRefreshEnabled}
          onToggleAutoRefresh={toggleAutoRefresh}
        />
      </div>

      {/* Data Source Notice */}
      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-green-200 font-semibold text-sm mb-1">Real-Time Data from Blockchain.com</h3>
            <p className="text-green-200/80 text-xs">
              Bitcoin prices updated continuously from Blockchain.com. Latest data: {prices.length > 0 ? new Date(prices[prices.length - 1].date).toLocaleDateString() : 'N/A'}.
              Refreshes automatically every 5 minutes for trend analysis and moving averages.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <p className="text-white/60 text-xs mb-1">Current Price</p>
          <p className="text-white text-lg font-bold">
            ${metrics.currentPrice !== null ? metrics.currentPrice.toLocaleString() : "N/A"}
          </p>
        </div>

        <div className={`rounded-lg border p-4 ${getTrendBorderStyle(analysis.trendLevel)}`}>
          <p className="text-white/60 text-xs mb-1">BTC Trend</p>
          <p className="text-white text-lg font-bold">{analysis.trendLevel}</p>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <p className="text-white/60 text-xs mb-1">vs 200D MA</p>
          <p
            className={`text-lg font-bold ${metrics.distanceFrom200D !== null && metrics.distanceFrom200D > 0 ? "text-green-400" : "text-red-400"}`}
          >
            {metrics.distanceFrom200D !== null
              ? `${metrics.distanceFrom200D > 0 ? "+" : ""}${metrics.distanceFrom200D.toFixed(1)}%`
              : "N/A"}
          </p>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <p className="text-white/60 text-xs mb-1">30D Vol</p>
          <p className="text-white text-lg font-bold">
            {metrics.realizedVol30D !== null ? `${metrics.realizedVol30D.toFixed(0)}%` : "N/A"}
          </p>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <p className="text-white/60 text-xs mb-1">365D Drawdown</p>
          <p
            className={`text-lg font-bold ${metrics.drawdown365D !== null && metrics.drawdown365D < -20 ? "text-red-400" : "text-white"}`}
          >
            {metrics.drawdown365D !== null ? `${metrics.drawdown365D.toFixed(1)}%` : "N/A"}
          </p>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <p className="text-white/60 text-xs mb-1">90D Momentum</p>
          <p
            className={`text-lg font-bold ${metrics.momentum90D !== null && metrics.momentum90D > 0 ? "text-green-400" : metrics.momentum90D !== null && metrics.momentum90D < 0 ? "text-red-400" : "text-white"}`}
          >
            {metrics.momentum90D !== null
              ? `${metrics.momentum90D > 0 ? "+" : ""}${metrics.momentum90D.toFixed(1)}%`
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Price Chart */}
      <BitcoinPriceChart
        prices={prices}
        ma20={metrics.ma20}
        ma50={metrics.ma50}
        ma200={metrics.ma200}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Analysis + Metrics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trend Analysis */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Trend Analysis</h2>
            <ul className="space-y-2">
              {analysis.reasons.map((reason, i) => (
                <li key={i} className="text-sm text-white/80 flex items-start">
                  <span className="mr-2 mt-0.5">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* MA Status */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Moving Average Status</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded p-3">
                <p className="text-white/60 text-xs mb-1">20-Day MA</p>
                <p className="text-white font-semibold">
                  ${metrics.ma20 !== null ? metrics.ma20.toLocaleString() : "N/A"}
                </p>
              </div>
              <div className="bg-white/5 rounded p-3">
                <p className="text-white/60 text-xs mb-1">50-Day MA</p>
                <p className="text-white font-semibold">
                  ${metrics.ma50 !== null ? metrics.ma50.toLocaleString() : "N/A"}
                </p>
                <p className="text-xs mt-1">
                  {macdStatus && (
                    <span className={macdStatus.isAbove50D ? "text-green-400" : "text-red-400"}>
                      {macdStatus.isAbove50D ? "Price above" : "Price below"}
                    </span>
                  )}
                </p>
              </div>
              <div className="bg-white/5 rounded p-3">
                <p className="text-white/60 text-xs mb-1">200-Day MA</p>
                <p className="text-white font-semibold">
                  ${metrics.ma200 !== null ? metrics.ma200.toLocaleString() : "N/A"}
                </p>
                <p className="text-xs mt-1">
                  {macdStatus && (
                    <span className={macdStatus.isAbove200D ? "text-green-400" : "text-red-400"}>
                      {macdStatus.isAbove200D ? "Price above" : "Price below"}
                    </span>
                  )}
                </p>
              </div>
              <div className="bg-white/5 rounded p-3">
                <p className="text-white/60 text-xs mb-1">MA Cross</p>
                <p className="text-white font-semibold">
                  {macdStatus?.golden && "Golden Cross"}
                  {macdStatus?.death && "Death Cross"}
                  {!macdStatus?.golden && !macdStatus?.death && "Neutral"}
                </p>
                <p className="text-xs mt-1 text-white/60">50D vs 200D</p>
              </div>
            </div>
          </div>

          {/* Metrics Table */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Key Metrics</h2>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-white/90">Current Price</td>
                  <td className="py-2 text-right text-white/80">
                    ${metrics.currentPrice !== null ? metrics.currentPrice.toLocaleString() : "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-white/90">Distance from 200D MA</td>
                  <td
                    className={`py-2 text-right ${metrics.distanceFrom200D !== null && metrics.distanceFrom200D > 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {metrics.distanceFrom200D !== null
                      ? `${metrics.distanceFrom200D > 0 ? "+" : ""}${metrics.distanceFrom200D.toFixed(1)}%`
                      : "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-white/90">30-Day Realized Vol (annualized)</td>
                  <td className="py-2 text-right text-white/80">
                    {metrics.realizedVol30D !== null ? `${metrics.realizedVol30D.toFixed(0)}%` : "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-white/90">365-Day Drawdown</td>
                  <td className="py-2 text-right text-white/80">
                    {metrics.drawdown365D !== null ? `${metrics.drawdown365D.toFixed(1)}%` : "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-white/90">90-Day Momentum</td>
                  <td
                    className={`py-2 text-right ${metrics.momentum90D !== null && metrics.momentum90D > 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {metrics.momentum90D !== null
                      ? `${metrics.momentum90D > 0 ? "+" : ""}${metrics.momentum90D.toFixed(1)}%`
                      : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Portfolio Impact + MSTR Guidance */}
        <div className="space-y-6">
          {/* Portfolio Impact */}
          <BitcoinPortfolioImpact btcTrendLevel={analysis.trendLevel as "GREEN" | "YELLOW" | "RED"} portfolio={portfolio} />

          {/* MSTR Guidance */}
          <div className={`rounded-lg border p-6 ${getAlertBorderStyle(mstrGuidance.alertLevel)}`}>
            <h2 className="text-xl font-bold text-white mb-4">MSTR Overlay Guidance</h2>
            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${getAlertBadgeStyle(mstrGuidance.alertLevel)}`}
              >
                {mstrGuidance.alertLevel}
              </span>
            </div>
            <p className="text-white font-semibold mb-4">{mstrGuidance.recommendation}</p>
            <ul className="space-y-2">
              {mstrGuidance.reasoning.map((reason, i) => (
                <li key={i} className="text-sm text-white/70">
                  • {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-900/20 rounded-lg border border-blue-500/30 p-6">
            <h3 className="text-white font-semibold mb-2">About BTC Overlay</h3>
            <p className="text-white/70 text-sm mb-3">
              Bitcoin trend analysis helps inform crypto/volatility exposure decisions like MSTR.
            </p>
            <div className="space-y-2 text-xs text-white/60">
              <p>
                <strong className="text-green-400">GREEN:</strong> Price {">"}200D + bullish
                structure
              </p>
              <p>
                <strong className="text-yellow-400">YELLOW:</strong> Near 200D or high vol
              </p>
              <p>
                <strong className="text-red-400">RED:</strong> Price {"<"}200D -5% + bearish
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTrendBorderStyle(level: "GREEN" | "YELLOW" | "RED" | string): string {
  return (
    {
      GREEN: "bg-green-900/20 border-green-500/30",
      YELLOW: "bg-yellow-900/20 border-yellow-500/30",
      RED: "bg-red-900/20 border-red-500/30",
    }[level] || "bg-gray-900/20 border-gray-500/30"
  );
}

function getAlertBorderStyle(level: string): string {
  return (
    {
      OK: "bg-green-900/20 border-green-500/30",
      CAUTION: "bg-yellow-900/20 border-yellow-500/30",
      AVOID: "bg-red-900/20 border-red-500/30",
    }[level] || "bg-gray-900/20 border-gray-500/30"
  );
}

function getAlertBadgeStyle(level: string): string {
  return (
    {
      OK: "bg-green-600 text-white",
      CAUTION: "bg-yellow-600 text-white",
      AVOID: "bg-red-600 text-white",
    }[level] || "bg-gray-600 text-white"
  );
}
