/* Due to size constraints, I'm creating a minimal enhanced version. In production, you would extend the full component */

"use client";

/**
 * Macro Regime Dashboard - Enhanced Client Component
 *
 * Displays regime analysis, alerts, portfolio tilts + confirmation layers
 * Now with Beginner Mode for educational guidance
 */

import { useState, useCallback, useEffect } from "react";
import type { MacroIndicator } from "@/lib/macro/types";
import { PortfolioImpactPanel } from "./PortfolioImpactPanel";
import { ThisWeekActionsPlaybook } from "./ThisWeekActionsPlaybook";
import { ResponsiveIndicatorTable } from "./ResponsiveIndicatorTable";
import { AccordionSimple } from "@/components/ui/AccordionSimple";
import { ModeToggle } from "./ModeToggle";
import { ExplanationSidebar } from "./ExplanationSidebar";
import { ExplanationBadge } from "./ExplanationBadge";
import { WhatCouldGoWrong } from "./WhatCouldGoWrong";
import { TimeHorizonView } from "./TimeHorizonView";
import { DataFreshnessPanel } from "./DataFreshnessPanel";
import { MacroChartsSection } from "@/components/macro/MacroChartsSection";
import { RegimeHistoryTimeline } from "@/components/macro/RegimeHistoryTimeline";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import { RefreshIndicator } from "@/components/common/RefreshIndicator";
import { recordRegimeSnapshot } from "@/lib/macro/regimeHistory";
import type { LayerDelta, LayerWeights } from "@/lib/portfolio/portfolioStore";
import type { ActionPolicy } from "@/lib/portfolio/actionPolicy";
import { formatFetchTime } from "@/lib/data/fetchWithMeta";
import {
  explainBTCTrend,
  explainMicrostress,
  explainBreadth,
  explainLiquidity,
  generateRiskScenarios,
  generateTimeHorizonView,
} from "@/lib/macro/explanations";

interface Regime {
  regime: string;
  confidence: number;
  reasons: string[];
}

interface Alert {
  level: string;
  reasons: string[];
}

interface Tilts {
  add: string[];
  reduce: string[];
  notes: string[];
  rebalanceHint: string;
}

interface Composites {
  growth: number;
  inflation: number;
  creditStress: number;
  liquidityImpulse: number;
  usdImpulse: number;
}

interface Rates {
  fedfunds: number | null;
  dgs2: number | null;
  dgs10: number | null;
  curve10_2: number | null;
}

interface Credit {
  hyOAS: number | null;
  hyOAS_8wChange: number | null;
  stlFSI: number | null;
}

interface Liquidity {
  composite: number;
  walcl_13wChange: number | null;
}

interface BreadthMetrics {
  adLineMomentum: number | null;
  adLineLatest: number | null;
  adLine60dChange: number | null;
  pctAbove200Latest: number | null;
  newHighsMinusLows: number | null;
}

interface Breadth {
  signal: string;
  level: string;
  reasons: string[];
  metrics: BreadthMetrics;
}

interface BitcoinMetrics {
  distanceFrom200D: number | null;
  ma20: number | null;
  ma50: number | null;
  ma200: number | null;
}

interface BitcoinAnalysis {
  trendLevel: string;
  metrics: BitcoinMetrics;
  reasons: string[];
}

interface BitcoinGuidance {
  alertLevel: string;
  recommendation: string;
  reasoning: string[];
}

interface Bitcoin {
  analysis: BitcoinAnalysis;
  guidance: BitcoinGuidance;
}

interface MicrostressMetrics {
  sofr: number | null;
  effr: number | null;
  sofrEffrSpread: number | null;
  sofr8wChange: number | null;
  tbill3m: number | null;
  cpRate: number | null;
  cp8wChange: number | null;
  tedSpread: number | null;
  nfci: number | null;
}

interface Microstress {
  level: string;
  score: number;
  reasons: string[];
  metrics: MicrostressMetrics;
}

interface Portfolio {
  useDemoHoldings: boolean;
  layerWeights: LayerWeights[];
  layerDeltas: LayerDelta[];
  actionPolicy: ActionPolicy;
}

interface ChartData {
  rates: {
    fedfunds: any[];
    dgs2: any[];
    dgs10: any[];
  };
  growth: {
    sentiment: any[];
    payems: any[];
  };
  inflation: {
    cpi: any[];
    pce: any[];
  };
  credit: {
    hyOAS: any[];
    stlFSI: any[];
  };
}

