/**
 * Portfolio Store - Global State Management
 *
 * LocalStorage-based persistence for portfolio holdings and engine targets.
 * Single source of truth for portfolio state across the app.
 */

import { v4 as uuidv4 } from "uuid";
import type { Portfolio, Holding, EngineTargets, ValidationResult, AccountType } from "./schema";
import { defaultTargets } from "@/lib/engines/engineConfig";

const STORAGE_KEY = "portfolio_v1";
const WEIGHT_TOLERANCE = 0.25; // Allow 99.75% - 100.25%

/**
 * Demo portfolio (Jordan's approximate holdings)
 * Used as fallback when user hasn't set their own
 */
const DEMO_HOLDINGS: Holding[] = [
  {
    id: uuidv4(),
    ticker: "QQQM",
    name: "Invesco NASDAQ 100 ETF",
    account: "401K",
    weightPct: 35,
    assetType: "ETF",
  },
  {
    id: uuidv4(),
    ticker: "SGOV",
    name: "iShares 0-3 Month Treasury Bond ETF",
    account: "401K",
    weightPct: 30,
    assetType: "ETF",
  },
  {
    id: uuidv4(),
    ticker: "MSTR",
    name: "MicroStrategy",
    account: "TAXABLE",
    weightPct: 15,
    assetType: "EQUITY",
  },
  {
    id: uuidv4(),
    ticker: "MSFT",
    name: "Microsoft",
    account: "ROTH",
    weightPct: 10,
    assetType: "EQUITY",
  },
  {
    id: uuidv4(),
    ticker: "GLD",
    name: "SPDR Gold Shares",
    account: "TAXABLE",
    weightPct: 5,
    assetType: "ETF",
  },
  {
    id: uuidv4(),
    ticker: "VNQ",
    name: "Vanguard Real Estate ETF",
    account: "ROTH",
    weightPct: 5,
    assetType: "ETF",
  },
];

/**
 * Get stored portfolio from localStorage
 */
function getStoredPortfolio(): Portfolio | null {
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

/**
 * Save portfolio to localStorage
 */
function persistPortfolio(portfolio: Portfolio): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
  } catch (error) {
    console.error("Failed to save portfolio:", error);
  }
}

/**
 * Create a new empty portfolio
 */
function createEmptyPortfolio(): Portfolio {
  return {
    version: 1,
    holdings: [],
    targets: defaultTargets,
    useDemoHoldings: true,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Create demo portfolio
 */
function createDemoPortfolio(): Portfolio {
  return {
    version: 1,
    holdings: DEMO_HOLDINGS,
    targets: defaultTargets,
    useDemoHoldings: true,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Get current portfolio (from storage or demo)
 */
export function getPortfolio(): Portfolio {
  const stored = getStoredPortfolio();

  // If no stored portfolio or using demo, return demo
  if (!stored || stored.useDemoHoldings) {
    return createDemoPortfolio();
  }

  return stored;
}

/**
 * Save entire portfolio
 */
export function savePortfolio(portfolio: Portfolio): void {
  const updated: Portfolio = {
    ...portfolio,
    updatedAt: new Date().toISOString(),
  };
  persistPortfolio(updated);
}

/**
 * Update holdings
 */
export function updateHoldings(holdings: Holding[]): void {
  const current = getPortfolio();
  const updated: Portfolio = {
    ...current,
    holdings,
    useDemoHoldings: false,
    updatedAt: new Date().toISOString(),
  };
  persistPortfolio(updated);
}

/**
 * Update engine targets
 */
export function updateTargets(targets: EngineTargets): void {
  const current = getPortfolio();
  const updated: Portfolio = {
    ...current,
    targets,
    updatedAt: new Date().toISOString(),
  };
  persistPortfolio(updated);
}

/**
 * Add a new holding
 */
export function addHolding(ticker: string, account: AccountType, weightPct: number): void {
  const current = getPortfolio();
  const newHolding: Holding = {
    id: uuidv4(),
    ticker: ticker.toUpperCase(),
    account,
    weightPct,
  };

  const updated: Portfolio = {
    ...current,
    holdings: [...current.holdings, newHolding],
    useDemoHoldings: false,
    updatedAt: new Date().toISOString(),
  };
  persistPortfolio(updated);
}

/**
 * Remove a holding by ID
 */
export function removeHolding(id: string): void {
  const current = getPortfolio();
  const updated: Portfolio = {
    ...current,
    holdings: current.holdings.filter((h) => h.id !== id),
    useDemoHoldings: false,
    updatedAt: new Date().toISOString(),
  };
  persistPortfolio(updated);
}

/**
 * Update a specific holding
 */
export function updateHolding(id: string, updates: Partial<Holding>): void {
  const current = getPortfolio();
  const updated: Portfolio = {
    ...current,
    holdings: current.holdings.map((h) =>
      h.id === id ? { ...h, ...updates } : h
    ),
    useDemoHoldings: false,
    updatedAt: new Date().toISOString(),
  };
  persistPortfolio(updated);
}

/**
 * Reset to defaults (demo portfolio + default targets)
 */
export function resetToDefaults(): void {
  persistPortfolio(createDemoPortfolio());
}

/**
 * Toggle demo mode
 */
export function toggleDemoMode(useDemoHoldings: boolean): void {
  const current = getPortfolio();
  const updated: Portfolio = {
    ...current,
    useDemoHoldings,
    holdings: useDemoHoldings ? DEMO_HOLDINGS : current.holdings,
    updatedAt: new Date().toISOString(),
  };
  persistPortfolio(updated);
}

/**
 * Clear portfolio from storage
 */
export function clearPortfolio(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Validate portfolio
 */
export function validatePortfolio(holdings: Holding[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if holdings exist
  if (holdings.length === 0) {
    warnings.push("Portfolio is empty");
    return { ok: true, errors, warnings };
  }

  // Calculate total weight
  const totalWeight = holdings.reduce((sum, h) => sum + h.weightPct, 0);

  // Check weight sum (with tolerance)
  if (Math.abs(totalWeight - 100) > WEIGHT_TOLERANCE) {
    errors.push(
      `Total weight is ${totalWeight.toFixed(2)}% (must be 100% ± ${WEIGHT_TOLERANCE}%)`
    );
  }

  // Check for negative weights
  holdings.forEach((h) => {
    if (h.weightPct < 0) {
      errors.push(`${h.ticker} has negative weight: ${h.weightPct}%`);
    }
  });

  // Check for unknown tickers without asset type
  holdings.forEach((h) => {
    if (!h.assetType && h.ticker !== "CASH") {
      warnings.push(
        `${h.ticker} has no asset type set - classification may be inaccurate`
      );
    }
  });

  // Check for duplicate tickers
  const tickers = new Set<string>();
  holdings.forEach((h) => {
    const ticker = h.ticker.toUpperCase();
    if (tickers.has(ticker)) {
      warnings.push(`Duplicate ticker: ${ticker}`);
    }
    tickers.add(ticker);
  });

  return {
    ok: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Normalize weights to sum to 100%
 * Useful helper function for the UI
 */
export function normalizeWeights(holdings: Holding[]): Holding[] {
  if (holdings.length === 0) return holdings;

  const totalWeight = holdings.reduce((sum, h) => sum + h.weightPct, 0);
  if (totalWeight === 0) return holdings;

  return holdings.map((h) => ({
    ...h,
    weightPct: (h.weightPct / totalWeight) * 100,
  }));
}
