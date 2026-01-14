/**
 * Engine Scoring System
 *
 * Translates current macro conditions into actionable engine scores
 */

import type { EngineId } from "@/lib/portfolio/schema";

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface MacroInputs {
  // Bitcoin & Crypto
  btcPrice: number;
  btc200DMA: number;
  btcTrend: "bullish" | "bearish" | "neutral";

  // Rates & Inflation
  nominalRate10Y: number; // 10Y Treasury yield
  realRate10Y: number; // TIPS yield or nominal - inflation
  inflation: number; // CPI YoY %
  inflationTrend: "rising" | "falling" | "stable";

  // Credit Markets
  hyOAS: number; // High Yield Option-Adjusted Spread (bp)
  igOAS: number; // Investment Grade OAS (bp)
  creditTrend: "tightening" | "widening" | "stable";

  // Growth & Liquidity
  gdpGrowth: number; // Real GDP growth %
  pmi: number; // ISM Manufacturing PMI
  unemploymentRate: number;
  liquidityScore: number; // 0-100, composite of M2, Fed balance sheet, etc.

  // Commodities & FX
  oilPrice: number;
  goldPrice: number;
  usdStrength: number; // DXY index

  // Market Sentiment
  vix: number;
  equityMomentum: number; // SPX 6M return
}

export interface EngineScore {
  engine: EngineId;
  score: number; // 0-100 (100 = max conviction overweight)
  stance: "OVERWEIGHT" | "NEUTRAL" | "UNDERWEIGHT";
  status: "ALLOWED" | "GATED" | "CAUTION";
  confidence: number; // 0-100
  reasons: string[];
  drivers: {
    helps: string[]; // Positive drivers
    hurts: string[]; // Negative drivers
  };
}

export interface MacroCase {
  regime: string; // e.g., "Risk-Off / Credit Stress Elevated"
  description: string;
  primaryDrivers: string[];
  watchTriggers: WatchTrigger[];
}

export interface WatchTrigger {
  condition: string;
  impact: string;
  threshold?: string;
}

export interface ScoringResult {
  macroCase: MacroCase;
  engineScores: EngineScore[];
  generatedAt: Date;
}

// ============================================================================
// Macro Regime Detection
// ============================================================================

export function detectMacroRegime(inputs: MacroInputs): MacroCase {
  const { hyOAS, btcPrice, btc200DMA, realRate10Y, liquidityScore, inflationTrend } = inputs;

  // Credit Stress Detection
  const creditStress = hyOAS > 450;
  const btcBearish = btcPrice < btc200DMA;
  const lowLiquidity = liquidityScore < 40;
  const ratesElevated = realRate10Y > 1.5;

  // Risk-Off / Credit Stress
  if (creditStress && btcBearish) {
    return {
      regime: "Risk-Off / Credit Stress Elevated",
      description:
        "Credit spreads widening, BTC below trend, liquidity waning. Defensive positioning favored.",
      primaryDrivers: [
        `HY OAS at ${hyOAS}bp (elevated)`,
        `BTC ${((((btcPrice - btc200DMA) / btc200DMA) * 100)).toFixed(1)}% below 200D MA`,
        `Liquidity Score: ${liquidityScore}/100`,
      ],
      watchTriggers: [
        {
          condition: "BTC > 200D MA",
          impact: "Volatility engine turns ON",
          threshold: `$${btc200DMA.toFixed(0)}`,
        },
        {
          condition: "HY OAS spikes >500bp",
          impact: "Full defensive shift",
          threshold: "500bp",
        },
      ],
    };
  }

  // Goldilocks / Low Vol Growth
  if (!creditStress && liquidityScore > 60 && inflationTrend === "falling") {
    return {
      regime: "Goldilocks / Low Vol Growth",
      description: "Strong growth, falling inflation, ample liquidity. Risk-on across all engines.",
      primaryDrivers: [
        `HY OAS at ${hyOAS}bp (tight)`,
        `Liquidity Score: ${liquidityScore}/100`,
        "Inflation moderating",
      ],
      watchTriggers: [
        {
          condition: "Inflation re-accelerates",
          impact: "Shift to Energy/Gold",
        },
        {
          condition: "Credit spreads widen >100bp",
          impact: "Reduce cyclical exposure",
        },
      ],
    };
  }

  // Stagflation
  if (inflationTrend === "rising" && inputs.gdpGrowth < 2 && inputs.pmi < 50) {
    return {
      regime: "Stagflation / Inflation Resurge",
      description: "Weak growth, rising inflation. Energy, Gold, Real Assets favored.",
      primaryDrivers: [
        `Inflation ${inflationTrend}`,
        `GDP growth ${inputs.gdpGrowth.toFixed(1)}%`,
        `PMI at ${inputs.pmi}`,
      ],
      watchTriggers: [
        {
          condition: "Fed pivots dovish",
          impact: "Growth & Duration engines ON",
        },
        {
          condition: "Oil falls >20%",
          impact: "Inflation pressure eases",
        },
      ],
    };
  }

  // Default: Neutral / Mixed
  return {
    regime: "Neutral / Mixed Signals",
    description: "No clear macro dominance. Balanced allocation with selective tilts.",
    primaryDrivers: ["Multiple cross-currents", "No strong regime signal"],
    watchTriggers: [
      {
        condition: "Credit spreads widen materially",
        impact: "Shift defensive",
      },
      {
        condition: "Liquidity improves >20pts",
        impact: "Add cyclicals",
      },
    ],
  };
}

