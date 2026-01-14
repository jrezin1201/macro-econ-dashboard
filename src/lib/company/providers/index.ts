/**
 * Company Data Provider Registry
 *
 * Manages data provider instances with graceful fallback.
 * Checks environment variables and returns stub providers when not configured.
 */

import type { ProviderConfig, ProviderStatus } from "./types";
import {
  StubFinancialProvider,
  StubMarketDataProvider,
  StubPositioningProvider,
  StubDocumentProvider,
} from "./stub";

/**
 * Check if Financial Modeling Prep is configured
 */
function isFMPConfigured(): boolean {
  return !!process.env.FMP_API_KEY;
}

/**
 * Check if Alpha Vantage is configured
 */
function isAlphaVantageConfigured(): boolean {
  return !!process.env.ALPHA_VANTAGE_API_KEY;
}

/**
 * Check if other providers are configured
 * (placeholder for future integrations like Polygon, Quandl, etc.)
 */
function isOtherProviderConfigured(): boolean {
  return false;
}

/**
 * Initialize providers based on environment configuration
 */
function initializeProviders(): ProviderConfig {
  // For MVP, start with stub providers
  // TODO: Implement real providers when API keys are added

  const financial = new StubFinancialProvider();
  const market = new StubMarketDataProvider();
  const positioning = new StubPositioningProvider();
  const documents = new StubDocumentProvider();

  return {
    financial,
    market,
    positioning,
    documents,
  };
}

/**
 * Provider registry singleton
 */
export const providers = initializeProviders();

/**
 * Get provider status (which providers are configured vs stubbed)
 */
export function getProviderStatus(): ProviderStatus {
  return {
    financial: providers.financial?.name !== "Stub (Not Configured)",
    market: providers.market?.name !== "Stub (Not Configured)",
    positioning: providers.positioning?.name !== "Stub (Not Configured)",
    documents: providers.documents?.name !== "Stub (Not Configured)",
  };
}

/**
 * Get human-readable provider names
 */
export function getProviderNames() {
  return {
    financial: providers.financial?.name || "None",
    market: providers.market?.name || "None",
    positioning: providers.positioning?.name || "None",
    documents: providers.documents?.name || "None",
  };
}

/**
 * Check if at least one provider is configured
 */
export function hasAnyProvider(): boolean {
  const status = getProviderStatus();
  return status.financial || status.market || status.positioning || status.documents;
}

/**
 * Get coverage summary for UI display
 */
export function getCoverageSummary() {
  const status = getProviderStatus();
  const names = getProviderNames();

  return {
    status,
    names,
    hasFinancials: status.financial,
    hasMarketData: status.market,
    hasPositioning: status.positioning,
    hasDocuments: status.documents,
    message: !hasAnyProvider()
      ? "No data providers configured. Add API keys to enable company analysis."
      : "Partial data available. Some providers not configured.",
  };
}
