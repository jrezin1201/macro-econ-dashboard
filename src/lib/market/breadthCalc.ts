/**
 * Equity Breadth - Calculation Utilities
 */

import type { BreadthPoint, BreadthAnalysis, BreadthSignal, BreadthLevel } from "./breadthTypes";
import { BREADTH_CONFIG } from "./breadthConfig";

/**
 * Calculate momentum (% change over period)
 */
export function momentum(series: BreadthPoint[], lookbackDays: number): number | null {
  if (series.length < 2) return null;

  const latest = series[series.length - 1];
  const latestDate = new Date(latest.date);

  // Find point N days ago
  const targetDate = new Date(latestDate);
  targetDate.setDate(targetDate.getDate() - lookbackDays);

  let previousPoint: BreadthPoint | null = null;
  let minDiff = Infinity;

  for (const point of series) {
    const pointDate = new Date(point.date);
    const diff = Math.abs(pointDate.getTime() - targetDate.getTime());

    if (pointDate <= targetDate && diff < minDiff) {
      minDiff = diff;
      previousPoint = point;
    }
  }

  if (!previousPoint || previousPoint.value === 0) return null;

  return ((latest.value - previousPoint.value) / Math.abs(previousPoint.value)) * 100;
}

/**
 * Calculate slope (linear regression slope)
 */
export function slope(series: BreadthPoint[], lookbackDays: number): number | null {
  if (series.length < 2) return null;

  const latestDate = new Date(series[series.length - 1].date);
  const cutoffDate = new Date(latestDate);
  cutoffDate.setDate(cutoffDate.getDate() - lookbackDays);

  const filtered = series.filter((p) => new Date(p.date) >= cutoffDate);
  if (filtered.length < 2) return null;

  // Simple linear regression
  const n = filtered.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  filtered.forEach((point, i) => {
    const x = i;
    const y = point.value;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  });

  const slopeVal = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  return slopeVal;
}

/**
 * Get latest value from series
 */
export function latest(series: BreadthPoint[]): number | null {
  if (series.length === 0) return null;
  return series[series.length - 1].value;
}

/**
 * Calculate change over period
 */
export function change(series: BreadthPoint[], lookbackDays: number): number | null {
  if (series.length < 2) return null;

  const latestVal = latest(series);
  if (latestVal === null) return null;

  const latestDate = new Date(series[series.length - 1].date);
  const targetDate = new Date(latestDate);
  targetDate.setDate(targetDate.getDate() - lookbackDays);

  let previousPoint: BreadthPoint | null = null;
  let minDiff = Infinity;

  for (const point of series) {
    const pointDate = new Date(point.date);
    const diff = Math.abs(pointDate.getTime() - targetDate.getTime());

    if (pointDate <= targetDate && diff < minDiff) {
      minDiff = diff;
      previousPoint = point;
    }
  }

  if (!previousPoint) return null;
  return latestVal - previousPoint.value;
}

/**
 * Analyze breadth data and generate signal
 */
export function analyzeBreadth(
  adLine: BreadthPoint[],
  pctAbove200: BreadthPoint[] = [],
  newHighsLows: BreadthPoint[] = [],
  vixLevel?: number | null
): BreadthAnalysis {
  const reasons: string[] = [];

  // Calculate metrics
  const adLineMomentum = momentum(adLine, BREADTH_CONFIG.momentumLookback);
  const adLineLatest = latest(adLine);
  const adLine60dChange = change(adLine, 60);
  const pctAbove200Latest = latest(pctAbove200);
  const newHighsMinusLows = latest(newHighsLows);

  // Determine breadth level
  let level: BreadthLevel = "GREEN";
  let signalScore = 0;

  // AD Line analysis
  if (adLineMomentum !== null) {
    if (adLineMomentum > BREADTH_CONFIG.thresholds.adLineMomentum_green) {
      reasons.push(`AD line rising (${adLineMomentum > 0 ? "+" : ""}${adLineMomentum.toFixed(1)}% over 60d)`);
      signalScore += 1;
    } else if (adLineMomentum < BREADTH_CONFIG.thresholds.adLineMomentum_red) {
      reasons.push(`AD line declining (${adLineMomentum.toFixed(1)}% over 60d)`);
      signalScore -= 1;
      level = "RED";
    } else {
      reasons.push(`AD line neutral (${adLineMomentum > 0 ? "+" : ""}${adLineMomentum.toFixed(1)}% over 60d)`);
    }
  }

  // VIX consideration
  if (vixLevel !== null && vixLevel !== undefined) {
    if (vixLevel < 15) {
      reasons.push(`Low volatility (VIX=${vixLevel.toFixed(1)}) supports breadth`);
      signalScore += 0.5;
    } else if (vixLevel > 25) {
      reasons.push(`Elevated volatility (VIX=${vixLevel.toFixed(1)}) hurts breadth`);
      signalScore -= 0.5;
      if (level === "GREEN") level = "YELLOW";
    }
  }

  // Pct above 200-day MA (if available)
  if (pctAbove200Latest !== null) {
    if (pctAbove200Latest >= BREADTH_CONFIG.thresholds.pctAbove200_green) {
      reasons.push(`Healthy breadth: ${pctAbove200Latest.toFixed(0)}% above 200D MA`);
      signalScore += 1;
    } else if (pctAbove200Latest < BREADTH_CONFIG.thresholds.pctAbove200_red) {
      reasons.push(`Weak breadth: Only ${pctAbove200Latest.toFixed(0)}% above 200D MA`);
      signalScore -= 1;
      level = "RED";
    } else {
      if (level === "GREEN") level = "YELLOW";
    }
  }

  // New highs/lows (if available)
  if (newHighsMinusLows !== null) {
    if (newHighsMinusLows >= BREADTH_CONFIG.thresholds.newHighsLows_green) {
      reasons.push(`Positive new highs-lows: ${newHighsMinusLows.toFixed(0)}`);
      signalScore += 0.5;
    } else if (newHighsMinusLows < BREADTH_CONFIG.thresholds.newHighsLows_red) {
      reasons.push(`Negative new highs-lows: ${newHighsMinusLows.toFixed(0)}`);
      signalScore -= 0.5;
      if (level === "GREEN") level = "YELLOW";
    }
  }

  // Determine confirmation signal
  let signal: BreadthSignal = "NEUTRAL";
  if (signalScore >= 1.5) {
    signal = "CONFIRMS";
  } else if (signalScore <= -1.5) {
    signal = "DIVERGES";
  }

  // Add signal explanation
  if (signal === "CONFIRMS") {
    reasons.unshift("✓ Breadth CONFIRMS macro regime");
  } else if (signal === "DIVERGES") {
    reasons.unshift("✗ Breadth DIVERGES from macro regime");
  } else {
    reasons.unshift("— Breadth NEUTRAL");
  }

  return {
    signal,
    level,
    reasons,
    metrics: {
      adLineMomentum,
      adLineLatest,
      adLine60dChange,
      pctAbove200Latest,
      newHighsMinusLows,
    },
    lastUpdated: new Date(),
  };
}
