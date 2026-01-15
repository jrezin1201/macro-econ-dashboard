/**
 * Economic Engines Configuration - UPDATED VERSION
 *
 * Defines the 12 economic engines with refined beginner-friendly labels and definitions.
 */

import type { EngineId, EngineTargets, Holding, EngineClassification, AssetType } from "@/lib/portfolio/schema";
import type { CompanyProfile } from "@/lib/company/providers/types";

export interface Engine {
  id: EngineId;
  label: string;
  shortDefinition: string; // 1 sentence for tooltips
  longDefinition: string; // 2-4 sentences for detailed view
  description: string; // Legacy field, kept for compatibility
  returnMechanism: string[]; // What drives returns (bullets)
  macroSensitivity: string[]; // When it tends to win (bullets)
  whatWins: string[]; // Legacy field, kept for compatibility
  examples: string[]; // 6-10 example tickers/ETFs
  examplesDisclaimer: string; // Disclaimer that examples are not recommendations
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
    shortDefinition: "Convex, high-beta exposure that can surge in risk-on liquidity but draws down hard in risk-off.",
    longDefinition: "This engine captures reflexive, speculative upside—often driven by liquidity, momentum, and narrative. It can outperform massively when conditions are supportive, but it is the first to be cut when stress rises.",
    description:
      "High-beta, convex assets that thrive in liquidity surges and risk-on environments. Think crypto proxies, high-volatility tech, and assets with embedded optionality.",
    returnMechanism: [
      "Liquidity-driven multiple expansion and momentum",
      "Reflexive upside in risk-on environments",
      "Embedded optionality in volatile, narrative-driven assets",
      "High beta to speculative flows and animal spirits",
    ],
    macroSensitivity: [
      "Surges when: Fed eases, liquidity injections, BTC bull markets, risk-on sentiment",
      "Collapses when: Liquidity tightens, credit stress rises, risk-off regime kicks in",
    ],
    whatWins: [
      "Liquidity injections (Fed easing, QE resumption)",
      "Risk-on sentiment and animal spirits",
      "Falling real rates and rising speculative flows",
      "Crypto bull markets and narrative-driven rallies",
    ],
    examples: ["MSTR", "COIN", "ARKK", "TQQQ", "High beta tech"],
    examplesDisclaimer: "Examples only—not recommendations.",
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
    shortDefinition: "Long-duration cash flows that benefit from easing inflation/rates and abundant liquidity.",
    longDefinition: "Think of companies whose value depends heavily on future growth. Lower rates and strong liquidity tend to help, while rising yields and tightening conditions compress multiples.",
    description:
      "Long-duration growth stocks that discount far-future cash flows. Winners in falling rate environments with stable growth expectations.",
    returnMechanism: [
      "Present value of distant cash flows rises when rates fall",
      "Multiple expansion in low-rate, abundant-liquidity regimes",
      "Secular growth narratives with pricing power",
      "High earnings growth compounding over time",
    ],
    macroSensitivity: [
      "Wins when: Rates fall, liquidity abundant, inflation moderating, growth stable",
      "Struggles when: Rates spike, inflation surges, liquidity tightens, growth slows",
    ],
    whatWins: [
      "Falling interest rates (especially real rates)",
      "Stable or rising growth expectations",
      "Multiple expansion in low-rate regimes",
      "Strong earnings momentum and secular growth narratives",
    ],
    examples: ["QQQM", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "TSM"],
    examplesDisclaimer: "Examples only—not recommendations.",
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
    shortDefinition: "High-quality businesses that steadily compound earnings and return capital across cycles.",
    longDefinition: "This engine wins through durability: pricing power, stable demand, strong balance sheets, and disciplined reinvestment/buybacks. Often a core allocation in uncertain regimes.",
    description:
      "High-quality businesses with durable competitive advantages, strong free cash flow, and resilient margins across cycles.",
    returnMechanism: [
      "Consistent free cash flow generation through economic cycles",
      "Pricing power that protects margins during inflation",
      "Capital discipline through buybacks, dividends, and smart reinvestment",
      "Low operational leverage to macro volatility",
    ],
    macroSensitivity: [
      "Wins when: Macro stable, inflation moderate (if they have pricing power), risk-off (defensive bid)",
      "Struggles when: Severe recession, deflationary collapse, disruption to business model",
    ],
    whatWins: [
      "Pricing power and brand strength",
      "Consistent FCF generation through cycles",
      "Capital discipline (buybacks, dividends, intelligent M&A)",
      "Low operational leverage to macro swings",
    ],
    examples: ["BRK.B", "PG", "KO", "UNH", "JNJ", "AAPL", "V", "MA"],
    examplesDisclaimer: "Examples only—not recommendations.",
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
    shortDefinition: "Yield-driven returns where you get paid to hold high-quality short-duration credit/cash-like assets.",
    longDefinition: "This engine focuses on collecting yield with lower volatility. It tends to perform best when credit conditions are stable and stress is low.",
    description:
      "Short-duration bonds, money market funds, and credit instruments that capture yield with minimal duration risk.",
    returnMechanism: [
      "Collect yield from elevated short-term rates (Fed funds high)",
      "Benefit from inverted yield curve (short rates > long rates)",
      "Minimal duration risk when rates are volatile",
      "Safe haven flows during uncertainty",
    ],
    macroSensitivity: [
      "Wins when: Fed funds elevated, credit stress low, curve inverted, uncertainty high",
      "Struggles when: Fed cutting aggressively, credit spreads blowing out, inflation eroding real returns",
    ],
    whatWins: [
      "High nominal policy rates (Fed funds elevated)",
      "Stable or tightening credit spreads",
      "Inverted yield curve (short rates > long rates)",
      "Safe haven flows during uncertainty",
    ],
    examples: ["SGOV", "BIL", "SHY", "JPST", "VMFXX", "Cash"],
    examplesDisclaimer: "Examples only—not recommendations.",
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
    shortDefinition: "Inflation and supply-shock exposure through energy and broad commodities.",
    longDefinition: "This engine benefits from rising inflation expectations, supply constraints, or geopolitical shocks. It can also diversify equity-heavy portfolios when inflation is the dominant macro risk.",
    description:
      "Energy producers and commodity exposure that benefit from inflation, supply constraints, or geopolitical risk premia.",
    returnMechanism: [
      "Rising oil/commodity prices from supply shocks or demand surges",
      "Inflation hedge as commodity prices rise",
      "Geopolitical risk premia (war, sanctions, OPEC actions)",
      "Weak USD tailwind (commodities priced in dollars)",
    ],
    macroSensitivity: [
      "Wins when: Inflation rising, USD falling, geopolitical tensions high, supply constraints",
      "Struggles when: Recession (demand collapse), USD surging, supply gluts, deflation",
    ],
    whatWins: [
      "Rising oil prices (supply shocks, demand surges)",
      "Inflation expectations climbing",
      "Geopolitical risk (war, sanctions, OPEC cuts)",
      "Weak USD (commodities priced in dollars)",
    ],
    examples: ["XOM", "CVX", "XLE", "DBC", "USO"],
    examplesDisclaimer: "Examples only—not recommendations.",
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
    shortDefinition: "A monetary confidence and real-rate hedge—especially when debt/inflation risks rise.",
    longDefinition: "Gold often responds to real yields, currency confidence, and systemic risk. It can act as ballast when traditional assets struggle under inflation or credit stress.",
    description:
      "Monetary metals and scarcity assets that serve as stores of value, inflation hedges, and crisis insurance.",
    returnMechanism: [
      "Negative real rates (nominal rates < inflation)",
      "Central bank debasement and currency confidence issues",
      "Geopolitical instability and crisis insurance demand",
      "Portfolio diversification when correlations break down",
    ],
    macroSensitivity: [
      "Wins when: Real rates negative, inflation high, USD weakening, geopolitical crisis",
      "Struggles when: Real rates rising sharply, USD strengthening, deflationary environment",
    ],
    whatWins: [
      "Negative real rates (nominal rates < inflation)",
      "Central bank debasement fears",
      "Geopolitical instability and war",
      "Loss of confidence in fiat currencies",
    ],
    examples: ["GLD", "IAU", "Physical gold"],
    examplesDisclaimer: "Examples only—not recommendations.",
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
    shortDefinition: "Contractual cashflows tied to physical assets (rents/leases), not home-price speculation.",
    longDefinition: "This engine captures income streams backed by real assets. It is sensitive to financing costs and liquidity, but can diversify equity exposure when structured for cashflow.",
    description:
      "REITs and real estate proxies that generate income from rent and benefit from replacement cost dynamics and scarcity.",
    returnMechanism: [
      "Rental income from long-term leases and pricing power",
      "Cap rate compression when long-term rates fall",
      "Replacement cost dynamics (inflation raises rebuild costs)",
      "Supply constraints in prime locations",
    ],
    macroSensitivity: [
      "Wins when: Long rates falling, inflation moderate, strong rental demand",
      "Struggles when: Long rates spiking, recession (rent defaults), oversupply",
    ],
    whatWins: [
      "Falling long-term rates (cap rate compression)",
      "Strong rental demand and pricing power",
      "Supply constraints (hard to build new)",
      "Inflation (replacement cost rises)",
    ],
    examples: ["VNQ", "O", "DLR", "PLD", "EQIX"],
    examplesDisclaimer: "Examples only—not recommendations.",
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
    shortDefinition: "Security and defense spending exposure that can benefit from elevated geopolitical risk.",
    longDefinition: "This engine tends to be less cyclical than broad industrials and can act as a hedge in unstable geopolitical environments.",
    description:
      "Defense contractors and geopolitical beneficiaries that profit from rising global tensions and military spending.",
    returnMechanism: [
      "Rising defense budgets from geopolitical tensions",
      "Multi-year procurement cycles with sticky revenue",
      "Bipartisan political support for defense spending",
      "Less cyclical than general industrials",
    ],
    macroSensitivity: [
      "Wins when: War or rising tensions, bipartisan defense spending increases, NATO expansion",
      "Struggles when: Peace dividend, budget cuts, isolationist shifts",
    ],
    whatWins: [
      "Rising defense budgets (war, cold war 2.0)",
      "Geopolitical fragmentation (US/China/Russia)",
      "Multi-year procurement cycles (sticky revenue)",
      "Bipartisan political support for defense",
    ],
    examples: ["RTX", "LMT", "NOC", "GD", "ITA"],
    examplesDisclaimer: "Examples only—not recommendations.",
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
    shortDefinition: "Multi-year investment cycles in power, grid, industrial buildout, and physical infrastructure.",
    longDefinition: "This engine benefits from long-cycle spending programs, reshoring, electrification, and capex booms. It can perform well even when growth is moderate if capex is persistent.",
    description:
      "Electrification, grid buildout, and capital equipment plays that benefit from secular infrastructure investment cycles.",
    returnMechanism: [
      "Government stimulus programs (IIJA, IRA, CHIPS Act)",
      "Electrification megatrend (data centers, EVs, grid modernization)",
      "Reshoring and manufacturing renaissance",
      "Multi-year capex cycles with pricing power",
    ],
    macroSensitivity: [
      "Wins when: Fiscal stimulus, electrification demand rising, reshoring trends, inflation (pricing power)",
      "Struggles when: Severe recession, budget austerity, deflation",
    ],
    whatWins: [
      "Government stimulus (IIJA, IRA, CHIPS Act)",
      "Electrification megatrend (data centers, EVs, grid)",
      "Reshoring and manufacturing renaissance",
      "Multi-year capex cycles (utilities, industrials)",
    ],
    examples: ["ETN", "PWR", "CAT", "EMR", "PAVE"],
    examplesDisclaimer: "Examples only—not recommendations.",
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
    label: "Small Caps & Domestic Cyclicals",
    shortDefinition: "Early-cycle/recovery amplifier with high operating leverage to domestic growth.",
    longDefinition: "Small caps tend to outperform when growth re-accelerates and financial conditions ease. They usually struggle when credit tightens or recession risk rises.",
    description:
      "Domestically-focused small-cap companies that benefit from US economic strength and are less exposed to global headwinds.",
    returnMechanism: [
      "Operating leverage to US domestic growth",
      "Credit-sensitive (benefit when credit spreads tight)",
      "Early-cycle recovery amplifier",
      "Breadth expansion in risk-on environments",
    ],
    macroSensitivity: [
      "Wins when: US growth strong, credit available, breadth expanding, risk-on sentiment",
      "Struggles when: Credit stress, recession, large-cap outperformance, breadth diverging",
    ],
    whatWins: [
      "Strong US domestic growth",
      "USD stability or weakness (reduces competitiveness gap)",
      "Credit available (small caps are credit-sensitive)",
      "Risk-on sentiment and breadth expansion",
    ],
    examples: ["IWM", "IJR", "VB"],
    examplesDisclaimer: "Examples only—not recommendations.",
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
    label: "International & FX/EM Beta",
    shortDefinition: "Non-US growth and currency sensitivity—often helped by a weakening USD and improving global cycle.",
    longDefinition: "This engine is driven by global growth differentials and currency moves. It tends to do better when the dollar weakens and global liquidity improves.",
    description:
      "International and emerging market equities that benefit from global growth, weak USD, and diversification outside the US.",
    returnMechanism: [
      "Weak USD makes EM assets cheaper for USD investors",
      "Strong global growth (especially China, EM Asia)",
      "Commodity bull markets (many EMs are commodity exporters)",
      "Diversification away from US concentration risk",
    ],
    macroSensitivity: [
      "Wins when: USD falling, global growth rising, commodities rising, China stimulus",
      "Struggles when: USD surging, global recession, China slowdown, trade wars",
    ],
    whatWins: [
      "Weak USD (makes EM assets cheaper for USD investors)",
      "Strong global growth (especially China, EM Asia)",
      "Commodity bull markets (many EMs are commodity exporters)",
      "Diversification away from US concentration risk",
    ],
    examples: ["VXUS", "EEM", "VWO", "IEMG"],
    examplesDisclaimer: "Examples only—not recommendations.",
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
    shortDefinition: "Idiosyncratic opportunities (spinoffs, restructurings, event-driven) with low correlation to macro—when chosen carefully.",
    longDefinition: "This engine is intentionally manual. It can add uncorrelated returns but requires judgment, catalysts, and position sizing discipline.",
    description:
      "Event-driven opportunities like spinoffs, mergers, restructurings, and arbitrage plays that are less correlated to macro.",
    returnMechanism: [
      "Corporate catalysts independent of macro (spinoffs, activist campaigns)",
      "Mispricing from forced selling or complexity",
      "Arbitrage spreads in M&A or capital structure",
      "Idiosyncratic opportunities with unique catalysts",
    ],
    macroSensitivity: [
      "Wins when: M&A activity high, corporate restructuring wave, market inefficiency",
      "Struggles when: Severe market stress (correlations → 1), credit markets frozen",
    ],
    whatWins: [
      "Corporate actions (spinoffs, activist campaigns)",
      "Mispricing from forced selling or complexity",
      "Catalysts independent of macro (management change, asset sales)",
      "Arbitrage spreads in M&A or capital structure",
    ],
    examples: ["Manual basket", "Event-driven ETFs", "Spinoffs"],
    examplesDisclaimer: "Examples only—not recommendations.",
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
  XLI: "INFRASTRUCTURE_CAPEX",

  // Small Caps & Domestic
  IWM: "SMALL_CAPS_DOMESTIC",
  IJR: "SMALL_CAPS_DOMESTIC",
  VB: "SMALL_CAPS_DOMESTIC",

  // International & EM
  VXUS: "INTERNATIONAL_FX_EM",
  VEA: "INTERNATIONAL_FX_EM",
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
