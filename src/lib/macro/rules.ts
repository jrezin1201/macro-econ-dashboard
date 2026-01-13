/**
 * Macro Regime Analysis - Rules Engine
 *
 * Generates alerts and portfolio tilt recommendations
 */

import type { AlertInfo, PortfolioTilt, MacroComposites, AlertLevel } from "./types";
import { THRESHOLDS } from "./config";

interface RulesInput {
  composites: MacroComposites;
  rates: {
    fedfunds: number | null;
    dgs2: number | null;
    dgs10: number | null;
    curve10_2: number | null;
  };
  credit: {
    hyOAS: number | null;
    hyOAS_8wChange: number | null;
    stlFSI: number | null;
  };
}

/**
 * Evaluate all alert conditions and determine alert level
 */
export function evaluateAlerts(input: RulesInput): AlertInfo {
  const reasons: string[] = [];
  let level: AlertLevel = "GREEN";

  const { composites, rates, credit } = input;

  // RED CONDITIONS (any of these triggers RED)
  const redConditions: string[] = [];

  // 1. HY OAS spike
  if (credit.hyOAS !== null && credit.hyOAS >= THRESHOLDS.hyOAS_red) {
    redConditions.push(`Credit stress: HY OAS at ${credit.hyOAS.toFixed(2)}% (threshold: ${THRESHOLDS.hyOAS_red}%)`);
  }

  // 2. HY OAS rapid increase
  if (credit.hyOAS_8wChange !== null && credit.hyOAS_8wChange >= THRESHOLDS.hyOAS_spikeThreshold) {
    redConditions.push(`Credit deterioration: HY OAS +${credit.hyOAS_8wChange.toFixed(2)}% in 8 weeks`);
  }

  // 3. Financial stress extreme
  if (credit.stlFSI !== null && credit.stlFSI > THRESHOLDS.stlFSI_red) {
    redConditions.push(`Financial stress elevated: FSI at ${credit.stlFSI.toFixed(2)} (threshold: ${THRESHOLDS.stlFSI_red})`);
  }

  // 4. Liquidity crisis
  if (composites.liquidityImpulse <= THRESHOLDS.liquidityComposite_red) {
    redConditions.push(`Severe liquidity drain: z=${composites.liquidityImpulse.toFixed(2)} (threshold: ${THRESHOLDS.liquidityComposite_red})`);
  }

  if (redConditions.length > 0) {
    level = "RED";
    reasons.push(...redConditions);
  }

  // YELLOW CONDITIONS (if not RED)
  if (level !== "RED") {
    const yellowConditions: string[] = [];

    // 1. HY OAS elevated
    if (credit.hyOAS !== null && credit.hyOAS >= THRESHOLDS.hyOAS_yellow) {
      yellowConditions.push(`Credit spreads widening: HY OAS at ${credit.hyOAS.toFixed(2)}%`);
    }

    // 2. Financial stress warning
    if (credit.stlFSI !== null && credit.stlFSI > THRESHOLDS.stlFSI_yellow) {
      yellowConditions.push(`Financial stress rising: FSI at ${credit.stlFSI.toFixed(2)}`);
    }

    // 3. Deep inversion
    if (rates.curve10_2 !== null && rates.curve10_2 <= THRESHOLDS.deepInversionThreshold) {
      yellowConditions.push(`Deep yield curve inversion: ${rates.curve10_2.toFixed(2)}%`);
    }

    // 4. Inflation pressure
    if (composites.inflation >= THRESHOLDS.inflationComposite_yellow) {
      yellowConditions.push(`Elevated inflation pressure: z=${composites.inflation.toFixed(2)}`);
    }

    // 5. Liquidity tightening
    if (composites.liquidityImpulse <= THRESHOLDS.liquidityComposite_yellow) {
      yellowConditions.push(`Liquidity tightening: z=${composites.liquidityImpulse.toFixed(2)}`);
    }

    // 6. High rate regime
    if (rates.fedfunds !== null && rates.fedfunds >= THRESHOLDS.highRateLevel) {
      yellowConditions.push(`High rate regime: Fed Funds at ${rates.fedfunds.toFixed(2)}%`);
    }

    if (yellowConditions.length > 0) {
      level = "YELLOW";
      reasons.push(...yellowConditions);
    }
  }

  // GREEN (default if no warnings)
  if (level === "GREEN") {
    reasons.push("No major macro warnings detected");

    // Add positive signals
    if (composites.growth > 0) {
      reasons.push(`Positive growth momentum (z=${composites.growth.toFixed(2)})`);
    }
    if (credit.hyOAS !== null && credit.hyOAS < THRESHOLDS.hyOAS_yellow) {
      reasons.push(`Credit spreads healthy (${credit.hyOAS.toFixed(2)}%)`);
    }
    if (composites.liquidityImpulse > 0) {
      reasons.push(`Liquidity supportive (z=${composites.liquidityImpulse.toFixed(2)})`);
    }
  }

  return {
    level,
    reasons,
    timestamp: new Date(),
  };
}

