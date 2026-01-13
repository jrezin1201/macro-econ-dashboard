/**
 * Portfolio Calculations
 *
 * Higher-level portfolio analytics that combine holdings data with macro state.
 */

import { PortfolioLayer } from "./portfolioConfig";
import { LayerDelta, LayerWeights } from "./portfolioStore";

export interface SuggestedMoves {
  recommendedBiasAdjustments: BiasAdjustment[];
  allowedAdds: PortfolioLayer[];
  avoidAdds: PortfolioLayer[];
  reasoning: string[];
}

export interface BiasAdjustment {
  layer: PortfolioLayer;
  direction: "INCREASE" | "DECREASE" | "MAINTAIN";
  magnitudePct: number; // e.g., +5, -3
  rationale: string;
}

/**
 * Compute suggested portfolio moves based on:
 * 1. Current vs target deltas
 * 2. Macro regime state
 * 3. Confirmation layers
 * 4. Action policy gating rules
 *
 * This is a helper that feeds into actionPolicy.ts
 */
export function computeSuggestedMoves(
  layerWeights: LayerWeights[],
  deltas: LayerDelta[],
  macroState: {
    regime: string;
    alertLevel: string;
    composites: {
      growth: number;
      inflation: number;
      creditStress: number;
      liquidityImpulse: number;
    };
  },
  confirmations: {
    breadth?: { signal: string; level: string };
    bitcoin?: { analysis: { trendLevel: string } };
    microstress?: { level: string };
  }
): SuggestedMoves {
  const reasoning: string[] = [];
  const recommendedBiasAdjustments: BiasAdjustment[] = [];
  const allowedAdds: PortfolioLayer[] = [];
  const avoidAdds: PortfolioLayer[] = [];

  // Extract key signals
  const isRiskOn = macroState.regime === "Risk-On";
  const isGreenAlert = macroState.alertLevel === "GREEN";
  const btcIsGreen = confirmations.bitcoin?.analysis.trendLevel === "GREEN";
  const microstressIsGreen = confirmations.microstress?.level === "GREEN";
  const breadthConfirms = confirmations.breadth?.signal === "CONFIRMS";

  // GATING RULE 1: RED alert blocks high-beta adds
  if (macroState.alertLevel === "RED") {
    avoidAdds.push("VOLATILITY_ASYMMETRY", "GROWTH_EQUITY");
    reasoning.push("RED alert: avoid high-beta adds");
  }

  // GATING RULE 2: BTC RED blocks crypto adds
  if (!btcIsGreen) {
    avoidAdds.push("VOLATILITY_ASYMMETRY");
    reasoning.push("Bitcoin below 200D MA: avoid MSTR/crypto adds");
  }

  // GATING RULE 3: Microstress not GREEN reduces risk
  if (!microstressIsGreen) {
    reasoning.push("Microstress elevated: prefer stability + cashflow");
  }

  // GATING RULE 4: Breadth divergence caps growth
  if (!breadthConfirms && confirmations.breadth) {
    reasoning.push("Breadth divergence: cap growth adds, prefer quality");
  }

  // BASE POLICY: Risk-On + GREEN
  if (isRiskOn && isGreenAlert) {
    if (!avoidAdds.includes("GROWTH_EQUITY")) {
      allowedAdds.push("GROWTH_EQUITY");
    }
    allowedAdds.push("CASHFLOW_EQUITY");

    if (btcIsGreen && !avoidAdds.includes("VOLATILITY_ASYMMETRY")) {
      allowedAdds.push("VOLATILITY_ASYMMETRY");
    }

    reasoning.push("Risk-On + GREEN: growth and selective asymmetry allowed");
  }

  // BASE POLICY: Risk-Off or YELLOW
  if (!isRiskOn || macroState.alertLevel === "YELLOW") {
    allowedAdds.push("CASHFLOW_EQUITY", "STABILITY_DRY_POWDER");

    if (macroState.composites.inflation > 0.5) {
      allowedAdds.push("HARD_ASSET_HEDGE");
      reasoning.push("Inflation elevated: hard assets allowed");
    }

    reasoning.push("Risk-Off or caution: prefer cashflow and stability");
  }

  // Bias adjustments based on deltas
  deltas.forEach((delta) => {
    if (delta.status === "OVER") {
      recommendedBiasAdjustments.push({
        layer: delta.layer,
        direction: "DECREASE",
        magnitudePct: Math.min(5, Math.abs(delta.deltaToTarget)),
        rationale: `${Math.abs(delta.deltaToTarget).toFixed(1)}% above target`,
      });
    } else if (delta.status === "UNDER") {
      // Only suggest increase if layer is in allowedAdds
      if (allowedAdds.includes(delta.layer)) {
        recommendedBiasAdjustments.push({
          layer: delta.layer,
          direction: "INCREASE",
          magnitudePct: Math.min(5, Math.abs(delta.deltaToTarget)),
          rationale: `${Math.abs(delta.deltaToTarget).toFixed(1)}% below target`,
        });
      }
    }
  });

  // Deduplicate arrays
  const uniqueAllowedAdds = Array.from(new Set(allowedAdds));
  const uniqueAvoidAdds = Array.from(new Set(avoidAdds));

  return {
    recommendedBiasAdjustments,
    allowedAdds: uniqueAllowedAdds,
    avoidAdds: uniqueAvoidAdds,
    reasoning,
  };
}
