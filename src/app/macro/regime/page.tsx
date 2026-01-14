/**
 * Macro Regime Dashboard - Enhanced with Breadth, Bitcoin, and Microstress
 *
 * Analyzes macro indicators to determine market regime and generate portfolio guidance
 */

import { getSeriesData } from "@/modules/fred-api/lib/fred-client";
import type { TimeSeriesDataPoint } from "@/lib/macro/types";
import { MACRO_SERIES, LOOKBACKS } from "@/lib/macro/config";
import {
  lastValue,
  delta,
  yoyChange,
  zScore,
  calculateGrowthComposite,
  calculateInflationComposite,
  calculateCreditStressComposite,
  calculateLiquidityComposite,
  calculateUSDImpulse,
  classifyRegime,
} from "@/lib/macro/calc";
import { runRulesEngine } from "@/lib/macro/rules";
import type { MacroIndicator, MacroComposites } from "@/lib/macro/types";

// Import breadth, bitcoin, and microstress modules
import { breadthProvider } from "@/lib/market/breadthProvider";
import { analyzeBreadth } from "@/lib/market/breadthCalc";
import { BREADTH_CONFIG } from "@/lib/market/breadthConfig";
import { analyzeBitcoinTrend, generateMSTRGuidance } from "@/lib/crypto/bitcoinCalc";
import type { BitcoinPrice } from "@/lib/crypto/bitcoinTypes";
import { BITCOIN_CONFIG } from "@/lib/crypto/bitcoinConfig";
import { calculateMicrostressMetrics, analyzeMicrostress } from "@/lib/macro/microstressCalc";
import { applyMicrostressGating, getMicrostressAlertReasons } from "@/lib/macro/microstressRules";
import { getMicrostressSeriesId } from "@/lib/macro/microstressConfig";

// Import portfolio modules
import { getPortfolio, computeLayerWeights, computeDeltaFromTargets } from "@/lib/portfolio/portfolioStore";
import { getActionPolicy } from "@/lib/portfolio/actionPolicy";

// Import data tracking
import { recordFetchTime, getMostRecentFetchTime } from "@/lib/data/fetchWithMeta";

import { MacroRegimeDashboard } from "./MacroRegimeDashboard-enhanced";

/**
 * Fetch all required FRED series + confirmation layers
 */
