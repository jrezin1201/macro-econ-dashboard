/**
 * FRED API Route Handler
 *
 * Proxies requests to FRED API to keep API key secure on server
 */

import { NextRequest, NextResponse } from "next/server";
import { getSeriesData } from "@/modules/fred-api/lib/fred-client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const seriesId = searchParams.get("seriesId");

    if (!seriesId) {
      return NextResponse.json(
        { error: "seriesId parameter is required" },
        { status: 400 }
      );
    }

    const observationStart = searchParams.get("observationStart") || undefined;
    const observationEnd = searchParams.get("observationEnd") || undefined;

    const data = await getSeriesData(seriesId, {
      observationStart,
      observationEnd,
    });

    return NextResponse.json({
      data,
      seriesId,
      count: data.length,
    });
  } catch (error) {
    console.error("FRED API error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch FRED data",
      },
      { status: 500 }
    );
  }
}
