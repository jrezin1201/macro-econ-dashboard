/**
 * Equity Breadth - Data Provider
 *
 * Uses FRED data to create proxy breadth indicators
 */

import { getSeriesData } from "@/modules/fred-api/lib/fred-client";
import type { BreadthProvider, BreadthPoint } from "./breadthTypes";
import type { TimeSeriesDataPoint } from "@/lib/macro/types";

/**
 * FRED-based breadth provider
 * Uses proxy indicators since direct breadth data isn't available
 */
export class FREDBreadthProvider implements BreadthProvider {
  /**
   * Get synthetic A/D line proxy
   * Uses inverse VIX as proxy - lower VIX suggests better breadth
   * Normalized to create an A/D-like series
   */
  async getADLine(startDate: string): Promise<BreadthPoint[]> {
    try {
      // Fetch VIX as inverse breadth proxy
      const vix = await getSeriesData("VIXCLS", { observationStart: startDate });

      if (vix.length === 0) return [];

      // Create synthetic A/D line: inverse of VIX, normalized and scaled
      // Lower VIX = higher breadth score
      let cumulativeAD = 100; // Start at 100
      const adLine: BreadthPoint[] = [];

      for (let i = 0; i < vix.length; i++) {
        const vixValue = vix[i].value;

        // Daily change in breadth (inverse VIX change)
        if (i > 0) {
          const prevVix = vix[i - 1].value;
          const vixChange = vixValue - prevVix;

          // Inverse: if VIX goes down, breadth improves
          const breadthChange = -vixChange * 0.5;
          cumulativeAD += breadthChange;
        }

        adLine.push({
          date: vix[i].dateString,
          value: cumulativeAD,
        });
      }

      return adLine;
    } catch (error) {
      console.warn("Failed to fetch breadth A/D line proxy:", error);
      return [];
    }
  }

  /**
   * Percentage above 200-day MA
   * Not directly available - would need individual stock data
   * Return empty for now
   */
  async getPctAbove200(startDate: string): Promise<BreadthPoint[]> {
    console.warn("Pct above 200-day MA not available from FRED");
    return [];
  }

  /**
   * New highs minus new lows
   * Not directly available from FRED
   * Return empty for now
   */
  async getNewHighsLows(startDate: string): Promise<BreadthPoint[]> {
    console.warn("New highs/lows not available from FRED");
    return [];
  }
}

/**
 * Helper to convert TimeSeriesDataPoint to BreadthPoint
 */
export function convertToBreadthPoints(series: TimeSeriesDataPoint[]): BreadthPoint[] {
  return series.map((point) => ({
    date: point.dateString,
    value: point.value,
  }));
}

/**
 * Default provider instance
 */
export const breadthProvider = new FREDBreadthProvider();
