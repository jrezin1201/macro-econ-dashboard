/**
 * Data Source Registry
 *
 * Central registry of all data series used in the application
 * with metadata about sources, update cadences, and lag information
 */

export type DataSource = "FRED" | "CoinGecko" | "Stooq" | "Blockchain.com" | "Other";

export type UpdateCadence = "Real-time" | "Daily" | "Weekly" | "Monthly" | "Quarterly";

export interface DataSeriesMeta {
  id: string;                  // Series ID (e.g. "FEDFUNDS", "CPIAUCSL")
  displayName: string;          // Human-readable name
  source: DataSource;           // Data provider
  updateCadence: UpdateCadence; // How often the source updates
  typicalLag?: string;          // Description of typical lag
  notes?: string;               // Plain English explanation
  revalidateSeconds?: number;   // App fetch cache window (seconds)
  category?: string;            // Category (rates, credit, etc.)
}

/**
 * Registry of all data series
 */
export const dataSourceRegistry: Record<string, DataSeriesMeta> = {
  // ===== RATES & CURVE =====
  FEDFUNDS: {
    id: "FEDFUNDS",
    displayName: "Fed Funds Rate",
    source: "FRED",
    updateCadence: "Daily",
    typicalLag: "Updates daily when changed by FOMC",
    notes: "The overnight rate banks charge each other. Changes only when the Fed adjusts policy.",
    revalidateSeconds: 21600, // 6 hours
    category: "rates",
  },
  DGS2: {
    id: "DGS2",
    displayName: "2-Year Treasury Yield",
    source: "FRED",
    updateCadence: "Daily",
    typicalLag: "Updates daily at market close",
    notes: "2-year U.S. Treasury constant maturity rate. Reflects market expectations for Fed policy over the next 2 years.",
    revalidateSeconds: 21600,
    category: "rates",
  },
  DGS10: {
    id: "DGS10",
    displayName: "10-Year Treasury Yield",
    source: "FRED",
    updateCadence: "Daily",
    typicalLag: "Updates daily at market close",
    notes: "10-year U.S. Treasury constant maturity rate. Key benchmark for long-term interest rates.",
    revalidateSeconds: 21600,
    category: "rates",
  },
  CURVE10_2: {
    id: "CURVE10_2",
    displayName: "10Y-2Y Yield Curve Spread",
    source: "FRED",
    updateCadence: "Daily",
    typicalLag: "Calculated from daily Treasury yields",
    notes: "Difference between 10-year and 2-year yields. Inversion (negative) historically precedes recessions.",
    revalidateSeconds: 21600,
    category: "rates",
  },

  // ===== CREDIT & STRESS =====
  BAMLH0A0HYM2: {
    id: "BAMLH0A0HYM2",
    displayName: "High Yield OAS",
    source: "FRED",
    updateCadence: "Daily",
    typicalLag: "Updates daily",
    notes: "Option-adjusted spread of high yield corporate bonds over Treasuries. Rising spreads indicate credit stress.",
    revalidateSeconds: 21600,
    category: "credit",
  },
  NFCI: {
    id: "NFCI",
    displayName: "Chicago Fed Financial Stress Index",
    source: "FRED",
    updateCadence: "Weekly",
    typicalLag: "Released weekly, reflects prior week's conditions",
    notes: "Composite measure of financial stress. Above zero indicates stress, below zero indicates calm.",
    revalidateSeconds: 43200, // 12 hours
    category: "credit",
  },
  STLFSI4: {
    id: "STLFSI4",
    displayName: "St. Louis Fed Financial Stress Index",
    source: "FRED",
    updateCadence: "Weekly",
    typicalLag: "Released weekly on Fridays",
    notes: "Measures financial market stress across credit, equity, and funding markets.",
    revalidateSeconds: 43200,
    category: "credit",
  },

  // ===== LIQUIDITY =====
  WALCL: {
    id: "WALCL",
    displayName: "Fed Balance Sheet (Total Assets)",
    source: "FRED",
    updateCadence: "Weekly",
    typicalLag: "Released Thursday afternoons for prior week ending Wednesday",
    notes: "Total assets held by the Federal Reserve. Tracks quantitative easing and tightening.",
    revalidateSeconds: 43200,
    category: "liquidity",
  },
  WTREGEN: {
    id: "WTREGEN",
    displayName: "Bank Reserves",
    source: "FRED",
    updateCadence: "Weekly",
    typicalLag: "Released Thursday afternoons",
    notes: "Reserves held by banks at the Fed. Higher reserves indicate ample liquidity.",
    revalidateSeconds: 43200,
    category: "liquidity",
  },
  RRPONTSYD: {
    id: "RRPONTSYD",
    displayName: "Reverse Repo (RRP)",
    source: "FRED",
    updateCadence: "Daily",
    typicalLag: "Updates next business day",
    notes: "Overnight reverse repurchase agreements. High RRP indicates excess cash in money markets.",
    revalidateSeconds: 21600,
    category: "liquidity",
  },
  WGBAL: {
    id: "WGBAL",
    displayName: "Treasury General Account (TGA)",
    source: "FRED",
    updateCadence: "Weekly",
    typicalLag: "Released Thursday afternoons",
    notes: "U.S. Treasury's cash balance at the Fed. Changes affect system liquidity.",
    revalidateSeconds: 43200,
    category: "liquidity",
  },

  // ===== INFLATION =====
  CPIAUCSL: {
    id: "CPIAUCSL",
    displayName: "CPI (All Items)",
    source: "FRED",
    updateCadence: "Monthly",
    typicalLag: "Released mid-month for prior month (2-4 week lag)",
    notes: "Consumer Price Index. Key measure of inflation. Released around the 13th of each month for the previous month.",
    revalidateSeconds: 86400, // 24 hours
    category: "inflation",
  },
  PCEPI: {
    id: "PCEPI",
    displayName: "PCE Price Index",
    source: "FRED",
    updateCadence: "Monthly",
    typicalLag: "Released ~4 weeks after month ends",
    notes: "Personal Consumption Expenditures Price Index. The Fed's preferred inflation measure.",
    revalidateSeconds: 86400,
    category: "inflation",
  },
  PCEPILFE: {
    id: "PCEPILFE",
    displayName: "Core PCE",
    source: "FRED",
    updateCadence: "Monthly",
    typicalLag: "Released ~4 weeks after month ends",
    notes: "Core PCE excludes food and energy. Smoothed inflation gauge watched closely by the Fed.",
    revalidateSeconds: 86400,
    category: "inflation",
  },

  // ===== GROWTH =====
  PAYEMS: {
    id: "PAYEMS",
    displayName: "Nonfarm Payrolls",
    source: "FRED",
    updateCadence: "Monthly",
    typicalLag: "Released first Friday of the month for prior month",
    notes: "Total nonfarm employment. Headline jobs number, closely watched for economic health.",
    revalidateSeconds: 86400,
    category: "growth",
  },
  ICSA: {
    id: "ICSA",
    displayName: "Initial Unemployment Claims",
    source: "FRED",
    updateCadence: "Weekly",
    typicalLag: "Released Thursday mornings for prior week ending Saturday",
    notes: "Weekly new unemployment filings. Leading indicator of labor market stress.",
    revalidateSeconds: 43200,
    category: "growth",
  },
  UMCSENT: {
    id: "UMCSENT",
    displayName: "U. of Michigan Consumer Sentiment",
    source: "FRED",
    updateCadence: "Monthly",
    typicalLag: "Preliminary mid-month, final end of month",
    notes: "Consumer confidence survey. Forward-looking indicator of spending.",
    revalidateSeconds: 86400,
    category: "growth",
  },

  // ===== MARKET =====
  VIXCLS: {
    id: "VIXCLS",
    displayName: "VIX (Volatility Index)",
    source: "FRED",
    updateCadence: "Daily",
    typicalLag: "Updates daily at market close",
    notes: "CBOE Volatility Index. Measures expected S&P 500 volatility. Often called the 'fear gauge'.",
    revalidateSeconds: 21600,
    category: "market",
  },
  SP500: {
    id: "SP500",
    displayName: "S&P 500 Index",
    source: "FRED",
    updateCadence: "Daily",
    typicalLag: "Updates daily at market close",
    notes: "Broad U.S. stock market index. Benchmark for equity market performance.",
    revalidateSeconds: 21600,
    category: "market",
  },

  // ===== BREADTH =====
  NYSE_AD_LINE: {
    id: "NYSE_AD_LINE",
    displayName: "NYSE Advance-Decline Line",
    source: "Stooq",
    updateCadence: "Daily",
    typicalLag: "Updates daily at market close",
    notes: "Cumulative difference between advancing and declining stocks. Measures market breadth.",
    revalidateSeconds: 21600,
    category: "breadth",
  },
  PCT_ABOVE_200D: {
    id: "PCT_ABOVE_200D",
    displayName: "% Stocks Above 200-Day MA",
    source: "Stooq",
    updateCadence: "Daily",
    typicalLag: "Updates daily at market close",
    notes: "Percentage of stocks trading above their 200-day moving average. Breadth confirmation signal.",
    revalidateSeconds: 21600,
    category: "breadth",
  },

  // ===== BITCOIN / CRYPTO =====
  BTC_USD: {
    id: "BTC_USD",
    displayName: "Bitcoin Price",
    source: "CoinGecko",
    updateCadence: "Real-time",
    typicalLag: "Updates every few seconds",
    notes: "Bitcoin spot price in USD. Highly volatile, trades 24/7.",
    revalidateSeconds: 300, // 5 minutes
    category: "crypto",
  },
  CBBTCUSD: {
    id: "CBBTCUSD",
    displayName: "Bitcoin Price (FRED)",
    source: "FRED",
    updateCadence: "Daily",
    typicalLag: "Updates daily with Coinbase close",
    notes: "Bitcoin price from FRED (sourced from Coinbase). Less frequent than real-time crypto APIs.",
    revalidateSeconds: 21600,
    category: "crypto",
  },

  // ===== MICROSTRESS / SHORT-TERM FUNDING =====
  SOFR: {
    id: "SOFR",
    displayName: "Secured Overnight Financing Rate",
    source: "FRED",
    updateCadence: "Daily",
    typicalLag: "Updates next business day",
    notes: "Benchmark overnight rate for secured lending. Replaced LIBOR.",
    revalidateSeconds: 21600,
    category: "credit",
  },
  EFFR: {
    id: "EFFR",
    displayName: "Effective Federal Funds Rate",
    source: "FRED",
    updateCadence: "Daily",
    typicalLag: "Updates next business day",
    notes: "Volume-weighted median of overnight fed funds transactions.",
    revalidateSeconds: 21600,
    category: "credit",
  },
  DTB3: {
    id: "DTB3",
    displayName: "3-Month Treasury Bill Rate",
    source: "FRED",
    updateCadence: "Daily",
    typicalLag: "Updates daily at market close",
    notes: "Yield on 3-month Treasury bills. Risk-free short-term rate.",
    revalidateSeconds: 21600,
    category: "rates",
  },
};

/**
 * Get series metadata by ID
 */
export function getSeriesMeta(seriesId: string): DataSeriesMeta | undefined {
  return dataSourceRegistry[seriesId];
}

/**
 * Get all series for a category
 */
export function getSeriesByCategory(category: string): DataSeriesMeta[] {
  return Object.values(dataSourceRegistry).filter((series) => series.category === category);
}

/**
 * Get all series by source
 */
export function getSeriesBySource(source: DataSource): DataSeriesMeta[] {
  return Object.values(dataSourceRegistry).filter((series) => series.source === source);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  Object.values(dataSourceRegistry).forEach((series) => {
    if (series.category) {
      categories.add(series.category);
    }
  });
  return Array.from(categories).sort();
}

/**
 * Get all unique sources
 */
export function getAllSources(): DataSource[] {
  const sources = new Set<DataSource>();
  Object.values(dataSourceRegistry).forEach((series) => {
    sources.add(series.source);
  });
  return Array.from(sources).sort();
}
