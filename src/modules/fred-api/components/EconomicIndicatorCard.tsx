/**
 * Economic Indicator Card
 *
 * Displays a single economic indicator with trend visualization
 */

"use client";

import { useFredSeries } from "../hooks/useFredSeries";
import { format } from "date-fns";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { InfoTooltip } from "@/components/InfoTooltip";

interface EconomicIndicatorCardProps {
  seriesId: string;
  title: string;
  description?: string;
  unit?: string;
  formatValue?: (value: number) => string;
  source?: string;
  calculation?: string;
  updateFrequency?: string;
  notes?: string;
}

export function EconomicIndicatorCard({
  seriesId,
  title,
  description,
  unit = "",
  formatValue,
  source,
  calculation,
  updateFrequency,
  notes,
}: EconomicIndicatorCardProps) {
  const { data, loading, error } = useFredSeries(seriesId, {
    // Get last 2 data points to calculate change
  });

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <div className="animate-pulse">
          <div className="h-4 bg-white/10 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-white/10 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-white/10 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <p className="text-sm text-white/60">{title}</p>
        <p className="text-red-400 text-sm mt-2">
          {error || "No data available"}
        </p>
      </div>
    );
  }

  const latestPoint = data[data.length - 1];
  const previousPoint = data.length > 1 ? data[data.length - 2] : null;

  const currentValue = latestPoint.value;
  const change = previousPoint
    ? ((currentValue - previousPoint.value) / previousPoint.value) * 100
    : 0;

  const isPositive = change >= 0;
  const displayValue = formatValue
    ? formatValue(currentValue)
    : `${currentValue.toFixed(2)}${unit}`;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center">
            <p className="text-sm text-white/60 mb-1">{title}</p>
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
          <p className="text-3xl font-bold text-white">{displayValue}</p>
        </div>
        {previousPoint && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded ${
              isPositive ? "bg-green-500/20" : "bg-red-500/20"
            }`}
          >
            {isPositive ? (
              <ArrowUpIcon className="w-4 h-4 text-green-400" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 text-red-400" />
            )}
            <span
              className={`text-sm font-medium ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {Math.abs(change).toFixed(2)}%
            </span>
          </div>
        )}
      </div>
      <p className="text-xs text-white/40">
        As of {format(latestPoint.date, "MMM d, yyyy")}
      </p>
      {description && (
        <p className="text-xs text-white/60 mt-2">{description}</p>
      )}
    </div>
  );
}
