/**
 * Equity Breadth - Configuration
 */

export const BREADTH_CONFIG = {
  // Lookback periods (days)
  momentumLookback: 60,
  shortTermLookback: 20,

  // Thresholds for breadth health
  thresholds: {
    // AD Line momentum (% change over 60 days)
    adLineMomentum_green: 0, // Positive momentum
    adLineMomentum_red: -5, // Declining > 5%

    // Percent above 200-day MA
    pctAbove200_green: 60, // Healthy when >60% of stocks above 200D
    pctAbove200_yellow: 40,
    pctAbove200_red: 30,

    // New Highs - New Lows
    newHighsLows_green: 0, // Positive is good
    newHighsLows_yellow: -50,
    newHighsLows_red: -100,
  },

  // Confirmation logic weights
  confirmationWeights: {
    adLine: 0.5,
    pctAbove200: 0.3,
    newHighsLows: 0.2,
  },

  // Confidence adjustment for regime
  regimeConfidenceAdjustment: {
    confirms: 10, // Add 10 points
    neutral: 0,
    diverges: -10, // Subtract 10 points
  },
};

/**
 * Data sources configuration
 * Using FRED proxies for breadth indicators
 */
export const BREADTH_SERIES = {
  // Proxy for market breadth using equal-weight vs cap-weight
  // RSP (Equal Weight S&P) vs SPY spread can indicate breadth
  // For now, we'll use VIX as inverse proxy for market health
  marketStress: "VIXCLS", // VIX - lower is better breadth

  // S&P 500 for baseline
  sp500: "SP500",

  // Additional indicators
  advancers: null, // Not directly available on FRED
  decliners: null,

  // We'll calculate a synthetic breadth score from available data
};
