/**
 * Portfolio Configuration
 *
 * Defines the 5-layer portfolio model, target allocations, and asset classifications.
 * All thresholds are tunable here - no magic numbers in the code.
 */

// ===== LAYER DEFINITIONS =====

export type PortfolioLayer =
  | "VOLATILITY_ASYMMETRY"
  | "GROWTH_EQUITY"
  | "CASHFLOW_EQUITY"
  | "HARD_ASSET_HEDGE"
  | "STABILITY_DRY_POWDER";

export interface LayerTarget {
  layer: PortfolioLayer;
  min: number;      // Minimum acceptable allocation %
  target: number;   // Target midpoint %
  max: number;      // Maximum acceptable allocation %
  description: string;
}

export const LAYER_TARGETS: LayerTarget[] = [
  {
    layer: "VOLATILITY_ASYMMETRY",
    min: 25,
    target: 30,
    max: 35,
    description: "MSTR, crypto, options - high beta asymmetric bets",
  },
  {
    layer: "GROWTH_EQUITY",
    min: 20,
    target: 22.5,
    max: 25,
    description: "QQQ, mega-cap growth, semiconductors, software",
  },
  {
    layer: "CASHFLOW_EQUITY",
    min: 20,
    target: 22.5,
    max: 25,
    description: "Staples, healthcare, defense, quality value",
  },
  {
    layer: "HARD_ASSET_HEDGE",
    min: 10,
    target: 12.5,
    max: 15,
    description: "Energy, commodities, REITs, infrastructure",
  },
  {
    layer: "STABILITY_DRY_POWDER",
    min: 10,
    target: 12.5,
    max: 15,
    description: "T-bills, short duration, cash",
  },
];

// ===== ASSET CLASSIFICATION =====

export const TICKER_TO_LAYER: Record<string, PortfolioLayer> = {
  // VOLATILITY_ASYMMETRY: Bitcoin, crypto, high-beta
  "MSTR": "VOLATILITY_ASYMMETRY",
  "COIN": "VOLATILITY_ASYMMETRY",
  "BTC": "VOLATILITY_ASYMMETRY",
  "BTCUSD": "VOLATILITY_ASYMMETRY",

  // GROWTH_EQUITY: Tech, mega-cap growth, semis
  "QQQ": "GROWTH_EQUITY",
  "QQQM": "GROWTH_EQUITY",
  "SPYG": "GROWTH_EQUITY",
  "NVDA": "GROWTH_EQUITY",
  "META": "GROWTH_EQUITY",
  "AMZN": "GROWTH_EQUITY",
  "MSFT": "GROWTH_EQUITY",
  "GOOGL": "GROWTH_EQUITY",
  "GOOG": "GROWTH_EQUITY",
  "AAPL": "GROWTH_EQUITY",
  "TSLA": "GROWTH_EQUITY",
  "TSM": "GROWTH_EQUITY",
  "AVGO": "GROWTH_EQUITY",
  "AMD": "GROWTH_EQUITY",
  "NFLX": "GROWTH_EQUITY",
  "CRM": "GROWTH_EQUITY",
  "ADBE": "GROWTH_EQUITY",

  // CASHFLOW_EQUITY: Staples, healthcare, defense, quality
  "KO": "CASHFLOW_EQUITY",
  "PG": "CASHFLOW_EQUITY",
  "UNH": "CASHFLOW_EQUITY",
  "JNJ": "CASHFLOW_EQUITY",
  "BRK.B": "CASHFLOW_EQUITY",
  "BRKB": "CASHFLOW_EQUITY",
  "BSX": "CASHFLOW_EQUITY",
  "LMT": "CASHFLOW_EQUITY",
  "RTX": "CASHFLOW_EQUITY",
  "JPM": "CASHFLOW_EQUITY",
  "V": "CASHFLOW_EQUITY",
  "MA": "CASHFLOW_EQUITY",
  "WMT": "CASHFLOW_EQUITY",
  "HD": "CASHFLOW_EQUITY",
  "MCD": "CASHFLOW_EQUITY",
  "ABT": "CASHFLOW_EQUITY",

  // HARD_ASSET_HEDGE: Energy, commodities, REITs
  "XOM": "HARD_ASSET_HEDGE",
  "CVX": "HARD_ASSET_HEDGE",
  "COP": "HARD_ASSET_HEDGE",
  "GLD": "HARD_ASSET_HEDGE",
  "IAU": "HARD_ASSET_HEDGE",
  "SLV": "HARD_ASSET_HEDGE",
  "DBC": "HARD_ASSET_HEDGE",
  "VNQ": "HARD_ASSET_HEDGE",
  "O": "HARD_ASSET_HEDGE",
  "PAVE": "HARD_ASSET_HEDGE",
  "XLE": "HARD_ASSET_HEDGE",
  "FCX": "HARD_ASSET_HEDGE",

  // STABILITY_DRY_POWDER: Cash, short duration
  "SGOV": "STABILITY_DRY_POWDER",
  "BIL": "STABILITY_DRY_POWDER",
  "SHY": "STABILITY_DRY_POWDER",
  "JPST": "STABILITY_DRY_POWDER",
  "CASH": "STABILITY_DRY_POWDER",
  "SPAXX": "STABILITY_DRY_POWDER", // Fidelity money market
  "VMFXX": "STABILITY_DRY_POWDER", // Vanguard money market
};

