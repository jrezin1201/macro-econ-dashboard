/**
 * Bitcoin Analysis - Calculation Utilities
 */

import type { BitcoinPrice, BitcoinAnalysis, BitcoinTrendLevel, MSTRGuidance } from "./bitcoinTypes";
import { BITCOIN_CONFIG, MSTR_GUIDANCE_RULES } from "./bitcoinConfig";
import type { RegimeType } from "@/lib/macro/types";

/**
 * Calculate simple moving average
 */
export function movingAverage(series: BitcoinPrice[], period: number): number | null {
  if (series.length < period) return null;

  const slice = series.slice(-period);
  const sum = slice.reduce((acc, point) => acc + point.price, 0);
  return sum / period;
}

/**
 * Calculate realized volatility (annualized)
 * Uses daily log returns
 */
export function realizedVol(series: BitcoinPrice[], window: number = 30): number | null {
  if (series.length < window + 1) return null;

  const slice = series.slice(-(window + 1));
  const returns: number[] = [];

  for (let i = 1; i < slice.length; i++) {
    const logReturn = Math.log(slice[i].price / slice[i - 1].price);
    returns.push(logReturn);
  }

  // Calculate standard deviation
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((acc, r) => acc + Math.pow(r - mean, 2), 0) / returns.length;
  const dailyVol = Math.sqrt(variance);

  // Annualize (assume 365 trading days for crypto)
  const annualizedVol = dailyVol * Math.sqrt(365) * 100;

  return annualizedVol;
}

/**
 * Calculate drawdown from high over window
 */
export function drawdownFromHigh(series: BitcoinPrice[], window: number = 365): number | null {
  if (series.length === 0) return null;

  const slice = series.slice(-Math.min(window, series.length));
  const currentPrice = slice[slice.length - 1].price;
  const high = Math.max(...slice.map((p) => p.price));

  if (high === 0) return null;

  const drawdown = ((currentPrice - high) / high) * 100;
  return drawdown;
}

/**
 * Calculate momentum (% change over period)
 */
export function momentum(series: BitcoinPrice[], window: number = 90): number | null {
  if (series.length < window + 1) return null;

  const current = series[series.length - 1].price;
  const past = series[series.length - 1 - window].price;

  if (past === 0) return null;

  return ((current - past) / past) * 100;
}

/**
 * Get latest price
 */
export function latestPrice(series: BitcoinPrice[]): number | null {
  if (series.length === 0) return null;
  return series[series.length - 1].price;
}

/**
 * Calculate distance from 200-day MA (%)
 */
export function distanceFromMA(
  currentPrice: number,
  ma: number | null
): number | null {
  if (ma === null || ma === 0) return null;
  return ((currentPrice - ma) / ma) * 100;
}

/**
 * Analyze Bitcoin trend and generate signal
 */
