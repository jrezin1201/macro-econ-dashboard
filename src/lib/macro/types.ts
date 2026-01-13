/**
 * Macro Regime Analysis - Type Definitions
 */

export interface TimeSeriesDataPoint {
  date: Date;
  value: number;
  dateString: string;
}

export interface SeriesConfig {
  id: string;
  name: string;
  category: "rates" | "growth" | "inflation" | "credit" | "liquidity" | "usd" | "market";
  transform: "level" | "change" | "pct_change" | "yoy";
  units?: string;
  description?: string;
}

export interface MacroComposites {
  growth: number;
  inflation: number;
  creditStress: number;
  liquidityImpulse: number;
  usdImpulse: number;
}

export type RegimeType = "Risk-On" | "Risk-Off" | "Inflationary" | "Deflationary" | "Mixed";

export interface RegimeClassification {
  regime: RegimeType;
  confidence: number; // 0-100
  reasons: string[];
}

export type AlertLevel = "GREEN" | "YELLOW" | "RED";

export interface AlertInfo {
  level: AlertLevel;
  reasons: string[];
  timestamp: Date;
}

export interface PortfolioTilt {
  add: string[];
  reduce: string[];
  notes: string[];
  rebalanceHint: string;
}

export interface MacroIndicator {
  seriesId: string;
  name: string;
  category: string;
  latest: number | null;
  delta1m: number | null;
  delta3m: number | null;
  yoy: number | null;
  zScore: number | null;
  status: "green" | "yellow" | "red" | "neutral";
  units?: string;
}

export interface MacroRegimeData {
  regime: RegimeClassification;
  alert: AlertInfo;
  tilts: PortfolioTilt;
  composites: MacroComposites;
  indicators: MacroIndicator[];
  lastUpdated: Date;

  // Key rates for summary cards
  rates: {
    fedfunds: number | null;
    dgs2: number | null;
    dgs10: number | null;
    curve10_2: number | null;
  };

  // Credit metrics
  credit: {
    hyOAS: number | null;
    hyOAS_8wChange: number | null;
    stlFSI: number | null;
  };

  // Liquidity metrics
  liquidity: {
    composite: number;
    walcl_13wChange: number | null;
  };
}

export interface ThresholdConfig {
  // Rate thresholds
  highRateLevel: number;
  lowRateLevel: number;

  // Curve thresholds
  deepInversionThreshold: number;
  inversionThreshold: number;

  // Credit stress thresholds
  hyOAS_yellow: number;
  hyOAS_red: number;
  hyOAS_spikeThreshold: number;

  // Financial stress thresholds
  stlFSI_yellow: number;
  stlFSI_red: number;

  // Liquidity thresholds
  liquidityComposite_yellow: number;
  liquidityComposite_red: number;

  // Inflation thresholds
  inflationComposite_yellow: number;
  inflationComposite_red: number;

  // Composite thresholds for regime classification
  creditStress_riskOff: number;
  growth_scare: number;
  inflation_elevated: number;
}
