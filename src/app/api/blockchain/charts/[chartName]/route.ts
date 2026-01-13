/**
 * Blockchain Charts API Route
 */

import { NextRequest, NextResponse } from "next/server";
import { getChartData } from "@/modules/blockchain/lib/blockchain-api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chartName: string }> }
) {
  try {
    const { chartName } = await params;
    const searchParams = request.nextUrl.searchParams;
    const timespan = searchParams.get("timespan") || "1year";
    const rollingAverage = searchParams.get("rollingAverage") || undefined;

    const data = await getChartData(chartName, timespan, rollingAverage);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Blockchain chart error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch data" },
      { status: 500 }
    );
  }
}