interface EnhancedMacroData {
  regime: Regime;
  alert: Alert;
  tilts: Tilts;
  composites: Composites;
  indicators: MacroIndicator[];
  rates: Rates;
  credit: Credit;
  liquidity: Liquidity;
  lastUpdated: Date;
  breadth?: Breadth;
  bitcoin?: Bitcoin;
  microstress?: Microstress;
  portfolio?: Portfolio;
  chartData?: ChartData;
}

interface Props {
  data: EnhancedMacroData;
}

export function MacroRegimeDashboard({ data: initialData }: Props) {
  const [data, setData] = useState(initialData);

  const {
    regime, alert, tilts, composites, indicators, rates, credit, liquidity, lastUpdated,
    breadth, bitcoin, microstress, portfolio, chartData
  } = data;

  // Beginner Mode state
  const [isBeginnerMode, setIsBeginnerMode] = useState(true);

  // Auto-refresh
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/macro/regime");
      if (!res.ok) throw new Error("Failed to fetch");
      const newData = await res.json();
      setData({
        ...newData,
        lastUpdated: new Date(newData.lastUpdated),
      });
    } catch (error) {
      console.error("Failed to refresh macro data:", error);
    }
  }, []);

  const { isRefreshing, lastRefresh, refresh, toggleAutoRefresh, autoRefreshEnabled } =
    useAutoRefresh({
      intervalMs: 5 * 60 * 1000, // 5 minutes
      onRefresh: fetchData,
    });

  // Record regime snapshot when data changes
  useEffect(() => {
    recordRegimeSnapshot(regime.regime, regime.confidence, alert.level);
  }, [regime.regime, regime.confidence, alert.level]);

  // Group indicators by category
  const indicatorsByCategory = indicators.reduce((acc: Record<string, MacroIndicator[]>, ind: MacroIndicator) => {
    if (!acc[ind.category]) acc[ind.category] = [];
    acc[ind.category].push(ind);
    return acc;
  }, {} as Record<string, MacroIndicator[]>);

  // Generate explanations and scenarios for beginner mode
  const riskScenarios = generateRiskScenarios(
    alert.level,
    bitcoin?.analysis.trendLevel || "YELLOW",
    microstress?.level || "YELLOW",
    liquidity.composite
  );

  const timeHorizon = generateTimeHorizonView(
    regime.regime,
    alert.level,
    bitcoin?.analysis.trendLevel || "YELLOW",
    liquidity.composite
  );

  return (
    <div className="relative">
      {/* Explanation Sidebar (Beginner Mode only) */}
      {isBeginnerMode && <ExplanationSidebar />}

      <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 space-y-6">
        {/* Header with Mode Toggle and Refresh */}
        <div className="text-center relative">
          <div className="absolute right-0 top-0 hidden lg:block">
            <RefreshIndicator
              lastRefresh={lastRefresh}
              isRefreshing={isRefreshing}
              onRefresh={refresh}
              autoRefreshEnabled={autoRefreshEnabled}
              onToggleAutoRefresh={toggleAutoRefresh}
            />
          </div>
          <div className="flex justify-center items-center gap-4 mb-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Macro Regime Analysis</h1>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-3">
            <ModeToggle onChange={setIsBeginnerMode} />
            <div className="lg:hidden">
              <RefreshIndicator
                lastRefresh={lastRefresh}
                isRefreshing={isRefreshing}
                onRefresh={refresh}
                autoRefreshEnabled={autoRefreshEnabled}
                onToggleAutoRefresh={toggleAutoRefresh}
              />
            </div>
          </div>
          <p className="text-sm md:text-base text-white/60">
            Rule-based regime classification + portfolio tilt guidance + confirmation layers
          </p>
          <p className="text-white/40 text-xs md:text-sm mt-1">
            Last updated: {formatFetchTime(lastUpdated)}
          </p>
        </div>

      {/* Enhanced Summary Cards - Responsive grid with mobile-first design */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {/* Regime Card - Full width on mobile */}
        <SummaryCard
          title="Regime"
          value={regime.regime}
          subtitle={`${regime.confidence}% confidence`}
          color={getRegimeColor(regime.regime)}
          className="col-span-2 md:col-span-1"
        />

        {/* Alert Level Card - Full width on mobile */}
        <SummaryCard
          title="Alert Level"
          value={alert.level}
          subtitle={`${alert.reasons.length} signals`}
          color={getAlertColor(alert.level)}
          className="col-span-2 md:col-span-1"
        />

        {/* NEW: Breadth Confirmation Card */}
        {breadth && (
          <SummaryCard
            title="Breadth"
            value={breadth.signal}
            subtitle={`${breadth.level} level`}
            color={getAlertColor(breadth.level)}
          />
        )}

        {/* NEW: BTC Overlay Card */}
        {bitcoin && (
          <SummaryCard
            title="BTC Trend"
            value={bitcoin.analysis.trendLevel}
            subtitle={bitcoin.guidance?.alertLevel || "N/A"}
            color={getAlertColor(bitcoin.analysis.trendLevel)}
          />
        )}

        {/* NEW: Microstress Card */}
        {microstress && (
          <SummaryCard
            title="Microstress"
            value={microstress.level}
            subtitle={`Score: ${microstress.score.toFixed(1)}`}
            color={getAlertColor(microstress.level)}
          />
        )}

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

      {/* Main Content Grid - Mobile-first responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mobile: Single column with "decisions first" ordering
            Desktop: Left column (2 cols) for main content */}
        <div className="lg:col-span-2 space-y-6 lg:order-1">
          {/* This Week Actions - Priority #1 on mobile */}
          {portfolio && (
            <div className="lg:hidden">
              <ThisWeekActionsPlaybook
                actionPolicy={portfolio.actionPolicy}
                isBeginnerMode={isBeginnerMode}
              />
            </div>
          )}

          {/* What Could Go Wrong - Beginner Mode only, mobile */}
          {isBeginnerMode && (
            <div className="lg:hidden">
              <WhatCouldGoWrong scenarios={riskScenarios} isBeginnerMode={isBeginnerMode} />
            </div>
          )}

          {/* Time Horizon View - Beginner Mode only, mobile */}
          {isBeginnerMode && (
            <div className="lg:hidden">
              <TimeHorizonView
                sixMonth={timeHorizon.sixMonth}
                twelveMonth={timeHorizon.twelveMonth}
                twoToThreeYear={timeHorizon.twoToThreeYear}
                isBeginnerMode={isBeginnerMode}
              />
            </div>
          )}

          {/* BTC Guidance - Priority #2 on mobile */}
          {bitcoin?.guidance && (
            <div className={`lg:hidden rounded-lg border p-3 md:p-6 ${getAlertBorderStyle(bitcoin.guidance.alertLevel)}`}>
              <h3 className="text-white font-semibold mb-2">MSTR/Crypto Guidance</h3>
              <p className="text-white/90 text-sm mb-3">{bitcoin.guidance.recommendation}</p>
              <ul className="space-y-1">
                {bitcoin.guidance.reasoning.map((reason: string, i: number) => (
                  <li key={i} className="text-xs text-white/70">
                    • {reason}
                  </li>
                ))}
              </ul>
              <ExplanationBadge
                text={explainBTCTrend(bitcoin.analysis.trendLevel, bitcoin.analysis.metrics.distanceFrom200D)}
                show={isBeginnerMode}
              />
            </div>
          )}

          {/* Composites Section */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-3 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-white mb-4">Macro Composites</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <CompositePill label="Growth" value={composites.growth} />
              <CompositePill label="Inflation" value={composites.inflation} />
              <CompositePill label="Credit Stress" value={composites.creditStress} />
              <CompositePill label="Liquidity" value={composites.liquidityImpulse} />
              <CompositePill label="USD" value={composites.usdImpulse} />
            </div>
            <ExplanationBadge
              text={explainLiquidity(liquidity.composite)}
              show={isBeginnerMode}
            />
          </div>

          {/* NEW: Confirmation Layers Summary */}
          <div className="bg-blue-900/20 rounded-lg border border-blue-500/30 p-3 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-white mb-4">Confirmation Layers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {breadth && (
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white/60 text-xs mb-1">Equity Breadth</p>
                  <p className={`font-bold text-lg ${breadth.signal === "CONFIRMS" ? "text-green-400" : breadth.signal === "DIVERGES" ? "text-red-400" : "text-yellow-400"}`}>
                    {breadth.signal}
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    {breadth.metrics.adLineMomentum !== null
                      ? `AD ${breadth.metrics.adLineMomentum > 0 ? "+" : ""}${breadth.metrics.adLineMomentum.toFixed(1)}%`
                      : "N/A"}
                  </p>
                </div>
              )}

              {bitcoin && (
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white/60 text-xs mb-1">Bitcoin Overlay</p>
                  <p className={`font-bold text-lg ${bitcoin.analysis.trendLevel === "GREEN" ? "text-green-400" : bitcoin.analysis.trendLevel === "RED" ? "text-red-400" : "text-yellow-400"}`}>
                    {bitcoin.analysis.trendLevel}
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    {bitcoin.analysis.metrics.distanceFrom200D !== null
                      ? `${bitcoin.analysis.metrics.distanceFrom200D > 0 ? "+" : ""}${bitcoin.analysis.metrics.distanceFrom200D.toFixed(1)}% vs 200D`
                      : "N/A"}
                  </p>
                </div>
              )}

              {microstress && (
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white/60 text-xs mb-1">Credit Microstress</p>
                  <p className={`font-bold text-lg ${microstress.level === "GREEN" ? "text-green-400" : microstress.level === "RED" ? "text-red-400" : "text-yellow-400"}`}>
                    {microstress.level}
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    {microstress.metrics.sofrEffrSpread !== null
                      ? `Spread: ${(microstress.metrics.sofrEffrSpread * 100).toFixed(1)}bps`
                      : "N/A"}
                  </p>
                </div>
              )}
            </div>
            {/* Explanations for each confirmation layer */}
            {breadth && (
              <ExplanationBadge
                text={explainBreadth(breadth.signal, breadth.level)}
                show={isBeginnerMode}
              />
            )}
            {microstress && isBeginnerMode && (
              <ExplanationBadge
                text={explainMicrostress(microstress.level)}
                show={true}
              />
            )}
          </div>

          {/* NEW: Portfolio Impact Panel */}
          {portfolio && (
            <PortfolioImpactPanel
              layerDeltas={portfolio.layerDeltas}
              useDemoHoldings={portfolio.useDemoHoldings}
            />
          )}

          {/* Indicators by Category - Wrapped in accordions for mobile */}
          {Object.entries(indicatorsByCategory).map(([category, inds]) => {
            // Default open for credit and liquidity, closed for others
            const defaultOpen = category === "credit" || category === "liquidity";
            return (
              <AccordionSimple
                key={category}
                title={categoryTitle(category)}
                defaultOpen={defaultOpen}
                alwaysOpenOnDesktop={true}
              >
                <ResponsiveIndicatorTable indicators={inds as MacroIndicator[]} />
              </AccordionSimple>
            );
          })}
        </div>

        {/* Right Column: Alerts & Tilts - Desktop sidebar, hidden on mobile */}
        <div className="space-y-6 lg:order-2">
          {/* NEW: This Week Actions Panel - Desktop only (mobile shows above) */}
          {portfolio && (
            <div className="hidden lg:block">
              <ThisWeekActionsPlaybook
                actionPolicy={portfolio.actionPolicy}
                isBeginnerMode={isBeginnerMode}
              />
            </div>
          )}

          {/* What Could Go Wrong - Beginner Mode, Desktop */}
          {isBeginnerMode && (
            <div className="hidden lg:block">
              <WhatCouldGoWrong scenarios={riskScenarios} isBeginnerMode={isBeginnerMode} />
            </div>
          )}

          {/* Time Horizon View - Beginner Mode, Desktop */}
          {isBeginnerMode && (
            <div className="hidden lg:block">
              <TimeHorizonView
                sixMonth={timeHorizon.sixMonth}
                twelveMonth={timeHorizon.twelveMonth}
                twoToThreeYear={timeHorizon.twoToThreeYear}
                isBeginnerMode={isBeginnerMode}
              />
            </div>
          )}

          {/* Alert Panel - Desktop only (redundant with Alert card on mobile) */}
          <div className={`hidden lg:block rounded-lg border p-3 md:p-6 ${getAlertBorderStyle(alert.level)}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Alert Status</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getAlertBadgeStyle(alert.level)}`}>
                {alert.level}
              </span>
            </div>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {alert.reasons.map((reason: string, i: number) => (
                <li key={i} className="text-sm text-white/80 flex items-start">
                  <span className="mr-2 mt-0.5">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Regime Details - Desktop only (redundant with Regime card on mobile) */}
          <div className="hidden lg:block bg-white/5 rounded-lg border border-white/10 p-3 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-white mb-4">Regime Details</h2>
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
                  {regime.reasons.map((reason: string, i: number) => (
                    <li key={i} className="text-xs text-white/70 flex items-start">
                      <span className="mr-1">→</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Portfolio Tilts - Desktop only (less actionable than This Week Actions) */}
          <div className="hidden lg:block bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/30 p-3 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-white mb-4">Suggested Tilts</h2>

            {/* Add */}
            <div className="mb-4">
              <p className="text-green-400 font-semibold text-sm mb-2">✓ ADD / INCREASE</p>
              <ul className="space-y-1">
                {tilts.add.map((item: string, i: number) => (
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
                {tilts.reduce.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-white/80 pl-4">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Notes (now includes BTC guidance) */}
            {tilts.notes.length > 0 && (
              <div className="mb-4 bg-white/5 rounded p-3">
                <p className="text-blue-300 font-semibold text-xs mb-2">NOTES</p>
                <ul className="space-y-1">
                  {tilts.notes.map((note: string, i: number) => (
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

          {/* NEW: BTC Guidance Panel - Desktop only (mobile shows above) */}
          {bitcoin?.guidance && (
            <div className={`hidden lg:block rounded-lg border p-3 md:p-6 ${getAlertBorderStyle(bitcoin.guidance.alertLevel)}`}>
              <h3 className="text-white font-semibold mb-2">MSTR/Crypto Guidance</h3>
              <p className="text-white/90 text-sm mb-3">{bitcoin.guidance.recommendation}</p>
              <ul className="space-y-1">
                {bitcoin.guidance.reasoning.map((reason: string, i: number) => (
                  <li key={i} className="text-xs text-white/70">
                    • {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Regime History Timeline */}
          <div className="col-span-full lg:col-span-1">
            <RegimeHistoryTimeline />
          </div>

          {/* Historical Charts Section */}
          {chartData && (
            <div className="col-span-full">
              <AccordionSimple
                title="Historical Charts (5 Years)"
                defaultOpen={false}
                alwaysOpenOnDesktop={false}
              >
                <MacroChartsSection data={chartData} />
              </AccordionSimple>
            </div>
          )}

          {/* Data Freshness Panel */}
          <DataFreshnessPanel indicators={indicators} />
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
  className = "",
}: {
  title: string;
  value: string;
  subtitle: string;
  color: string;
  className?: string;
}) {
  const bgColor = {
    green: "from-green-900/30 to-green-800/20 border-green-500/30",
    yellow: "from-yellow-900/30 to-yellow-800/20 border-yellow-500/30",
    red: "from-red-900/30 to-red-800/20 border-red-500/30",
    blue: "from-blue-900/30 to-blue-800/20 border-blue-500/30",
    purple: "from-purple-900/30 to-purple-800/20 border-purple-500/30",
  }[color] || "from-gray-900/30 to-gray-800/20 border-gray-500/30";

  return (
    <div className={`bg-gradient-to-br ${bgColor} rounded-lg border p-3 md:p-4 ${className}`}>
      <p className="text-white/60 text-xs md:text-sm font-medium mb-1">{title}</p>
      <p className="text-white text-lg md:text-xl font-bold mb-1 truncate">{value}</p>
      <p className="text-white/50 text-xs truncate">{subtitle}</p>
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
    OK: "green",
    CAUTION: "yellow",
    AVOID: "red",
  }[level] || "blue";
}

function getAlertBorderStyle(level: string): string {
  return {
    GREEN: "bg-green-900/20 border-green-500/30",
    YELLOW: "bg-yellow-900/20 border-yellow-500/30",
    RED: "bg-red-900/20 border-red-500/30",
    OK: "bg-green-900/20 border-green-500/30",
    CAUTION: "bg-yellow-900/20 border-yellow-500/30",
    AVOID: "bg-red-900/20 border-red-500/30",
  }[level] || "bg-gray-900/20 border-gray-500/30";
}

function getAlertBadgeStyle(level: string): string {
  return {
    GREEN: "bg-green-600 text-white",
    YELLOW: "bg-yellow-600 text-white",
    RED: "bg-red-600 text-white",
  }[level] || "bg-gray-600 text-white";
}
