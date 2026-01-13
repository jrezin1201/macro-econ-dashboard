/**
 * Finance Dashboard - Main Page
 *
 * Displays key economic indicators from FRED
 */

"use client";

import { EconomicIndicatorCardWithMeta as EconomicIndicatorCard } from "@/modules/fred-api/components/EconomicIndicatorCardWithMeta";
import { TimeSeriesChartWithMeta as TimeSeriesChart } from "@/modules/fred-api/components/TimeSeriesChartWithMeta";
import { POPULAR_SERIES } from "@/modules/fred-api";

export default function DashboardPage() {
  // Get date from 5 years ago for charts
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  const startDate = fiveYearsAgo.toISOString().split("T")[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Finance Dashboard
          </h1>
          <p className="text-xl text-white/60">
            Real-time economic indicators from the Federal Reserve Economic Data
          </p>
          <p className="text-sm text-white/40 mt-2">
            Powered by{" "}
            <a
              href="https://fred.stlouisfed.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              FRED API
            </a>
          </p>
        </div>

        {/* Key Indicators Grid */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Key Economic Indicators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EconomicIndicatorCard
              seriesId={POPULAR_SERIES.UNEMPLOYMENT}
              title="Unemployment Rate"
              unit="%"
              description="Civilian unemployment rate"
            />
            <EconomicIndicatorCard
              seriesId={POPULAR_SERIES.INFLATION}
              title="CPI (Inflation)"
              description="Consumer Price Index for All Urban Consumers"
              formatValue={(v) => v.toFixed(1)}
            />
            <EconomicIndicatorCard
              seriesId={POPULAR_SERIES.FED_FUNDS_RATE}
              title="Fed Funds Rate"
              unit="%"
              description="Federal funds effective rate"
            />
            <EconomicIndicatorCard
              seriesId={POPULAR_SERIES.GDP}
              title="GDP"
              description="Gross Domestic Product"
              formatValue={(v) => `$${(v / 1000).toFixed(1)}T`}
            />
          </div>
        </section>

        {/* Interest Rates */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Interest Rates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EconomicIndicatorCard
              seriesId={POPULAR_SERIES.TREASURY_2Y}
              title="2-Year Treasury"
              unit="%"
              description="Market yield on U.S. Treasury securities at 2-year constant maturity"
            />
            <EconomicIndicatorCard
              seriesId={POPULAR_SERIES.TREASURY_10Y}
              title="10-Year Treasury"
              unit="%"
              description="Market yield on U.S. Treasury securities at 10-year constant maturity"
            />
            <EconomicIndicatorCard
              seriesId={POPULAR_SERIES.FED_FUNDS_RATE}
              title="Fed Funds Rate"
              unit="%"
              description="Target federal funds rate"
            />
          </div>
        </section>

        {/* Charts Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Historical Trends (5 Years)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TimeSeriesChart
              seriesId={POPULAR_SERIES.UNEMPLOYMENT}
              title="Unemployment Rate"
              color="#ef4444"
              unit="%"
              observationStart={startDate}
            />
            <TimeSeriesChart
              seriesId={POPULAR_SERIES.INFLATION}
              title="Consumer Price Index"
              color="#f59e0b"
              observationStart={startDate}
            />
            <TimeSeriesChart
              seriesId={POPULAR_SERIES.FED_FUNDS_RATE}
              title="Federal Funds Rate"
              color="#3b82f6"
              unit="%"
              observationStart={startDate}
            />
            <TimeSeriesChart
              seriesId={POPULAR_SERIES.SP500}
              title="S&P 500"
              color="#10b981"
              observationStart={startDate}
            />
          </div>
        </section>

        {/* Economic Activity */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Economic Activity
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TimeSeriesChart
              seriesId={POPULAR_SERIES.RETAIL_SALES}
              title="Retail Sales"
              color="#8b5cf6"
              observationStart={startDate}
              formatValue={(v) => `$${(v / 1000).toFixed(0)}B`}
            />
            <TimeSeriesChart
              seriesId={POPULAR_SERIES.INDUSTRIAL_PRODUCTION}
              title="Industrial Production Index"
              color="#ec4899"
              observationStart={startDate}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-white/10">
          <p className="text-white/40 text-sm">
            Data sourced from{" "}
            <a
              href="https://fred.stlouisfed.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Federal Reserve Economic Data (FRED)
            </a>
          </p>
          <p className="text-white/30 text-xs mt-2">
            This dashboard is for educational and informational purposes only
          </p>
        </footer>
    </div>
  );
}
