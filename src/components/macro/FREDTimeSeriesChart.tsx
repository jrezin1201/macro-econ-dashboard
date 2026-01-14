/**
 * FRED Time Series Chart
 *
 * Shows historical trend for a single FRED indicator
 */

"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";
import type { TimeSeriesDataPoint } from "@/lib/macro/types";

interface Props {
  data: TimeSeriesDataPoint[];
  title: string;
  color?: string;
  units?: string;
  showZeroLine?: boolean;
  lookbackMonths?: number; // Only show last N months
}

export function FREDTimeSeriesChart({
  data,
  title,
  color = "#3b82f6",
  units = "",
  showZeroLine = false,
  lookbackMonths = 60, // Default: 5 years
}: Props) {
  // Filter to lookback period
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - lookbackMonths);

  const recentData = data.filter((point) => {
    const pointDate = new Date(point.dateString);
    return pointDate >= cutoffDate;
  });

  if (recentData.length === 0) {
    return (
      <div className="bg-white/5 rounded-lg border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="text-center py-12">
          <p className="text-white/60">No data available</p>
        </div>
      </div>
    );
  }

  const chartData = recentData.map((point) => ({
    date: point.dateString,
    value: point.value,
  }));

  const latestValue = recentData[recentData.length - 1]?.value;

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {latestValue !== undefined && (
          <span className="text-xl font-bold text-white">
            {latestValue.toFixed(2)}{units}
          </span>
        )}
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.6)"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              tickFormatter={(value) => {
                try {
                  return format(new Date(value), "MMM yy");
                } catch {
                  return value;
                }
              }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="rgba(255,255,255,0.6)"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              tickFormatter={(value) => `${value.toFixed(1)}${units}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(17, 24, 39, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number | undefined) => value !== undefined ? [`${value.toFixed(2)}${units}`, title] : ["", ""]}
              labelFormatter={(label) => {
                try {
                  return format(new Date(label), "MMM dd, yyyy");
                } catch {
                  return label;
                }
              }}
            />
            {showZeroLine && (
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />
            )}
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              name={title}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