export function analyzeBitcoinTrend(prices: BitcoinPrice[]): BitcoinAnalysis {
  const currentPrice = latestPrice(prices);
  const ma20 = movingAverage(prices, BITCOIN_CONFIG.maPeriods.short);
  const ma50 = movingAverage(prices, BITCOIN_CONFIG.maPeriods.medium);
  const ma200 = movingAverage(prices, BITCOIN_CONFIG.maPeriods.long);
  const distanceFrom200D = currentPrice !== null ? distanceFromMA(currentPrice, ma200) : null;
  const realizedVol30D = realizedVol(prices, 30);
  const drawdown365D = drawdownFromHigh(prices, 365);
  const momentum90D = momentum(prices, 90);

  const reasons: string[] = [];
  let trendLevel: BitcoinTrendLevel = "YELLOW";

  // MA cross analysis
  const isAbove50D = currentPrice !== null && ma50 !== null && currentPrice > ma50;
  const isAbove200D = currentPrice !== null && ma200 !== null && currentPrice > ma200;
  const golden = ma50 !== null && ma200 !== null && ma50 > ma200;
  const death = ma50 !== null && ma200 !== null && ma50 < ma200;

  // Determine trend level
  if (distanceFrom200D !== null) {
    if (distanceFrom200D > BITCOIN_CONFIG.thresholds.bullish_threshold) {
      // Above 200D MA
      if (golden || distanceFrom200D > 5) {
        trendLevel = "GREEN";
        reasons.push(`Price ${distanceFrom200D.toFixed(1)}% above 200D MA (bullish)`);
        if (golden) reasons.push("50D MA > 200D MA (golden cross)");
      } else {
        trendLevel = "YELLOW";
        reasons.push(`Price above 200D MA but ${golden ? "recent" : "no"} golden cross`);
      }
    } else if (Math.abs(distanceFrom200D) <= BITCOIN_CONFIG.thresholds.nearMA_threshold) {
      // Near 200D MA
      trendLevel = "YELLOW";
      reasons.push(`Price near 200D MA (${distanceFrom200D > 0 ? "+" : ""}${distanceFrom200D.toFixed(1)}%)`);
    } else if (distanceFrom200D < BITCOIN_CONFIG.thresholds.bearish_threshold) {
      // Below 200D MA by >5%
      trendLevel = "RED";
      reasons.push(`Price ${Math.abs(distanceFrom200D).toFixed(1)}% below 200D MA (bearish)`);
      if (death) reasons.push("50D MA < 200D MA (death cross)");
    }
  }

  // Volatility adjustment
  if (realizedVol30D !== null) {
    if (realizedVol30D > BITCOIN_CONFIG.thresholds.highVol) {
      if (trendLevel === "GREEN") trendLevel = "YELLOW";
      reasons.push(`High volatility (${realizedVol30D.toFixed(0)}% annualized)`);
    } else if (realizedVol30D < BITCOIN_CONFIG.thresholds.lowVol) {
      reasons.push(`Low volatility (${realizedVol30D.toFixed(0)}% annualized)`);
    }
  }

  // Momentum consideration
  if (momentum90D !== null) {
    if (momentum90D > BITCOIN_CONFIG.thresholds.strongMomentum) {
      reasons.push(`Strong momentum (+${momentum90D.toFixed(1)}% over 90d)`);
    } else if (momentum90D < BITCOIN_CONFIG.thresholds.weakMomentum) {
      if (trendLevel === "GREEN") trendLevel = "YELLOW";
      if (trendLevel === "YELLOW") trendLevel = "RED";
      reasons.push(`Weak momentum (${momentum90D.toFixed(1)}% over 90d)`);
    }
  }

  // Drawdown consideration
  if (drawdown365D !== null && drawdown365D < BITCOIN_CONFIG.thresholds.moderateDrawdown) {
    reasons.push(`${Math.abs(drawdown365D).toFixed(1)}% drawdown from 365D high`);
  }

  return {
    trendLevel,
    reasons,
    metrics: {
      currentPrice,
      ma20,
      ma50,
      ma200,
      distanceFrom200D,
      realizedVol30D,
      drawdown365D,
      momentum90D,
    },
    macdStatus: {
      isAbove50D,
      isAbove200D,
      golden,
      death,
    },
    lastUpdated: new Date(),
  };
}

/**
 * Generate MSTR guidance based on macro regime and BTC trend
 */
export function generateMSTRGuidance(
  macroRegime: RegimeType,
  btcTrendLevel: BitcoinTrendLevel
): MSTRGuidance {
  const isRiskOff = macroRegime === "Risk-Off";
  const isRiskOn = macroRegime === "Risk-On";

  let key: keyof typeof MSTR_GUIDANCE_RULES;

  if (isRiskOn) {
    if (btcTrendLevel === "GREEN") key = "riskOn_btcGreen";
    else if (btcTrendLevel === "YELLOW") key = "riskOn_btcYellow";
    else key = "riskOn_btcRed";
  } else if (isRiskOff) {
    if (btcTrendLevel === "GREEN") key = "riskOff_btcGreen";
    else if (btcTrendLevel === "YELLOW") key = "riskOff_btcYellow";
    else key = "riskOff_btcRed";
  } else {
    // Mixed/Inflationary/Deflationary
    if (btcTrendLevel === "GREEN") key = "riskOn_btcGreen";
    else if (btcTrendLevel === "YELLOW") key = "riskOn_btcYellow";
    else key = "riskOn_btcRed";
  }

  const rule = MSTR_GUIDANCE_RULES[key];
  const reasoning: string[] = [
    `Macro regime: ${macroRegime}`,
    `Bitcoin trend: ${btcTrendLevel}`,
  ];

  if (isRiskOff && btcTrendLevel === "RED") {
    reasoning.push("⚠️ Double RED: Both macro and BTC bearish");
    reasoning.push("Prioritize capital preservation");
  } else if (isRiskOn && btcTrendLevel === "GREEN") {
    reasoning.push("✓ Double GREEN: Both macro and BTC supportive");
    reasoning.push("Environment supports selective crypto exposure");
  }

  return {
    recommendation: rule.recommendation,
    reasoning,
    alertLevel: rule.alertLevel,
  };
}