/**
 * Generate portfolio tilt recommendations based on alert level
 */
export function generatePortfolioTilts(
  alertLevel: AlertLevel,
  composites: MacroComposites,
  credit: { hyOAS: number | null }
): PortfolioTilt {
  const tilt: PortfolioTilt = {
    add: [],
    reduce: [],
    notes: [],
    rebalanceHint: "",
  };

  switch (alertLevel) {
    case "GREEN": {
      // Risk-On positioning
      tilt.add = [
        "Growth Equity (QQQ, mega-cap growth)",
        "Semis/Software exposure",
        "Select asymmetric opportunities",
      ];
      tilt.reduce = [
        "Excess cash (only marginally)",
      ];
      tilt.notes = [
        "Environment supports risk deployment",
        "Ok to deploy new contributions",
        "Keep core ballast intact (don't abandon dry powder entirely)",
        "Monitor for regime shift signals",
      ];
      tilt.rebalanceHint = "Rebalance bias: Can add risk on dips. Maintain 10-15% Stability layer minimum.";
      break;
    }

    case "YELLOW": {
      // Caution / Late cycle
      tilt.add = [
        "Cash-Flow Equity (staples, healthcare, defense, quality)",
        "Hard Asset Hedge (energy, commodities, REITs)",
        "Increase Stability layer (T-bills, short duration)",
      ];
      tilt.reduce = [
        "New Volatility/Asymmetry exposure (reduce new MSTR-like adds)",
        "Highest beta growth positions",
        "Avoid adding leverage",
      ];
      tilt.notes = [
        "Late-cycle or tightening environment",
        "Deploy capital slower; preserve dry powder",
        "Prefer quality over speculation",
        "Consider trimming most extended positions",
        "Wait for better risk/reward setups",
      ];
      tilt.rebalanceHint = "Rebalance bias: +10% Stability, +5% Cash-Flow Equity, -5% Volatility adds. Hold until conditions improve.";
      break;
    }

    case "RED": {
      // Risk-Off / Defensive
      tilt.add = [
        "Stability/Dry Powder (T-bills, short duration bonds)",
        "Cash-Flow Equity (defensive quality)",
        "Gold/Commodities hedge (if not overweight)",
      ];
      tilt.reduce = [
        "Volatility/Asymmetry layer (trim MSTR-like exposure if prudent)",
        "High beta growth equity",
        "Speculative positions",
        "Any leveraged exposure",
      ];
      tilt.notes = [
        "⚠️ RISK-OFF: Credit event risk or financial stress detected",
        "Prioritize capital preservation over returns",
        "Increase cash/dry powder to 20-30%+",
        "This is a survivability phase",
        "Opportunity will come when spreads normalize",
      ];

      // Dynamic rebalance hint based on conditions
      const hyTarget = credit.hyOAS !== null && credit.hyOAS < THRESHOLDS.hyOAS_yellow ? credit.hyOAS.toFixed(1) : "5.0";
      const liqTarget = composites.liquidityImpulse > THRESHOLDS.liquidityComposite_yellow ? composites.liquidityImpulse.toFixed(2) : "-0.5";

      tilt.rebalanceHint = `Rebalance bias: +15-20% Stability, +10% Cash-Flow, -15% Volatility adds. Re-enter risk when HY OAS < ${hyTarget}% AND liquidity z > ${liqTarget}.`;
      break;
    }
  }

  return tilt;
}

/**
 * Main rules engine entry point
 */
export function runRulesEngine(input: RulesInput): {
  alert: AlertInfo;
  tilts: PortfolioTilt;
} {
  const alert = evaluateAlerts(input);
  const tilts = generatePortfolioTilts(alert.level, input.composites, input.credit);

  return { alert, tilts };
}
