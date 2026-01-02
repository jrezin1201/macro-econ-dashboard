/**
 * Blockchain Stats API Route
 */

import { NextResponse } from "next/server";
import { getBlockchainStats } from "@/modules/blockchain/lib/blockchain-api";

export async function GET() {
  try {
    const data = await getBlockchainStats();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Blockchain stats error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch data" },
      { status: 500 }
    );
  }
}
