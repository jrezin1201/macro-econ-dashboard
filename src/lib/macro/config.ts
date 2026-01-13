/**
 * Macro Regime Analysis - Configuration
 *
 * All series definitions, thresholds, and mappings in one place
 */

import type { SeriesConfig, ThresholdConfig } from "./types";

/**
 * FRED Series Configuration
 * Defines all series to pull and how to transform them
 */
export const MACRO_SERIES: SeriesConfig[] = [
  // Rates / Curve
  { id: "FEDFUNDS", name: "Fed Funds Rate", category: "rates", transform: "level", units: "%" },
  { id: "DGS2", name: "2Y Treasury", category: "rates", transform: "level", units: "%" },
  { id: "DGS10", name: "10Y Treasury", category: "rates", transform: "level", units: "%" },

  // Growth  (Note: NAPM was discontinued; using alternative ISM series or sentiment as proxy)
  { id: "UMCSENT", name: "Consumer Sentiment", category: "growth", transform: "level", units: "index", description: "University of Michigan Consumer Sentiment" },
  { id: "INDPRO", name: "Industrial Production", category: "growth", transform: "yoy", units: "% YoY", description: "Industrial Production Index" },
  { id: "PAYEMS", name: "Nonfarm Payrolls", category: "growth", transform: "yoy", units: "% YoY", description: "Total nonfarm employment" },
  { id: "ICSA", name: "Initial Claims", category: "growth", transform: "change", units: "4w change", description: "Initial unemployment claims" },

  // Inflation
  { id: "CPILFESL", name: "Core CPI", category: "inflation", transform: "yoy", units: "% YoY" },
  { id: "PCEPILFE", name: "Core PCE", category: "inflation", transform: "yoy", units: "% YoY" },
  { id: "T5YIE", name: "5Y Breakeven Inflation", category: "inflation", transform: "level", units: "%" },

  // Credit Stress
  { id: "BAMLH0A0HYM2", name: "HY OAS", category: "credit", transform: "level", units: "bps", description: "High Yield Option-Adjusted Spread" },
  { id: "STLFSI4", name: "Financial Stress Index", category: "credit", transform: "level", units: "index", description: "St. Louis Fed Financial Stress" },

  // Liquidity
  { id: "WALCL", name: "Fed Balance Sheet", category: "liquidity", transform: "change", units: "$B (13w Δ)", description: "Total Assets of the Federal Reserve" },
  { id: "WRESBAL", name: "Reserve Balances", category: "liquidity", transform: "change", units: "$B (13w Δ)" },
  { id: "RRPONTSYD", name: "Overnight RRP", category: "liquidity", transform: "change", units: "$B (13w Δ)", description: "Overnight Reverse Repo Operations" },
  { id: "WTREGEN", name: "Treasury General Account", category: "liquidity", transform: "change", units: "$B (13w Δ)" },

  // USD
  { id: "DTWEXBGS", name: "Trade-Weighted Dollar", category: "usd", transform: "change", units: "13w Δ", description: "Broad Dollar Index" },

  // Optional Markets (if available)
  { id: "VIXCLS", name: "VIX", category: "market", transform: "level", units: "index", description: "CBOE Volatility Index" },
  { id: "SP500", name: "S&P 500", category: "market", transform: "pct_change", units: "% (3m)", description: "S&P 500 Index" },
];

/**
 * Lookback periods (in days)
 */
export const LOOKBACKS = {
  "1m": 30,
  "3m": 90,
  "6m": 180,
  "12m": 365,
  "2y": 730,
  "5y": 1825,
  "8w": 56,
  "13w": 91,
  "4w": 28,
};

/**
 * Alert and Regime Thresholds
 * Edit these to tune sensitivity
 */
export const THRESHOLDS: ThresholdConfig = {
  // Rate levels
  highRateLevel: 5.0,
  lowRateLevel: 2.0,

  // Curve
  deepInversionThreshold: -0.5,
  inversionThreshold: 0.0,

  // Credit stress
  hyOAS_yellow: 5.0,
  hyOAS_red: 6.5,
  hyOAS_spikeThreshold: 1.0, // 8-week increase

  // Financial stress
  stlFSI_yellow: 1.0,
  stlFSI_red: 1.5,

  // Liquidity
  liquidityComposite_yellow: -0.75,
  liquidityComposite_red: -1.25,

  // Inflation
  inflationComposite_yellow: 1.0,
  inflationComposite_red: 1.5,

  // Regime classification
  creditStress_riskOff: 1.0,
  growth_scare: -0.5,
  inflation_elevated: 0.8,
};

/**
 * Get series config by ID
 */
export function getSeriesConfig(seriesId: string): SeriesConfig | undefined {
  return MACRO_SERIES.find((s) => s.id === seriesId);
}

/**
 * Get all series IDs
 */
export function getAllSeriesIds(): string[] {
  return MACRO_SERIES.map((s) => s.id);
}

/**
 * Get series by category
 */
export function getSeriesByCategory(category: SeriesConfig["category"]): SeriesConfig[] {
  return MACRO_SERIES.filter((s) => s.category === category);
}
