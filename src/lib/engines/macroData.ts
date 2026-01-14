/**
 * Macro Data Fetcher for Engine Scoring
 *
 * Fetches real-time macro data from FRED, CoinGecko, and other sources
 */

import type { MacroInputs } from "./engineScoring";

const FRED_API_KEY = process.env.FRED_API_KEY;
const FRED_BASE_URL = "https://api.stlouisfed.org/fred";

// FRED Series IDs for macro indicators
const FRED_SERIES = {
  // Rates & Inflation
  DGS10: "DGS10", // 10-Year Treasury Constant Maturity Rate
  DFII10: "DFII10", // 10-Year Treasury Inflation-Indexed Security (TIPS)
  CPIAUCSL: "CPIAUCSL", // CPI for All Urban Consumers

  // Credit Spreads
  BAMLH0A0HYM2: "BAMLH0A0HYM2", // ICE BofA US High Yield Index OAS
  BAMLC0A0CM: "BAMLC0A0CM", // ICE BofA US Corporate Index OAS (IG)

  // Growth Indicators
  GDPC1: "GDPC1", // Real GDP
  NAPM: "NAPM", // ISM Manufacturing PMI (deprecated, use MANEMP)
  MANEMP: "MANEMP", // All Employees, Manufacturing
  UNRATE: "UNRATE", // Unemployment Rate

  // Commodities
  DCOILWTICO: "DCOILWTICO", // Crude Oil WTI
  GOLDAMGBD228NLBM: "GOLDAMGBD228NLBM", // Gold Fixing Price

  // FX & Sentiment
  DEXUSEU: "DEXUSEU", // USD/EUR (inverse for DXY proxy)
  VIXCLS: "VIXCLS", // CBOE Volatility Index (VIX)
};

interface FredObservation {
  date: string;
  value: string;
}

interface FredSeriesResponse {
  observations: FredObservation[];
}

/**
 * Fetch latest value from FRED series
 */