// ============================================================================
// Individual Engine Scoring Functions
// ============================================================================

function scoreVolatilityOptionalityEngine(inputs: MacroInputs): EngineScore {
  const { btcPrice, btc200DMA, vix, liquidityScore } = inputs;

  const btcAboveMA = btcPrice > btc200DMA;
  const btcPctFromMA = ((btcPrice - btc200DMA) / btc200DMA) * 100;
  const lowVix = vix < 20;
  const highLiquidity = liquidityScore > 60;

  let score = 50;
  const helps: string[] = [];
  const hurts: string[] = [];

  // BTC above 200D MA is primary gate
  if (btcAboveMA) {
    score += 30;
    helps.push(`BTC ${btcPctFromMA.toFixed(1)}% above 200D MA - bullish trend`);
  } else {
    score -= 40;
    hurts.push(`BTC ${Math.abs(btcPctFromMA).toFixed(1)}% below 200D MA - gated`);
  }

  // High liquidity supports risk assets
  if (highLiquidity) {
    score += 15;
    helps.push(`Liquidity score ${liquidityScore}/100 - supportive`);
  } else {
    score -= 10;
    hurts.push(`Liquidity score ${liquidityScore}/100 - headwind`);
  }

  // Low VIX is supportive
  if (lowVix) {
    score += 5;
    helps.push(`VIX at ${vix} - low vol environment`);
  }

  score = Math.max(0, Math.min(100, score));

  return {
    engine: "VOLATILITY_OPTIONALITY",
    score,
    stance: score > 65 ? "OVERWEIGHT" : score < 35 ? "UNDERWEIGHT" : "NEUTRAL",
    status: btcAboveMA ? "ALLOWED" : "GATED",
    confidence: Math.abs(btcPctFromMA) > 10 ? 85 : 60,
    reasons: [
      btcAboveMA
        ? "BTC in confirmed uptrend - crypto risk-on"
        : "BTC below 200D MA - wait for trend confirmation",
    ],
    drivers: { helps, hurts },
  };
}

