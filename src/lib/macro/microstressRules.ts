/**
 * Credit Microstress - Rules Integration
 *
 * Combines microstress analysis with macro regime alert logic
 */

import type { AlertLevel } from "./types";
import type { MicrostressLevel } from "./microstressTypes";
import { MICROSTRESS_CONFIG } from "./microstressConfig";

/**
 * Apply microstress gating to macro alert level
 *
 * Rules:
 * 1. If microstress is RED, overall alert cannot be GREEN
 * 2. If microstress is YELLOW, bump alert up one level (unless already RED)
 */
export function applyMicrostressGating(
  baseAlertLevel: AlertLevel,
  microstressLevel: MicrostressLevel
): {
  finalAlertLevel: AlertLevel;
  gatingApplied: boolean;
  gatingReason: string | null;
} {
  let finalAlertLevel = baseAlertLevel;
  let gatingApplied = false;
  let gatingReason: string | null = null;

  // Rule 1: RED microstress blocks GREEN alert
  if (
    microstressLevel === "RED" &&
    baseAlertLevel === "GREEN" &&
    MICROSTRESS_CONFIG.alertGating.redBlocksGreen
  ) {
    finalAlertLevel = "YELLOW";
    gatingApplied = true;
    gatingReason = "Funding market stress prevents GREEN alert (gated to YELLOW)";
  }

  // Rule 2: YELLOW microstress bumps up alert level
  if (
    microstressLevel === "YELLOW" &&
    baseAlertLevel === "GREEN" &&
    MICROSTRESS_CONFIG.alertGating.yellowBumpsUp
  ) {
    finalAlertLevel = "YELLOW";
    gatingApplied = true;
    gatingReason = "Funding market caution signals bump alert to YELLOW";
  }

  if (
    microstressLevel === "YELLOW" &&
    baseAlertLevel === "YELLOW" &&
    MICROSTRESS_CONFIG.alertGating.yellowBumpsUp
  ) {
    // Already YELLOW, could consider bumping to RED if combined with other factors
    // For now, keep at YELLOW
    gatingReason = "Funding market caution confirms YELLOW alert";
  }

  // RED microstress + RED macro = double RED (reinforce)
  if (microstressLevel === "RED" && baseAlertLevel === "RED") {
    gatingReason = "⚠️ Double RED: Macro stress + Funding stress";
  }

  return {
    finalAlertLevel,
    gatingApplied,
    gatingReason,
  };
}

/**
 * Generate microstress-aware alert reasons
 */
export function getMicrostressAlertReasons(
  microstressLevel: MicrostressLevel,
  microstressReasons: string[]
): string[] {
  const reasons: string[] = [];

  if (microstressLevel === "RED") {
    reasons.push("🚨 CREDIT PLUMBING STRESS:");
    reasons.push(...microstressReasons.slice(0, 3)); // Top 3 reasons
  } else if (microstressLevel === "YELLOW") {
    reasons.push("⚠ Funding Market Caution:");
    reasons.push(...microstressReasons.slice(0, 2)); // Top 2 reasons
  } else {
    // GREEN - no additional reasons needed, or optionally add one positive
    // reasons.push("✓ Funding markets healthy");
  }

  return reasons;
}
