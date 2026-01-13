/**
 * Credit Microstress Page
 */

import { getSeriesData } from "@/modules/fred-api/lib/fred-client";
import { calculateMicrostressMetrics, analyzeMicrostress } from "@/lib/macro/microstressCalc";
import { getMicrostressSeriesId, MICROSTRESS_CONFIG } from "@/lib/macro/microstressConfig";
import type { TimeSeriesDataPoint } from "@/lib/macro/types";

async function fetchMicrostressData() {
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
  const startDate = twoYearsAgo.toISOString().split("T")[0];

  const fetchSeries = async (key: keyof typeof MICROSTRESS_CONFIG.series): Promise<TimeSeriesDataPoint[]> => {
    try {
      const seriesId = getMicrostressSeriesId(key);
      if (!seriesId) return [];
      return await getSeriesData(seriesId, { observationStart: startDate });
    } catch (error) {
      console.warn(`Failed to fetch ${key}:`, error);
      return [];
    }
  };

  const [sofr, effr, tbill3m, cpRate, tedSpread, nfci] = await Promise.all([
    fetchSeries("sofr"),
    fetchSeries("effr"),
    fetchSeries("tbill3m"),
    fetchSeries("cpRate"),
    fetchSeries("tedSpread"),
    fetchSeries("nfci"),
  ]);

  const metrics = calculateMicrostressMetrics({
    sofr,
    effr,
    tbill3m,
    cpRate,
    tedSpread,
    nfci,
  });

  const analysis = analyzeMicrostress(metrics);

  return {
    analysis,
    metrics,
    series: { sofr, effr, tbill3m, cpRate, tedSpread, nfci },
  };
}

