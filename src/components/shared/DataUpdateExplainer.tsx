/**
 * Data Update Explainer Component
 *
 * Explains data update timing and delays for economic indicators
 */

interface DataUpdateExplainerProps {
  isPrintMode?: boolean;
  variant?: "full" | "compact";
}

export function DataUpdateExplainer({ isPrintMode = false, variant = "full" }: DataUpdateExplainerProps) {
  const textClass = isPrintMode ? "text-gray-800" : "text-white/80";
  const headingClass = isPrintMode ? "text-black" : "text-white";
  const cardClass = isPrintMode ? "bg-gray-50 border-gray-300" : "bg-white/5 border-white/10";
  const highlightClass = isPrintMode ? "text-blue-900" : "text-blue-400";

  if (variant === "compact") {
    return (
      <div className={`rounded-lg border ${cardClass} p-4`}>
        <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>
          ⏱️ About Data Updates
        </h4>
        <p className={`text-sm ${textClass}`}>
          Economic data (jobs, inflation, Fed rates) is released daily, weekly, or monthly—not in real-time.
          This dashboard is designed for <strong className={highlightClass}>weekly/monthly decisions</strong>, not intraday trading.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border ${cardClass} p-6 space-y-4`}>
      <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>
        ⏱️ About Data Updates & Timing
      </h3>

      <div className={`text-sm ${textClass} space-y-3`}>
        <p>
          <strong className={highlightClass}>Important:</strong> Economic data doesn&apos;t update in real-time.
          Different indicators are released on different schedules:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`p-3 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
            <p className={`font-semibold text-xs mb-1 ${highlightClass}`}>Daily</p>
            <p className="text-xs opacity-80">Market prices, yields, spreads</p>
          </div>
          <div className={`p-3 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
            <p className={`font-semibold text-xs mb-1 ${highlightClass}`}>Weekly</p>
            <p className="text-xs opacity-80">Jobless claims, Fed balance sheet</p>
          </div>
          <div className={`p-3 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
            <p className={`font-semibold text-xs mb-1 ${highlightClass}`}>Monthly</p>
            <p className="text-xs opacity-80">Jobs report, CPI, PCE, PMI surveys</p>
          </div>
        </div>

        <div className={`p-4 rounded border ${isPrintMode ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/20 border-yellow-500/30"}`}>
          <p className={`font-semibold text-sm mb-2 ${isPrintMode ? "text-yellow-900" : "text-yellow-300"}`}>
            What this means for you:
          </p>
          <ul className="space-y-1.5 text-sm">
            <li>
              <strong className={highlightClass}>• This is NOT for day trading:</strong> Use it for weekly portfolio checks
              and monthly rebalancing decisions.
            </li>
            <li>
              <strong className={highlightClass}>• Data lags are normal:</strong> Jobs data is from last month,
              Fed balance sheet is from last week. That&apos;s expected.
            </li>
            <li>
              <strong className={highlightClass}>• Check weekly, not hourly:</strong> Sunday night or Monday morning is ideal
              to review the dashboard and plan your week.
            </li>
          </ul>
        </div>

        <div className={`p-3 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"}`}>
          <p className={`text-xs ${isPrintMode ? "text-green-900" : "text-green-300"}`}>
            ✅ <strong>Why this works:</strong> Markets move on <em>changes in conditions</em>, not minute-by-minute updates.
            A weekly check is enough to catch regime shifts and make informed decisions without noise.
          </p>
        </div>
      </div>
    </div>
  );
}
