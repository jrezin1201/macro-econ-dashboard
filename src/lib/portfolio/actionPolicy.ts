/**
 * Action Policy
 *
 * Translates macro regime + confirmation layers into concrete portfolio actions.
 * This is the "missing piece" that makes the dashboard actionable.
 */

import { PortfolioLayer, LAYER_EXAMPLE_TICKERS } from "./portfolioConfig";

// ===== TUNABLE THRESHOLDS =====

export const ACTION_POLICY_CONFIG = {
  // Alert thresholds
  redAlertBlocksHighBeta: true,
  yellowAlertReducesRisk: true,

  // BTC thresholds
  btcRedBlocksCrypto: true,

  // Microstress thresholds
  microstressYellowReducesRisk: true,
  microstressRedHardGate: true,

  // Breadth thresholds
  breadthDivergesReducesGrowth: true,

  // Rebalance trigger thresholds
  hyOASRebalanceTrigger: 6.5, // bps
  microstressRebalanceTrigger: "YELLOW",

  // Stability minimum
  stabilityMinimum: 10, // %
};

// ===== MACRO STATE TYPES =====

export interface MacroState {
  regime: string;
  alertLevel: string;
  composites: {
    growth: number;
    inflation: number;
    creditStress: number;
    liquidityImpulse: number;
  };
  credit: {
    hyOAS: number | null;
  };
}

export interface Confirmations {
  breadth?: {
    signal: string;
    level: string;
  };
  bitcoin?: {
    analysis: {
      trendLevel: string;
    };
  };
  microstress?: {
    level: string;
  };
}

// ===== ACTION POLICY OUTPUT =====

export interface ActionPolicy {
  thisWeekBias: string; // Plain English summary
  deployLayers: PortfolioLayer[]; // OK to add new capital
  avoidLayers: PortfolioLayer[]; // Do NOT add new capital
  stabilityMinimum: number; // % minimum for stability layer
  reasoningBullets: string[]; // 2-4 bullets explaining the stance
  rebalanceTriggers: string[]; // Conditions that would change the stance
  exampleTickers: string[]; // Suggested example tickers (not mandates)
}

// ===== MAIN FUNCTION =====

