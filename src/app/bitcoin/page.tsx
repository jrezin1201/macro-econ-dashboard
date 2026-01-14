/**
 * Bitcoin Analysis Page
 */

import { getSeriesData } from "@/modules/fred-api/lib/fred-client";
import { analyzeBitcoinTrend, generateMSTRGuidance } from "@/lib/crypto/bitcoinCalc";
import type { BitcoinPrice } from "@/lib/crypto/bitcoinTypes";
import { BITCOIN_CONFIG } from "@/lib/crypto/bitcoinConfig";
import { getPortfolio } from "@/lib/portfolio/store";
import { BitcoinClient } from "@/components/bitcoin/BitcoinClient";

async function fetchBitcoinData() {
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  const startDate = fiveYearsAgo.toISOString().split("T")[0];

  // Fetch Bitcoin price from FRED
  const btcData = await getSeriesData(BITCOIN_CONFIG.fredSeriesId, {
    observationStart: startDate,
  });

  // Convert to BitcoinPrice format
  const prices: BitcoinPrice[] = btcData.map((point) => ({
    date: point.dateString,
    price: point.value,
  }));

  // Analyze
  const analysis = analyzeBitcoinTrend(prices);

  // Generate MSTR guidance (default to Risk-On for standalone page)
  const mstrGuidance = generateMSTRGuidance("Risk-On", analysis.trendLevel);

  return {
    analysis,
    prices,
    mstrGuidance,
  };
}

export default async function BitcoinPage() {
  const data = await fetchBitcoinData();
  const { analysis, mstrGuidance, prices } = data;

  // Get portfolio for impact analysis
  const portfolio = getPortfolio();

  // Convert Date to ISO string for client component
  const clientAnalysis = {
    ...analysis,
    lastUpdated: analysis.lastUpdated.toISOString(),
  };

  return (
    <BitcoinClient
      initialAnalysis={clientAnalysis}
      initialGuidance={mstrGuidance}
      initialPrices={prices}
      portfolio={portfolio}
    />
  );
}
