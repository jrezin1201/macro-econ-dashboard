/**
 * Blockchain Ticker API Route
 */

import { NextRequest, NextResponse } from "next/server";
import { getTicker } from "@/modules/blockchain/lib/blockchain-api";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const currency = searchParams.get("currency") || "USD";

    const data = await getTicker(currency);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Blockchain ticker error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch data" },
      { status: 500 }
    );
  }
}
