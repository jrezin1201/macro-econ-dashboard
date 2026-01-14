/**
 * Engine Scoring API Route
 *
 * Fetches macro data and returns engine scores
 */

import { NextResponse } from "next/server";
import { scoreAllEngines } from "@/lib/engines/engineScoring";
import { fetchMacroInputs, getMockMacroInputs } from "@/lib/engines/macroData";

export const dynamic = "force-dynamic"; // Disable caching for fresh data

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const useMockData = searchParams.get("mock") === "true";

    // Fetch macro inputs
    const macroInputs = useMockData ? getMockMacroInputs() : await fetchMacroInputs();

    // Score all engines
    const result = scoreAllEngines(macroInputs);

    return NextResponse.json({
      success: true,
      data: result,
      macroInputs, // Include raw inputs for debugging
      usedMockData: useMockData,
    });
  } catch (error) {
    console.error("Error scoring engines:", error);

    // Fallback to mock data on error
    const macroInputs = getMockMacroInputs();
    const result = scoreAllEngines(macroInputs);

    return NextResponse.json({
      success: true,
      data: result,
      macroInputs,
      usedMockData: true,
      fallback: true,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
