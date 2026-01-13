"use client";

/**
 * Macro Regime Dashboard - Client Component
 *
 * Displays regime analysis, alerts, and portfolio tilts
 */

import type { MacroRegimeData, MacroIndicator } from "@/lib/macro/types";

interface Props {
  data: MacroRegimeData;
}

export function MacroRegimeDashboard({ data }: Props) {
  const { regime, alert, tilts, composites, indicators, rates, credit, liquidity, lastUpdated } = data;

  // Group indicators by category
  const indicatorsByCategory = indicators.reduce((acc, ind) => {
    if (!acc[ind.category]) acc[ind.category] = [];
    acc[ind.category].push(ind);
    return acc;
  }, {} as Record<string, MacroIndicator[]>);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Macro Regime Analysis</h1>
        <p className="text-white/60">
          Rule-based regime classification + portfolio tilt guidance
        </p>
        <p className="text-white/40 text-sm mt-1">
          Last updated: {lastUpdated.toLocaleString()}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Regime Card */}
        <SummaryCard
          title="Regime"
          value={regime.regime}
          subtitle={`${regime.confidence}% confidence`}
          color={getRegimeColor(regime.regime)}
        />

        {/* Alert Level Card */}
        <SummaryCard
          title="Alert Level"
          value={alert.level}
          subtitle={`${alert.reasons.length} signals`}
          color={getAlertColor(alert.level)}
        />

        {/* Fed Funds Card */}
        <SummaryCard
          title="Fed Funds"
          value={rates.fedfunds !== null ? `${rates.fedfunds.toFixed(2)}%` : "N/A"}
          subtitle={`2Y: ${rates.dgs2?.toFixed(2) ?? "N/A"}%`}
          color="blue"
        />

        {/* Curve Card */}
        <SummaryCard
          title="Curve (10-2)"
          value={rates.curve10_2 !== null ? `${rates.curve10_2.toFixed(2)}%` : "N/A"}
          subtitle={rates.curve10_2 !== null && rates.curve10_2 < 0 ? "Inverted" : "Normal"}
          color={rates.curve10_2 !== null && rates.curve10_2 < -0.5 ? "red" : rates.curve10_2 !== null && rates.curve10_2 < 0 ? "yellow" : "green"}
        />

        {/* Credit Card */}
        <SummaryCard
          title="HY OAS"
          value={credit.hyOAS !== null ? `${credit.hyOAS.toFixed(2)}%` : "N/A"}
          subtitle={credit.hyOAS_8wChange !== null ? `8w: ${credit.hyOAS_8wChange > 0 ? "+" : ""}${credit.hyOAS_8wChange.toFixed(2)}%` : "8w: N/A"}
          color={credit.hyOAS !== null && credit.hyOAS >= 6.5 ? "red" : credit.hyOAS !== null && credit.hyOAS >= 5.0 ? "yellow" : "green"}
        />

        {/* Liquidity Card */}
        <SummaryCard
          title="Liquidity"
          value={`z=${liquidity.composite.toFixed(2)}`}
          subtitle={liquidity.walcl_13wChange !== null ? `Fed BS 13w: ${liquidity.walcl_13wChange > 0 ? "+" : ""}${(liquidity.walcl_13wChange / 1000).toFixed(0)}B` : "Fed BS: N/A"}
          color={liquidity.composite <= -1.25 ? "red" : liquidity.composite <= -0.75 ? "yellow" : liquidity.composite > 0 ? "green" : "blue"}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Indicators Table (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Composites Section */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Macro Composites</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <CompositePill label="Growth" value={composites.growth} />
              <CompositePill label="Inflation" value={composites.inflation} />
              <CompositePill label="Credit Stress" value={composites.creditStress} />
              <CompositePill label="Liquidity" value={composites.liquidityImpulse} />
              <CompositePill label="USD" value={composites.usdImpulse} />
            </div>
          </div>

          {/* Indicators by Category */}
          {Object.entries(indicatorsByCategory).map(([category, inds]) => (
            <IndicatorSection key={category} title={categoryTitle(category)} indicators={inds} />
          ))}
        </div>

        {/* Right Column: Alerts & Tilts */}
        <div className="space-y-6">
          {/* Alert Panel */}
          <div className={`rounded-lg border p-6 ${getAlertBorderStyle(alert.level)}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Alert Status</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getAlertBadgeStyle(alert.level)}`}>
                {alert.level}
              </span>
            </div>
            <ul className="space-y-2">
              {alert.reasons.map((reason, i) => (
                <li key={i} className="text-sm text-white/80 flex items-start">
                  <span className="mr-2 mt-0.5">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Regime Details */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Regime Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-white/60 text-sm">Classification</p>
                <p className="text-white font-semibold text-lg">{regime.regime}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${regime.confidence}%` }}
                    />
                  </div>
                  <span className="text-white text-sm font-medium">{regime.confidence}%</span>
                </div>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-2">Reasons</p>
                <ul className="space-y-1">
                  {regime.reasons.map((reason, i) => (
                    <li key={i} className="text-xs text-white/70 flex items-start">
                      <span className="mr-1">→</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Portfolio Tilts */}
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/30 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Suggested Tilts</h2>

            {/* Add */}
            <div className="mb-4">
              <p className="text-green-400 font-semibold text-sm mb-2">✓ ADD / INCREASE</p>
              <ul className="space-y-1">
                {tilts.add.map((item, i) => (
                  <li key={i} className="text-sm text-white/80 pl-4">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reduce */}
            <div className="mb-4">
              <p className="text-red-400 font-semibold text-sm mb-2">✗ REDUCE / AVOID</p>
              <ul className="space-y-1">
                {tilts.reduce.map((item, i) => (
                  <li key={i} className="text-sm text-white/80 pl-4">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Notes */}
            {tilts.notes.length > 0 && (
              <div className="mb-4 bg-white/5 rounded p-3">
                <p className="text-blue-300 font-semibold text-xs mb-2">NOTES</p>
                <ul className="space-y-1">
                  {tilts.notes.map((note, i) => (
                    <li key={i} className="text-xs text-white/70">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rebalance Hint */}
            <div className="bg-white/10 rounded p-3 border-l-4 border-yellow-400">
              <p className="text-xs text-white/90 font-mono">
                {tilts.rebalanceHint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Helper Components ===== */

function SummaryCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  color: string;
}) {
  const bgColor = {
    green: "from-green-900/30 to-green-800/20 border-green-500/30",
    yellow: "from-yellow-900/30 to-yellow-800/20 border-yellow-500/30",
    red: "from-red-900/30 to-red-800/20 border-red-500/30",
    blue: "from-blue-900/30 to-blue-800/20 border-blue-500/30",
    purple: "from-purple-900/30 to-purple-800/20 border-purple-500/30",
  }[color] || "from-gray-900/30 to-gray-800/20 border-gray-500/30";

  return (
    <div className={`bg-gradient-to-br ${bgColor} rounded-lg border p-4`}>
      <p className="text-white/60 text-xs font-medium mb-1">{title}</p>
      <p className="text-white text-lg font-bold mb-1">{value}</p>
      <p className="text-white/50 text-xs">{subtitle}</p>
    </div>
  );
}

function CompositePill({ label, value }: { label: string; value: number }) {
  const color = value >= 1 ? "text-red-400" : value >= 0.5 ? "text-yellow-400" : value >= -0.5 ? "text-green-400" : "text-blue-400";

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-3 text-center">
      <p className="text-white/60 text-xs mb-1">{label}</p>
      <p className={`font-bold ${color}`}>{value.toFixed(2)}</p>
    </div>
  );
}

function IndicatorSection({ title, indicators }: { title: string; indicators: MacroIndicator[] }) {
  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/60 font-medium pb-2 pr-4">Indicator</th>
              <th className="text-right text-white/60 font-medium pb-2 px-2">Latest</th>
              <th className="text-right text-white/60 font-medium pb-2 px-2">1m Δ</th>
              <th className="text-right text-white/60 font-medium pb-2 px-2">3m Δ</th>
              <th className="text-right text-white/60 font-medium pb-2 px-2">YoY</th>
              <th className="text-right text-white/60 font-medium pb-2 pl-2">z-score</th>
            </tr>
          </thead>
          <tbody>
            {indicators.map((ind) => (
              <tr key={ind.seriesId} className="border-b border-white/5">
                <td className="py-2 pr-4 text-white/90 font-medium">{ind.name}</td>
                <td className="py-2 px-2 text-right text-white/80">
                  {formatValue(ind.latest, ind.units)}
                </td>
                <td className={`py-2 px-2 text-right ${getDeltaColor(ind.delta1m)}`}>
                  {formatDelta(ind.delta1m)}
                </td>
                <td className={`py-2 px-2 text-right ${getDeltaColor(ind.delta3m)}`}>
                  {formatDelta(ind.delta3m)}
                </td>
                <td className="py-2 px-2 text-right text-white/70">
                  {ind.yoy !== null ? `${ind.yoy > 0 ? "+" : ""}${ind.yoy.toFixed(1)}%` : "—"}
                </td>
                <td className={`py-2 pl-2 text-right font-mono ${getZScoreColor(ind.zScore)}`}>
                  {ind.zScore !== null ? ind.zScore.toFixed(2) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===== Helper Functions ===== */

function categoryTitle(category: string): string {
  return {
    rates: "Rates & Curve",
    growth: "Growth Indicators",
    inflation: "Inflation Indicators",
    credit: "Credit & Stress",
    liquidity: "Liquidity Metrics",
    usd: "USD Metrics",
    market: "Market Indicators",
  }[category] || category;
}

function formatValue(value: number | null, units?: string): string {
  if (value === null) return "N/A";

  if (units === "%") return `${value.toFixed(2)}%`;
  if (units === "bps") return `${value.toFixed(0)}`;
  if (units?.includes("$B")) return `${(value / 1000).toFixed(1)}B`;

  return value.toFixed(2);
}

function formatDelta(delta: number | null): string {
  if (delta === null) return "—";
  const sign = delta > 0 ? "+" : "";
  return `${sign}${delta.toFixed(2)}`;
}

function getDeltaColor(delta: number | null): string {
  if (delta === null) return "text-white/50";
  if (Math.abs(delta) < 0.01) return "text-white/50";
  return delta > 0 ? "text-green-400" : "text-red-400";
}

function getZScoreColor(z: number | null): string {
  if (z === null) return "text-white/50";
  if (Math.abs(z) > 2) return "text-red-400";
  if (Math.abs(z) > 1) return "text-yellow-400";
  return "text-green-400";
}

function getRegimeColor(regime: string): string {
  return {
    "Risk-On": "green",
    "Risk-Off": "red",
    Inflationary: "yellow",
    Deflationary: "blue",
    Mixed: "purple",
  }[regime] || "blue";
}

function getAlertColor(level: string): string {
  return {
    GREEN: "green",
    YELLOW: "yellow",
    RED: "red",
  }[level] || "blue";
}

function getAlertBorderStyle(level: string): string {
  return {
    GREEN: "bg-green-900/20 border-green-500/30",
    YELLOW: "bg-yellow-900/20 border-yellow-500/30",
    RED: "bg-red-900/20 border-red-500/30",
  }[level] || "bg-gray-900/20 border-gray-500/30";
}

function getAlertBadgeStyle(level: string): string {
  return {
    GREEN: "bg-green-600 text-white",
    YELLOW: "bg-yellow-600 text-white",
    RED: "bg-red-600 text-white",
  }[level] || "bg-gray-600 text-white";
}
