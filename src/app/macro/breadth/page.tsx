/**
 * Equity Breadth Page
 */

import { breadthProvider } from "@/lib/market/breadthProvider";
import { analyzeBreadth } from "@/lib/market/breadthCalc";
import { getSeriesData } from "@/modules/fred-api/lib/fred-client";

// Force dynamic rendering (no static generation at build time)
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

async function fetchBreadthData() {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const startDate = oneYearAgo.toISOString().split("T")[0];

  // Fetch breadth data
  const adLine = await breadthProvider.getADLine(startDate);

  // Fetch VIX for context
  const vixData = await getSeriesData("VIXCLS", { observationStart: startDate });
  const vixLatest = vixData.length > 0 ? vixData[vixData.length - 1].value : null;

  // Analyze
  const analysis = analyzeBreadth(adLine, [], [], vixLatest);

  return {
    analysis,
    adLine,
    vixLatest,
  };
}

export default async function EquityBreadthPage() {
  const data = await fetchBreadthData();
  const { analysis, vixLatest } = data;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Equity Breadth Analysis</h1>
        <p className="text-white/60">Market breadth confirmation signals</p>
        <p className="text-white/40 text-sm mt-1">
          Last updated: {analysis.lastUpdated.toLocaleString()}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-lg border p-6 ${getBorderStyle(analysis.level)}`}>
          <p className="text-white/60 text-sm mb-2">Breadth Signal</p>
          <p className="text-white text-2xl font-bold mb-2">{analysis.signal}</p>
          <p className="text-white/50 text-sm">{analysis.level} level</p>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">AD Line Momentum</p>
          <p className="text-white text-2xl font-bold mb-2">
            {analysis.metrics.adLineMomentum !== null
              ? `${analysis.metrics.adLineMomentum > 0 ? "+" : ""}${analysis.metrics.adLineMomentum.toFixed(1)}%`
              : "N/A"}
          </p>
          <p className="text-white/50 text-sm">60-day change</p>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">VIX Level</p>
          <p className="text-white text-2xl font-bold mb-2">
            {vixLatest !== null ? vixLatest.toFixed(1) : "N/A"}
          </p>
          <p className="text-white/50 text-sm">Market volatility</p>
        </div>
      </div>

      {/* Analysis Panel */}
      <div className="bg-white/5 rounded-lg border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Breadth Analysis</h2>
        <ul className="space-y-2">
          {analysis.reasons.map((reason, i) => (
            <li key={i} className="text-sm text-white/80 flex items-start">
              <span className="mr-2 mt-0.5">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metrics Table */}
      <div className="bg-white/5 rounded-lg border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Breadth Metrics</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/60 font-medium pb-2">Metric</th>
              <th className="text-right text-white/60 font-medium pb-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5">
              <td className="py-2 text-white/90">AD Line Latest</td>
              <td className="py-2 text-right text-white/80">
                {analysis.metrics.adLineLatest !== null
                  ? analysis.metrics.adLineLatest.toFixed(2)
                  : "N/A"}
              </td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2 text-white/90">AD Line 60D Change</td>
              <td className="py-2 text-right text-white/80">
                {analysis.metrics.adLine60dChange !== null
                  ? `${analysis.metrics.adLine60dChange > 0 ? "+" : ""}${analysis.metrics.adLine60dChange.toFixed(2)}`
                  : "N/A"}
              </td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2 text-white/90">AD Line Momentum</td>
              <td className="py-2 text-right text-white/80">
                {analysis.metrics.adLineMomentum !== null
                  ? `${analysis.metrics.adLineMomentum > 0 ? "+" : ""}${analysis.metrics.adLineMomentum.toFixed(1)}%`
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-900/20 rounded-lg border border-blue-500/30 p-6">
        <h3 className="text-white font-semibold mb-2">About Breadth Confirmation</h3>
        <p className="text-white/70 text-sm">
          Equity breadth measures the participation of stocks in market moves. When breadth{" "}
          <strong className="text-green-400">CONFIRMS</strong>, the macro regime confidence increases by 10 points.
          When breadth <strong className="text-red-400">DIVERGES</strong>, confidence decreases by 10 points.
          This helps identify whether rallies are broad-based or narrow.
        </p>
      </div>
    </div>
  );
}

function getBorderStyle(level: string): string {
  return {
    GREEN: "bg-green-900/20 border-green-500/30",
    YELLOW: "bg-yellow-900/20 border-yellow-500/30",
    RED: "bg-red-900/20 border-red-500/30",
  }[level] || "bg-gray-900/20 border-gray-500/30";
}