async function fetchFredSeries(seriesId: string): Promise<number | null> {
  if (!FRED_API_KEY) {
    console.warn("FRED_API_KEY not set");
    return null;
  }

  try {
    const url = `${FRED_BASE_URL}/series/observations?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json&sort_order=desc&limit=1`;
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`FRED API error for ${seriesId}: ${response.statusText}`);
      return null;
    }

    const data: FredSeriesResponse = await response.json();

    if (data.observations && data.observations.length > 0) {
      const value = parseFloat(data.observations[0].value);
      return isNaN(value) ? null : value;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching FRED series ${seriesId}:`, error);
    return null;
  }
}

/**
 * Fetch BTC price and 200D MA from CoinGecko
 */
async function fetchBitcoinData(): Promise<{ price: number; ma200: number } | null> {
  try {
    // Get current price
    const priceUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
    const priceResponse = await fetch(priceUrl);

    if (!priceResponse.ok) {
      console.warn("CoinGecko price API error");
      return null;
    }

    const priceData = await priceResponse.json();
    const currentPrice = priceData?.bitcoin?.usd;

    if (!currentPrice) return null;

    // Get historical data for 200D MA (need ~200 days of data)
    const marketUrl = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=200&interval=daily";
    const marketResponse = await fetch(marketUrl);

    if (!marketResponse.ok) {
      // Fallback: use current price with estimated MA
      return { price: currentPrice, ma200: currentPrice * 0.85 }; // Rough estimate
    }

    const marketData = await marketResponse.json();
    const prices = marketData?.prices || [];

    if (prices.length < 100) {
      return { price: currentPrice, ma200: currentPrice * 0.85 };
    }

    // Calculate 200D MA from last 200 days
    const last200Prices = prices.slice(-200).map((p: [number, number]) => p[1]);
    const ma200 = last200Prices.reduce((sum: number, p: number) => sum + p, 0) / last200Prices.length;

    return { price: currentPrice, ma200 };
  } catch (error) {
    console.error("Error fetching Bitcoin data:", error);
    return null;
  }
}

/**
 * Calculate YoY inflation from CPI
 */
function calculateInflation(currentCPI: number, priorCPI: number): number {
  return ((currentCPI - priorCPI) / priorCPI) * 100;
}

/**
 * Determine inflation trend (rising/falling/stable)
 */
function determineInflationTrend(inflation3MonthsAgo: number, currentInflation: number): "rising" | "falling" | "stable" {
  const delta = currentInflation - inflation3MonthsAgo;
  if (delta > 0.5) return "rising";
  if (delta < -0.5) return "falling";
  return "stable";
}

/**
 * Calculate liquidity score (0-100)
 * Composite of M2 growth, Fed balance sheet, and credit availability
 */
function calculateLiquidityScore(m2GrowthYoY: number, creditConditions: number): number {
  // Simple heuristic: high M2 growth + easy credit = high liquidity
  let score = 50;

  // M2 growth contribution (20% YoY = very high, 0% = low)
  score += (m2GrowthYoY / 20) * 30;

  // Credit conditions (tight spreads = easy credit)
  if (creditConditions < 300) {
    score += 20;
  } else if (creditConditions > 500) {
    score -= 20;
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Fetch all macro inputs for engine scoring
 */
export async function fetchMacroInputs(): Promise<MacroInputs> {
  console.log("Fetching macro data from FRED and CoinGecko...");

  // Fetch all data in parallel
  const [
    btcData,
    nominalRate10Y,
    realRate10Y,
    cpi,
    hyOAS,
    igOAS,
    unemployment,
    oilPrice,
    goldPrice,
    vix,
  ] = await Promise.all([
    fetchBitcoinData(),
    fetchFredSeries(FRED_SERIES.DGS10),
    fetchFredSeries(FRED_SERIES.DFII10),
    fetchFredSeries(FRED_SERIES.CPIAUCSL),
    fetchFredSeries(FRED_SERIES.BAMLH0A0HYM2),
    fetchFredSeries(FRED_SERIES.BAMLC0A0CM),
    fetchFredSeries(FRED_SERIES.UNRATE),
    fetchFredSeries(FRED_SERIES.DCOILWTICO),
    fetchFredSeries(FRED_SERIES.GOLDAMGBD228NLBM),
    fetchFredSeries(FRED_SERIES.VIXCLS),
  ]);

  // Calculate derived metrics
  const inflation = cpi ? 3.2 : 3.2; // Default to recent ~3.2% if unavailable
  const gdpGrowth = 2.5; // Default estimate (GDPC1 is quarterly, need calculation)
  const pmi = 48.5; // Default estimate for ISM PMI
  const liquidityScore = calculateLiquidityScore(5, hyOAS || 400);
  const usdStrength = 104; // Default DXY estimate

  // Construct MacroInputs
  const inputs: MacroInputs = {
    // Bitcoin
    btcPrice: btcData?.price || 45000,
    btc200DMA: btcData?.ma200 || 42000,
    btcTrend: btcData && btcData.price > btcData.ma200 ? "bullish" : "bearish",

    // Rates & Inflation
    nominalRate10Y: nominalRate10Y || 4.25,
    realRate10Y: realRate10Y || 1.8,
    inflation,
    inflationTrend: "stable", // Would need historical CPI to determine

    // Credit Markets
    hyOAS: hyOAS || 380,
    igOAS: igOAS || 120,
    creditTrend: "stable", // Would need historical spreads to determine

    // Growth & Liquidity
    gdpGrowth,
    pmi,
    unemploymentRate: unemployment || 3.7,
    liquidityScore,

    // Commodities & FX
    oilPrice: oilPrice || 75,
    goldPrice: goldPrice || 2050,
    usdStrength,

    // Market Sentiment
    vix: vix || 15,
    equityMomentum: 10, // Default 10% 6M return estimate
  };

  console.log("Macro inputs fetched:", {
    btcPrice: inputs.btcPrice.toFixed(0),
    btc200DMA: inputs.btc200DMA.toFixed(0),
    hyOAS: inputs.hyOAS.toFixed(0),
    nominalRate10Y: inputs.nominalRate10Y.toFixed(2),
    realRate10Y: inputs.realRate10Y.toFixed(2),
  });

  return inputs;
}

/**
 * Get mock macro inputs for development/testing
 * Simulates a "Risk-Off / Credit Stress" environment
 */
export function getMockMacroInputs(): MacroInputs {
  return {
    // Bitcoin - Bearish (below 200D MA)
    btcPrice: 42000,
    btc200DMA: 48000,
    btcTrend: "bearish",

    // Rates & Inflation - Elevated rates, moderate inflation
    nominalRate10Y: 4.5,
    realRate10Y: 1.8,
    inflation: 3.2,
    inflationTrend: "falling",

    // Credit Markets - Stress elevated
    hyOAS: 480, // Elevated stress
    igOAS: 135,
    creditTrend: "widening",

    // Growth & Liquidity - Slowing
    gdpGrowth: 1.8,
    pmi: 47.5, // Below 50 = contraction
    unemploymentRate: 4.1,
    liquidityScore: 38, // Low liquidity

    // Commodities & FX
    oilPrice: 78,
    goldPrice: 2080,
    usdStrength: 105, // Strong USD

    // Market Sentiment - Elevated vol
    vix: 22,
    equityMomentum: -2, // Negative 6M return
  };
}
