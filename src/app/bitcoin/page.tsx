/**
 * Bitcoin Analysis Page
 */

import { getSeriesData } from "@/modules/fred-api/lib/fred-client";
import { analyzeBitcoinTrend, generateMSTRGuidance } from "@/lib/crypto/bitcoinCalc";
import type { BitcoinPrice } from "@/lib/crypto/bitcoinTypes";
import { BITCOIN_CONFIG } from "@/lib/crypto/bitcoinConfig";

async function fetchBitcoinData() {
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  const startDate = fiveYearsAgo.toISOString().split("T")[0];

  // Fetch Bitcoin price from FRED
  const btcData = await getSeriesData(BITCOIN_CONFIG.fredSeriesId, {
    observationStart: startDate,
  });

  // Convert to BitcoinPrice format
  const prices: BitcoinPrice[] = btcData.map((point) => ({
    date: point.dateString,
    price: point.value,
  }));

  // Analyze
  const analysis = analyzeBitcoinTrend(prices);

  // Generate MSTR guidance (default to Risk-On for standalone page)
  const mstrGuidance = generateMSTRGuidance("Risk-On", analysis.trendLevel);

  return {
    analysis,
    prices,
    mstrGuidance,
  };
}

export default async function BitcoinPage() {
  const data = await fetchBitcoinData();
  const { analysis, mstrGuidance } = data;
  const { metrics, macdStatus } = analysis;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Bitcoin Analysis</h1>
        <p className="text-white/60">Trend analysis + MSTR overlay guidance</p>
        <p className="text-white/40 text-sm mt-1">
          Last updated: {analysis.lastUpdated.toLocaleString()}
        </p>
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
          <p className={`text-lg font-bold ${metrics.distanceFrom200D !== null && metrics.distanceFrom200D > 0 ? "text-green-400" : "text-red-400"}`}>
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
          <p className={`text-lg font-bold ${metrics.drawdown365D !== null && metrics.drawdown365D < -20 ? "text-red-400" : "text-white"}`}>
            {metrics.drawdown365D !== null ? `${metrics.drawdown365D.toFixed(1)}%` : "N/A"}
          </p>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <p className="text-white/60 text-xs mb-1">90D Momentum</p>
          <p className={`text-lg font-bold ${metrics.momentum90D !== null && metrics.momentum90D > 0 ? "text-green-400" : metrics.momentum90D !== null && metrics.momentum90D < 0 ? "text-red-400" : "text-white"}`}>
            {metrics.momentum90D !== null
              ? `${metrics.momentum90D > 0 ? "+" : ""}${metrics.momentum90D.toFixed(1)}%`
              : "N/A"}
          </p>
        </div>
      </div>

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
                  <td className={`py-2 text-right ${metrics.distanceFrom200D !== null && metrics.distanceFrom200D > 0 ? "text-green-400" : "text-red-400"}`}>
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
                  <td className={`py-2 text-right ${metrics.momentum90D !== null && metrics.momentum90D > 0 ? "text-green-400" : "text-red-400"}`}>
                    {metrics.momentum90D !== null
                      ? `${metrics.momentum90D > 0 ? "+" : ""}${metrics.momentum90D.toFixed(1)}%`
                      : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: MSTR Guidance */}
        <div className="space-y-6">
          <div className={`rounded-lg border p-6 ${getAlertBorderStyle(mstrGuidance.alertLevel)}`}>
            <h2 className="text-xl font-bold text-white mb-4">MSTR Overlay Guidance</h2>
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getAlertBadgeStyle(mstrGuidance.alertLevel)}`}>
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
                <strong className="text-green-400">GREEN:</strong> Price {">"}200D + bullish structure
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

function getTrendBorderStyle(level: string): string {
  return {
    GREEN: "bg-green-900/20 border-green-500/30",
    YELLOW: "bg-yellow-900/20 border-yellow-500/30",
    RED: "bg-red-900/20 border-red-500/30",
  }[level] || "bg-gray-900/20 border-gray-500/30";
}

function getAlertBorderStyle(level: string): string {
  return {
    OK: "bg-green-900/20 border-green-500/30",
    CAUTION: "bg-yellow-900/20 border-yellow-500/30",
    AVOID: "bg-red-900/20 border-red-500/30",
  }[level] || "bg-gray-900/20 border-gray-500/30";
}

function getAlertBadgeStyle(level: string): string {
  return {
    OK: "bg-green-600 text-white",
    CAUTION: "bg-yellow-600 text-white",
    AVOID: "bg-red-600 text-white",
  }[level] || "bg-gray-600 text-white";
}
