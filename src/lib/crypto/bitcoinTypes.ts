/**
 * Bitcoin Analysis - Type Definitions
 */

export interface BitcoinPrice {
  date: string;
  price: number;
}

export type BitcoinTrendLevel = "GREEN" | "YELLOW" | "RED";

export interface BitcoinAnalysis {
  trendLevel: BitcoinTrendLevel;
  reasons: string[];
  metrics: {
    currentPrice: number | null;
    ma20: number | null;
    ma50: number | null;
    ma200: number | null;
    distanceFrom200D: number | null; // percentage
    realizedVol30D: number | null; // annualized %
    drawdown365D: number | null; // percentage
    momentum90D: number | null; // percentage
  };
  macdStatus?: {
    isAbove50D: boolean;
    isAbove200D: boolean;
    golden: boolean; // 50D > 200D (golden cross)
    death: boolean; // 50D < 200D (death cross)
  };
  lastUpdated: Date;
}

export interface MSTRGuidance {
  recommendation: string;
  reasoning: string[];
  alertLevel: "OK" | "CAUTION" | "AVOID";
}
