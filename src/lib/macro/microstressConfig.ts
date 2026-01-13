/**
 * Credit Microstress - Configuration
 */

export const MICROSTRESS_CONFIG = {
  // FRED Series IDs
  series: {
    sofr: "SOFR", // Secured Overnight Financing Rate
    effr: "EFFR", // Effective Federal Funds Rate (if not available, use FEDFUNDS)
    tbill3m: "DTB3", // 3-Month Treasury Bill
    cpRate: "DCPF3M", // 3-Month AA Financial Commercial Paper Rate
    tedSpread: "TEDRATE", // TED Spread (if available)
    nfci: "NFCI", // Chicago Fed National Financial Conditions Index
  },

  // Lookback periods
  lookbacks: {
    short: 28, // 4 weeks
    medium: 56, // 8 weeks
    long: 91, // 13 weeks
  },

  // Thresholds for microstress signals
  thresholds: {
    // SOFR-EFFR spread (basis points)
    sofrEffrSpread_green: 0.05, // Normal < 5bps
    sofrEffrSpread_yellow: 0.10, // Caution 10bps
    sofrEffrSpread_red: 0.20, // Stress > 20bps

    // SOFR 8-week change (%)
    sofr8wJump_yellow: 0.50, // +50bps in 8w
    sofr8wJump_red: 1.00, // +100bps in 8w

    // Commercial paper 8-week change (%)
    cp8wJump_yellow: 0.50, // +50bps in 8w
    cp8wJump_red: 1.00, // +100bps in 8w

    // TED Spread (%)
    tedSpread_yellow: 0.40, // Elevated
    tedSpread_red: 0.60, // High stress

    // NFCI (Chicago Fed Financial Conditions)
    nfci_yellow: 0.0, // Above zero = tightening
    nfci_red: 0.5, // Significantly tight
  },

  // Score weights for overall stress calculation
  weights: {
    sofrEffrSpread: 0.3,
    sofrJump: 0.2,
    cpJump: 0.2,
    tedSpread: 0.15,
    nfci: 0.15,
  },

  // Alert gating rules
  alertGating: {
    // If microstress is RED, overall alert cannot be GREEN
    redBlocksGreen: true,

    // If microstress is YELLOW, bump alert up one level
    yellowBumpsUp: true,
  },
};

/**
 * Helper to get series ID with fallback
 */
export function getMicrostressSeriesId(key: keyof typeof MICROSTRESS_CONFIG.series): string {
  const id = MICROSTRESS_CONFIG.series[key];

  // Fallbacks for series that might not be available
  if (key === "effr" && !id) return "FEDFUNDS";
  if (key === "tedSpread" && !id) return ""; // Will skip if not available

  return id;
}