export function getActionPolicy(
  macroState: MacroState,
  confirmations: Confirmations
): ActionPolicy {
  const deployLayers: PortfolioLayer[] = [];
  const avoidLayers: PortfolioLayer[] = [];
  const reasoningBullets: string[] = [];
  const rebalanceTriggers: string[] = [];
  const exampleTickers: string[] = [];

  // Extract key signals
  const isRiskOn = macroState.regime === "Risk-On";
  const alertLevel = macroState.alertLevel;
  const btcTrend = confirmations.bitcoin?.analysis.trendLevel || "UNKNOWN";
  const microstressLevel = confirmations.microstress?.level || "UNKNOWN";
  const breadthSignal = confirmations.breadth?.signal || "UNKNOWN";

  // ===== GATING RULES =====

  // GATE 1: RED alert blocks high-beta
  if (alertLevel === "RED" && ACTION_POLICY_CONFIG.redAlertBlocksHighBeta) {
    avoidLayers.push("VOLATILITY_ASYMMETRY", "GROWTH_EQUITY");
    reasoningBullets.push("🔴 Alert RED: blocking high-beta adds (MSTR, growth)");
  }

  // GATE 2: BTC RED blocks crypto
  if (btcTrend === "RED" && ACTION_POLICY_CONFIG.btcRedBlocksCrypto) {
    if (!avoidLayers.includes("VOLATILITY_ASYMMETRY")) {
      avoidLayers.push("VOLATILITY_ASYMMETRY");
    }
    reasoningBullets.push("🔴 Bitcoin below 200D MA: blocking MSTR/crypto adds");
  }

  // GATE 3: Microstress blocks risk
  if (
    microstressLevel === "RED" &&
    ACTION_POLICY_CONFIG.microstressRedHardGate
  ) {
    if (!avoidLayers.includes("VOLATILITY_ASYMMETRY")) {
      avoidLayers.push("VOLATILITY_ASYMMETRY");
    }
    if (!avoidLayers.includes("GROWTH_EQUITY")) {
      avoidLayers.push("GROWTH_EQUITY");
    }
    reasoningBullets.push(
      "🔴 Credit microstress RED: hard gate on risk assets"
    );
  } else if (
    microstressLevel === "YELLOW" &&
    ACTION_POLICY_CONFIG.microstressYellowReducesRisk
  ) {
    reasoningBullets.push(
      "🟡 Credit microstress YELLOW: prefer stability + cashflow"
    );
  }

  // GATE 4: Breadth divergence caps growth
  if (
    (breadthSignal === "DIVERGES" || breadthSignal === "NEUTRAL") &&
    ACTION_POLICY_CONFIG.breadthDivergesReducesGrowth
  ) {
    reasoningBullets.push(
      "🟡 Breadth divergence: cap growth, prefer quality cashflow"
    );
  }

  // ===== BASE POLICIES =====

  if (isRiskOn && alertLevel === "GREEN") {
    // Risk-On + GREEN: Allow growth and selective asymmetry

    if (!avoidLayers.includes("GROWTH_EQUITY")) {
      deployLayers.push("GROWTH_EQUITY");
    }

    deployLayers.push("CASHFLOW_EQUITY");

    if (
      btcTrend === "GREEN" &&
      !avoidLayers.includes("VOLATILITY_ASYMMETRY")
    ) {
      deployLayers.push("VOLATILITY_ASYMMETRY");
    }

    reasoningBullets.push("✅ Macro: Risk-On, Alert: GREEN");

    if (btcTrend === "GREEN") {
      reasoningBullets.push("✅ Bitcoin above 200D MA: crypto adds allowed");
    }
  } else if (alertLevel === "YELLOW" || !isRiskOn) {
    // Risk-Off or YELLOW: Defensive stance

    deployLayers.push("CASHFLOW_EQUITY");
    deployLayers.push("STABILITY_DRY_POWDER");

    if (macroState.composites.inflation > 0.5) {
      deployLayers.push("HARD_ASSET_HEDGE");
      reasoningBullets.push(
        "📈 Inflation elevated: hard assets (energy, gold) allowed"
      );
    }

    if (!isRiskOn) {
      reasoningBullets.push("⚠️ Macro: Risk-Off - defensive posture");
    }
    if (alertLevel === "YELLOW") {
      reasoningBullets.push("🟡 Alert YELLOW: caution on new risk");
    }
  } else {
    // Fallback: very defensive
    deployLayers.push("STABILITY_DRY_POWDER", "CASHFLOW_EQUITY");
    reasoningBullets.push("⚠️ Uncertain conditions: hold stability + quality");
  }

  // ===== REBALANCE TRIGGERS =====

  if (macroState.credit.hyOAS !== null) {
    rebalanceTriggers.push(
      `If HY OAS > ${ACTION_POLICY_CONFIG.hyOASRebalanceTrigger}%, shift +5% to Stability`
    );
  }

  if (btcTrend === "RED") {
    rebalanceTriggers.push(
      "If Bitcoin crosses above 200D MA, allow MSTR/crypto adds"
    );
  }

  if (microstressLevel === "GREEN") {
    rebalanceTriggers.push(
      `If Microstress turns ${ACTION_POLICY_CONFIG.microstressRebalanceTrigger}, reduce risk adds`
    );
  }

  // ===== EXAMPLE TICKERS =====

  deployLayers.forEach((layer) => {
    const examples = LAYER_EXAMPLE_TICKERS[layer] || [];
    exampleTickers.push(...examples.slice(0, 3)); // Max 3 per layer
  });

  // ===== SUMMARY =====

  let thisWeekBias = "";
  if (deployLayers.includes("VOLATILITY_ASYMMETRY")) {
    thisWeekBias = "Aggressive: Growth + Asymmetry";
  } else if (deployLayers.includes("GROWTH_EQUITY")) {
    thisWeekBias = "Moderate: Growth + Cashflow";
  } else if (deployLayers.includes("HARD_ASSET_HEDGE")) {
    thisWeekBias = "Defensive + Inflation Hedge";
  } else {
    thisWeekBias = "Defensive: Stability + Quality";
  }

  return {
    thisWeekBias,
    deployLayers: Array.from(new Set(deployLayers)),
    avoidLayers: Array.from(new Set(avoidLayers)),
    stabilityMinimum: ACTION_POLICY_CONFIG.stabilityMinimum,
    reasoningBullets,
    rebalanceTriggers,
    exampleTickers: Array.from(new Set(exampleTickers)),
  };
}
