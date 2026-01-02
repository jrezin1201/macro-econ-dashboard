/**
 * Time Series Chart Component
 *
 * Renders FRED time series data using Recharts
 */

"use client";

import { useFredSeries } from "../hooks/useFredSeries";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { InfoTooltip } from "@/components/InfoTooltip";

interface TimeSeriesChartProps {
  seriesId: string;
  title: string;
  color?: string;
  observationStart?: string;
  observationEnd?: string;
  unit?: string;
  formatValue?: (value: number) => string;
  source?: string;
  calculation?: string;
  updateFrequency?: string;
  notes?: string;
}

export function TimeSeriesChart({
  seriesId,
  title,
  color = "#3b82f6",
  observationStart,
  observationEnd,
  unit = "",
  formatValue,
  source,
  calculation,
  updateFrequency,
  notes,
}: TimeSeriesChartProps) {
  const { data, loading, error } = useFredSeries(seriesId, {
    observationStart,
    observationEnd,
  });

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {source && updateFrequency && (
            <InfoTooltip
              title={title}
              source={source}
              calculation={calculation}
              updateFrequency={updateFrequency}
              notes={notes}
            />
          )}
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {source && updateFrequency && (
            <InfoTooltip
              title={title}
              source={source}
              calculation={calculation}
              updateFrequency={updateFrequency}
              notes={notes}
            />
          )}
        </div>
        <div className="h-64 flex items-center justify-center">
          <p className="text-red-400">{error || "No data available"}</p>
        </div>
      </div>
    );
  }

  const chartData = data.map((point) => ({
    date: format(point.date, "MMM yyyy"),
    value: point.value,
    fullDate: format(point.date, "MMM d, yyyy"),
  }));

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {source && updateFrequency && (
          <InfoTooltip
            title={title}
            source={source}
            calculation={calculation}
            updateFrequency={updateFrequency}
            notes={notes}
          />
        )}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="date"
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: "rgba(255,255,255,0.7)" }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: "rgba(255,255,255,0.7)" }}
            tickFormatter={(value) =>
              formatValue ? formatValue(value) : `${value}${unit}`
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "rgba(255,255,255,0.9)" }}
            itemStyle={{ color: color }}
            formatter={(value: number | undefined) => {
              if (value === undefined) return "";
              return formatValue ? formatValue(value) : `${value.toFixed(2)}${unit}`;
            }}
            labelFormatter={(label, payload) =>
              payload[0]?.payload?.fullDate || label
            }
          />
          <Legend wrapperStyle={{ color: "rgba(255,255,255,0.7)" }} />
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
  );
}