function scoreGrowthDurationEngine(inputs: MacroInputs): EngineScore {
  const { realRate10Y, liquidityScore, gdpGrowth, pmi, inflationTrend } = inputs;

  let score = 50;
  const helps: string[] = [];
  const hurts: string[] = [];

  // Low/negative real rates help growth stocks
  if (realRate10Y < 0) {
    score += 25;
    helps.push(`Real rates negative (${realRate10Y.toFixed(2)}%) - highly supportive`);
  } else if (realRate10Y < 1.5) {
    score += 10;
    helps.push(`Real rates moderate (${realRate10Y.toFixed(2)}%)`);
  } else {
    score -= 20;
    hurts.push(`Real rates elevated (${realRate10Y.toFixed(2)}%) - headwind`);
  }

  // Strong liquidity
  if (liquidityScore > 65) {
    score += 20;
    helps.push(`Strong liquidity (${liquidityScore}/100)`);
  } else if (liquidityScore < 40) {
    score -= 15;
    hurts.push(`Weak liquidity (${liquidityScore}/100)`);
  }

  // Growth trends
  if (gdpGrowth > 2.5 && pmi > 55) {
    score += 15;
    helps.push(`Strong growth (GDP ${gdpGrowth.toFixed(1)}%, PMI ${pmi})`);
  } else if (gdpGrowth < 1 || pmi < 45) {
    score -= 10;
    hurts.push(`Weak growth signals`);
  }

  // Falling inflation helps
  if (inflationTrend === "falling") {
    score += 10;
    helps.push("Disinflation supports multiples");
  }

  score = Math.max(0, Math.min(100, score));

  return {
    engine: "GROWTH_DURATION",
    score,
    stance: score > 65 ? "OVERWEIGHT" : score < 35 ? "UNDERWEIGHT" : "NEUTRAL",
    status: realRate10Y > 2.5 ? "CAUTION" : "ALLOWED",
    confidence: 70,
    reasons: [
      realRate10Y > 2
        ? "Elevated real rates pressuring long-duration growth"
        : "Real rates supportive for growth equities",
    ],
    drivers: { helps, hurts },
  };
}

function scoreCashflowCompoundersEngine(inputs: MacroInputs): EngineScore {
  const { hyOAS, realRate10Y, vix, gdpGrowth } = inputs;

  let score = 50;
  const helps: string[] = [];
  const hurts: string[] = [];

  // Credit stress elevates defensive bid
  if (hyOAS > 450) {
    score += 25;
    helps.push(`Credit stress (HY OAS ${hyOAS}bp) - defensive bid strong`);
  } else if (hyOAS < 300) {
    score -= 10;
    hurts.push(`Tight spreads reduce defensive premium`);
  }

  // High VIX increases quality demand
  if (vix > 25) {
    score += 15;
    helps.push(`Elevated VIX (${vix}) - flight to quality`);
  }

  // Steady growth supports earnings
  if (gdpGrowth > 1.5 && gdpGrowth < 3.5) {
    score += 10;
    helps.push(`Steady growth supports compounders`);
  }

  // Always a core allocation
  score += 10;
  helps.push("All-weather core holding");

  score = Math.max(0, Math.min(100, score));

  return {
    engine: "CASHFLOW_COMPOUNDERS",
    score,
    stance: score > 60 ? "OVERWEIGHT" : "NEUTRAL",
    status: "ALLOWED",
    confidence: 80,
    reasons: ["Quality compounders perform in risk-off environments"],
    drivers: { helps, hurts },
  };
}

function scoreCreditCarryEngine(inputs: MacroInputs): EngineScore {
  const { nominalRate10Y, hyOAS, creditTrend, gdpGrowth } = inputs;

  let score = 50;
  const helps: string[] = [];
  const hurts: string[] = [];

  // High nominal rates support carry
  if (nominalRate10Y > 4) {
    score += 20;
    helps.push(`High rates (${nominalRate10Y.toFixed(2)}%) - attractive carry`);
  } else if (nominalRate10Y < 2) {
    score -= 15;
    hurts.push(`Low rates reduce carry appeal`);
  }

  // Stable credit spreads
  if (creditTrend === "tightening" || creditTrend === "stable") {
    score += 15;
    helps.push(`Credit ${creditTrend} - stable income`);
  } else {
    score -= 20;
    hurts.push(`Credit spreads widening - caution`);
  }

  // Moderate growth supports credit
  if (gdpGrowth > 1 && gdpGrowth < 4) {
    score += 10;
    helps.push("Stable growth supports credit");
  }

  score = Math.max(0, Math.min(100, score));

  return {
    engine: "CREDIT_CARRY",
    score,
    stance: score > 60 ? "OVERWEIGHT" : score < 40 ? "UNDERWEIGHT" : "NEUTRAL",
    status: creditTrend === "widening" && hyOAS > 500 ? "CAUTION" : "ALLOWED",
    confidence: 75,
    reasons: [
      nominalRate10Y > 4
        ? "High absolute rates make carry attractive"
        : "Monitor for better entry on yield backup",
    ],
    drivers: { helps, hurts },
  };
}

