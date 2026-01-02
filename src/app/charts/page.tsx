"use client";

import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SERIES_CATALOG } from "@/modules/fred-api/lib/series-catalog";
import { MultiSeriesChart } from "@/modules/fred-api/components/MultiSeriesChart";

const CHART_COLORS = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#10b981", // green
  "#f59e0b", // amber
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f97316", // orange
];

interface SelectedSeries {
  id: string;
  name: string;
  color: string;
}

export default function ChartBuilderPage() {
  const [selectedSeries, setSelectedSeries] = useState<SelectedSeries[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [normalize, setNormalize] = useState(false);
  const [startDate, setStartDate] = useState("2020-01-01");

  const availableSeries = SERIES_CATALOG.filter(
    (s) =>
      !selectedSeries.find((sel) => sel.id === s.id) &&
      (searchQuery === "" ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addSeries = (seriesId: string) => {
    const series = SERIES_CATALOG.find((s) => s.id === seriesId);
    if (!series) return;

    setSelectedSeries([
      ...selectedSeries,
      {
        id: series.id,
        name: series.name,
        color: CHART_COLORS[selectedSeries.length % CHART_COLORS.length],
      },
    ]);
    setSearchQuery("");
  };

  const removeSeries = (seriesId: string) => {
    setSelectedSeries(selectedSeries.filter((s) => s.id !== seriesId));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Chart Builder</h1>
        <p className="text-white/60">
          Overlay and compare multiple economic indicators
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 space-y-4">
        <h3 className="text-lg font-semibold text-white">Chart Settings</h3>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="block rounded-md border-0 bg-white/10 py-2 px-3 text-white focus:bg-white/20 focus:ring-2 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        {/* Normalize Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="normalize"
            checked={normalize}
            onChange={(e) => setNormalize(e.target.checked)}
            className="h-4 w-4 rounded border-gray-600 bg-white/10 text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="normalize" className="text-sm text-white/70">
            Normalize to % change from start (useful for comparing different scales)
          </label>
        </div>

        {/* Add Series */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Add Indicator
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for indicators to add..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-0 bg-white/10 py-2 px-3 text-white placeholder:text-gray-400 focus:bg-white/20 focus:ring-2 focus:ring-blue-500 sm:text-sm"
            />
            {searchQuery && availableSeries.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-white/20 rounded-md shadow-lg max-h-60 overflow-auto">
                {availableSeries.slice(0, 10).map((series) => (
                  <button
                    key={series.id}
                    onClick={() => addSeries(series.id)}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 text-white"
                  >
                    <div className="font-medium">{series.name}</div>
                    <div className="text-xs text-white/60">{series.id}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Series */}
        {selectedSeries.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Selected Indicators ({selectedSeries.length})
            </label>
            <div className="space-y-2">
              {selectedSeries.map((series) => (
                <div
                  key={series.id}
                  className="flex items-center justify-between bg-white/5 rounded-md p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: series.color }}
                    />
                    <span className="text-white font-medium">{series.name}</span>
                    <span className="text-white/40 text-sm">{series.id}</span>
                  </div>
                  <button
                    onClick={() => removeSeries(series.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      {selectedSeries.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-12 border border-white/10 text-center">
          <PlusIcon className="h-12 w-12 text-white/40 mx-auto mb-4" />
          <p className="text-white/60">
            Add indicators above to start building your chart
          </p>
        </div>
      ) : (
        <MultiSeriesChart
          series={selectedSeries}
          title="Custom Comparison"
          observationStart={startDate}
          normalize={normalize}
        />
      )}

      {/* Presets */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Quick Presets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setSelectedSeries([
                { id: "UNRATE", name: "Unemployment Rate", color: "#ef4444" },
                { id: "PAYEMS", name: "Nonfarm Payroll", color: "#10b981" },
              ]);
              setNormalize(false);
            }}
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-left transition-colors"
          >
            <h4 className="font-semibold text-white mb-1">Labor Market</h4>
            <p className="text-sm text-white/60">Unemployment vs Employment</p>
          </button>

          <button
            onClick={() => {
              setSelectedSeries([
                { id: "CPIAUCSL", name: "CPI", color: "#f59e0b" },
                { id: "FEDFUNDS", name: "Fed Funds Rate", color: "#3b82f6" },
              ]);
              setNormalize(false);
            }}
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-left transition-colors"
          >
            <h4 className="font-semibold text-white mb-1">Inflation vs Policy</h4>
            <p className="text-sm text-white/60">CPI vs Fed Funds Rate</p>
          </button>

          <button
            onClick={() => {
              setSelectedSeries([
                { id: "DGS2", name: "2-Year Treasury", color: "#3b82f6" },
                { id: "DGS10", name: "10-Year Treasury", color: "#10b981" },
                { id: "DGS30", name: "30-Year Treasury", color: "#8b5cf6" },
              ]);
              setNormalize(false);
            }}
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-left transition-colors"
          >
            <h4 className="font-semibold text-white mb-1">Yield Curve</h4>
            <p className="text-sm text-white/60">2Y, 10Y, 30Y Treasuries</p>
          </button>

          <button
            onClick={() => {
              setSelectedSeries([
                { id: "SP500", name: "S&P 500", color: "#10b981" },
                { id: "VIXCLS", name: "VIX", color: "#ef4444" },
              ]);
              setNormalize(true);
            }}
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-left transition-colors"
          >
            <h4 className="font-semibold text-white mb-1">Risk vs Volatility</h4>
            <p className="text-sm text-white/60">S&P 500 vs VIX (normalized)</p>
          </button>
        </div>
      </div>
    </div>
  );
}
