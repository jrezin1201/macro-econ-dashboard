/**
 * Macro Regime Analysis - Calculation Utilities
 *
 * Core logic for computing metrics, composites, and regime classification
 */

import type { TimeSeriesDataPoint, MacroComposites, RegimeClassification } from "./types";
import { LOOKBACKS, THRESHOLDS } from "./config";

/**
 * Get the last value from a time series
 */
export function lastValue(series: TimeSeriesDataPoint[]): number | null {
  if (series.length === 0) return null;
  return series[series.length - 1].value;
}

/**
 * Get the value from N days ago
 */
export function valueNDaysAgo(series: TimeSeriesDataPoint[], days: number): number | null {
  if (series.length === 0) return null;

  const latestDate = series[series.length - 1].date;
  const targetDate = new Date(latestDate);
  targetDate.setDate(targetDate.getDate() - days);

  // Find the closest data point before or on the target date
  let closest: TimeSeriesDataPoint | null = null;
  let minDiff = Infinity;

  for (const point of series) {
    const diff = Math.abs(point.date.getTime() - targetDate.getTime());
    if (point.date <= targetDate && diff < minDiff) {
      minDiff = diff;
      closest = point;
    }
  }

  return closest ? closest.value : null;
}

/**
 * Calculate delta (absolute change) over a lookback period
 */
export function delta(series: TimeSeriesDataPoint[], lookbackDays: number): number | null {
  const latest = lastValue(series);
  const previous = valueNDaysAgo(series, lookbackDays);

  if (latest === null || previous === null) return null;
  return latest - previous;
}

/**
 * Calculate percent change over a lookback period
 */
export function pctChange(series: TimeSeriesDataPoint[], lookbackDays: number): number | null {
  const latest = lastValue(series);
  const previous = valueNDaysAgo(series, lookbackDays);

  if (latest === null || previous === null || previous === 0) return null;
  return ((latest - previous) / Math.abs(previous)) * 100;
}

/**
 * Calculate year-over-year change (365 days ago)
 */
export function yoyChange(series: TimeSeriesDataPoint[]): number | null {
  return pctChange(series, LOOKBACKS["12m"]);
}

/**
 * Calculate mean of a time series over a lookback period
 */
export function mean(series: TimeSeriesDataPoint[], lookbackDays: number): number | null {
  if (series.length === 0) return null;

  const latestDate = series[series.length - 1].date;
  const cutoffDate = new Date(latestDate);
  cutoffDate.setDate(cutoffDate.getDate() - lookbackDays);

  const filtered = series.filter((p) => p.date >= cutoffDate);
  if (filtered.length === 0) return null;

  const sum = filtered.reduce((acc, p) => acc + p.value, 0);
  return sum / filtered.length;
}

/**
 * Calculate standard deviation over a lookback period
 */
export function stdDev(series: TimeSeriesDataPoint[], lookbackDays: number): number | null {
  const avg = mean(series, lookbackDays);
  if (avg === null) return null;

  const latestDate = series[series.length - 1].date;
  const cutoffDate = new Date(latestDate);
  cutoffDate.setDate(cutoffDate.getDate() - lookbackDays);

  const filtered = series.filter((p) => p.date >= cutoffDate);
  if (filtered.length < 2) return null;

  const squaredDiffs = filtered.map((p) => Math.pow(p.value - avg, 2));
  const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / filtered.length;
  return Math.sqrt(variance);
}

/**
 * Calculate z-score of the latest value relative to historical distribution
 */
export function zScore(series: TimeSeriesDataPoint[], lookbackDays: number): number | null {
  const latest = lastValue(series);
  const avg = mean(series, lookbackDays);
  const std = stdDev(series, lookbackDays);

  if (latest === null || avg === null || std === null || std === 0) return null;
  return (latest - avg) / std;
}

/**
 * Calculate z-score of a change/delta relative to historical changes
 */
export function zScoreOfChange(
  series: TimeSeriesDataPoint[],
  changeLookback: number,
  distributionLookback: number
): number | null {
  // We need to compute change at each point in history, then z-score the latest change
  const latestDate = series[series.length - 1].date;
  const cutoffDate = new Date(latestDate);
  cutoffDate.setDate(cutoffDate.getDate() - distributionLookback);

  const changes: number[] = [];

  for (let i = 0; i < series.length; i++) {
    if (series[i].date < cutoffDate) continue;

    // Find the value 'changeLookback' days before series[i]
    const targetDate = new Date(series[i].date);
    targetDate.setDate(targetDate.getDate() - changeLookback);

    let previousValue: number | null = null;
    for (let j = i - 1; j >= 0; j--) {
      if (series[j].date <= targetDate) {
        previousValue = series[j].value;
        break;
      }
    }

    if (previousValue !== null) {
      changes.push(series[i].value - previousValue);
    }
  }

  if (changes.length < 2) return null;

  const latestChange = delta(series, changeLookback);
  if (latestChange === null) return null;

  const avgChange = changes.reduce((acc, val) => acc + val, 0) / changes.length;
  const variance = changes.reduce((acc, val) => acc + Math.pow(val - avgChange, 2), 0) / changes.length;
  const std = Math.sqrt(variance);

  if (std === 0) return null;
  return (latestChange - avgChange) / std;
}

