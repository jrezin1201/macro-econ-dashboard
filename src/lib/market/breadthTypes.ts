/**
 * Equity Breadth - Type Definitions
 */

export interface BreadthPoint {
  date: string;
  value: number;
}

export interface BreadthData {
  adLine: BreadthPoint[];
  newHighsLows?: BreadthPoint[];
  pctAbove200?: BreadthPoint[];
}

export type BreadthSignal = "CONFIRMS" | "NEUTRAL" | "DIVERGES";
export type BreadthLevel = "GREEN" | "YELLOW" | "RED";

export interface BreadthAnalysis {
  signal: BreadthSignal;
  level: BreadthLevel;
  reasons: string[];
  metrics: {
    adLineMomentum: number | null;
    adLineLatest: number | null;
    adLine60dChange: number | null;
    pctAbove200Latest: number | null;
    newHighsMinusLows: number | null;
  };
  lastUpdated: Date;
}

/**
 * Provider interface for breadth data
 */
export interface BreadthProvider {
  /**
   * Get Advance/Decline line or proxy
   */
  getADLine(startDate: string): Promise<BreadthPoint[]>;

  /**
   * Get percentage of stocks above 200-day MA (optional)
   */
  getPctAbove200?(startDate: string): Promise<BreadthPoint[]>;

  /**
   * Get new highs minus new lows (optional)
   */
  getNewHighsLows?(startDate: string): Promise<BreadthPoint[]>;
}
