/**
 * Bitcoin Analysis API Route
 * Now using Blockchain.com for real-time data
 */

import { NextResponse } from "next/server";
import { getChartData, getTicker } from "@/modules/blockchain/lib/blockchain-api";
import { analyzeBitcoinTrend, generateMSTRGuidance } from "@/lib/crypto/bitcoinCalc";
import type { BitcoinPrice } from "@/lib/crypto/bitcoinTypes";

export async function GET() {
  try {
    // Fetch historical Bitcoin prices from Blockchain.com (last year)
    const chartData = await getChartData("market-price", "1year");

    // Convert Blockchain.com format to BitcoinPrice format
    const prices: BitcoinPrice[] = chartData.values.map((point) => {
      const date = new Date(point.x * 1000); // Convert Unix timestamp to Date
      return {
        date: date.toISOString().split("T")[0],
        price: point.y,
      };
    });

    // Analyze
    const analysis = analyzeBitcoinTrend(prices);

    // Generate MSTR guidance (default to Risk-On for standalone page)
    const mstrGuidance = generateMSTRGuidance("Risk-On", analysis.trendLevel);

    return NextResponse.json(
      {
        analysis: {
          ...analysis,
          lastUpdated: analysis.lastUpdated.toISOString(),
        },
        mstrGuidance,
        prices,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    console.error("Bitcoin analysis API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Bitcoin analysis" },
      { status: 500 }
    );
  }
}

// Disable Next.js caching
export const dynamic = "force-dynamic";
export const revalidate = 0;
