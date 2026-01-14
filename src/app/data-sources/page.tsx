/**
 * Data Sources Page
 *
 * Comprehensive view of all data series, sources, update schedules, and typical lags
 */

import {
  dataSourceRegistry,
  getAllSources,
  getSeriesBySource,
  type DataSource
} from "@/lib/data/dataSourceRegistry";
import { getLastFetchTime, formatFetchTime } from "@/lib/data/fetchWithMeta";

export const metadata = {
  title: "Data Sources - Finance Dashboard",
  description: "Data sources, update schedules, and typical lags for all metrics",
};

export default function DataSourcesPage() {
  const sources = getAllSources();

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Data Sources
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          Comprehensive registry of all data series, sources, update schedules, and typical lags
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <p className="text-white/60 text-xs mb-1">Total Series</p>
          <p className="text-2xl font-bold text-white">
            {Object.keys(dataSourceRegistry).length}
          </p>
        </div>
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <p className="text-white/60 text-xs mb-1">Data Sources</p>
          <p className="text-2xl font-bold text-white">
            {sources.length}
          </p>
        </div>
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <p className="text-white/60 text-xs mb-1">Real-time</p>
          <p className="text-2xl font-bold text-white">
            {Object.values(dataSourceRegistry).filter(s => s.updateCadence === "Real-time").length}
          </p>
        </div>
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <p className="text-white/60 text-xs mb-1">Daily Updates</p>
          <p className="text-2xl font-bold text-white">
            {Object.values(dataSourceRegistry).filter(s => s.updateCadence === "Daily").length}
          </p>
        </div>
      </div>

      {/* Series grouped by source */}
      {sources.map((source: DataSource) => {
        const series = getSeriesBySource(source);

        return (
          <div key={source} className="bg-white/5 rounded-lg border border-white/10 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {source}
              </h2>
              <span className="text-sm text-white/60">
                {series.length} series
              </span>
            </div>

            {/* Table of series from this source */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left pb-3 text-xs font-semibold text-white/70">
                      Series ID
                    </th>
                    <th className="text-left pb-3 text-xs font-semibold text-white/70">
                      Name
                    </th>
                    <th className="text-left pb-3 text-xs font-semibold text-white/70 hidden md:table-cell">
                      Update Cadence
                    </th>
                    <th className="text-left pb-3 text-xs font-semibold text-white/70 hidden lg:table-cell">
                      Typical Lag
                    </th>
                    <th className="text-left pb-3 text-xs font-semibold text-white/70 hidden xl:table-cell">
                      Cache (seconds)
                    </th>
                    <th className="text-left pb-3 text-xs font-semibold text-white/70">
                      Last Fetched
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {series.map((s) => {
                    const lastFetch = getLastFetchTime(s.id);

                    return (
                      <tr
                        key={s.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 text-white/90 font-mono text-xs">
                          {s.id}
                        </td>
                        <td className="py-3 text-white/80 text-xs">
                          {s.displayName}
                        </td>
                        <td className="py-3 text-white/70 text-xs hidden md:table-cell">
                          <span className={`
                            px-2 py-1 rounded text-xs
                            ${s.updateCadence === "Real-time" ? "bg-green-900/30 text-green-400" :
                              s.updateCadence === "Daily" ? "bg-blue-900/30 text-blue-400" :
                              s.updateCadence === "Weekly" ? "bg-yellow-900/30 text-yellow-400" :
                              s.updateCadence === "Monthly" ? "bg-orange-900/30 text-orange-400" :
                              "bg-gray-900/30 text-gray-400"}
                          `}>
                            {s.updateCadence}
                          </span>
                        </td>
                        <td className="py-3 text-white/60 text-xs hidden lg:table-cell max-w-xs truncate">
                          {s.typicalLag || "N/A"}
                        </td>
                        <td className="py-3 text-white/60 text-xs hidden xl:table-cell">
                          {s.revalidateSeconds
                            ? `${(s.revalidateSeconds / 3600).toFixed(1)}h`
                            : "N/A"}
                        </td>
                        <td className="py-3 text-white/60 text-xs">
                          {formatFetchTime(lastFetch)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile: Show details in expandable cards */}
            <div className="md:hidden mt-4 space-y-2">
              <details>
                <summary className="text-xs text-blue-400 cursor-pointer hover:text-blue-300">
                  Show detailed information
                </summary>
                <div className="mt-2 space-y-3">
                  {series.map((s) => (
                    <div key={s.id} className="bg-white/5 rounded p-3 space-y-2">
                      <div>
                        <span className="text-white/40 text-xs">ID:</span>{" "}
                        <span className="text-white/90 text-xs font-mono">{s.id}</span>
                      </div>
                      <div>
                        <span className="text-white/40 text-xs">Updates:</span>{" "}
                        <span className="text-white/70 text-xs">{s.updateCadence}</span>
                      </div>
                      {s.typicalLag && (
                        <div>
                          <span className="text-white/40 text-xs">Lag:</span>{" "}
                          <span className="text-white/60 text-xs">{s.typicalLag}</span>
                        </div>
                      )}
                      {s.notes && (
                        <div className="text-white/50 italic text-xs pt-1 border-t border-white/10">
                          {s.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            </div>

            {/* Desktop: Show notes section */}
            <div className="hidden md:block mt-4">
              <details>
                <summary className="text-xs text-blue-400 cursor-pointer hover:text-blue-300">
                  Show series descriptions
                </summary>
                <div className="mt-3 space-y-2 max-h-96 overflow-y-auto">
                  {series.map((s) => (
                    s.notes && (
                      <div key={s.id} className="bg-white/5 rounded p-3">
                        <div className="font-semibold text-white/90 text-xs mb-1">
                          {s.displayName} ({s.id})
                        </div>
                        <div className="text-white/60 text-xs">
                          {s.notes}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </details>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="bg-blue-900/20 rounded-lg border border-blue-500/30 p-4">
        <h3 className="text-sm font-semibold text-white mb-2">
          Understanding Update Cadences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-white/70">
          <div>
            <span className="font-semibold text-green-400">Real-time:</span> Updates continuously (e.g., Bitcoin price)
          </div>
          <div>
            <span className="font-semibold text-blue-400">Daily:</span> Updates once per day (e.g., Treasury yields)
          </div>
          <div>
            <span className="font-semibold text-yellow-400">Weekly:</span> Updates once per week (e.g., Fed balance sheet)
          </div>
          <div>
            <span className="font-semibold text-orange-400">Monthly:</span> Updates once per month (e.g., CPI, jobs data)
          </div>
          <div>
            <span className="font-semibold text-gray-400">Quarterly:</span> Updates once per quarter
          </div>
        </div>
        <p className="text-xs text-white/50 mt-3">
          <strong>Typical lag</strong> refers to how long after the measurement period the data is released.
          For example, CPI for January is released mid-February.
        </p>
        <p className="text-xs text-white/50 mt-2">
          <strong>Cache</strong> shows how long our app caches the data before refetching from the source.
        </p>
      </div>
    </div>
  );
}
