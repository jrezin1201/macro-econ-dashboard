/**
 * Economic Engines Configuration
 *
 * Defines the 12 economic engines, their characteristics, examples, and classification rules.
 */

import type { EngineId, EngineTargets, Holding, EngineClassification, AssetType } from "@/lib/portfolio/schema";
import type { CompanyProfile } from "@/lib/company/providers/types";

export interface Engine {
  id: EngineId;
  label: string;
  description: string;
  whatWins: string[]; // 3-5 bullet points explaining what drives returns
  examples: string[]; // 6-10 example tickers/ETFs (not advice, just examples)
  macroDrivers: {
    helps: string[]; // conditions that favor this engine
    hurts: string[]; // conditions that penalize this engine
  };
}

/**
 * The 12 Economic Engines
 */
export const engines: Engine[] = [
  {
    id: "VOLATILITY_OPTIONALITY",
    label: "Volatility & Optionality",
    description:
      "High-beta, convex assets that thrive in liquidity surges and risk-on environments. Think crypto proxies, high-volatility tech, and assets with embedded optionality.",
    whatWins: [
      "Liquidity injections (Fed easing, QE resumption)",
      "Risk-on sentiment and animal spirits",
      "Falling real rates and rising speculative flows",
      "Crypto bull markets and narrative-driven rallies",
    ],
    examples: ["MSTR", "COIN", "ARKK", "TQQQ", "High beta tech"],
    macroDrivers: {
      helps: [
        "Liquidity rising (Fed balance sheet expansion)",
        "BTC above 200D MA",
        "Risk-On regime",
        "Low credit stress",
      ],
      hurts: [
        "BTC below 200D MA",
        "Risk-Off regime",
        "Credit stress rising",
        "Fed tightening",
      ],
    },
  },
  {
    id: "GROWTH_DURATION",
    label: "Growth & Duration",
    description:
      "Long-duration growth stocks that discount far-future cash flows. Winners in falling rate environments with stable growth expectations.",
    whatWins: [
      "Falling interest rates (especially real rates)",
      "Stable or rising growth expectations",
      "Multiple expansion in low-rate regimes",
      "Strong earnings momentum and secular growth narratives",
    ],
    examples: ["QQQM", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "TSM"],
    macroDrivers: {
      helps: [
        "Rates falling",
        "Yield curve steepening",
        "Growth stable/rising",
        "Low inflation",
      ],
      hurts: [
        "Rates rising sharply",
        "Inflation surging",
        "Growth slowing",
        "Multiple compression",
      ],
    },
  },
  {
    id: "CASHFLOW_COMPOUNDERS",
    label: "Cashflow Compounders",
    description:
      "High-quality businesses with durable competitive advantages, strong free cash flow, and resilient margins across cycles.",
    whatWins: [
      "Pricing power and brand strength",
      "Consistent FCF generation through cycles",
      "Capital discipline (buybacks, dividends, intelligent M&A)",
      "Low operational leverage to macro swings",
    ],
    examples: ["BRK.B", "PG", "KO", "UNH", "JNJ", "AAPL", "V", "MA"],
    macroDrivers: {
      helps: [
        "Stable macro (no extreme moves)",
        "Inflation (if they have pricing power)",
        "Risk-off (defensive bid)",
      ],
      hurts: ["Severe recession", "Deflationary collapse"],
    },
  },
  {
    id: "CREDIT_CARRY",
    label: "Credit & Carry",
    description:
      "Short-duration bonds, money market funds, and credit instruments that capture yield with minimal duration risk.",
    whatWins: [
      "High nominal policy rates (Fed funds elevated)",
      "Stable or tightening credit spreads",
      "Inverted yield curve (short rates > long rates)",
      "Safe haven flows during uncertainty",
    ],
    examples: ["SGOV", "BIL", "SHY", "JPST", "VMFXX", "Cash"],
    macroDrivers: {
      helps: [
        "High Fed funds rate",
        "Curve inverted",
        "Credit stress LOW",
        "Uncertainty (flight to safety)",
      ],
      hurts: [
        "Fed cutting aggressively",
        "Credit spreads blowing out",
        "Inflation eroding real returns",
      ],
    },
  },
  {
    id: "ENERGY_COMMODITIES",
    label: "Energy & Commodities",
    description:
      "Energy producers and commodity exposure that benefit from inflation, supply constraints, or geopolitical risk premia.",
    whatWins: [
      "Rising oil prices (supply shocks, demand surges)",
      "Inflation expectations climbing",
      "Geopolitical risk (war, sanctions, OPEC cuts)",
      "Weak USD (commodities priced in dollars)",
    ],
    examples: ["XOM", "CVX", "XLE", "DBC", "USO"],
    macroDrivers: {
      helps: [
        "Inflation rising",
        "USD falling",
        "Geopolitical tensions",
        "Supply constraints",
      ],
      hurts: [
        "Recession (demand collapse)",
        "USD surging",
        "Supply gluts",
        "Deflation",
      ],
    },
  },
  {
    id: "GOLD_SCARCITY",
    label: "Gold & Scarcity",
    description:
      "Monetary metals and scarcity assets that serve as stores of value, inflation hedges, and crisis insurance.",
    whatWins: [
      "Negative real rates (nominal rates < inflation)",
      "Central bank debasement fears",
      "Geopolitical instability and war",
      "Loss of confidence in fiat currencies",
    ],
    examples: ["GLD", "IAU", "Physical gold"],
    macroDrivers: {
      helps: [
        "Real rates negative",
        "Inflation high",
        "USD weakening",
        "Geopolitical crisis",
      ],
      hurts: [
        "Real rates rising sharply",
        "USD strengthening",
        "Deflationary environment",
      ],
    },
  },
  {
    id: "REAL_ESTATE_RENT",
    label: "Real Estate & Rent",
    description:
      "REITs and real estate proxies that generate income from rent and benefit from replacement cost dynamics and scarcity.",
    whatWins: [
      "Falling long-term rates (cap rate compression)",
      "Strong rental demand and pricing power",
      "Supply constraints (hard to build new)",
      "Inflation (replacement cost rises)",
    ],
    examples: ["VNQ", "O", "DLR", "PLD", "EQIX"],
    macroDrivers: {
      helps: [
        "Long rates falling",
        "Inflation (replacement cost)",
        "Strong economy (rent demand)",
      ],
      hurts: [
        "Long rates spiking",
        "Recession (rent defaults)",
        "Oversupply",
      ],
    },
  },
  {
    id: "DEFENSE_GEOPOLITICS",
    label: "Defense & Geopolitics",
    description:
      "Defense contractors and geopolitical beneficiaries that profit from rising global tensions and military spending.",
    whatWins: [
      "Rising defense budgets (war, cold war 2.0)",
      "Geopolitical fragmentation (US/China/Russia)",
      "Multi-year procurement cycles (sticky revenue)",
      "Bipartisan political support for defense",
    ],
    examples: ["RTX", "LMT", "NOC", "GD", "ITA"],
    macroDrivers: {
      helps: [
        "War or rising tensions",
        "Bipartisan defense spending",
        "NATO expansion",
      ],
      hurts: ["Peace dividend", "Budget cuts", "Isolationism"],
    },
  },
  {
    id: "INFRASTRUCTURE_CAPEX",
    label: "Infrastructure & Capex",
    description:
      "Electrification, grid buildout, and capital equipment plays that benefit from secular infrastructure investment cycles.",
    whatWins: [
      "Government stimulus (IIJA, IRA, CHIPS Act)",
      "Electrification megatrend (data centers, EVs, grid)",
      "Reshoring and manufacturing renaissance",
      "Multi-year capex cycles (utilities, industrials)",
    ],
    examples: ["ETN", "PWR", "CAT", "EMR", "PAVE"],
    macroDrivers: {
      helps: [
        "Fiscal stimulus",
        "Electrification demand",
        "Reshoring",
        "Inflation (pricing power)",
      ],
      hurts: ["Severe recession", "Budget austerity", "Deflation"],
    },
  },
  {
    id: "SMALL_CAPS_DOMESTIC",
    label: "Small Caps & Domestic",
    description:
      "Domestically-focused small-cap companies that benefit from US economic strength and are less exposed to global headwinds.",
    whatWins: [
      "Strong US domestic growth",
      "USD stability or weakness (reduces competitiveness gap)",
      "Credit available (small caps are credit-sensitive)",
      "Risk-on sentiment and breadth expansion",
    ],
    examples: ["IWM", "IJR", "VB"],
    macroDrivers: {
      helps: [
        "US growth strong",
        "Credit spreads tight",
        "Breadth expanding",
        "Risk-on",
      ],
      hurts: [
        "Credit stress",
        "Recession",
        "Large cap outperformance",
        "Breadth diverging",
      ],
    },
  },
  {
    id: "INTERNATIONAL_FX_EM",
    label: "International & EM",
    description:
      "International and emerging market equities that benefit from global growth, weak USD, and diversification outside the US.",
    whatWins: [
      "Weak USD (makes EM assets cheaper for USD investors)",
      "Strong global growth (especially China, EM Asia)",
      "Commodity bull markets (many EMs are commodity exporters)",
      "Diversification away from US concentration risk",
    ],
    examples: ["VXUS", "EEM", "VWO", "IEMG"],
    macroDrivers: {
      helps: [
        "USD falling",
        "Global growth rising",
        "Commodities rising",
        "China stimulus",
      ],
      hurts: [
        "USD surging",
        "Global recession",
        "China slowdown",
        "Trade wars",
      ],
    },
  },
  {
    id: "SPECIAL_SITUATIONS",
    label: "Special Situations",
    description:
      "Event-driven opportunities like spinoffs, mergers, restructurings, and arbitrage plays that are less correlated to macro.",
    whatWins: [
      "Corporate actions (spinoffs, activist campaigns)",
      "Mispricing from forced selling or complexity",
      "Catalysts independent of macro (management change, asset sales)",
      "Arbitrage spreads in M&A or capital structure",
    ],
    examples: ["Manual basket", "Event-driven ETFs", "Spinoffs"],
    macroDrivers: {
      helps: [
        "M&A activity high",
        "Corporate restructuring wave",
        "Market inefficiency",
      ],
      hurts: [
        "Severe market stress (correlations → 1)",
        "Credit markets frozen",
      ],
    },
  },
];

