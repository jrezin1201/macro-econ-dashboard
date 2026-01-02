"use client";

import { EconomicIndicatorCard, TimeSeriesChart } from "@/modules/fred-api";

export default function IndiaMacroPage() {
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
  const startDate = tenYearsAgo.toISOString().split("T")[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">🇮🇳 India Macro</h1>
        <p className="text-xl text-white/60">
          The world's fastest-growing major economy
        </p>
      </div>

      {/* Key Metrics */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Key Economic Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <EconomicIndicatorCard
            seriesId="MKTGDPINA646NWDB"
            title="India GDP"
            description="GDP at market prices"
            formatValue={(v) => `$${(v / 1000).toFixed(1)}T`}
          />
          <EconomicIndicatorCard
            seriesId="DEXINUS"
            title="INR/USD"
            description="Indian Rupee exchange rate"
          />
          <EconomicIndicatorCard
            seriesId="INDCPIALLMINMEI"
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
          seriesId="MKTGDPINA646NWDB"
          title="India GDP (Market Prices)"
          color="#f59e0b"
          observationStart={startDate}
          formatValue={(v) => `$${(v / 1000).toFixed(1)}T`}
        />
      </section>

      {/* Currency */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Currency</h2>
        <TimeSeriesChart
          seriesId="DEXINUS"
          title="Indian Rupee to USD Exchange Rate"
          color="#10b981"
          observationStart={startDate}
        />
        <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-sm text-blue-300">
            <strong>Note:</strong> The Rupee is a free-floating currency managed by the Reserve
            Bank of India. A higher number means a weaker Rupee (more Rupees per Dollar).
          </p>
        </div>
      </section>

      {/* Inflation */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Inflation</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="CPALTT01INM657N"
            title="India Consumer Price Index"
            color="#ef4444"
            observationStart={startDate}
          />
          <TimeSeriesChart
            seriesId="INDCPIALLMINMEI"
            title="India Inflation Rate (Annual %)"
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
            seriesId="XTEXVA01INM667S"
            title="India Exports Growth"
            color="#10b981"
            observationStart={startDate}
            unit="%"
          />
          <TimeSeriesChart
            seriesId="XTIMVA01INM667S"
            title="India Imports Growth"
            color="#3b82f6"
            observationStart={startDate}
            unit="%"
          />
        </div>
      </section>

      {/* Insights */}
      <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">India Economic Overview</h3>
        <ul className="space-y-3 text-white/80">
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span>
              <strong>Demographic Dividend:</strong> India has the world's largest young
              population, providing a massive workforce and consumer base.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span>
              <strong>Fastest Growing Major Economy:</strong> India frequently posts GDP growth
              rates above 6-7% annually, outpacing most developed nations.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span>
              <strong>Services Economy:</strong> IT services, business process outsourcing,
              and professional services are major contributors to GDP.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span>
              <strong>Digital Transformation:</strong> Rapid adoption of digital payments and
              fintech has transformed the economy in recent years.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span>
              <strong>Infrastructure Investment:</strong> Major government focus on building
              roads, railways, and digital infrastructure to support growth.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
