"use client";

import { useState } from "react";
import { SERIES_CATALOG } from "@/modules/fred-api/lib/series-catalog";
import { TimeSeriesChart } from "@/modules/fred-api";
import { useFredSeries } from "@/modules/fred-api";

export default function AnalysisPage() {
  const [selectedSeries, setSelectedSeries] = useState("UNRATE");
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [calculation, setCalculation] = useState<"none" | "pct_change" | "diff">("none");

  const series = SERIES_CATALOG.find((s) => s.id === selectedSeries);
  const { data } = useFredSeries(selectedSeries, {
    observationStart: startDate,
    observationEnd: endDate,
  });

  // Calculate statistics
  const calculateStats = () => {
    if (!data || data.length === 0) return null;

    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;

    const sortedValues = [...values].sort((a, b) => a - b);
    const median =
      sortedValues.length % 2 === 0
        ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
        : sortedValues[Math.floor(sortedValues.length / 2)];

    const variance =
      values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);

    const firstValue = values[0];
    const lastValue = values[values.length - 1];
    const change = lastValue - firstValue;
    const pctChange = (change / firstValue) * 100;

    return {
      min,
      max,
      mean,
      median,
      stdDev,
      change,
      pctChange,
      count: values.length,
    };
  };

  const stats = calculateStats();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Custom Analysis</h1>
        <p className="text-white/60">
          Deep dive into individual indicators with custom date ranges and calculations
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 space-y-4">
        <h3 className="text-lg font-semibold text-white">Analysis Settings</h3>

        {/* Series Selection */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Select Indicator
          </label>
          <select
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
            className="block w-full rounded-md border-0 bg-white/10 py-2 px-3 text-white focus:bg-white/20 focus:ring-2 focus:ring-blue-500"
          >
            {SERIES_CATALOG.map((s) => (
              <option key={s.id} value={s.id} className="bg-gray-900">
                {s.name} ({s.id})
              </option>
            ))}
          </select>
          {series && (
            <p className="mt-1 text-sm text-white/60">{series.description}</p>
          )}
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full rounded-md border-0 bg-white/10 py-2 px-3 text-white focus:bg-white/20 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full rounded-md border-0 bg-white/10 py-2 px-3 text-white focus:bg-white/20 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Calculation Type */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Transformation
          </label>
          <select
            value={calculation}
            onChange={(e) => setCalculation(e.target.value as "none" | "pct_change" | "diff")}
            className="block w-full rounded-md border-0 bg-white/10 py-2 px-3 text-white focus:bg-white/20 focus:ring-2 focus:ring-blue-500"
          >
            <option value="none" className="bg-gray-900">Original Values</option>
            <option value="pct_change" className="bg-gray-900">Percentage Change</option>
            <option value="diff" className="bg-gray-900">Period-over-Period Difference</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-white/60">Data Points</p>
              <p className="text-2xl font-bold text-white">{stats.count}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Mean</p>
              <p className="text-2xl font-bold text-white">{stats.mean.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Median</p>
              <p className="text-2xl font-bold text-white">{stats.median.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Std Dev</p>
              <p className="text-2xl font-bold text-white">{stats.stdDev.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Min</p>
              <p className="text-2xl font-bold text-white">{stats.min.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Max</p>
              <p className="text-2xl font-bold text-white">{stats.max.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Total Change</p>
              <p className={`text-2xl font-bold ${stats.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                {stats.change >= 0 ? "+" : ""}{stats.change.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-white/60">% Change</p>
              <p className={`text-2xl font-bold ${stats.pctChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                {stats.pctChange >= 0 ? "+" : ""}{stats.pctChange.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <TimeSeriesChart
        seriesId={selectedSeries}
        title={series?.name || selectedSeries}
        observationStart={startDate}
        observationEnd={endDate}
        color="#3b82f6"
      />

      {/* Export Options */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Export Data</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              if (!data) return;
              const csv = [
                ["Date", "Value"],
                ...data.map((d) => [d.dateString, d.value]),
              ]
                .map((row) => row.join(","))
                .join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${selectedSeries}_${startDate}_${endDate}.csv`;
              a.click();
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
          >
            Download CSV
          </button>
          <button
            onClick={() => {
              if (!data) return;
              const json = JSON.stringify(data, null, 2);
              const blob = new Blob([json], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${selectedSeries}_${startDate}_${endDate}.json`;
              a.click();
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
          >
            Download JSON
          </button>
        </div>
      </div>
    </div>
  );
}