export default async function MicrostressPage() {
  const data = await fetchMicrostressData();
  const { analysis, metrics } = data;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Credit Microstress Analysis</h1>
        <p className="text-white/60">Funding market plumbing + early warning signals</p>
        <p className="text-white/40 text-sm mt-1">
          Last updated: {analysis.lastUpdated.toLocaleString()}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`rounded-lg border p-6 ${getBorderStyle(analysis.level)}`}>
          <p className="text-white/60 text-sm mb-2">Microstress Level</p>
          <p className="text-white text-2xl font-bold mb-2">{analysis.level}</p>
          <p className="text-white/50 text-sm">Score: {analysis.score.toFixed(2)}</p>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">SOFR-EFFR Spread</p>
          <p className={`text-2xl font-bold ${metrics.sofrEffrSpread !== null && Math.abs(metrics.sofrEffrSpread) > 0.1 ? "text-red-400" : "text-green-400"}`}>
            {metrics.sofrEffrSpread !== null
              ? `${(metrics.sofrEffrSpread * 100).toFixed(1)}bps`
              : "N/A"}
          </p>
          <p className="text-white/50 text-sm">Funding spread</p>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">SOFR 8w Change</p>
          <p className={`text-2xl font-bold ${metrics.sofr8wChange !== null && metrics.sofr8wChange > 0.5 ? "text-red-400" : "text-white"}`}>
            {metrics.sofr8wChange !== null
              ? `${metrics.sofr8wChange > 0 ? "+" : ""}${(metrics.sofr8wChange * 100).toFixed(0)}bps`
              : "N/A"}
          </p>
          <p className="text-white/50 text-sm">Short-term move</p>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">NFCI</p>
          <p className={`text-2xl font-bold ${metrics.nfci !== null && metrics.nfci > 0 ? "text-yellow-400" : "text-green-400"}`}>
            {metrics.nfci !== null ? metrics.nfci.toFixed(2) : "N/A"}
          </p>
          <p className="text-white/50 text-sm">Financial conditions</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Tables */}
        <div className="lg:col-span-2 space-y-6">
          {/* Funding Rates Table */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Funding Rates</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/60 font-medium pb-2">Rate</th>
                  <th className="text-right text-white/60 font-medium pb-2">Latest</th>
                  <th className="text-right text-white/60 font-medium pb-2">8w Δ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-white/90">SOFR</td>
                  <td className="py-2 text-right text-white/80">
                    {metrics.sofr !== null ? `${metrics.sofr.toFixed(2)}%` : "N/A"}
                  </td>
                  <td className={`py-2 text-right ${metrics.sofr8wChange !== null && metrics.sofr8wChange > 0 ? "text-red-400" : "text-green-400"}`}>
                    {metrics.sofr8wChange !== null
                      ? `${metrics.sofr8wChange > 0 ? "+" : ""}${(metrics.sofr8wChange * 100).toFixed(0)}bps`
                      : "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-white/90">Effective FFR</td>
                  <td className="py-2 text-right text-white/80">
                    {metrics.effr !== null ? `${metrics.effr.toFixed(2)}%` : "N/A"}
                  </td>
                  <td className="py-2 text-right text-white/70">—</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-white/90">SOFR-EFFR Spread</td>
                  <td className={`py-2 text-right font-semibold ${metrics.sofrEffrSpread !== null && Math.abs(metrics.sofrEffrSpread) > 0.1 ? "text-red-400" : "text-green-400"}`}>
                    {metrics.sofrEffrSpread !== null
                      ? `${(metrics.sofrEffrSpread * 100).toFixed(1)}bps`
                      : "N/A"}
                  </td>
                  <td className="py-2 text-right text-white/70">—</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-white/90">3M T-Bill</td>
                  <td className="py-2 text-right text-white/80">
                    {metrics.tbill3m !== null ? `${metrics.tbill3m.toFixed(2)}%` : "N/A"}
                  </td>
                  <td className="py-2 text-right text-white/70">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Credit Markets Table */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Credit Markets</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/60 font-medium pb-2">Indicator</th>
                  <th className="text-right text-white/60 font-medium pb-2">Latest</th>
                  <th className="text-right text-white/60 font-medium pb-2">8w Δ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-white/90">3M AA CP Rate</td>
                  <td className="py-2 text-right text-white/80">
                    {metrics.cpRate !== null ? `${metrics.cpRate.toFixed(2)}%` : "N/A"}
                  </td>
                  <td className={`py-2 text-right ${metrics.cp8wChange !== null && metrics.cp8wChange > 0.5 ? "text-red-400" : "text-white/70"}`}>
                    {metrics.cp8wChange !== null
                      ? `${metrics.cp8wChange > 0 ? "+" : ""}${(metrics.cp8wChange * 100).toFixed(0)}bps`
                      : "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-white/90">TED Spread</td>
                  <td className={`py-2 text-right ${metrics.tedSpread !== null && metrics.tedSpread > 0.4 ? "text-yellow-400" : "text-white/80"}`}>
                    {metrics.tedSpread !== null ? `${metrics.tedSpread.toFixed(2)}%` : "N/A"}
                  </td>
                  <td className="py-2 text-right text-white/70">—</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-white/90">NFCI (Fin Conditions)</td>
                  <td className={`py-2 text-right ${metrics.nfci !== null && metrics.nfci > 0 ? "text-yellow-400" : "text-green-400"}`}>
                    {metrics.nfci !== null ? metrics.nfci.toFixed(2) : "N/A"}
                  </td>
                  <td className="py-2 text-right text-white/70">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Analysis */}
        <div className="space-y-6">
          <div className={`rounded-lg border p-6 ${getBorderStyle(analysis.level)}`}>
            <h2 className="text-xl font-bold text-white mb-4">Microstress Analysis</h2>
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getBadgeStyle(analysis.level)}`}>
                {analysis.level}
              </span>
            </div>
            <ul className="space-y-2">
              {analysis.reasons.map((reason, i) => (
                <li key={i} className="text-sm text-white/80">
                  • {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-900/20 rounded-lg border border-blue-500/30 p-6">
            <h3 className="text-white font-semibold mb-2">About Microstress</h3>
            <p className="text-white/70 text-sm mb-3">
              Credit microstress detects funding market plumbing issues before they impact equities.
            </p>
            <div className="space-y-2 text-xs text-white/60">
              <p>
                <strong className="text-green-400">GREEN:</strong> Funding markets healthy
              </p>
              <p>
                <strong className="text-yellow-400">YELLOW:</strong> Caution signals emerging
              </p>
              <p>
                <strong className="text-red-400">RED:</strong> Funding stress detected
              </p>
            </div>
            <p className="text-xs text-white/50 mt-3">
              Microstress gates macro alert levels to prevent false GREEN signals during funding stress.
            </p>
          </div>
        </div>
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

function getBadgeStyle(level: string): string {
  return {
    GREEN: "bg-green-600 text-white",
    YELLOW: "bg-yellow-600 text-white",
    RED: "bg-red-600 text-white",
  }[level] || "bg-gray-600 text-white";
}