/**
 * Default target allocations for the 12 engines
 * User can customize these in the portfolio settings
 */
export const defaultTargets: EngineTargets = {
  VOLATILITY_OPTIONALITY: { min: 0, target: 5, max: 15 },
  GROWTH_DURATION: { min: 15, target: 30, max: 45 },
  CASHFLOW_COMPOUNDERS: { min: 10, target: 20, max: 35 },
  CREDIT_CARRY: { min: 5, target: 10, max: 25 },
  ENERGY_COMMODITIES: { min: 0, target: 5, max: 15 },
  GOLD_SCARCITY: { min: 0, target: 3, max: 10 },
  REAL_ESTATE_RENT: { min: 0, target: 5, max: 15 },
  DEFENSE_GEOPOLITICS: { min: 0, target: 5, max: 15 },
  INFRASTRUCTURE_CAPEX: { min: 0, target: 5, max: 15 },
  SMALL_CAPS_DOMESTIC: { min: 0, target: 5, max: 15 },
  INTERNATIONAL_FX_EM: { min: 0, target: 5, max: 20 },
  SPECIAL_SITUATIONS: { min: 0, target: 2, max: 10 },
};

/**
 * Ticker-level overrides for fast path classification
 */
const tickerOverrides: Record<string, EngineId> = {
  // Volatility & Optionality
  MSTR: "VOLATILITY_OPTIONALITY",
  COIN: "VOLATILITY_OPTIONALITY",
  ARKK: "VOLATILITY_OPTIONALITY",
  TQQQ: "VOLATILITY_OPTIONALITY",

  // Growth & Duration
  QQQM: "GROWTH_DURATION",
  QQQ: "GROWTH_DURATION",
  MSFT: "GROWTH_DURATION",
  NVDA: "GROWTH_DURATION",
  AMZN: "GROWTH_DURATION",
  GOOGL: "GROWTH_DURATION",
  GOOG: "GROWTH_DURATION",
  META: "GROWTH_DURATION",
  TSM: "GROWTH_DURATION",
  ASML: "GROWTH_DURATION",

  // Cashflow Compounders
  "BRK.B": "CASHFLOW_COMPOUNDERS",
  PG: "CASHFLOW_COMPOUNDERS",
  KO: "CASHFLOW_COMPOUNDERS",
  UNH: "CASHFLOW_COMPOUNDERS",
  JNJ: "CASHFLOW_COMPOUNDERS",
  AAPL: "CASHFLOW_COMPOUNDERS",
  V: "CASHFLOW_COMPOUNDERS",
  MA: "CASHFLOW_COMPOUNDERS",

  // Credit & Carry
  SGOV: "CREDIT_CARRY",
  BIL: "CREDIT_CARRY",
  SHY: "CREDIT_CARRY",
  JPST: "CREDIT_CARRY",
  VMFXX: "CREDIT_CARRY",
  CASH: "CREDIT_CARRY",

  // Energy & Commodities
  XOM: "ENERGY_COMMODITIES",
  CVX: "ENERGY_COMMODITIES",
  XLE: "ENERGY_COMMODITIES",
  DBC: "ENERGY_COMMODITIES",
  USO: "ENERGY_COMMODITIES",

  // Gold & Scarcity
  GLD: "GOLD_SCARCITY",
  IAU: "GOLD_SCARCITY",

  // Real Estate & Rent
  VNQ: "REAL_ESTATE_RENT",
  O: "REAL_ESTATE_RENT",
  DLR: "REAL_ESTATE_RENT",
  PLD: "REAL_ESTATE_RENT",
  EQIX: "REAL_ESTATE_RENT",

  // Defense & Geopolitics
  RTX: "DEFENSE_GEOPOLITICS",
  LMT: "DEFENSE_GEOPOLITICS",
  NOC: "DEFENSE_GEOPOLITICS",
  GD: "DEFENSE_GEOPOLITICS",
  ITA: "DEFENSE_GEOPOLITICS",

  // Infrastructure & Capex
  ETN: "INFRASTRUCTURE_CAPEX",
  PWR: "INFRASTRUCTURE_CAPEX",
  CAT: "INFRASTRUCTURE_CAPEX",
  EMR: "INFRASTRUCTURE_CAPEX",
  PAVE: "INFRASTRUCTURE_CAPEX",

  // Small Caps & Domestic
  IWM: "SMALL_CAPS_DOMESTIC",
  IJR: "SMALL_CAPS_DOMESTIC",
  VB: "SMALL_CAPS_DOMESTIC",

  // International & EM
  VXUS: "INTERNATIONAL_FX_EM",
  EEM: "INTERNATIONAL_FX_EM",
  VWO: "INTERNATIONAL_FX_EM",
  IEMG: "INTERNATIONAL_FX_EM",
};