/**
 * Growth Composite
 * Simple equal-weight average of z-scores
 */
export function calculateGrowthComposite(data: {
  napm: TimeSeriesDataPoint[];
  indpro: TimeSeriesDataPoint[];
  payems: TimeSeriesDataPoint[];
  icsa: TimeSeriesDataPoint[];
}): number {
  const scores: number[] = [];

  // NAPM level z-score (2y window)
  const napmZ = zScore(data.napm, LOOKBACKS["2y"]);
  if (napmZ !== null) scores.push(napmZ);

  // INDPRO YoY z-score (2y window)
  // We need to convert INDPRO to YoY changes first
  const indproYoY = data.indpro.map((point, i) => {
    const yearAgo = valueNDaysAgo(data.indpro.slice(0, i + 1), LOOKBACKS["12m"]);
    if (yearAgo === null || yearAgo === 0) return null;
    return { ...point, value: ((point.value - yearAgo) / yearAgo) * 100 };
  }).filter((p): p is TimeSeriesDataPoint => p !== null);

  const indproZ = zScore(indproYoY, LOOKBACKS["2y"]);
  if (indproZ !== null) scores.push(indproZ);

  // PAYEMS YoY z-score (2y window)
  const payemsYoY = data.payems.map((point, i) => {
    const yearAgo = valueNDaysAgo(data.payems.slice(0, i + 1), LOOKBACKS["12m"]);
    if (yearAgo === null || yearAgo === 0) return null;
    return { ...point, value: ((point.value - yearAgo) / yearAgo) * 100 };
  }).filter((p): p is TimeSeriesDataPoint => p !== null);

  const payemsZ = zScore(payemsYoY, LOOKBACKS["2y"]);
  if (payemsZ !== null) scores.push(payemsZ);

  // ICSA 4w change z-score (inverted - claims up is bad)
  const icsaChangeZ = zScoreOfChange(data.icsa, LOOKBACKS["4w"], LOOKBACKS["2y"]);
  if (icsaChangeZ !== null) scores.push(-icsaChangeZ); // Invert

  return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
}

/**
 * Inflation Composite
 */
export function calculateInflationComposite(data: {
  cpi: TimeSeriesDataPoint[];
  pce: TimeSeriesDataPoint[];
  breakeven: TimeSeriesDataPoint[];
}): number {
  const scores: number[] = [];

  // CPI YoY z-score
  const cpiYoY = data.cpi.map((point, i) => {
    const yearAgo = valueNDaysAgo(data.cpi.slice(0, i + 1), LOOKBACKS["12m"]);
    if (yearAgo === null || yearAgo === 0) return null;
    return { ...point, value: ((point.value - yearAgo) / yearAgo) * 100 };
  }).filter((p): p is TimeSeriesDataPoint => p !== null);

  const cpiZ = zScore(cpiYoY, LOOKBACKS["2y"]);
  if (cpiZ !== null) scores.push(cpiZ);

  // PCE YoY z-score
  const pceYoY = data.pce.map((point, i) => {
    const yearAgo = valueNDaysAgo(data.pce.slice(0, i + 1), LOOKBACKS["12m"]);
    if (yearAgo === null || yearAgo === 0) return null;
    return { ...point, value: ((point.value - yearAgo) / yearAgo) * 100 };
  }).filter((p): p is TimeSeriesDataPoint => p !== null);

  const pceZ = zScore(pceYoY, LOOKBACKS["2y"]);
  if (pceZ !== null) scores.push(pceZ);

  // Breakeven level z-score
  const breakZ = zScore(data.breakeven, LOOKBACKS["2y"]);
  if (breakZ !== null) scores.push(breakZ);

  return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
}

/**
 * Credit Stress Composite
 */
export function calculateCreditStressComposite(data: {
  hyOAS: TimeSeriesDataPoint[];
  stlFSI: TimeSeriesDataPoint[];
}): number {
  const scores: number[] = [];

  const hyZ = zScore(data.hyOAS, LOOKBACKS["5y"]);
  if (hyZ !== null) scores.push(hyZ);

  const stlZ = zScore(data.stlFSI, LOOKBACKS["5y"]);
  if (stlZ !== null) scores.push(stlZ);

  return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
}

