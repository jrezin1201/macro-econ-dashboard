/**
 * Macro Charts Section
 *
 * Shows historical charts for key macro indicators
 */

"use client";

import { FREDTimeSeriesChart } from "./FREDTimeSeriesChart";
import type { TimeSeriesDataPoint } from "@/lib/macro/types";

interface Props {
  data: {
    rates: {
      fedfunds: TimeSeriesDataPoint[];
      dgs2: TimeSeriesDataPoint[];
      dgs10: TimeSeriesDataPoint[];
    };
    growth: {
      sentiment: TimeSeriesDataPoint[];
      payems: TimeSeriesDataPoint[];
    };
    inflation: {
      cpi: TimeSeriesDataPoint[];
      pce: TimeSeriesDataPoint[];
    };
    credit: {
      hyOAS: TimeSeriesDataPoint[];
      stlFSI: TimeSeriesDataPoint[];
    };
  };
}

export function MacroChartsSection({ data }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Historical Trends</h2>
        <p className="text-sm text-white/60">Last 5 years</p>
      </div>

      {/* Rates Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Interest Rates & Curve</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FREDTimeSeriesChart
            data={data.rates.fedfunds}
            title="Fed Funds Rate"
            color="#3b82f6"
            units="%"
            showZeroLine={false}
          />
          <FREDTimeSeriesChart
            data={data.rates.dgs10}
            title="10-Year Treasury Yield"
            color="#8b5cf6"
            units="%"
            showZeroLine={false}
          />
        </div>
      </div>

      {/* Growth Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Growth Indicators</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FREDTimeSeriesChart
            data={data.growth.sentiment}
            title="Consumer Sentiment"
            color="#10b981"
            units=""
            showZeroLine={false}
          />
          <FREDTimeSeriesChart
            data={data.growth.payems}
            title="Nonfarm Payrolls"
            color="#14b8a6"
            units="k"
            showZeroLine={false}
          />
        </div>
      </div>

      {/* Inflation Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Inflation Indicators</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FREDTimeSeriesChart
            data={data.inflation.cpi}
            title="Core CPI"
            color="#f59e0b"
            units=""
            showZeroLine={false}
          />
          <FREDTimeSeriesChart
            data={data.inflation.pce}
            title="Core PCE"
            color="#fbbf24"
            units=""
            showZeroLine={false}
          />
        </div>
      </div>

      {/* Credit Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Credit & Stress</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FREDTimeSeriesChart
            data={data.credit.hyOAS}
            title="High Yield OAS"
            color="#ef4444"
            units="bps"
            showZeroLine={false}
          />
          <FREDTimeSeriesChart
            data={data.credit.stlFSI}
            title="Financial Stress Index"
            color="#dc2626"
            units=""
            showZeroLine={true}
          />
        </div>
      </div>
    </div>
  );
}