function scoreEnergyCommoditiesEngine(inputs: MacroInputs): EngineScore {
  const { oilPrice, inflationTrend, gdpGrowth, usdStrength } = inputs;

  let score = 50;
  const helps: string[] = [];
  const hurts: string[] = [];

  // Rising inflation
  if (inflationTrend === "rising") {
    score += 25;
    helps.push("Rising inflation - energy hedge demanded");
  } else if (inflationTrend === "falling") {
    score -= 15;
    hurts.push("Disinflation reduces energy demand");
  }

  // Oil price trends
  if (oilPrice > 80) {
    score += 15;
    helps.push(`Oil at $${oilPrice} - strong pricing`);
  } else if (oilPrice < 60) {
    score -= 10;
    hurts.push(`Oil at $${oilPrice} - weak pricing`);
  }

  // Strong USD is headwind
  if (usdStrength > 105) {
    score -= 10;
    hurts.push(`Strong USD (${usdStrength}) - commodity headwind`);
  }

  score = Math.max(0, Math.min(100, score));

  return {
    engine: "ENERGY_COMMODITIES",
    score,
    stance: score > 60 ? "OVERWEIGHT" : score < 40 ? "UNDERWEIGHT" : "NEUTRAL",
    status: "ALLOWED",
    confidence: 65,
    reasons: [
      inflationTrend === "rising"
        ? "Inflation hedge - energy demand rising"
        : "Neutral on energy in disinflationary environment",
    ],
    drivers: { helps, hurts },
  };
}

function scoreGoldScarcityEngine(inputs: MacroInputs): EngineScore {
  const { realRate10Y, hyOAS, inflationTrend, usdStrength } = inputs;

  let score = 50;
  const helps: string[] = [];
  const hurts: string[] = [];

  // Negative/low real rates are primary driver
  if (realRate10Y < 0) {
    score += 30;
    helps.push(`Negative real rates (${realRate10Y.toFixed(2)}%) - highly supportive`);
  } else if (realRate10Y < 1) {
    score += 15;
    helps.push(`Low real rates (${realRate10Y.toFixed(2)}%)`);
  } else if (realRate10Y > 2) {
    score -= 20;
    hurts.push(`High real rates (${realRate10Y.toFixed(2)}%) - opportunity cost`);
  }

  // Credit stress / risk-off
  if (hyOAS > 450) {
    score += 15;
    helps.push("Credit stress - safe haven bid");
  }

  // Rising inflation
  if (inflationTrend === "rising") {
    score += 10;
    helps.push("Rising inflation - hedge demand");
  }

  // Weak USD helps
  if (usdStrength < 95) {
    score += 10;
    helps.push("Weak USD supportive for gold");
  } else if (usdStrength > 105) {
    score -= 10;
    hurts.push(`Strong USD (${usdStrength}) - headwind`);
  }

  score = Math.max(0, Math.min(100, score));

  return {
    engine: "GOLD_SCARCITY",
    score,
    stance: score > 60 ? "OVERWEIGHT" : score < 40 ? "UNDERWEIGHT" : "NEUTRAL",
    status: "ALLOWED",
    confidence: 75,
    reasons: [
      realRate10Y < 1
        ? "Real rates falling - gold supportive regime"
        : "Monitor for real rate decline",
    ],
    drivers: { helps, hurts },
  };
}

