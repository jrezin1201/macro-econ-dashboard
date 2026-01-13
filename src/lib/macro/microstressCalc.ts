/**
 * Credit Microstress - Calculation Utilities
 */

import type { TimeSeriesDataPoint } from "./types";
import type { MicrostressMetrics, MicrostressAnalysis, MicrostressLevel } from "./microstressTypes";
import { MICROSTRESS_CONFIG } from "./microstressConfig";
import { lastValue, delta } from "./calc";

/**
 * Compute spread between two series
 */
export function computeSpread(
  seriesA: TimeSeriesDataPoint[],
  seriesB: TimeSeriesDataPoint[]
): number | null {
  const valueA = lastValue(seriesA);
  const valueB = lastValue(seriesB);

  if (valueA === null || valueB === null) return null;
  return valueA - valueB;
}

/**
 * Calculate microstress metrics
 */
export function calculateMicrostressMetrics(data: {
  sofr: TimeSeriesDataPoint[];
  effr: TimeSeriesDataPoint[];
  tbill3m: TimeSeriesDataPoint[];
  cpRate: TimeSeriesDataPoint[];
  tedSpread: TimeSeriesDataPoint[];
  nfci: TimeSeriesDataPoint[];
}): MicrostressMetrics {
  const sofr = lastValue(data.sofr);
  const effr = lastValue(data.effr);
  const sofrEffrSpread = computeSpread(data.sofr, data.effr);
  const sofr8wChange = delta(data.sofr, MICROSTRESS_CONFIG.lookbacks.medium);
  const tbill3m = lastValue(data.tbill3m);
  const cpRate = lastValue(data.cpRate);
  const cp8wChange = delta(data.cpRate, MICROSTRESS_CONFIG.lookbacks.medium);
  const tedSpread = lastValue(data.tedSpread);
  const nfci = lastValue(data.nfci);

  return {
    sofr,
    effr,
    sofrEffrSpread,
    sofr8wChange,
    tbill3m,
    cpRate,
    cp8wChange,
    tedSpread,
    nfci,
  };
}

/**
 * Analyze microstress and generate signal
 */
export function analyzeMicrostress(metrics: MicrostressMetrics): MicrostressAnalysis {
  const reasons: string[] = [];
  let score = 0;
  let level: MicrostressLevel = "GREEN";

  // 1. SOFR-EFFR Spread Analysis
  if (metrics.sofrEffrSpread !== null) {
    const spread = Math.abs(metrics.sofrEffrSpread);

    if (spread >= MICROSTRESS_CONFIG.thresholds.sofrEffrSpread_red) {
      reasons.push(`Funding spread elevated: ${(spread * 100).toFixed(1)}bps (RED threshold: ${MICROSTRESS_CONFIG.thresholds.sofrEffrSpread_red * 100}bps)`);
      score += 2 * MICROSTRESS_CONFIG.weights.sofrEffrSpread;
      level = "RED";
    } else if (spread >= MICROSTRESS_CONFIG.thresholds.sofrEffrSpread_yellow) {
      reasons.push(`Funding spread widening: ${(spread * 100).toFixed(1)}bps`);
      score += 1 * MICROSTRESS_CONFIG.weights.sofrEffrSpread;
      if (level === "GREEN") level = "YELLOW";
    } else {
      reasons.push(`Funding markets stable (spread: ${(spread * 100).toFixed(1)}bps)`);
    }
  }

  // 2. SOFR Jump Analysis
  if (metrics.sofr8wChange !== null) {
    if (metrics.sofr8wChange >= MICROSTRESS_CONFIG.thresholds.sofr8wJump_red) {
      reasons.push(`SOFR spiked +${(metrics.sofr8wChange * 100).toFixed(0)}bps in 8 weeks`);
      score += 2 * MICROSTRESS_CONFIG.weights.sofrJump;
      level = "RED";
    } else if (metrics.sofr8wChange >= MICROSTRESS_CONFIG.thresholds.sofr8wJump_yellow) {
      reasons.push(`SOFR rising: +${(metrics.sofr8wChange * 100).toFixed(0)}bps in 8 weeks`);
      score += 1 * MICROSTRESS_CONFIG.weights.sofrJump;
      if (level === "GREEN") level = "YELLOW";
    }
  }

  // 3. Commercial Paper Stress
  if (metrics.cp8wChange !== null) {
    if (metrics.cp8wChange >= MICROSTRESS_CONFIG.thresholds.cp8wJump_red) {
      reasons.push(`Commercial paper stress: +${(metrics.cp8wChange * 100).toFixed(0)}bps in 8 weeks`);
      score += 2 * MICROSTRESS_CONFIG.weights.cpJump;
      level = "RED";
    } else if (metrics.cp8wChange >= MICROSTRESS_CONFIG.thresholds.cp8wJump_yellow) {
      reasons.push(`CP rates rising: +${(metrics.cp8wChange * 100).toFixed(0)}bps in 8 weeks`);
      score += 1 * MICROSTRESS_CONFIG.weights.cpJump;
      if (level === "GREEN") level = "YELLOW";
    }
  }

  // 4. TED Spread
  if (metrics.tedSpread !== null) {
    if (metrics.tedSpread >= MICROSTRESS_CONFIG.thresholds.tedSpread_red) {
      reasons.push(`TED spread elevated: ${metrics.tedSpread.toFixed(2)}% (interbank stress)`);
      score += 2 * MICROSTRESS_CONFIG.weights.tedSpread;
      level = "RED";
    } else if (metrics.tedSpread >= MICROSTRESS_CONFIG.thresholds.tedSpread_yellow) {
      reasons.push(`TED spread rising: ${metrics.tedSpread.toFixed(2)}%`);
      score += 1 * MICROSTRESS_CONFIG.weights.tedSpread;
      if (level === "GREEN") level = "YELLOW";
    }
  }

  // 5. Financial Conditions Index
  if (metrics.nfci !== null) {
    if (metrics.nfci >= MICROSTRESS_CONFIG.thresholds.nfci_red) {
      reasons.push(`Financial conditions tight: NFCI = ${metrics.nfci.toFixed(2)}`);
      score += 2 * MICROSTRESS_CONFIG.weights.nfci;
      if (level === "GREEN") level = "YELLOW";
    } else if (metrics.nfci >= MICROSTRESS_CONFIG.thresholds.nfci_yellow) {
      reasons.push(`Financial conditions tightening: NFCI = ${metrics.nfci.toFixed(2)}`);
      score += 1 * MICROSTRESS_CONFIG.weights.nfci;
      if (level === "GREEN") level = "YELLOW";
    } else {
      reasons.push(`Financial conditions accommodative (NFCI = ${metrics.nfci.toFixed(2)})`);
    }
  }

  // Green messaging
  if (level === "GREEN") {
    reasons.unshift("✓ No funding market stress detected");
  } else if (level === "YELLOW") {
    reasons.unshift("⚠ Funding markets showing caution signals");
  } else {
    reasons.unshift("🚨 Funding market stress detected");
  }

  return {
    level,
    score,
    reasons,
    metrics,
    lastUpdated: new Date(),
  };
}
