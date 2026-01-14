/**
 * Portfolio Allocation Pie Chart
 *
 * Shows portfolio allocation across 12 economic engines
 */

"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { EngineId } from "@/lib/portfolio/schema";
import { getEngine } from "@/lib/engines/engineConfig";

interface AllocationData {
  engine: EngineId;
  percentage: number;
}

interface Props {
  allocations: AllocationData[];
}

// Engine colors for consistency
const ENGINE_COLORS: Record<string, string> = {
  VOLATILITY_OPTIONALITY: "#8b5cf6", // purple
  GROWTH_DURATION: "#3b82f6", // blue
  CASHFLOW_COMPOUNDERS: "#10b981", // green
  CREDIT_CARRY: "#f59e0b", // amber
  ENERGY_COMMODITIES: "#ef4444", // red
  GOLD_SCARCITY: "#fbbf24", // yellow
  REAL_ESTATE_RENT: "#ec4899", // pink
  DEFENSE_GEOPOLITICS: "#6366f1", // indigo
  INFRASTRUCTURE_CAPEX: "#14b8a6", // teal
  SMALL_CAPS_DOMESTIC: "#f97316", // orange
  INTERNATIONAL_FX_EM: "#06b6d4", // cyan
  SPECIAL_SITUATIONS: "#a855f7", // violet
};

export function PortfolioAllocationChart({ allocations }: Props) {
  // Filter out zero allocations
  const chartData = allocations
    .filter((a) => a.percentage > 0.1) // Only show if >0.1%
    .map((a) => {
      const engine = getEngine(a.engine);
      return {
        name: engine?.label || a.engine,
        value: a.percentage,
        engine: a.engine,
      };
    })
    .sort((a, b) => b.value - a.value); // Sort by size

  if (chartData.length === 0) {
    return (
      <div className="bg-white/5 rounded-lg border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Portfolio Allocation</h2>
        <div className="text-center py-12">
          <p className="text-white/60">No portfolio holdings yet.</p>
          <p className="text-white/40 text-sm mt-2">
            Add holdings to see your allocation across engines.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Portfolio Allocation by Engine</h2>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={ENGINE_COLORS[entry.engine] || "#64748b"} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(17, 24, 39, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number | undefined) => value !== undefined ? [`${value.toFixed(1)}%`, "Allocation"] : ["", "Allocation"]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}
              formatter={(value, entry: { payload?: { value?: number } }) => `${value} (${entry.payload?.value?.toFixed(1) ?? '0'}%)`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Holdings */}
      <div className="mt-6 space-y-2">
        <h3 className="text-sm font-semibold text-white/70 mb-3">Top Allocations</h3>
        {chartData.slice(0, 5).map((item) => (
          <div key={item.engine} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: ENGINE_COLORS[item.engine] }}
              />
              <span className="text-white/80">{item.name}</span>
            </div>
            <span className="text-white font-semibold">{item.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Custom label for pie chart
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}) => {
  // Only show label if slice is >5%
  if (!percent || percent < 0.05) return null;
  if (typeof cx === 'undefined' || typeof cy === 'undefined' || typeof midAngle === 'undefined' || typeof innerRadius === 'undefined' || typeof outerRadius === 'undefined') return null;

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
