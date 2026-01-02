"use client";

import {
  EconomicIndicatorCardWithMeta as EconomicIndicatorCard,
  TimeSeriesChartWithMeta as TimeSeriesChart,
  POPULAR_SERIES
} from "@/modules/fred-api";
import { US_MACRO } from "@/modules/fred-api/lib/macro-series";

export default function USMacroPage() {
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  const startDate = fiveYearsAgo.toISOString().split("T")[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">🇺🇸 U.S. Macro</h1>
        <p className="text-xl text-white/60">
          Comprehensive view of U.S. economic indicators
        </p>
      </div>

      {/* Key Indicators */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Key Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <EconomicIndicatorCard
            seriesId={POPULAR_SERIES.GDP}
            title="GDP"
            description="Gross Domestic Product"
            formatValue={(v) => `$${(v / 1000).toFixed(1)}T`}
          />
          <EconomicIndicatorCard
            seriesId={POPULAR_SERIES.UNEMPLOYMENT}
            title="Unemployment"
            unit="%"
          />
          <EconomicIndicatorCard
            seriesId={POPULAR_SERIES.INFLATION}
            title="Inflation (CPI)"
            formatValue={(v) => v.toFixed(1)}
          />
          <EconomicIndicatorCard
            seriesId={POPULAR_SERIES.FED_FUNDS_RATE}
            title="Fed Funds Rate"
            unit="%"
          />
        </div>
      </section>

      {/* Growth & Output */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Growth & Output</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="GDP"
            title="GDP"
            color="#10b981"
            observationStart={startDate}
            formatValue={(v) => `$${(v / 1000).toFixed(1)}T`}
          />
          <TimeSeriesChart
            seriesId="GDPC1"
            title="Real GDP"
            color="#3b82f6"
            observationStart={startDate}
            formatValue={(v) => `$${(v / 1000).toFixed(1)}T`}
          />
        </div>
      </section>

      {/* Labor Market */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Labor Market</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <EconomicIndicatorCard
            seriesId="UNRATE"
            title="Unemployment Rate"
            unit="%"
          />
          <EconomicIndicatorCard
            seriesId="PAYEMS"
            title="Nonfarm Payroll"
            description="Total employment in thousands"
            formatValue={(v) => `${(v / 1000).toFixed(1)}M`}
          />
          <EconomicIndicatorCard
            seriesId="CIVPART"
            title="Labor Force Participation"
            unit="%"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="UNRATE"
            title="Unemployment Rate"
            color="#ef4444"
            unit="%"
            observationStart={startDate}
          />
          <TimeSeriesChart
            seriesId="PAYEMS"
            title="Nonfarm Payroll Employment"
            color="#10b981"
            observationStart={startDate}
            formatValue={(v) => `${(v / 1000).toFixed(0)}M`}
          />
        </div>
      </section>

      {/* Monetary Policy */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Monetary Policy & Rates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <EconomicIndicatorCard
            seriesId="FEDFUNDS"
            title="Fed Funds Rate"
            unit="%"
          />
          <EconomicIndicatorCard
            seriesId="DGS10"
            title="10-Year Treasury"
            unit="%"
          />
          <EconomicIndicatorCard
            seriesId="T10Y2Y"
            title="Yield Curve Spread"
            description="10Y - 2Y Treasury"
            unit="%"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="FEDFUNDS"
            title="Federal Funds Rate"
            color="#3b82f6"
            unit="%"
            observationStart={startDate}
          />
          <TimeSeriesChart
            seriesId="T10Y2Y"
            title="Yield Curve (10Y-2Y Spread)"
            color="#f59e0b"
            unit="%"
            observationStart={startDate}
          />
        </div>
      </section>

      {/* Markets */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Financial Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <EconomicIndicatorCard
            seriesId="SP500"
            title="S&P 500"
            description="Stock market index"
          />
          <EconomicIndicatorCard
            seriesId="VIXCLS"
            title="VIX (Volatility)"
            description="Fear index"
          />
          <EconomicIndicatorCard
            seriesId="DEXUSEU"
            title="USD/EUR"
            description="Dollar strength vs Euro"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="SP500"
            title="S&P 500 Index"
            color="#10b981"
            observationStart={startDate}
          />
          <TimeSeriesChart
            seriesId="VIXCLS"
            title="VIX Volatility Index"
            color="#ef4444"
            observationStart={startDate}
          />
        </div>
      </section>

      {/* Consumer & Housing */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Consumer & Housing</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="RSXFS"
            title="Retail Sales"
            color="#8b5cf6"
            observationStart={startDate}
            formatValue={(v) => `$${(v / 1000).toFixed(0)}B`}
          />
          <TimeSeriesChart
            seriesId="HOUST"
            title="Housing Starts"
            color="#ec4899"
            observationStart={startDate}
            formatValue={(v) => `${v.toFixed(0)}K`}
          />
        </div>
      </section>
    </div>
  );
}
