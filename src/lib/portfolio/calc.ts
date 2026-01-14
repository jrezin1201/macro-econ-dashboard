/**
 * Portfolio Calculations
 *
 * Derived computations from portfolio holdings:
 * - Engine allocations
 * - Delta from targets
 * - Risk summary
 * - Top over/underweights
 */

import type {
  Portfolio,
  Holding,
  EngineId,
  EngineTargets,
  EngineDelta,
  AccountType,
  DeltaStatus,
} from "./schema";
import { getEngineForHolding } from "@/lib/engines/engineConfig";
import type { CompanyProfile } from "@/lib/company/providers/types";

/**
 * Engine allocation by account type
 */
export interface EngineAllocation {
  engine: EngineId;
  totalPct: number;
  byAccount: Record<AccountType, number>;
  holdings: Holding[];
}

/**
 * Account totals
 */
export interface AccountTotal {
  account: AccountType;
  totalPct: number;
  holdings: Holding[];
}

/**
 * Portfolio summary (consumed by all dashboards)
 */
export interface PortfolioSummary {
  // Totals
  totalByAccount: AccountTotal[];
  totalByEngine: EngineAllocation[];

  // Deltas
  engineDeltas: EngineDelta[];
  topOverweights: EngineDelta[];
  topUnderweights: EngineDelta[];

  // Risk metrics
  riskSummary: {
    highBetaExposure: number; // VOLATILITY_OPTIONALITY + part of GROWTH_DURATION
    defensiveExposure: number; // CASHFLOW_COMPOUNDERS + CREDIT_CARRY + GOLD_SCARCITY
    cyclicalExposure: number; // ENERGY + SMALL_CAPS + SPECIAL_SITUATIONS
  };

  // Validation
  isValid: boolean;
  totalWeight: number;
}

/**
 * Compute totals by account
 */
export function computeTotalsByAccount(holdings: Holding[]): AccountTotal[] {
  const accountMap = new Map<AccountType, AccountTotal>();

  // Initialize all account types
  const allAccounts: AccountType[] = ["TAXABLE", "ROTH", "401K", "OTHER"];
  allAccounts.forEach((account) => {
    accountMap.set(account, {
      account,
      totalPct: 0,
      holdings: [],
    });
  });

  // Sum holdings by account
  holdings.forEach((holding) => {
    const accountData = accountMap.get(holding.account)!;
    accountData.totalPct += holding.weightPct;
    accountData.holdings.push(holding);
  });

  return Array.from(accountMap.values()).filter((a) => a.totalPct > 0);
}

/**
 * Compute totals by engine
 * Optionally pass company profiles for better classification
 */
export function computeTotalsByEngine(
  holdings: Holding[],
  companyProfiles?: Map<string, CompanyProfile>
): EngineAllocation[] {
  const engineMap = new Map<EngineId, EngineAllocation>();

  // Classify each holding and aggregate by engine
  holdings.forEach((holding) => {
    const profile = companyProfiles?.get(holding.ticker.toUpperCase());
    const classification = getEngineForHolding(holding, profile);
    const engine = classification.engine;

    if (!engineMap.has(engine)) {
      engineMap.set(engine, {
        engine,
        totalPct: 0,
        byAccount: {
          TAXABLE: 0,
          ROTH: 0,
          "401K": 0,
          OTHER: 0,
        },
        holdings: [],
      });
    }

    const engineData = engineMap.get(engine)!;
    engineData.totalPct += holding.weightPct;
    engineData.byAccount[holding.account] += holding.weightPct;
    engineData.holdings.push(holding);
  });

  // Sort by total percentage (descending)
  return Array.from(engineMap.values()).sort(
    (a, b) => b.totalPct - a.totalPct
  );
}

/**
 * Compute delta from targets for each engine
 */
export function computeDeltaFromTargets(
  engineAllocations: EngineAllocation[],
  targets: EngineTargets
): EngineDelta[] {
  const allEngines = Object.keys(targets) as EngineId[];

  return allEngines.map((engine) => {
    const allocation = engineAllocations.find((a) => a.engine === engine);
    const currentPct = allocation?.totalPct || 0;
    const target = targets[engine];

    const delta = currentPct - target.target;

    let status: DeltaStatus;
    if (currentPct < target.min) {
      status = "UNDER";
    } else if (currentPct > target.max) {
      status = "OVER";
    } else {
      status = "IN_RANGE";
    }

    return {
      engine,
      currentPct,
      targetPct: target.target,
      minPct: target.min,
      maxPct: target.max,
      delta,
      status,
    };
  });
}

/**
 * Get top N overweight engines
 */
export function getTopOverweights(
  deltas: EngineDelta[],
  count: number = 3
): EngineDelta[] {
  return [...deltas]
    .filter((d) => d.status === "OVER")
    .sort((a, b) => b.delta - a.delta)
    .slice(0, count);
}

/**
 * Get top N underweight engines
 */
export function getTopUnderweights(
  deltas: EngineDelta[],
  count: number = 3
): EngineDelta[] {
  return [...deltas]
    .filter((d) => d.status === "UNDER")
    .sort((a, b) => a.delta - b.delta)
    .slice(0, count);
}

/**
 * Compute risk summary
 */
function computeRiskSummary(engineAllocations: EngineAllocation[]) {
  const getEngineWeight = (engine: EngineId) => {
    return engineAllocations.find((a) => a.engine === engine)?.totalPct || 0;
  };

  // High beta = full VOLATILITY_OPTIONALITY + 50% of GROWTH_DURATION
  const highBetaExposure =
    getEngineWeight("VOLATILITY_OPTIONALITY") +
    getEngineWeight("GROWTH_DURATION") * 0.5;

  // Defensive = CASHFLOW_COMPOUNDERS + CREDIT_CARRY + GOLD_SCARCITY
  const defensiveExposure =
    getEngineWeight("CASHFLOW_COMPOUNDERS") +
    getEngineWeight("CREDIT_CARRY") +
    getEngineWeight("GOLD_SCARCITY");

  // Cyclical = ENERGY + SMALL_CAPS + SPECIAL_SITUATIONS + INFRASTRUCTURE (partially)
  const cyclicalExposure =
    getEngineWeight("ENERGY_COMMODITIES") +
    getEngineWeight("SMALL_CAPS_DOMESTIC") +
    getEngineWeight("SPECIAL_SITUATIONS") +
    getEngineWeight("INFRASTRUCTURE_CAPEX") * 0.5;

  return {
    highBetaExposure,
    defensiveExposure,
    cyclicalExposure,
  };
}

/**
 * Generate portfolio summary (used everywhere)
 */
export function generatePortfolioSummary(
  portfolio: Portfolio,
  companyProfiles?: Map<string, CompanyProfile>
): PortfolioSummary {
  const { holdings, targets } = portfolio;

  // Compute totals
  const totalByAccount = computeTotalsByAccount(holdings);
  const totalByEngine = computeTotalsByEngine(holdings, companyProfiles);

  // Compute deltas
  const engineDeltas = computeDeltaFromTargets(totalByEngine, targets);
  const topOverweights = getTopOverweights(engineDeltas, 3);
  const topUnderweights = getTopUnderweights(engineDeltas, 3);

  // Compute risk
  const riskSummary = computeRiskSummary(totalByEngine);

  // Validation
  const totalWeight = holdings.reduce((sum, h) => sum + h.weightPct, 0);
  const isValid = Math.abs(totalWeight - 100) <= 0.25;

  return {
    totalByAccount,
    totalByEngine,
    engineDeltas,
    topOverweights,
    topUnderweights,
    riskSummary,
    isValid,
    totalWeight,
  };
}
