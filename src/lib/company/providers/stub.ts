/**
 * Stub Provider Implementations
 *
 * These return gracefully when no real provider is configured.
 */

import type {
  FinancialProvider,
  MarketDataProvider,
  PositioningProvider,
  DocumentProvider,
  CompanyProfile,
  FinancialStatements,
  KeyMetrics,
  MarketSnapshot,
  PriceDataPoint,
  ShortInterest,
  FilingDoc,
} from "./types";

/**
 * Stub financial provider (returns empty data)
 */
export class StubFinancialProvider implements FinancialProvider {
  name = "Stub (Not Configured)";

  async getCompanyProfile(ticker: string): Promise<CompanyProfile> {
    return {
      ticker: ticker.toUpperCase(),
      name: `${ticker.toUpperCase()} Inc.`,
      sector: null,
      industry: null,
      description: "Financial data provider not configured. Add API keys to enable.",
      website: null,
      exchange: null,
      ipoDate: null,
      cik: null,
      employees: null,
      country: null,
    };
  }

  async getStatements(): Promise<FinancialStatements[]> {
    return [];
  }

  async getKeyMetrics(): Promise<KeyMetrics[]> {
    return [];
  }
}

/**
 * Stub market data provider (returns empty data)
 */
export class StubMarketDataProvider implements MarketDataProvider {
  name = "Stub (Not Configured)";

  async getQuote(ticker: string): Promise<MarketSnapshot> {
    return {
      ticker: ticker.toUpperCase(),
      price: null,
      marketCap: null,
      sharesOutstanding: null,
      timestamp: new Date().toISOString(),
    };
  }

  async getPriceHistory(): Promise<PriceDataPoint[]> {
    return [];
  }
}

/**
 * Stub positioning provider (returns empty data)
 */
export class StubPositioningProvider implements PositioningProvider {
  name = "Stub (Not Configured)";

  async getShortInterest(ticker: string): Promise<ShortInterest> {
    return {
      ticker: ticker.toUpperCase(),
      source: "Not configured",
    };
  }
}

/**
 * Stub document provider (returns empty data)
 */
export class StubDocumentProvider implements DocumentProvider {
  name = "Stub (Not Configured)";

  async getFilings(): Promise<FilingDoc[]> {
    return [];
  }
}
