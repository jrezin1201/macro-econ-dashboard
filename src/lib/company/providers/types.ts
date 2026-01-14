/**
 * Company Analysis - Provider Type Definitions
 *
 * Defines interfaces for pluggable data providers.
 * This allows swapping data sources without changing business logic.
 */

// ============================================================================
// FINANCIAL STATEMENTS
// ============================================================================

export interface IncomeStatement {
  revenue: number | null;
  costOfRevenue: number | null;
  grossProfit: number | null;
  operatingExpenses: number | null;
  operatingIncome: number | null;
  netIncome: number | null;
  eps: number | null;
  ebitda: number | null;
}

export interface BalanceSheet {
  totalAssets: number | null;
  totalLiabilities: number | null;
  totalEquity: number | null;
  cash: number | null;
  totalDebt: number | null;
  currentAssets: number | null;
  currentLiabilities: number | null;
}

export interface CashFlowStatement {
  operatingCashFlow: number | null;
  capitalExpenditure: number | null;
  freeCashFlow: number | null;
  dividendsPaid: number | null;
  stockRepurchased: number | null;
  stockIssued: number | null;
}

export interface FinancialStatements {
  date: string; // ISO date string
  period: "annual" | "quarterly";
  fiscalYear: number;
  fiscalPeriod?: string; // e.g., "Q1", "Q2", "FY"
  currency: string;
  income: IncomeStatement;
  balance: BalanceSheet;
  cashflow: CashFlowStatement;
}

// ============================================================================
// MARKET DATA
// ============================================================================

export interface MarketSnapshot {
  ticker: string;
  price: number | null;
  marketCap: number | null;
  sharesOutstanding: number | null;
  float?: number | null;
  avgVolume?: number | null;
  beta?: number | null;
  pe?: number | null;
  forwardPE?: number | null;
  evToSales?: number | null;
  evToEbitda?: number | null;
  fcfYield?: number | null;
  dividendYield?: number | null;
  timestamp: string; // ISO timestamp
}

export interface PriceDataPoint {
  date: string; // ISO date string
  close: number;
  volume?: number;
}

// ============================================================================
// POSITIONING DATA
// ============================================================================

export interface ShortInterest {
  ticker: string;
  shortPctFloat?: number | null; // % of float sold short
  sharesShort?: number | null;
  daysToCover?: number | null;
  shortInterestRatio?: number | null;
  borrowRate?: number | null; // Annualized borrow fee %
  updatedAt?: string | null; // ISO date
  source?: string;
}

export interface OptionsSnapshot {
  ticker: string;
  ivRank?: number | null; // 0-100, where current IV sits in 52w range
  putCallRatio?: number | null;
  maxPain?: number | null; // Price with max option pain
  impliedMove?: number | null; // Expected move % based on ATM straddle
  oiConcentration?: {
    calls: Array<{ strike: number; oi: number }>;
    puts: Array<{ strike: number; oi: number }>;
  };
  updatedAt?: string | null;
  source?: string;
}

// ============================================================================
// DOCUMENTS & FILINGS
// ============================================================================

export type FilingType = "10-K" | "10-Q" | "8-K" | "S-1" | "DEF 14A" | "Other";

export interface FilingDoc {
  type: FilingType;
  date: string; // ISO date
  url: string;
  description?: string;
}

export interface TranscriptDoc {
  date: string; // ISO date
  quarter?: string; // e.g., "Q4 2023"
  url: string;
  source: string;
}

// ============================================================================
// COMPANY PROFILE
// ============================================================================

export interface CompanyProfile {
  ticker: string;
  name: string;
  sector?: string | null;
  industry?: string | null;
  description?: string | null;
  website?: string | null;
  exchange?: string | null;
  ipoDate?: string | null;
  cik?: string | null; // SEC Central Index Key
  employees?: number | null;
  country?: string | null;
}

// ============================================================================
// KEY METRICS (DERIVED)
// ============================================================================

export interface KeyMetrics {
  date: string;
  revenueGrowthYoY?: number | null;
  grossMargin?: number | null;
  operatingMargin?: number | null;
  netMargin?: number | null;
  roe?: number | null;
  roa?: number | null;
  roic?: number | null;
  debtToEquity?: number | null;
  currentRatio?: number | null;
  quickRatio?: number | null;
  assetTurnover?: number | null;
  inventoryTurnover?: number | null;
  fcfMargin?: number | null;
}

// ============================================================================
// PROVIDER INTERFACES
// ============================================================================

/**
 * Financial data provider (income statement, balance sheet, cash flow)
 */
export interface FinancialProvider {
  name: string;

  /**
   * Get basic company information
   */
  getCompanyProfile(ticker: string): Promise<CompanyProfile>;

  /**
   * Get financial statements
   * @param period - "annual" or "quarterly"
   * @param limit - Number of periods to fetch (default: 10)
   */
  getStatements(
    ticker: string,
    period: "annual" | "quarterly",
    limit?: number
  ): Promise<FinancialStatements[]>;

  /**
   * Get derived key metrics (margins, returns, etc.)
   */
  getKeyMetrics(
    ticker: string,
    period: "annual" | "quarterly",
    limit?: number
  ): Promise<KeyMetrics[]>;
}

/**
 * Market data provider (quotes, price history)
 */
export interface MarketDataProvider {
  name: string;

  /**
   * Get current market snapshot
   */
  getQuote(ticker: string): Promise<MarketSnapshot>;

  /**
   * Get historical price data
   * @param range - Time range (e.g., "5y", "10y", "max")
   */
  getPriceHistory(
    ticker: string,
    range: "1y" | "3y" | "5y" | "10y" | "max"
  ): Promise<PriceDataPoint[]>;
}

/**
 * Positioning data provider (shorts, options flow)
 */
export interface PositioningProvider {
  name: string;

  /**
   * Get short interest data
   */
  getShortInterest(ticker: string): Promise<ShortInterest>;

  /**
   * Get options market snapshot (optional)
   */
  getOptionsSnapshot?(ticker: string): Promise<OptionsSnapshot>;
}

/**
 * Document provider (SEC filings, transcripts)
 */
export interface DocumentProvider {
  name: string;

  /**
   * Get list of SEC filings
   */
  getFilings(ticker: string, limit?: number): Promise<FilingDoc[]>;

  /**
   * Get latest 10-K text (optional, for risk factor parsing)
   */
  getLatest10KText?(cik: string): Promise<string>;

  /**
   * Get latest 10-Q text (optional)
   */
  getLatest10QText?(cik: string): Promise<string>;

  /**
   * Get earnings call transcripts (optional)
   */
  getTranscripts?(ticker: string, limit?: number): Promise<TranscriptDoc[]>;
}

// ============================================================================
// PROVIDER CONFIGURATION
// ============================================================================

export interface ProviderConfig {
  financial: FinancialProvider | null;
  market: MarketDataProvider | null;
  positioning: PositioningProvider | null;
  documents: DocumentProvider | null;
}

export interface ProviderStatus {
  financial: boolean;
  market: boolean;
  positioning: boolean;
  documents: boolean;
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export class ProviderError extends Error {
  constructor(
    public providerName: string,
    public originalError: unknown,
    message?: string
  ) {
    super(message || `Provider ${providerName} error: ${String(originalError)}`);
    this.name = "ProviderError";
  }
}
