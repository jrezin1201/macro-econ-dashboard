/**
 * Bitcoin Analysis API Route
 */

import { NextResponse } from "next/server";
import { getSeriesData } from "@/modules/fred-api/lib/fred-client";
import { analyzeBitcoinTrend, generateMSTRGuidance } from "@/lib/crypto/bitcoinCalc";
import type { BitcoinPrice } from "@/lib/crypto/bitcoinTypes";
import { BITCOIN_CONFIG } from "@/lib/crypto/bitcoinConfig";

export async function GET() {
  try {
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

    return NextResponse.json({
      analysis: {
        ...analysis,
        lastUpdated: analysis.lastUpdated.toISOString(),
      },
      mstrGuidance,
      prices,
    });
  } catch (error) {
    console.error("Bitcoin analysis API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Bitcoin analysis" },
      { status: 500 }
    );
  }
}
