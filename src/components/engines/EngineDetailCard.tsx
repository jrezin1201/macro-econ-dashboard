"use client";

/**
 * Engine Detail Card
 *
 * Expandable card showing full engine information
 */

import { useState } from "react";
import type { EngineScore } from "@/lib/engines/engineScoring";
import { getEngine } from "@/lib/engines/engineConfig";
import type { EngineId } from "@/lib/portfolio/schema";

interface Props {
  engineId: EngineId;
  score: EngineScore;
  currentPct: number;
  targetPct: number;
  deltaStatus: "UNDER" | "IN_RANGE" | "OVER";
}

export function EngineDetailCard({ engineId, score, currentPct, targetPct, deltaStatus }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const engine = getEngine(engineId);

  if (!engine) return null;

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-400";
    if (score >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getStanceColor = (stance: string) => {
    if (stance === "OVERWEIGHT") return "bg-green-500/20 text-green-300 border-green-500/30";
    if (stance === "UNDERWEIGHT") return "bg-red-500/20 text-red-300 border-red-500/30";
    return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  };

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-white">{engine.label}</h3>
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold border ${getStanceColor(
                  score.stance
                )}`}
              >
                {score.stance}
              </span>
              {score.status === "GATED" && (
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-600 text-white">
                  GATED
                </span>
              )}
            </div>

            {/* Score Bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getScoreColor(score.score)} bg-current transition-all`}
                  style={{ width: `${score.score}%` }}
                />
              </div>
              <span className={`text-sm font-mono font-bold ${getScoreColor(score.score)}`}>
                {score.score}/100
              </span>
            </div>

            {/* Portfolio Allocation */}
            <div className="mt-2 flex items-center gap-4 text-sm">
              <div>
                <span className="text-white/40">Your:</span>{" "}
                <span className="text-white font-semibold">{currentPct.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-white/40">Target:</span>{" "}
                <span className="text-white/60">{targetPct.toFixed(0)}%</span>
              </div>
              <div>
                <span
                  className={`px-2 py-0.5 rounded text-xs ${
                    deltaStatus === "OVER"
                      ? "bg-red-500/20 text-red-300"
                      : deltaStatus === "UNDER"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-green-500/20 text-green-300"
                  }`}
                >
                  {deltaStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Expand Icon */}
          <div className="ml-4">
            <svg
              className={`w-5 h-5 text-white/60 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 bg-white/5 space-y-4 border-t border-white/10">
          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 mb-2">Description</h4>
            <p className="text-sm text-white/60">{engine.description}</p>
          </div>

          {/* Key Reasons */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 mb-2">
              Why {score.stance}?
            </h4>
            <ul className="space-y-1">
              {score.reasons.map((reason, i) => (
                <li key={i} className="text-sm text-white/70">
                  • {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Drivers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Helps */}
            {score.drivers.helps.length > 0 && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <h5 className="text-xs font-semibold text-green-300 mb-2">
                  ✓ Tailwinds
                </h5>
                <ul className="space-y-1">
                  {score.drivers.helps.map((help, i) => (
                    <li key={i} className="text-xs text-green-200/70">
                      • {help}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hurts */}
            {score.drivers.hurts.length > 0 && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                <h5 className="text-xs font-semibold text-red-300 mb-2">
                  ✗ Headwinds
                </h5>
                <ul className="space-y-1">
                  {score.drivers.hurts.map((hurt, i) => (
                    <li key={i} className="text-xs text-red-200/70">
                      • {hurt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Examples */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 mb-2">Examples</h4>
            <div className="flex flex-wrap gap-2">
              {engine.examples.map((example, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>

          {/* Confidence */}
          <div className="pt-2 border-t border-white/5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40">Signal Confidence</span>
              <span className="text-white/70 font-semibold">{score.confidence}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