function scoreRealEstateRentEngine(inputs: MacroInputs): EngineScore {
  const { nominalRate10Y, realRate10Y, gdpGrowth, inflationTrend } = inputs;

  let score = 50;
  const helps: string[] = [];
  const hurts: string[] = [];

  // Long rates elevated hurt REITs
  if (nominalRate10Y > 5) {
    score -= 25;
    hurts.push(`10Y yield ${nominalRate10Y.toFixed(2)}% - significant headwind`);
  } else if (nominalRate10Y < 3.5) {
    score += 15;
    helps.push(`Lower rates (${nominalRate10Y.toFixed(2)}%) supportive`);
  }

  // Growth supports rent growth
  if (gdpGrowth > 2) {
    score += 10;
    helps.push("Healthy growth - rent growth supported");
  }

  // Moderate inflation helps rent escalation
  if (inflationTrend === "rising") {
    score += 10;
    helps.push("Inflation allows rent pass-through");
  }

  score = Math.max(0, Math.min(100, score));

  return {
    engine: "REAL_ESTATE_RENT",
    score,
    stance: score > 55 ? "OVERWEIGHT" : score < 40 ? "UNDERWEIGHT" : "NEUTRAL",
    status: nominalRate10Y > 5.5 ? "CAUTION" : "ALLOWED",
    confidence: 70,
    reasons: [
      nominalRate10Y > 5
        ? "Elevated long rates pressure REITs"
        : "Real estate attractive as rates moderate",
    ],
    drivers: { helps, hurts },
  };
}

function scoreDefenseGeopoliticsEngine(inputs: MacroInputs): EngineScore {
  // Defense is less macro-sensitive, more geopolitical
  const { gdpGrowth, vix } = inputs;

  let score = 55; // Slight positive bias
  const helps: string[] = [];
  const hurts: string[] = [];

  // Elevated geopolitical risk (proxied by VIX)
  if (vix > 25) {
    score += 15;
    helps.push("Elevated geopolitical risk - defense premium");
  }

  // Government spending (proxied by growth)
  if (gdpGrowth > 2) {
    score += 10;
    helps.push("Fiscal spending continues");
  }

  helps.push("Secular geopolitical tensions persist");

  score = Math.max(0, Math.min(100, score));

  return {
    engine: "DEFENSE_GEOPOLITICS",
    score,
    stance: "NEUTRAL",
    status: "ALLOWED",
    confidence: 60,
    reasons: ["Geopolitical premium persists - stable allocation"],
    drivers: { helps, hurts },
  };
}

function scoreInfrastructureCapexEngine(inputs: MacroInputs): EngineScore {
  const { gdpGrowth, nominalRate10Y, inflationTrend } = inputs;

  let score = 55;
  const helps: string[] = [];
  const hurts: string[] = [];

  // Strong growth
  if (gdpGrowth > 2.5) {
    score += 15;
    helps.push(`Strong growth (${gdpGrowth.toFixed(1)}%) - capex cycle supportive`);
  }

  // Moderate rates
  if (nominalRate10Y < 4.5) {
    score += 10;
    helps.push("Moderate rates support infrastructure projects");
  } else {
    score -= 10;
    hurts.push(`High rates (${nominalRate10Y.toFixed(2)}%) - project delays`);
  }

  helps.push("Secular fiscal support (IRA, CHIPS Act)");

  score = Math.max(0, Math.min(100, score));

  return {
    engine: "INFRASTRUCTURE_CAPEX",
    score,
    stance: score > 60 ? "OVERWEIGHT" : "NEUTRAL",
    status: "ALLOWED",
    confidence: 65,
    reasons: ["Fiscal support continues - multi-year theme"],
    drivers: { helps, hurts },
  };
}

function scoreSmallCapsDomesticEngine(inputs: MacroInputs): EngineScore {
  const { hyOAS, liquidityScore, gdpGrowth, realRate10Y } = inputs;

  let score = 50;
  const helps: string[] = [];
  const hurts: string[] = [];

  // Credit stress kills small caps
  if (hyOAS > 450) {
    score -= 30;
    hurts.push(`Credit stress (HY OAS ${hyOAS}bp) - avoid small caps`);
  } else if (hyOAS < 300) {
    score += 20;
    helps.push("Tight credit spreads - risk-on for small caps");
  }

  // Liquidity critical
  if (liquidityScore > 65) {
    score += 20;
    helps.push(`Strong liquidity (${liquidityScore}/100)`);
  } else if (liquidityScore < 40) {
    score -= 15;
    hurts.push(`Weak liquidity (${liquidityScore}/100) - headwind`);
  }

  // Growth
  if (gdpGrowth > 3) {
    score += 15;
    helps.push("Strong growth favors domestics");
  } else if (gdpGrowth < 1.5) {
    score -= 10;
    hurts.push("Weak growth hurts small caps");
  }

  score = Math.max(0, Math.min(100, score));

  return {
    engine: "SMALL_CAPS_DOMESTIC",
    score,
    stance: score > 60 ? "OVERWEIGHT" : score < 35 ? "UNDERWEIGHT" : "NEUTRAL",
    status: hyOAS > 450 ? "GATED" : "ALLOWED",
    confidence: 75,
    reasons: [
      hyOAS > 450
        ? "Credit stress elevated - avoid small caps"
        : "Monitor liquidity and credit for entry",
    ],
    drivers: { helps, hurts },
  };
}

