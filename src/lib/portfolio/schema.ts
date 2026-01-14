/**
 * Portfolio Schema - Single Source of Truth
 *
 * Defines the canonical portfolio structure used across the entire app.
 */

export type AccountType = "TAXABLE" | "ROTH" | "401K" | "OTHER";

export type AssetType =
  | "EQUITY"
  | "ETF"
  | "CRYPTO"
  | "BOND"
  | "CASH"
  | "COMMODITY"
  | "REIT"
  | "OTHER";

export type EngineId =
  | "VOLATILITY_OPTIONALITY"
  | "GROWTH_DURATION"
  | "CASHFLOW_COMPOUNDERS"
  | "CREDIT_CARRY"
  | "ENERGY_COMMODITIES"
  | "GOLD_SCARCITY"
  | "REAL_ESTATE_RENT"
  | "DEFENSE_GEOPOLITICS"
  | "INFRASTRUCTURE_CAPEX"
  | "SMALL_CAPS_DOMESTIC"
  | "INTERNATIONAL_FX_EM"
  | "SPECIAL_SITUATIONS";

export interface Holding {
  id: string; // uuid
  ticker: string; // uppercase, allow "CASH"
  name?: string; // optional display name
  account: AccountType;
  weightPct: number; // 0–100, total should sum to 100
  assetType?: AssetType;
  engineOverride?: EngineId; // manual classification override
  notes?: string;
}

export interface EngineTarget {
  min: number; // % minimum allocation
  target: number; // % target allocation
  max: number; // % maximum allocation
}

export type EngineTargets = Record<EngineId, EngineTarget>;

export interface Portfolio {
  version: number; // for migrations (current: 1)
  holdings: Holding[];
  targets: EngineTargets; // user-editable target ranges
  useDemoHoldings: boolean; // if true, use demo data
  updatedAt: string; // ISO timestamp
}

/**
 * Validation result
 */
export interface ValidationResult {
  ok: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Engine classification result
 */
export interface EngineClassification {
  engine: EngineId;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  reason: string;
}

/**
 * Portfolio delta status
 */
export type DeltaStatus = "UNDER" | "IN_RANGE" | "OVER";

export interface EngineDelta {
  engine: EngineId;
  currentPct: number;
  targetPct: number;
  minPct: number;
  maxPct: number;
  delta: number; // currentPct - targetPct
  status: DeltaStatus;
}