/**
 * Asset type defaults (fallback if ticker not in overrides)
 */
function classifyByAssetType(assetType: AssetType | undefined): EngineId | null {
  if (!assetType) return null;

  switch (assetType) {
    case "CASH":
    case "BOND":
      return "CREDIT_CARRY";
    case "CRYPTO":
      return "VOLATILITY_OPTIONALITY";
    case "COMMODITY":
      return "ENERGY_COMMODITIES"; // Could also be GOLD_SCARCITY
    case "REIT":
      return "REAL_ESTATE_RENT";
    default:
      return null;
  }
}

/**
 * Classify by sector/industry (if company profile available)
 */
function classifyBySector(profile?: CompanyProfile): EngineId | null {
  if (!profile || !profile.sector) return null;

  const sector = profile.sector.toLowerCase();
  const industry = profile.industry?.toLowerCase() || "";

  // Technology - mostly Growth & Duration
  if (sector.includes("technology") || sector.includes("software")) {
    if (industry.includes("semiconductor")) return "GROWTH_DURATION";
    if (industry.includes("software")) return "GROWTH_DURATION";
    return "GROWTH_DURATION";
  }

  // Consumer Defensive - Cashflow Compounders
  if (sector.includes("consumer defensive") || sector.includes("consumer staples")) {
    return "CASHFLOW_COMPOUNDERS";
  }

  // Healthcare - Cashflow Compounders
  if (sector.includes("healthcare")) {
    return "CASHFLOW_COMPOUNDERS";
  }

  // Energy - Energy & Commodities
  if (sector.includes("energy")) {
    return "ENERGY_COMMODITIES";
  }

  // Utilities - could be Cashflow or Infrastructure
  if (sector.includes("utilities")) {
    return "INFRASTRUCTURE_CAPEX";
  }

  // Industrials - Infrastructure or Defense
  if (sector.includes("industrial")) {
    if (industry.includes("defense") || industry.includes("aerospace")) {
      return "DEFENSE_GEOPOLITICS";
    }
    return "INFRASTRUCTURE_CAPEX";
  }

  // Financial Services
  if (sector.includes("financial")) {
    return "CASHFLOW_COMPOUNDERS"; // Banks/insurers
  }

  // Real Estate
  if (sector.includes("real estate")) {
    return "REAL_ESTATE_RENT";
  }

  return null;
}

