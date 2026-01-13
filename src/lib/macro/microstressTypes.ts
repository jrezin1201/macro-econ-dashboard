/**
 * Credit Microstress - Type Definitions
 */

export interface MicrostressMetrics {
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

export type MicrostressLevel = "GREEN" | "YELLOW" | "RED";

export interface MicrostressAnalysis {
  level: MicrostressLevel;
  score: number; // Weighted stress score
  reasons: string[];
  metrics: MicrostressMetrics;
  lastUpdated: Date;
}

export interface MicrostressSeries {
  sofr: { date: string; value: number }[];
  effr: { date: string; value: number }[];
  tbill3m: { date: string; value: number }[];
  cpRate: { date: string; value: number }[];
  tedSpread: { date: string; value: number }[];
  nfci: { date: string; value: number }[];
}
