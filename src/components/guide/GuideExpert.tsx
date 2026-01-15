/**
 * Expert Guide Component
 *
 * Comprehensive expert-level guide with full technical details
 */

import { DataUpdateExplainer } from "@/components/shared/DataUpdateExplainer";

interface GuideExpertProps {
  isPrintMode?: boolean;
}

export function GuideExpert({ isPrintMode = false }: GuideExpertProps) {
  const textClass = isPrintMode ? "text-gray-800" : "text-white/80";
  const headingClass = isPrintMode ? "text-black" : "text-white";
  const cardClass = isPrintMode ? "bg-gray-50 border-gray-300" : "bg-white/5 border-white/10";
  const highlightClass = isPrintMode ? "text-blue-900" : "text-blue-400";
  const h2Class = isPrintMode ? "text-black" : "text-white";
  const h3Class = isPrintMode ? "text-black" : "text-white";

  return (
    <div className="space-y-8">
      {/* Start Here */}
      <section id="start" className="scroll-mt-20">
        <div className={`rounded-lg border ${isPrintMode ? "bg-blue-50 border-blue-300" : "bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-500/30"} p-6`}>
          <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
            How to Use the Finance Dashboard (Expert)
          </h2>
          <div className="space-y-4">
            <p className={`text-sm ${textClass} mb-3`}>
              <strong className={highlightClass}>Flow:</strong> Macro Inputs → Composite Scores → Regime Classification → Risk Gates → Engine Allocation → Action
            </p>
            <p className={`text-sm ${textClass}`}>
              The system explicitly separates: <strong className={highlightClass}>Environment identification</strong> (what regime are we in?),
              <strong className={highlightClass}> Risk permission</strong> (are gates open or closed?),
              <strong className={highlightClass}> Capital deployment</strong> (which engines to favor).
            </p>
          </div>
        </div>
      </section>

      {/* System Objective */}
      <section id="why" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          System Objective
        </h2>

        <div className={`rounded-lg border ${cardClass} p-6 mb-4`}>
          <p className={`text-sm ${textClass} mb-4`}>
            This system is designed to <strong className={highlightClass}>optimize exposure to independent return streams under varying macro regimes</strong> while
            minimizing drawdowns driven by credit stress, liquidity contraction, and behavioral error.
          </p>
          <p className={`text-sm ${textClass}`}>
            It is a <strong className={highlightClass}>risk-first allocation engine</strong>, not a forecast model.
          </p>
        </div>

        {/* Core Architecture */}
        <div className={`rounded-lg border ${cardClass} p-6`}>
          <h3 className={`text-lg font-semibold mb-3 ${h3Class}`}>Core Architecture</h3>
          <ul className="space-y-2">
            {[
              "Regime identification: Macro composites classify the environment (Risk-On/Risk-Off)",
              "Risk gates: Credit, liquidity, microstress, and BTC gates control exposure permissions",
              "Engine allocation: 12 economic engines map portfolio holdings to return mechanisms",
              "Action signals: Add/Hold/Avoid guidance based on alignment between regime and engine sensitivities"
            ].map((point, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Regime Construction */}
      <section id="building-blocks" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Regime Construction
        </h2>

        {/* Primary Inputs */}
        <div className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Primary Inputs</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            The system aggregates 50+ economic indicators into five composites:
          </p>
          <ul className="space-y-2">
            {[
              { name: "Growth composite", desc: "Employment, PMIs, industrial production" },
              { name: "Inflation composite", desc: "CPI, PCE, breakeven rates" },
              { name: "Credit stress composite", desc: "HY OAS, IG spreads, default rates" },
              { name: "Liquidity composite", desc: "Fed balance sheet, M2, bank reserves" },
              { name: "USD pressure", desc: "DXY, real rates, capital flows" }
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <div>
                  <strong className={highlightClass}>{item.name}:</strong> {item.desc}
                </div>
              </li>
            ))}
          </ul>
          <p className={`text-sm ${textClass} mt-3`}>
            Each composite is standardized (z-scored) to allow cross-indicator comparison and temporal consistency.
          </p>
        </div>

        {/* Regime States */}
        <div className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Regime States</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-green-900" : "text-green-400"}`}>
                Risk-On
              </h4>
              <p className={`text-sm ${textClass}`}>
                Growth expanding, inflation contained, credit spreads tight, liquidity ample. Favors duration, growth, and leverage.
              </p>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-900/20 border-red-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                Risk-Off
              </h4>
              <p className={`text-sm ${textClass}`}>
                Growth contracting, inflation unstable, credit spreads widening, liquidity draining. Favors quality, defensives, and real assets.
              </p>
            </div>
          </div>
          <p className={`text-sm ${textClass} mt-3`}>
            Regime confidence is tracked probabilistically, not as a binary switch.
          </p>
        </div>

        {/* Alert Level Logic */}
        <div className={`rounded-lg border ${cardClass} p-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Alert Level Logic</h3>
          <div className="space-y-3">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-green-900" : "text-green-400"}`}>
                Green (Low Risk)
              </h4>
              <p className={`text-sm ${textClass}`}>
                All gates open, composites aligned with Risk-On, confirmation layers positive. Full permission to deploy.
              </p>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/20 border-yellow-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-yellow-900" : "text-yellow-400"}`}>
                Yellow (Elevated Caution)
              </h4>
              <p className={`text-sm ${textClass}`}>
                Mixed signals, 1-2 gates partially closed, confirmation layers diverging. Deploy selectively.
              </p>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-900/20 border-red-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                Red (High Risk)
              </h4>
              <p className={`text-sm ${textClass}`}>
                Multiple gates closed, composites aligned with Risk-Off, stress elevated. Reduce exposure, raise cash.
              </p>
            </div>
          </div>
          <p className={`text-sm ${textClass} mt-3 italic`}>
            Alert level supersedes regime: Even during Risk-On, a Red alert blocks allocation to high-beta engines.
          </p>
        </div>

      </section>

      {/* Risk Gates */}
      <section id="regime-engine" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Risk Gates
        </h2>

        <p className={`text-sm ${textClass} mb-6`}>
          Gates act as circuit breakers. Even if the regime is Risk-On, a closed gate blocks exposure to affected engines.
        </p>

        {/* Credit Gate */}
        <div className={`rounded-lg border ${cardClass} p-6 mb-4`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Credit Gate</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            <strong className={highlightClass}>Triggers:</strong>
          </p>
          <ul className="space-y-2">
            {[
              "HY OAS expansion >500 bps",
              "Stress index acceleration (2+ week deterioration)"
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className={`text-sm ${textClass} mt-3`}>
            <strong className={highlightClass}>Blocks:</strong> Credit & Carry, Growth & Duration, Volatility & Optionality
          </p>
        </div>

        {/* Liquidity Gate */}
        <div className={`rounded-lg border ${cardClass} p-6 mb-4`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Liquidity Gate</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            <strong className={highlightClass}>Triggers:</strong>
          </p>
          <ul className="space-y-2">
            {[
              "Negative liquidity impulse (Fed balance sheet contraction + M2 decline)",
              "Balance sheet contraction while rates elevated"
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className={`text-sm ${textClass} mt-3`}>
            <strong className={highlightClass}>Blocks:</strong> Growth & Duration, Volatility & Optionality, Emerging Beta
          </p>
        </div>

        {/* Microstress Gate */}
        <div className={`rounded-lg border ${cardClass} p-6 mb-4`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Microstress Gate</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            <strong className={highlightClass}>Triggers:</strong>
          </p>
          <ul className="space-y-2">
            {[
              "Short-term funding stress (TED spread, LIBOR-OIS)",
              "Spread dislocations in derivative markets"
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className={`text-sm ${textClass} mt-3`}>
            <strong className={highlightClass}>Blocks:</strong> Volatility & Optionality, Emerging Beta (temporary, 1-2 week duration)
          </p>
        </div>

        {/* BTC Gate */}
        <div className={`rounded-lg border ${cardClass} p-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>BTC Gate</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            <strong className={highlightClass}>Trigger:</strong> BTC below 200-day moving average
          </p>
          <p className={`text-sm ${textClass}`}>
            <strong className={highlightClass}>Controls:</strong> Volatility & Optionality exposure (BTC is the primary liquid proxy for this engine)
          </p>
        </div>
      </section>

      {/* Economic Engine Framework */}
      <section id="portfolio-engines" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Economic Engine Framework (Detailed)
        </h2>

        {/* Engine Sensitivities Table */}
        <div className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Engine Sensitivities</h3>
          <div className="overflow-x-auto">
            <table className={`w-full text-sm ${textClass}`}>
              <thead>
                <tr className={`border-b ${isPrintMode ? "border-gray-300" : "border-white/20"}`}>
                  <th className={`text-left py-2 px-3 ${headingClass}`}>Engine</th>
                  <th className={`text-center py-2 px-3 ${headingClass}`}>Rates</th>
                  <th className={`text-center py-2 px-3 ${headingClass}`}>Inflation</th>
                  <th className={`text-center py-2 px-3 ${headingClass}`}>Liquidity</th>
                  <th className={`text-center py-2 px-3 ${headingClass}`}>Credit</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { engine: "Growth & Duration", rates: "↓", inflation: "↓", liquidity: "↑", credit: "↑" },
                  { engine: "Cashflow Compounders", rates: "↔", inflation: "↔", liquidity: "↔", credit: "↔" },
                  { engine: "Credit & Carry", rates: "↑", inflation: "↓", liquidity: "↓", credit: "↑" },
                  { engine: "Gold & Scarcity", rates: "↓", inflation: "↑", liquidity: "↔", credit: "↔" },
                  { engine: "Energy & Commodities", rates: "↑", inflation: "↑", liquidity: "↔", credit: "↔" },
                  { engine: "Volatility & Optionality", rates: "↓", inflation: "↔", liquidity: "↑", credit: "↑" }
                ].map((row, i) => (
                  <tr key={i} className={`border-b ${isPrintMode ? "border-gray-200" : "border-white/10"}`}>
                    <td className="py-2 px-3 font-medium">{row.engine}</td>
                    <td className="py-2 px-3 text-center">{row.rates}</td>
                    <td className="py-2 px-3 text-center">{row.inflation}</td>
                    <td className="py-2 px-3 text-center">{row.liquidity}</td>
                    <td className="py-2 px-3 text-center">{row.credit}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} className="py-2 px-3 text-xs italic">
                    (others follow similarly)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-xs">
            <p className={textClass}>
              <strong className={highlightClass}>Legend:</strong> ↑ = benefits from rising, ↓ = benefits from falling, ↔ = relatively insensitive
            </p>
          </div>
        </div>

        {/* Portfolio Integration */}
        <div className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Portfolio Integration</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            Holdings are mapped to engines via:
          </p>
          <ul className="space-y-2">
            {[
              "Explicit ticker mappings (e.g., BTC → Volatility & Optionality)",
              "Sector-based inference (e.g., XLE → Energy & Commodities)",
              "Manual overrides for custom classifications"
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className={`text-sm ${textClass} mt-3`}>
            Portfolio alignment is evaluated continuously against:
          </p>
          <ul className="space-y-2">
            {[
              "Engine target ranges (based on current regime)",
              "Gating conditions (are gates open or closed?)",
              "Alert state (Green/Yellow/Red)"
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Decision Outputs & Execution Discipline */}
      <section id="playbook" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Decision Outputs &amp; Execution Discipline
        </h2>

        {/* Add/Hold/Avoid */}
        <div className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Add/Hold/Avoid</h3>

          <div className="space-y-4">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-green-900" : "text-green-400"}`}>
                Add
              </h4>
              <ul className="space-y-1.5">
                {[
                  "Favored engines (score +1 or higher)",
                  "Under-allocated relative to target"
                ].map((item, i) => (
                  <li key={i} className={`text-sm ${textClass}`}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/20 border-yellow-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-yellow-900" : "text-yellow-400"}`}>
                Hold
              </h4>
              <ul className="space-y-1.5">
                {[
                  "In-range allocations",
                  "No signal conflict"
                ].map((item, i) => (
                  <li key={i} className={`text-sm ${textClass}`}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-900/20 border-red-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                Avoid
              </h4>
              <ul className="space-y-1.5">
                {[
                  "Gated engines (credit/liquidity/microstress gates closed)",
                  "Overweight under unfavorable conditions"
                ].map((item, i) => (
                  <li key={i} className={`text-sm ${textClass}`}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Execution Discipline */}
        <div className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Execution Discipline</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            This system assumes:
          </p>
          <ul className="space-y-2">
            {[
              "Weekly or monthly review cadence",
              "Incremental deployment (not all-in/all-out)",
              "Tax-aware execution",
              "Minimal turnover"
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className={`mt-4 p-3 rounded border ${isPrintMode ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/20 border-yellow-500/30"}`}>
            <p className={`text-sm ${isPrintMode ? "text-yellow-900" : "text-yellow-300"} font-semibold`}>
              Over-trading degrades system performance more than signal imperfection.
            </p>
          </div>
        </div>
      </section>

      {/* Data Update Timing */}
      <section id="data-timing" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Data Update Timing
        </h2>
        <DataUpdateExplainer isPrintMode={isPrintMode} variant="full" />
      </section>

      {/* Key Principle */}
      <section id="glossary" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Key Principle
        </h2>

        <div className={`rounded-lg border p-8 ${isPrintMode ? "bg-blue-50 border-blue-300" : "bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-500/30"}`}>
          <p className={`text-lg ${headingClass} leading-relaxed`}>
            This dashboard does not attempt to outperform every quarter. It attempts to:
          </p>
          <ul className="space-y-3 mt-4 mb-4">
            {[
              "Survive adverse regimes",
              "Compound during favorable regimes",
              "Avoid catastrophic behavioral error"
            ].map((item, i) => (
              <li key={i} className={`text-base ${textClass} flex items-start font-medium`}>
                <span className="mr-3 text-blue-400 text-xl">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className={`text-base ${textClass} italic mt-6`}>
            That is where most long-term outperformance actually comes from.
          </p>
        </div>
      </section>
    </div>
  );
}