function scoreInternationalFxEmEngine(inputs: MacroInputs): EngineScore {
  const { usdStrength, gdpGrowth, liquidityScore } = inputs;

  let score = 50;
  const helps: string[] = [];
  const hurts: string[] = [];

  // Strong USD is major headwind
  if (usdStrength > 105) {
    score -= 25;
    hurts.push(`Strong USD (${usdStrength}) - major headwind`);
  } else if (usdStrength < 95) {
    score += 20;
    helps.push(`Weak USD (${usdStrength}) - tailwind`);
  }

  // Global liquidity
  if (liquidityScore > 60) {
    score += 15;
    helps.push("Global liquidity supportive");
  } else {
    score -= 10;
    hurts.push("Weak liquidity hurts EM");
  }

  // U.S. growth spillover
  if (gdpGrowth > 2.5) {
    score += 10;
    helps.push("U.S. growth spillover positive");
  }

  score = Math.max(0, Math.min(100, score));

  return {
    engine: "INTERNATIONAL_FX_EM",
    score,
    stance: score > 55 ? "OVERWEIGHT" : score < 40 ? "UNDERWEIGHT" : "NEUTRAL",
    status: usdStrength > 110 ? "CAUTION" : "ALLOWED",
    confidence: 65,
    reasons: [
      usdStrength > 105
        ? "Strong USD headwind - wait for reversal"
        : "International diversification opportunity",
    ],
    drivers: { helps, hurts },
  };
}

function scoreSpecialSituationsEngine(inputs: MacroInputs): EngineScore {
  const { liquidityScore, vix } = inputs;

  let score = 50;
  const helps: string[] = [];
  const hurts: string[] = [];

  // Low correlation to macro
  helps.push("Low correlation to macro regime");
  helps.push("Idiosyncratic alpha opportunities");

  // Some liquidity sensitivity
  if (liquidityScore > 55) {
    score += 10;
    helps.push("Decent liquidity for deal activity");
  }

  // Extreme volatility can hurt
  if (vix > 30) {
    score -= 10;
    hurts.push("Extreme volatility disrupts deal activity");
  }

  score = Math.max(0, Math.min(100, score));

  return {
    engine: "SPECIAL_SITUATIONS",
    score,
    stance: "NEUTRAL",
    status: "ALLOWED",
    confidence: 50,
    reasons: ["Special situations - case-by-case analysis required"],
    drivers: { helps, hurts },
  };
}

// ============================================================================
// Main Scoring Function
// ============================================================================

export function scoreAllEngines(inputs: MacroInputs): ScoringResult {
  const macroCase = detectMacroRegime(inputs);

  const engineScores: EngineScore[] = [
    scoreVolatilityOptionalityEngine(inputs),
    scoreGrowthDurationEngine(inputs),
    scoreCashflowCompoundersEngine(inputs),
    scoreCreditCarryEngine(inputs),
    scoreEnergyCommoditiesEngine(inputs),
    scoreGoldScarcityEngine(inputs),
    scoreRealEstateRentEngine(inputs),
    scoreDefenseGeopoliticsEngine(inputs),
    scoreInfrastructureCapexEngine(inputs),
    scoreSmallCapsDomesticEngine(inputs),
    scoreInternationalFxEmEngine(inputs),
    scoreSpecialSituationsEngine(inputs),
  ];

  return {
    macroCase,
    engineScores,
    generatedAt: new Date(),
  };
}
