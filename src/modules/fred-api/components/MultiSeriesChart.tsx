/**
 * Multi-Series Chart Component
 *
 * Renders multiple FRED time series on a single chart
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

interface SeriesConfig {
  id: string;
  name: string;
  color: string;
}

interface MultiSeriesChartProps {
  series: SeriesConfig[];
  title: string;
  observationStart?: string;
  observationEnd?: string;
  normalize?: boolean; // Normalize to percentage change from start
}

export function MultiSeriesChart({
  series,
  title,
  observationStart,
  observationEnd,
  normalize = false,
}: MultiSeriesChartProps) {
  // Fetch all series data
  const seriesData = series.map((s) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useFredSeries(s.id, {
      observationStart,
      observationEnd,
    });
    return { config: s, data, loading, error };
  });

  const isLoading = seriesData.some((s) => s.loading);
  const hasError = seriesData.some((s) => s.error);

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (hasError || seriesData.every((s) => !s.data || s.data.length === 0)) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-red-400">Error loading data</p>
        </div>
      </div>
    );
  }

  // Combine all series data by date
  const dataMap = new Map<string, any>();

  seriesData.forEach(({ config, data }) => {
    if (!data) return;

    data.forEach((point) => {
      const dateKey = point.dateString;
      if (!dataMap.has(dateKey)) {
        dataMap.set(dateKey, {
          date: point.date,
          dateString: dateKey,
          fullDate: format(point.date, "MMM d, yyyy"),
        });
      }
      dataMap.get(dateKey)![config.id] = point.value;
    });
  });

  let chartData = Array.from(dataMap.values()).sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  // Normalize if requested
  if (normalize && chartData.length > 0) {
    const baseValues: Record<string, number> = {};
    series.forEach((s) => {
      const firstValue = chartData.find((d) => d[s.id] !== undefined)?.[s.id];
      if (firstValue) baseValues[s.id] = firstValue;
    });

    chartData = chartData.map((point) => {
      const normalized: any = { ...point };
      series.forEach((s) => {
        if (point[s.id] !== undefined && baseValues[s.id]) {
          normalized[s.id] = ((point[s.id] - baseValues[s.id]) / baseValues[s.id]) * 100;
        }
      });
      return normalized;
    });
  }

  // Format data for display (reduce points for performance)
  const displayData = chartData.map((point, idx) => ({
    ...point,
    displayDate: idx % Math.ceil(chartData.length / 50) === 0
      ? format(point.date, "MMM yy")
      : "",
  }));

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {normalize && (
          <span className="text-xs text-white/60">% change from start</span>
        )}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={displayData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="displayDate"
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: "rgba(255,255,255,0.7)" }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: "rgba(255,255,255,0.7)" }}
            tickFormatter={(value) =>
              normalize ? `${value.toFixed(1)}%` : value.toFixed(0)
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "rgba(255,255,255,0.9)" }}
            formatter={(value: number | undefined, name: string) => {
              if (value === undefined) return "";
              const seriesConfig = series.find((s) => s.id === name);
              return [
                normalize ? `${value.toFixed(2)}%` : value.toFixed(2),
                seriesConfig?.name || name,
              ];
            }}
            labelFormatter={(label, payload) =>
              payload[0]?.payload?.fullDate || label
            }
          />
          <Legend wrapperStyle={{ color: "rgba(255,255,255,0.7)" }} />
          {series.map((s) => (
            <Line
              key={s.id}
              type="monotone"
              dataKey={s.id}
              stroke={s.color}
              strokeWidth={2}
              dot={false}
              name={s.name}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
