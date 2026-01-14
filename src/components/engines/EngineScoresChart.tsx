/**
 * Engine Scores Bar Chart
 *
 * Visual representation of engine scores
 */

"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import type { EngineScore } from "@/lib/engines/engineScoring";
import { getEngine } from "@/lib/engines/engineConfig";
import type { EngineId } from "@/lib/portfolio/schema";

interface Props {
  scores: Map<EngineId, EngineScore>;
}

export function EngineScoresChart({ scores }: Props) {
  // Convert Map to array and sort by score
  const chartData = Array.from(scores.entries())
    .map(([engineId, score]) => {
      const engine = getEngine(engineId);
      return {
        name: engine?.label || engineId,
        score: score.score,
        stance: score.stance,
        engineId,
      };
    })
    .sort((a, b) => b.score - a.score);

  // Color based on score
  const getBarColor = (score: number, stance: string) => {
    if (stance === "OVERWEIGHT") return "#10b981"; // green
    if (stance === "UNDERWEIGHT") return "#ef4444"; // red
    if (score >= 70) return "#3b82f6"; // blue (high score)
    if (score >= 40) return "#f59e0b"; // amber (medium)
    return "#64748b"; // gray (low)
  };

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Engine Scores Overview</h2>

      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              type="number"
              domain={[0, 100]}
              stroke="rgba(255,255,255,0.6)"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="rgba(255,255,255,0.6)"
              tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 11 }}
              width={110}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(17, 24, 39, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number | undefined, name: string | undefined, props: { payload?: { stance?: string } }) => [
                `${value ?? 0}/100`,
                `${props?.payload?.stance ?? ""}`,
              ]}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.score, entry.stance)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-white/70">Overweight Stance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-white/70">Underweight Stance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-white/70">High Score (70+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-500" />
          <span className="text-white/70">Medium Score (40-69)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gray-500" />
          <span className="text-white/70">Low Score (&lt;40)</span>
        </div>
      </div>
    </div>
  );
}
