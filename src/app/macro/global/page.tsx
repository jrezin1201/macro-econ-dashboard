"use client";

import { EconomicIndicatorCard, TimeSeriesChart } from "@/modules/fred-api";

export default function GlobalMacroPage() {
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  const startDate = fiveYearsAgo.toISOString().split("T")[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">🌍 Global Macro</h1>
        <p className="text-xl text-white/60">
          International markets, currencies, and commodities
        </p>
      </div>

      {/* Currency Markets */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Major Currency Pairs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <EconomicIndicatorCard
            seriesId="DEXUSEU"
            title="USD/EUR"
            description="US Dollar to Euro"
          />
          <EconomicIndicatorCard
            seriesId="DEXJPUS"
            title="JPY/USD"
            description="Japanese Yen to US Dollar"
          />
          <EconomicIndicatorCard
            seriesId="DEXUSUK"
            title="USD/GBP"
            description="US Dollar to British Pound"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="DEXUSEU"
            title="USD/EUR Exchange Rate"
            color="#3b82f6"
            observationStart={startDate}
          />
          <TimeSeriesChart
            seriesId="DEXJPUS"
            title="JPY/USD Exchange Rate"
            color="#10b981"
            observationStart={startDate}
          />
        </div>
      </section>

      {/* Emerging Markets FX */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Emerging Market Currencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <EconomicIndicatorCard
            seriesId="DEXCHUS"
            title="CNY/USD"
            description="Chinese Yuan"
          />
          <EconomicIndicatorCard
            seriesId="DEXINUS"
            title="INR/USD"
            description="Indian Rupee"
          />
          <EconomicIndicatorCard
            seriesId="DEXBZUS"
            title="BRL/USD"
            description="Brazilian Real"
          />
          <EconomicIndicatorCard
            seriesId="DEXMXUS"
            title="MXN/USD"
            description="Mexican Peso"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="DEXCHUS"
            title="Chinese Yuan to USD"
            color="#ef4444"
            observationStart={startDate}
          />
          <TimeSeriesChart
            seriesId="DEXINUS"
            title="Indian Rupee to USD"
            color="#f59e0b"
            observationStart={startDate}
          />
        </div>
      </section>

      {/* Dollar Index */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Dollar Strength</h2>
        <TimeSeriesChart
          seriesId="DTWEXBGS"
          title="Trade Weighted U.S. Dollar Index"
          color="#8b5cf6"
          observationStart={startDate}
        />
      </section>

      {/* Commodities */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Commodities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <EconomicIndicatorCard
            seriesId="DCOILWTICO"
            title="WTI Crude Oil"
            description="West Texas Intermediate"
            unit=" $/Barrel"
          />
          <EconomicIndicatorCard
            seriesId="GOLDAMGBD228NLBM"
            title="Gold"
            description="Gold fixing price"
            unit=" $/Oz"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="DCOILWTICO"
            title="WTI Crude Oil Prices"
            color="#000000"
            observationStart={startDate}
            formatValue={(v) => `$${v.toFixed(0)}`}
          />
          <TimeSeriesChart
            seriesId="GOLDAMGBD228NLBM"
            title="Gold Prices"
            color="#f59e0b"
            observationStart={startDate}
            formatValue={(v) => `$${v.toFixed(0)}`}
          />
        </div>
      </section>

      {/* Global Insights */}
      <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Global Market Insights</h3>
        <ul className="space-y-3 text-white/80">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Dollar Index:</strong> A strong dollar makes U.S. exports more expensive
              and imports cheaper, affecting global trade flows.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Oil Prices:</strong> Major impact on inflation globally. Rising oil prices
              increase transportation and manufacturing costs.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Gold:</strong> Often seen as a safe-haven asset during market uncertainty
              or inflation fears.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Emerging Market FX:</strong> EM currencies tend to weaken during risk-off
              periods and strengthen when global growth is robust.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
