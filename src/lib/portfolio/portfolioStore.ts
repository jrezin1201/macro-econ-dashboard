/**
 * Portfolio Store
 *
 * LocalStorage-based portfolio persistence.
 * Falls back to demo holdings if user hasn't set their own.
 */

import { Holding, DEMO_HOLDINGS, LayerTarget, LAYER_TARGETS, PortfolioLayer, TICKER_TO_LAYER } from "./portfolioConfig";

const STORAGE_KEY = "finance-dashboard-portfolio";

export interface PortfolioData {
  holdings: Holding[];
  customTargets?: Partial<Record<PortfolioLayer, { min: number; target: number; max: number }>>;
  useDemoHoldings: boolean;
  updatedAt: string;
}

// ===== STORAGE FUNCTIONS =====

function getStoredPortfolio(): PortfolioData | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to parse stored portfolio:", error);
    return null;
  }
}

function savePortfolio(data: PortfolioData): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save portfolio:", error);
  }
}

// ===== PUBLIC API =====

export function getPortfolio(): PortfolioData {
  const stored = getStoredPortfolio();

  if (!stored || stored.useDemoHoldings) {
    return {
      holdings: DEMO_HOLDINGS,
      useDemoHoldings: true,
      updatedAt: new Date().toISOString(),
    };
  }

  return stored;
}

export function setHoldings(holdings: Holding[]): void {
  const current = getPortfolio();
  const updated: PortfolioData = {
    ...current,
    holdings,
    useDemoHoldings: false,
    updatedAt: new Date().toISOString(),
  };
  savePortfolio(updated);
}

export function setTargets(
  customTargets: Partial<Record<PortfolioLayer, { min: number; target: number; max: number }>>
): void {
  const current = getPortfolio();
  const updated: PortfolioData = {
    ...current,
    customTargets,
    updatedAt: new Date().toISOString(),
  };
  savePortfolio(updated);
}

export function toggleDemoMode(useDemoHoldings: boolean): void {
  const current = getPortfolio();
  const updated: PortfolioData = {
    ...current,
    useDemoHoldings,
    holdings: useDemoHoldings ? DEMO_HOLDINGS : current.holdings,
    updatedAt: new Date().toISOString(),
  };
  savePortfolio(updated);
}

export function clearPortfolio(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// ===== LAYER COMPUTATIONS =====

export interface LayerWeights {
  layer: PortfolioLayer;
  totalWeight: number;
  byAccount: {
    "401K": number;
    TAXABLE: number;
    ROTH: number;
  };
  holdings: Holding[];
}

export function computeLayerWeights(holdings: Holding[]): LayerWeights[] {
  const layerMap = new Map<PortfolioLayer, LayerWeights>();

  // Initialize all layers
  const allLayers: PortfolioLayer[] = [
    "VOLATILITY_ASYMMETRY",
    "GROWTH_EQUITY",
    "CASHFLOW_EQUITY",
    "HARD_ASSET_HEDGE",
    "STABILITY_DRY_POWDER",
  ];

  allLayers.forEach((layer) => {
    layerMap.set(layer, {
      layer,
      totalWeight: 0,
      byAccount: { "401K": 0, TAXABLE: 0, ROTH: 0 },
      holdings: [],
    });
  });

  // Classify each holding
  holdings.forEach((holding) => {
    const layer = TICKER_TO_LAYER[holding.ticker.toUpperCase()];

    if (!layer) {
      console.warn(`Unknown ticker: ${holding.ticker}, skipping`);
      return;
    }

    const layerData = layerMap.get(layer)!;
    layerData.totalWeight += holding.weightPct;
    layerData.byAccount[holding.accountType] += holding.weightPct;
    layerData.holdings.push(holding);
  });

  return Array.from(layerMap.values());
}

export interface LayerDelta {
  layer: PortfolioLayer;
  current: number;
  target: number;
  min: number;
  max: number;
  deltaToTarget: number;
  status: "UNDER" | "IN_RANGE" | "OVER";
}

export function computeDeltaFromTargets(
  layerWeights: LayerWeights[],
  customTargets?: Partial<Record<PortfolioLayer, { min: number; target: number; max: number }>>
): LayerDelta[] {
  const targets = LAYER_TARGETS.map((lt) => {
    const custom = customTargets?.[lt.layer];
    return custom ? { ...lt, ...custom } : lt;
  });

  return targets.map((target) => {
    const layerData = layerWeights.find((lw) => lw.layer === target.layer);
    const current = layerData?.totalWeight || 0;

    const deltaToTarget = current - target.target;

    let status: "UNDER" | "IN_RANGE" | "OVER";
    if (current < target.min) {
      status = "UNDER";
    } else if (current > target.max) {
      status = "OVER";
    } else {
      status = "IN_RANGE";
    }

    return {
      layer: target.layer,
      current,
      target: target.target,
      min: target.min,
      max: target.max,
      deltaToTarget,
      status,
    };
  });
}

export function getTopOverweights(deltas: LayerDelta[], count: number = 2): LayerDelta[] {
  return [...deltas]
    .filter((d) => d.status === "OVER")
    .sort((a, b) => b.deltaToTarget - a.deltaToTarget)
    .slice(0, count);
}

export function getTopUnderweights(deltas: LayerDelta[], count: number = 2): LayerDelta[] {
  return [...deltas]
    .filter((d) => d.status === "UNDER")
    .sort((a, b) => a.deltaToTarget - b.deltaToTarget)
    .slice(0, count);
}
