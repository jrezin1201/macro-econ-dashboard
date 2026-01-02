"use client";

import { EconomicIndicatorCard, TimeSeriesChart } from "@/modules/fred-api";

export default function EuropeMacroPage() {
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  const startDate = fiveYearsAgo.toISOString().split("T")[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">🇪🇺 Europe Macro</h1>
        <p className="text-xl text-white/60">
          Eurozone and UK economic indicators
        </p>
      </div>

      {/* Eurozone Overview */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Eurozone Key Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <EconomicIndicatorCard
            seriesId="CLVMNACSCAB1GQEU272020"
            title="Eurozone GDP"
            description="Real GDP for Euro Area"
          />
          <EconomicIndicatorCard
            seriesId="LRHUTTTTEZM156S"
            title="Eurozone Unemployment"
            unit="%"
          />
          <EconomicIndicatorCard
            seriesId="ECBDFR"
            title="ECB Deposit Rate"
            description="European Central Bank rate"
            unit="%"
          />
        </div>
      </section>

      {/* Currency */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Euro Currency</h2>
        <TimeSeriesChart
          seriesId="DEXUSEU"
          title="USD/EUR Exchange Rate"
          color="#3b82f6"
          observationStart={startDate}
        />
        <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-sm text-blue-300">
            <strong>Note:</strong> A lower number means a stronger Euro relative to the Dollar.
            The Euro is the second most traded currency in the world after the US Dollar.
          </p>
        </div>
      </section>

      {/* GDP & Unemployment */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Economic Activity</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="CLVMNACSCAB1GQEU272020"
            title="Eurozone Real GDP"
            color="#10b981"
            observationStart={startDate}
          />
          <TimeSeriesChart
            seriesId="LRHUTTTTEZM156S"
            title="Eurozone Unemployment Rate"
            color="#ef4444"
            unit="%"
            observationStart={startDate}
          />
        </div>
      </section>

      {/* Inflation */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Inflation</h2>
        <TimeSeriesChart
          seriesId="CP0000EZ19M086NEST"
          title="Eurozone Harmonized CPI"
          color="#f59e0b"
          observationStart={startDate}
        />
      </section>

      {/* United Kingdom */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">United Kingdom</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <EconomicIndicatorCard
            seriesId="DEXUSUK"
            title="USD/GBP"
            description="Dollar to Pound exchange rate"
          />
          <EconomicIndicatorCard
            seriesId="GBRUNEPR"
            title="UK Unemployment"
            unit="%"
          />
          <EconomicIndicatorCard
            seriesId="GBRCPIALLMINMEI"
            title="UK Inflation"
            unit="%"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="DEXUSUK"
            title="USD/GBP Exchange Rate"
            color="#8b5cf6"
            observationStart={startDate}
          />
          <TimeSeriesChart
            seriesId="CLVMNACSCAB1GQUK"
            title="UK Real GDP"
            color="#10b981"
            observationStart={startDate}
          />
        </div>
      </section>

      {/* Germany */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Germany (Europe's Largest Economy)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeSeriesChart
            seriesId="DEUCPIALLMINMEI"
            title="Germany Inflation Rate"
            color="#ef4444"
            unit="%"
            observationStart={startDate}
          />
          <TimeSeriesChart
            seriesId="LRUN64TTDEM156S"
            title="Germany Unemployment Rate"
            color="#3b82f6"
            unit="%"
            observationStart={startDate}
          />
        </div>
      </section>

      {/* Insights */}
      <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Europe Economic Overview</h3>
        <ul className="space-y-3 text-white/80">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Eurozone:</strong> 20 countries use the Euro as their currency, creating
              the world's second-largest economy by GDP.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Germany:</strong> Europe's largest economy and manufacturing powerhouse,
              particularly strong in automotive and industrial sectors.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Brexit:</strong> The UK left the EU in 2020, creating separate economic
              dynamics between the UK and Eurozone.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>ECB Policy:</strong> The European Central Bank sets monetary policy for
              the entire Eurozone, balancing diverse economies.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Energy Dependency:</strong> Europe imports significant energy, making
              it vulnerable to global energy price shocks.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