async function fetchMacroData() {
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  const startDate = fiveYearsAgo.toISOString().split("T")[0];

  // Record fetch timestamp
  const fetchTimestamp = new Date();

  // Fetch all series (gracefully handle failures)
  const fetchSeries = async (id: string): Promise<TimeSeriesDataPoint[]> => {
    try {
      const data = await getSeriesData(id, { observationStart: startDate });
      // Record successful fetch time
      recordFetchTime(id, fetchTimestamp);
      return data;
    } catch (error) {
      console.warn(`Failed to fetch ${id}:`, error);
      return [];
    }
  };

  // Fetch all required series for base macro analysis
  const [
    fedfunds,
    dgs2,
    dgs10,
    sentiment,
    indpro,
    payems,
    icsa,
    cpi,
    pce,
    breakeven,
    hyOAS,
    stlFSI,
    walcl,
    wresbal,
    rrpontsyd,
    wtregen,
    dtwexbgs,
    vix,
    sp500,
  ] = await Promise.all([
    fetchSeries("FEDFUNDS"),
    fetchSeries("DGS2"),
    fetchSeries("DGS10"),
    fetchSeries("UMCSENT"),
    fetchSeries("INDPRO"),
    fetchSeries("PAYEMS"),
    fetchSeries("ICSA"),
    fetchSeries("CPILFESL"),
    fetchSeries("PCEPILFE"),
    fetchSeries("T5YIE"),
    fetchSeries("BAMLH0A0HYM2"),
    fetchSeries("STLFSI4"),
    fetchSeries("WALCL"),
    fetchSeries("WRESBAL"),
    fetchSeries("RRPONTSYD"),
    fetchSeries("WTREGEN"),
    fetchSeries("DTWEXBGS"),
    fetchSeries("VIXCLS"),
    fetchSeries("SP500"),
  ]);

  // === UPGRADE #1: Equity Breadth ===
  const adLine = await breadthProvider.getADLine(startDate);
  const vixLatest = lastValue(vix);
  const breadthAnalysis = analyzeBreadth(adLine, [], [], vixLatest);

  // === UPGRADE #2: Bitcoin ===
  const btcData = await fetchSeries(BITCOIN_CONFIG.fredSeriesId);
  const btcPrices: BitcoinPrice[] = btcData.map((p) => ({
    date: p.dateString,
    price: p.value,
  }));
  const btcAnalysis = analyzeBitcoinTrend(btcPrices);

  // === UPGRADE #3: Credit Microstress ===
  const [sofr, effr, tbill3m, cpRate, tedSpread, nfci] = await Promise.all([
    fetchSeries(getMicrostressSeriesId("sofr")),
    fetchSeries(getMicrostressSeriesId("effr")),
    fetchSeries(getMicrostressSeriesId("tbill3m")),
    fetchSeries(getMicrostressSeriesId("cpRate")),
    fetchSeries(getMicrostressSeriesId("tedSpread")),
    fetchSeries(getMicrostressSeriesId("nfci")),
  ]);

  const microstressMetrics = calculateMicrostressMetrics({
    sofr,
    effr,
    tbill3m,
    cpRate,
    tedSpread,
    nfci,
  });
  const microstressAnalysis = analyzeMicrostress(microstressMetrics);

  // Calculate composites
  const composites: MacroComposites = {
    growth: calculateGrowthComposite({ napm: sentiment, indpro, payems, icsa }),
    inflation: calculateInflationComposite({ cpi, pce, breakeven }),
    creditStress: calculateCreditStressComposite({ hyOAS, stlFSI }),
    liquidityImpulse: calculateLiquidityComposite({ walcl, wresbal, wtregen, rrpontsyd }),
    usdImpulse: calculateUSDImpulse({ dtwexbgs }),
  };

  // Calculate key metrics
  const fedfundsVal = lastValue(fedfunds);
  const dgs2Val = lastValue(dgs2);
  const dgs10Val = lastValue(dgs10);
  const curve10_2 = dgs10Val !== null && dgs2Val !== null ? dgs10Val - dgs2Val : null;

  const hyOASVal = lastValue(hyOAS);
  const hyOAS_8wChange = delta(hyOAS, LOOKBACKS["8w"]);
  const stlFSIVal = lastValue(stlFSI);

  const walcl_13wChange = delta(walcl, LOOKBACKS["13w"]);

  // Classify regime
  let regime = classifyRegime(composites, {
    curve10_2,
    vix: vixLatest,
  });

  // UPGRADE #1: Adjust regime confidence based on breadth
  const breadthAdjustment = BREADTH_CONFIG.regimeConfidenceAdjustment[breadthAnalysis.signal.toLowerCase() as "confirms" | "neutral" | "diverges"];
  regime = {
    ...regime,
    confidence: Math.max(0, Math.min(100, regime.confidence + breadthAdjustment)),
  };

  // Run base rules engine
  const { alert: baseAlert, tilts: baseTilts } = runRulesEngine({
    composites,
    rates: {
      fedfunds: fedfundsVal,
      dgs2: dgs2Val,
      dgs10: dgs10Val,
      curve10_2,
    },
    credit: {
      hyOAS: hyOASVal,
      hyOAS_8wChange,
      stlFSI: stlFSIVal,
    },
  });

  // UPGRADE #3: Apply microstress gating to alert level
  const { finalAlertLevel, gatingReason } = applyMicrostressGating(
    baseAlert.level,
    microstressAnalysis.level
  );

  // Combine alert reasons
  let alertReasons = [...baseAlert.reasons];
  const microstressAlertReasons = getMicrostressAlertReasons(
    microstressAnalysis.level,
    microstressAnalysis.reasons
  );
  if (microstressAlertReasons.length > 0) {
    alertReasons = [...alertReasons, ...microstressAlertReasons];
  }
  if (gatingReason) {
    alertReasons.push(gatingReason);
  }

  const alert = {
    ...baseAlert,
    level: finalAlertLevel,
    reasons: alertReasons,
  };

  // UPGRADE #2: Enhance tilts with BTC guidance
  const mstrGuidance = generateMSTRGuidance(regime.regime, btcAnalysis.trendLevel);
  const enhancedTilts = { ...baseTilts };

  // Add BTC-specific notes to tilts
  if (btcAnalysis.trendLevel === "RED") {
    enhancedTilts.notes = [
      ...enhancedTilts.notes,
      `🔶 Bitcoin below 200D MA: ${mstrGuidance.recommendation}`,
    ];
    // Auto-add to reduce list if not already there
    if (!enhancedTilts.reduce.some(r => r.includes("crypto") || r.includes("MSTR"))) {
      enhancedTilts.reduce = [
        ...enhancedTilts.reduce,
        "New crypto/MSTR exposure (BTC bearish)",
      ];
    }
  } else if (btcAnalysis.trendLevel === "GREEN" && regime.regime === "Risk-On") {
    enhancedTilts.notes = [
      ...enhancedTilts.notes,
      `✓ Bitcoin above 200D MA: ${mstrGuidance.recommendation}`,
    ];
  }

  const tilts = enhancedTilts;

  // Build indicator table (existing logic)
  const indicators: MacroIndicator[] = MACRO_SERIES.map((config) => {
    let data: TimeSeriesDataPoint[] = [];

    const seriesMap: Record<string, TimeSeriesDataPoint[]> = {
      FEDFUNDS: fedfunds,
      DGS2: dgs2,
      DGS10: dgs10,
      UMCSENT: sentiment,
      INDPRO: indpro,
      PAYEMS: payems,
      ICSA: icsa,
      CPILFESL: cpi,
      PCEPILFE: pce,
      T5YIE: breakeven,
      BAMLH0A0HYM2: hyOAS,
      STLFSI4: stlFSI,
      WALCL: walcl,
      WRESBAL: wresbal,
      RRPONTSYD: rrpontsyd,
      WTREGEN: wtregen,
      DTWEXBGS: dtwexbgs,
      VIXCLS: vix,
      SP500: sp500,
    };

    data = seriesMap[config.id] || [];

    const latest = lastValue(data);
    const delta1m = delta(data, LOOKBACKS["1m"]);
    const delta3m = delta(data, LOOKBACKS["3m"]);
    const yoy = config.transform === "yoy" || config.category === "inflation" || config.category === "growth"
      ? yoyChange(data)
      : null;
    const z = zScore(data, LOOKBACKS["2y"]);

    let status: MacroIndicator["status"] = "neutral";
    if (z !== null) {
      if (Math.abs(z) > 2) status = "red";
      else if (Math.abs(z) > 1) status = "yellow";
      else status = "green";
    }

    return {
      seriesId: config.id,
      name: config.name,
      category: config.category,
      latest,
      delta1m,
      delta3m,
      yoy,
      zScore: z,
      status,
      units: config.units,
    };
  });

  // ===== PORTFOLIO CALCULATIONS =====
  const portfolio = getPortfolio();
  const layerWeights = computeLayerWeights(portfolio.holdings);
  const layerDeltas = computeDeltaFromTargets(layerWeights, portfolio.customTargets);

  // Generate action policy based on macro + confirmations
  const actionPolicy = getActionPolicy(
    {
      regime: regime.regime,
      alertLevel: alert.level,
      composites: {
        growth: composites.growth,
        inflation: composites.inflation,
        creditStress: composites.creditStress,
        liquidityImpulse: composites.liquidityImpulse,
      },
      credit: {
        hyOAS: hyOASVal,
      },
    },
    {
      breadth: breadthAnalysis,
      bitcoin: {
        analysis: btcAnalysis,
      },
      microstress: microstressAnalysis,
    }
  );

  // Calculate most recent fetch time across all series
  const allSeriesIds = [
    "FEDFUNDS", "DGS2", "DGS10", "UMCSENT", "INDPRO", "PAYEMS", "ICSA",
    "CPILFESL", "PCEPILFE", "T5YIE", "BAMLH0A0HYM2", "STLFSI4",
    "WALCL", "WRESBAL", "RRPONTSYD", "WTREGEN", "DTWEXBGS", "VIXCLS", "SP500",
    BITCOIN_CONFIG.fredSeriesId,
    getMicrostressSeriesId("sofr"),
    getMicrostressSeriesId("effr"),
    getMicrostressSeriesId("tbill3m"),
    getMicrostressSeriesId("cpRate"),
    getMicrostressSeriesId("tedSpread"),
    getMicrostressSeriesId("nfci"),
  ];
  const lastUpdated = getMostRecentFetchTime(allSeriesIds) || new Date();

  return {
    regime,
    alert,
    tilts,
    composites,
    indicators,
    lastUpdated,
    rates: {
      fedfunds: fedfundsVal,
      dgs2: dgs2Val,
      dgs10: dgs10Val,
      curve10_2,
    },
    credit: {
      hyOAS: hyOASVal,
      hyOAS_8wChange,
      stlFSI: stlFSIVal,
    },
    liquidity: {
      composite: composites.liquidityImpulse,
      walcl_13wChange,
    },
    // Add confirmation layers
    breadth: breadthAnalysis,
    bitcoin: {
      analysis: btcAnalysis,
      guidance: mstrGuidance,
    },
    microstress: microstressAnalysis,
    // Add portfolio data
    portfolio: {
      useDemoHoldings: portfolio.useDemoHoldings,
      layerWeights,
      layerDeltas,
      actionPolicy,
    },
  };
}

/**
 * Main Page Component (Server Component)
 */
export default async function MacroRegimePage() {
  const data = await fetchMacroData();

  return <MacroRegimeDashboard data={data} />;
}
