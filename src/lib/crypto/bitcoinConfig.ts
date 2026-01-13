/**
 * Bitcoin Analysis - Configuration
 */

export const BITCOIN_CONFIG = {
  // Moving average periods
  maPeriods: {
    short: 20,
    medium: 50,
    long: 200,
  },

  // Thresholds for trend classification
  thresholds: {
    // Distance from 200-day MA
    bullish_threshold: 0, // Above 200D
    bearish_threshold: -5, // Below 200D by >5%
    nearMA_threshold: 3, // Within ±3% of 200D

    // Volatility (annualized %)
    lowVol: 40,
    mediumVol: 65,
    highVol: 100,

    // Momentum (90-day % change)
    strongMomentum: 20,
    weakMomentum: -10,

    // Drawdown from 365D high
    shallowDrawdown: -10,
    moderateDrawdown: -25,
    deepDrawdown: -40,
  },

  // FRED series ID for Bitcoin
  fredSeriesId: "CBBTCUSD",

  // CoinGecko config (optional)
  coinGecko: {
    enabled: true, // Set to false to use FRED only
    apiUrl: "https://api.coingecko.com/api/v3",
    cacheMinutes: 5,
  },

  // Trend classification logic
  trendRules: {
    // GREEN: Strong bullish
    // - Price > 200D MA
    // - 50D > 200D (golden cross) OR price > 200D by >5%
    // - Volatility < highVol threshold

    // YELLOW: Neutral/Transitioning
    // - Price within ±3% of 200D
    // - OR 30D vol > highVol threshold
    // - OR choppy price action

    // RED: Bearish
    // - Price < 200D by > 5%
    // - AND (50D < 200D OR negative 90D momentum)
  },
};

/**
 * MSTR Overlay guidance rules
 */
export const MSTR_GUIDANCE_RULES = {
  // Macro Risk-On + BTC Green
  riskOn_btcGreen: {
    recommendation: "OK to add/hold MSTR exposure",
    alertLevel: "OK" as const,
  },

  // Macro Risk-On + BTC Yellow
  riskOn_btcYellow: {
    recommendation: "Caution on new MSTR adds; monitor BTC 200D MA",
    alertLevel: "CAUTION" as const,
  },

  // Macro Risk-On + BTC Red
  riskOn_btcRed: {
    recommendation: "Avoid adding MSTR/crypto; prioritize ballast",
    alertLevel: "AVOID" as const,
  },

  // Macro Risk-Off + BTC Green
  riskOff_btcGreen: {
    recommendation: "Still caution; prefer stability despite BTC strength",
    alertLevel: "CAUTION" as const,
  },

  // Macro Risk-Off + BTC Yellow
  riskOff_btcYellow: {
    recommendation: "Reduce risk; avoid new crypto exposure",
    alertLevel: "AVOID" as const,
  },

  // Macro Risk-Off + BTC Red
  riskOff_btcRed: {
    recommendation: "High danger; reduce volatility adds",
    alertLevel: "AVOID" as const,
  },
};