// ===== DEMO PORTFOLIO (Jordan's Holdings) =====

export interface Holding {
  ticker: string;
  accountType: "401K" | "TAXABLE" | "ROTH";
  weightPct: number;
}

export const DEMO_HOLDINGS: Holding[] = [
  // VOLATILITY_ASYMMETRY (30%)
  { ticker: "MSTR", accountType: "TAXABLE", weightPct: 20 },
  { ticker: "COIN", accountType: "TAXABLE", weightPct: 10 },

  // GROWTH_EQUITY (22.5%)
  { ticker: "QQQ", accountType: "401K", weightPct: 8 },
  { ticker: "NVDA", accountType: "TAXABLE", weightPct: 5 },
  { ticker: "MSFT", accountType: "ROTH", weightPct: 4 },
  { ticker: "AMZN", accountType: "TAXABLE", weightPct: 3 },
  { ticker: "META", accountType: "TAXABLE", weightPct: 2.5 },

  // CASHFLOW_EQUITY (22.5%)
  { ticker: "JPM", accountType: "TAXABLE", weightPct: 5 },
  { ticker: "UNH", accountType: "401K", weightPct: 4 },
  { ticker: "KO", accountType: "ROTH", weightPct: 3.5 },
  { ticker: "PG", accountType: "ROTH", weightPct: 3 },
  { ticker: "BRK.B", accountType: "TAXABLE", weightPct: 4 },
  { ticker: "LMT", accountType: "TAXABLE", weightPct: 3 },

  // HARD_ASSET_HEDGE (12.5%)
  { ticker: "XOM", accountType: "TAXABLE", weightPct: 5 },
  { ticker: "GLD", accountType: "TAXABLE", weightPct: 4 },
  { ticker: "VNQ", accountType: "ROTH", weightPct: 3.5 },

  // STABILITY_DRY_POWDER (12.5%)
  { ticker: "SGOV", accountType: "TAXABLE", weightPct: 7 },
  { ticker: "CASH", accountType: "TAXABLE", weightPct: 5.5 },
];

// ===== EXAMPLE TICKERS BY LAYER =====

export const LAYER_EXAMPLE_TICKERS: Record<PortfolioLayer, string[]> = {
  VOLATILITY_ASYMMETRY: ["MSTR", "COIN", "BTC"],
  GROWTH_EQUITY: ["QQQM", "NVDA", "TSM", "MSFT", "META", "AMZN"],
  CASHFLOW_EQUITY: ["UNH", "PG", "KO", "JPM", "BRK.B", "LMT", "RTX"],
  HARD_ASSET_HEDGE: ["XOM", "CVX", "GLD", "DBC", "VNQ", "O"],
  STABILITY_DRY_POWDER: ["SGOV", "BIL", "SHY", "JPST"],
};

// ===== LAYER METADATA =====

export interface LayerMetadata {
  layer: PortfolioLayer;
  shortName: string;
  color: string; // Tailwind color for UI
}

export const LAYER_METADATA: Record<PortfolioLayer, LayerMetadata> = {
  VOLATILITY_ASYMMETRY: {
    layer: "VOLATILITY_ASYMMETRY",
    shortName: "Volatility/Asymmetry",
    color: "purple",
  },
  GROWTH_EQUITY: {
    layer: "GROWTH_EQUITY",
    shortName: "Growth Equity",
    color: "blue",
  },
  CASHFLOW_EQUITY: {
    layer: "CASHFLOW_EQUITY",
    shortName: "Cashflow Equity",
    color: "green",
  },
  HARD_ASSET_HEDGE: {
    layer: "HARD_ASSET_HEDGE",
    shortName: "Hard Asset Hedge",
    color: "yellow",
  },
  STABILITY_DRY_POWDER: {
    layer: "STABILITY_DRY_POWDER",
    shortName: "Stability/Dry Powder",
    color: "gray",
  },
};