/**
 * Get engine classification for a holding
 * Uses ticker override > manual override > asset type > sector/industry
 */
export function getEngineForHolding(
  holding: Holding,
  companyProfile?: CompanyProfile
): EngineClassification {
  const ticker = holding.ticker.toUpperCase();

  // 1. Check manual override
  if (holding.engineOverride) {
    return {
      engine: holding.engineOverride,
      confidence: "HIGH",
      reason: "Manual classification",
    };
  }

  // 2. Check ticker overrides (fast path)
  if (tickerOverrides[ticker]) {
    return {
      engine: tickerOverrides[ticker],
      confidence: "HIGH",
      reason: `Ticker mapping: ${ticker}`,
    };
  }

  // 3. Try asset type
  const assetTypeEngine = classifyByAssetType(holding.assetType);
  if (assetTypeEngine) {
    return {
      engine: assetTypeEngine,
      confidence: "MEDIUM",
      reason: `Asset type: ${holding.assetType}`,
    };
  }

  // 4. Try sector/industry from company profile
  const sectorEngine = classifyBySector(companyProfile);
  if (sectorEngine) {
    return {
      engine: sectorEngine,
      confidence: "MEDIUM",
      reason: `Sector: ${companyProfile?.sector || "Unknown"}`,
    };
  }

  // 5. Default fallback (unknown)
  return {
    engine: "SPECIAL_SITUATIONS",
    confidence: "LOW",
    reason: "Unable to classify - defaulting to Special Situations",
  };
}

/**
 * Get engine by ID
 */
export function getEngine(id: EngineId): Engine | undefined {
  return engines.find((e) => e.id === id);
}
