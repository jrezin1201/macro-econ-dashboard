"use client";

import { EconomicIndicatorCard, TimeSeriesChart } from "@/modules/fred-api";

export default function ChinaMacroPage() {
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
  const startDate = tenYearsAgo.toISOString().split("T")[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">🇨🇳 China Macro</h1>
        <p className="text-xl text-white/60">
          Economic indicators for the world&apos;s second-largest economy
        </p>
      </div>

      {/* Key Metrics */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Key Economic Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <EconomicIndicatorCard
            seriesId="MKTGDPCNA646NWDB"
            title="China GDP"
            description="GDP at market prices"
            formatValue={(v) => `$${(v / 1000).toFixed(1)}T`}
          />
          <EconomicIndicatorCard
            seriesId="DEXCHUS"
            title="CNY/USD"
            description="Chinese Yuan exchange rate"
          />
          <EconomicIndicatorCard
            seriesId="CHNCPIALLMINMEI"
            title="Inflation Rate"
            description="CPI annual inflation"
            unit="%"
          />
        </div>
      </section>

      {/* GDP Growth */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Economic Growth</h2>
        <TimeSeriesChart
          seriesId="MKTGDPCNA646NWDB"
          title="China GDP (Market Prices)"
          color="#ef4444"
          observationStart={startDate}
          formatValue={(v) => `$${(v / 1000).toFixed(1)}T`}
        />
      </section>

      {/* Currency */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Currency</h2>
        <TimeSeriesChart
          seriesId="DEXCHUS"
          title="Chinese Yuan to USD Exchange Rate"
          color="#f59e0b"
          observationStart={startDate}
        />
        <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-sm text-blue-300">
            <strong>Note:</strong> The Chinese Yuan (CNY) is managed by the People&apos;s Bank of China
            within a trading band. A higher number means a weaker Yuan (more Yuan per Dollar).
          </p>
        </div>
      </section>

      {/* Inflation */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Inflation</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="CPALTT01CNM657N"
            title="China Consumer Price Index"
            color="#10b981"
            observationStart={startDate}
          />
          <TimeSeriesChart
            seriesId="CHNCPIALLMINMEI"
            title="China Inflation Rate (Annual %)"
            color="#8b5cf6"
            observationStart={startDate}
            unit="%"
          />
        </div>
      </section>

      {/* Trade */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">International Trade</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="XTEXVA01CNM667S"
            title="China Exports Growth"
            color="#10b981"
            observationStart={startDate}
            unit="%"
          />
          <TimeSeriesChart
            seriesId="XTIMVA01CNM667S"
            title="China Imports Growth"
            color="#3b82f6"
            observationStart={startDate}
            unit="%"
          />
        </div>
      </section>

      {/* Insights */}
      <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">China Economic Overview</h3>
        <ul className="space-y-3 text-white/80">
          <li className="flex items-start gap-2">
            <span className="text-red-400 mt-1">•</span>
            <span>
              <strong>World&apos;s Factory:</strong> China is the world&apos;s largest exporter and
              manufacturing hub, making its economy crucial for global supply chains.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400 mt-1">•</span>
            <span>
              <strong>State-Managed Economy:</strong> The government plays a major role in
              economic planning and can implement rapid policy changes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400 mt-1">•</span>
            <span>
              <strong>Currency Management:</strong> The Yuan is not fully free-floating;
              the PBOC manages its value to support export competitiveness.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400 mt-1">•</span>
            <span>
              <strong>Trade Surplus:</strong> China typically runs a large trade surplus,
              particularly with the United States and Europe.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