/**
 * Liquidity Impulse Composite
 */
export function calculateLiquidityComposite(data: {
  walcl: TimeSeriesDataPoint[];
  wresbal: TimeSeriesDataPoint[];
  wtregen: TimeSeriesDataPoint[];
  rrpontsyd: TimeSeriesDataPoint[];
}): number {
  const scores: number[] = [];

  // WALCL 13w change z-score
  const walclZ = zScoreOfChange(data.walcl, LOOKBACKS["13w"], LOOKBACKS["5y"]);
  if (walclZ !== null) scores.push(walclZ);

  // WRESBAL 13w change z-score
  const wresbalZ = zScoreOfChange(data.wresbal, LOOKBACKS["13w"], LOOKBACKS["5y"]);
  if (wresbalZ !== null) scores.push(wresbalZ);

  // WTREGEN 13w change z-score (inverted - TGA up drains liquidity)
  const wtregenZ = zScoreOfChange(data.wtregen, LOOKBACKS["13w"], LOOKBACKS["5y"]);
  if (wtregenZ !== null) scores.push(-wtregenZ);

  // RRPONTSYD 13w change z-score (inverted - RRP down releases liquidity)
  const rrpZ = zScoreOfChange(data.rrpontsyd, LOOKBACKS["13w"], LOOKBACKS["5y"]);
  if (rrpZ !== null) scores.push(-rrpZ);

  return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
}

/**
 * USD Impulse
 */
export function calculateUSDImpulse(data: {
  dtwexbgs: TimeSeriesDataPoint[];
}): number {
  const usdZ = zScoreOfChange(data.dtwexbgs, LOOKBACKS["13w"], LOOKBACKS["5y"]);
  return usdZ ?? 0;
}

/**
 * Regime Classifier
 * Determines the macro regime based on composites
 */
export function classifyRegime(
  composites: MacroComposites,
  additionalData?: {
    curve10_2?: number | null;
    vix?: number | null;
  }
): RegimeClassification {
  const { growth, inflation, creditStress, liquidityImpulse } = composites;
  const reasons: string[] = [];
  let regime: RegimeClassification["regime"] = "Mixed";
  let matchedConditions = 0;

  // Risk-Off conditions (highest priority)
  const riskOffConditions: boolean[] = [];

  if (creditStress >= THRESHOLDS.creditStress_riskOff) {
    reasons.push(`High credit stress (z=${creditStress.toFixed(2)})`);
    riskOffConditions.push(true);
  }

  if (liquidityImpulse <= THRESHOLDS.liquidityComposite_red && additionalData?.curve10_2 && additionalData.curve10_2 < 0) {
    reasons.push("Severe liquidity drain + inverted curve");
    riskOffConditions.push(true);
  }

  if (additionalData?.vix && additionalData.vix > 25) {
    reasons.push(`Elevated volatility (VIX=${additionalData.vix.toFixed(1)})`);
    riskOffConditions.push(true);
  }

  if (riskOffConditions.length >= 2) {
    regime = "Risk-Off";
    matchedConditions = riskOffConditions.length;
  }

  // Inflationary conditions (second priority)
  if (regime === "Mixed" && inflation >= THRESHOLDS.inflation_elevated) {
    reasons.push(`Elevated inflation (z=${inflation.toFixed(2)})`);
    regime = "Inflationary";
    matchedConditions = 1;

    if (growth >= 0) {
      reasons.push("Positive growth supports inflationary regime");
      matchedConditions++;
    }
  }

  // Deflationary conditions
  if (regime === "Mixed" && inflation <= -THRESHOLDS.inflation_elevated && growth <= THRESHOLDS.growth_scare) {
    reasons.push(`Deflation risk: low inflation (z=${inflation.toFixed(2)}) + weak growth (z=${growth.toFixed(2)})`);
    regime = "Deflationary";
    matchedConditions = 2;
  }

  // Risk-On conditions (lowest priority)
  if (regime === "Mixed") {
    const riskOnConditions: boolean[] = [];

    if (creditStress <= 0) {
      reasons.push("Low credit stress");
      riskOnConditions.push(true);
    }

    if (liquidityImpulse >= 0) {
      reasons.push("Positive liquidity impulse");
      riskOnConditions.push(true);
    }

    if (growth >= 0) {
      reasons.push("Positive growth momentum");
      riskOnConditions.push(true);
    }

    if (riskOnConditions.length >= 2) {
      regime = "Risk-On";
      matchedConditions = riskOnConditions.length;
    }
  }

  // Calculate confidence
  const confidence = Math.min(100, Math.round((matchedConditions / 3) * 100));

  return {
    regime,
    confidence,
    reasons: reasons.length > 0 ? reasons : ["Insufficient signals to classify regime"],
  };
}
