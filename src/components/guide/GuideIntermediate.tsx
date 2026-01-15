/**
 * Intermediate Guide Component
 *
 * Mid-level guide with more detail than beginner but less technical than expert
 */

import { EnginesExplainer } from "@/components/engines/EnginesExplainer";
import { DataUpdateExplainer } from "@/components/shared/DataUpdateExplainer";

interface GuideIntermediateProps {
  isPrintMode?: boolean;
}

export function GuideIntermediate({ isPrintMode = false }: GuideIntermediateProps) {
  const textClass = isPrintMode ? "text-gray-800" : "text-white/80";
  const headingClass = isPrintMode ? "text-black" : "text-white";
  const cardClass = isPrintMode ? "bg-gray-50 border-gray-300" : "bg-white/5 border-white/10";
  const highlightClass = isPrintMode ? "text-blue-900" : "text-blue-400";
  const h2Class = isPrintMode ? "text-black" : "text-white";

  return (
    <div className="space-y-8">
      {/* Start Here */}
      <section id="start" className="scroll-mt-20">
        <div className={`rounded-lg border ${isPrintMode ? "bg-blue-50 border-blue-300" : "bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-500/30"} p-6`}>
          <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
            Start Here
          </h2>
          <p className={`text-sm mb-4 ${textClass}`}>
            This dashboard turns 50+ economic indicators into a simple framework: <strong className={highlightClass}>Risk-On or Risk-Off</strong>.
            It helps you make smarter allocation decisions without watching markets all day.
          </p>
          <ol className="space-y-3">
            {[
              { step: "Check the Regime", detail: "Is the macro environment Risk-On (good for stocks) or Risk-Off (defensive)?" },
              { step: "Review Confirmation Layers", detail: "Breadth, BTC trend, and microstress help validate the signal" },
              { step: "Apply to Portfolio", detail: "Tilt new money toward favored engines, reduce exposure to blocked ones" }
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center ${isPrintMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white"}`}>
                  {i + 1}
                </span>
                <div className="pt-1">
                  <p className={`text-sm font-semibold ${headingClass}`}>{item.step}</p>
                  <p className={`text-xs ${textClass}`}>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why This Exists */}
      <section id="why" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Why This Exists
        </h2>

        <div className={`rounded-lg border ${cardClass} p-6 space-y-4`}>
          <p className={`text-sm ${textClass}`}>
            Most investors either use <strong className={highlightClass}>static allocations</strong> (60/40, never change) or
            <strong className={highlightClass}> emotional timing</strong> (panic when markets drop). This framework is designed to be
            <strong className={highlightClass}> systematic and repeatable</strong>—based on data, not fear or greed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"}`}>
              <p className={`font-semibold mb-2 text-sm ${isPrintMode ? "text-green-900" : "text-green-400"}`}>
                ✓ What it IS:
              </p>
              <ul className="space-y-1.5">
                <li className={`text-sm ${textClass}`}>• A macro-driven allocation tool</li>
                <li className={`text-sm ${textClass}`}>• A weekly check-in system</li>
                <li className={`text-sm ${textClass}`}>• An engine-based framework</li>
                <li className={`text-sm ${textClass}`}>• A way to reduce emotional decisions</li>
              </ul>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-900/20 border-red-500/30"}`}>
              <p className={`font-semibold mb-2 text-sm ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                ✗ What it ISN&apos;T:
              </p>
              <ul className="space-y-1.5">
                <li className={`text-sm ${textClass}`}>• NOT a crystal ball</li>
                <li className={`text-sm ${textClass}`}>• NOT stock picking advice</li>
                <li className={`text-sm ${textClass}`}>• NOT day trading signals</li>
                <li className={`text-sm ${textClass}`}>• NOT guaranteed to be right every time</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Building Blocks */}
      <section id="building-blocks" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          The Building Blocks
        </h2>
        <p className={`text-sm ${textClass} mb-6`}>
          The dashboard tracks economic data across 6 categories: Rates, Growth, Inflation, Credit, Liquidity, and USD.
          These combine to form the macro regime.
        </p>

        <div className="space-y-4">
          <div className={`rounded-lg border ${cardClass} p-5`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Rates &amp; Curve</h3>
            <p className={`text-sm ${textClass} mb-3`}>
              Interest rates set by the Fed control the cost of borrowing. Rising rates hurt growth stocks and crypto.
              Falling rates help them. We also watch the yield curve—when short-term rates are higher than long-term rates
              (inverted curve), it often signals a recession ahead.
            </p>
            <p className={`text-xs ${textClass}`}>
              <strong className={highlightClass}>Key indicators:</strong> Fed Funds Rate, 10Y Treasury Yield, 2Y-10Y Spread
            </p>
          </div>

          <div className={`rounded-lg border ${cardClass} p-5`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Growth</h3>
            <p className={`text-sm ${textClass} mb-3`}>
              Jobs, manufacturing, and output data tell us if the economy is expanding or contracting. Strong job growth
              and rising production = Risk-On. Falling jobs and weak manufacturing = Risk-Off.
            </p>
            <p className={`text-xs ${textClass}`}>
              <strong className={highlightClass}>Key indicators:</strong> Nonfarm Payrolls, Unemployment Rate, ISM PMI
            </p>
          </div>

          <div className={`rounded-lg border ${cardClass} p-5`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Inflation</h3>
            <p className={`text-sm ${textClass} mb-3`}>
              How fast are prices rising? The Fed wants ~2% inflation. Too high (&gt;4%) forces rate hikes. Too low (&lt;1%)
              risks deflation. Moderate inflation (2-3%) is the sweet spot for stocks.
            </p>
            <p className={`text-xs ${textClass}`}>
              <strong className={highlightClass}>Key indicators:</strong> CPI, Core CPI, PCE
            </p>
          </div>

          <div className={`rounded-lg border ${cardClass} p-5`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Credit &amp; Stress</h3>
            <p className={`text-sm ${textClass} mb-3`}>
              Credit spreads measure how nervous investors are about lending money. When spreads widen (HY OAS &gt;500),
              it signals fear and potential recession. Tight spreads (&lt;400) signal calm markets.
            </p>
            <p className={`text-xs ${textClass}`}>
              <strong className={highlightClass}>Key indicators:</strong> High Yield Spreads, VIX, Corporate Bond Spreads
            </p>
          </div>

          <div className={`rounded-lg border ${cardClass} p-5`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Liquidity</h3>
            <p className={`text-sm ${textClass} mb-3`}>
              Liquidity is the amount of cash and credit in the system. When the Fed expands its balance sheet (QE),
              liquidity increases and markets rise. When the Fed shrinks it (QT), liquidity drains and markets struggle.
            </p>
            <p className={`text-xs ${textClass}`}>
              <strong className={highlightClass}>Key indicators:</strong> Fed Balance Sheet, M2 Money Supply, Bank Reserves
            </p>
          </div>

          <div className={`rounded-lg border ${cardClass} p-5`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Confirmation Layers</h3>
            <p className={`text-sm ${textClass} mb-3`}>
              We use three additional signals to validate the macro regime:
            </p>
            <ul className="space-y-2">
              <li className={`text-sm ${textClass}`}>
                <strong className={highlightClass}>Breadth:</strong> What % of stocks are above their 200-day average?
                &gt;60% = healthy. &lt;40% = weak.
              </li>
              <li className={`text-sm ${textClass}`}>
                <strong className={highlightClass}>BTC Trend:</strong> Is Bitcoin above or below its 200-day average?
                Acts as a pure liquidity gauge.
              </li>
              <li className={`text-sm ${textClass}`}>
                <strong className={highlightClass}>Microstress:</strong> Short-term stress from VIX and credit spreads.
                Helps avoid false signals.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How the Regime Works */}
      <section id="regime-engine" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          How the Regime Works
        </h2>

        <div className={`rounded-lg border ${cardClass} p-6 mb-4`}>
          <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Signal Compression</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            We track 50+ indicators, but you don&apos;t need to watch them all. The system:
          </p>
          <ol className="space-y-2">
            {[
              "Normalizes each indicator to a z-score (standard deviations from average)",
              "Groups them into 6 macro categories",
              "Weights each category based on current importance",
              "Computes a composite: positive = Risk-On, negative = Risk-Off",
              "Cross-checks with confirmation layers to avoid false signals"
            ].map((step, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className={`mr-2 font-bold ${highlightClass}`}>{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className={`rounded-lg border ${cardClass} p-6`}>
          <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Example Interpretations</h3>
          <div className="space-y-3">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-green-900" : "text-green-400"}`}>
                Risk-On Environment
              </h4>
              <p className={`text-sm ${textClass}`}>
                Jobs strong, inflation moderate, credit spreads tight, breadth healthy, BTC above 200D MA.
                <br />
                <strong className={highlightClass}>Action:</strong> Favor growth, cyclicals, crypto.
              </p>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-900/20 border-red-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                Risk-Off Environment
              </h4>
              <p className={`text-sm ${textClass}`}>
                Jobs weakening, credit spreads widening, breadth collapsing, BTC below 200D MA.
                <br />
                <strong className={highlightClass}>Action:</strong> Favor bonds, quality, cash. Avoid crypto and cyclicals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio & Engines */}
      <section id="portfolio-engines" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Portfolio &amp; Engines
        </h2>

        <div className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>What Are Economic Engines?</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            Instead of grouping investments by sector (Tech, Healthcare, etc.), we group them by <strong className={highlightClass}>how they make money</strong>.
            This is called the &quot;engine framework.&quot; There are ~12 engines, like Growth, Quality, Real Assets, Crypto, etc.
          </p>
          <EnginesExplainer variant="inline" mode="beginner" />
        </div>

        <div className={`rounded-lg border ${cardClass} p-6`}>
          <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Using the Engines Tab</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            Each engine gets a score from -2 (strongly blocked) to +2 (strongly favored) based on the current macro regime.
          </p>
          <ul className="space-y-2">
            <li className={`text-sm ${textClass}`}>
              <strong className="text-green-500">+2 = Strong Add:</strong> Macro tailwinds are aligned. Tilt new money here.
            </li>
            <li className={`text-sm ${textClass}`}>
              <strong className="text-yellow-500">0 = Hold:</strong> Neutral. Maintain existing exposure.
            </li>
            <li className={`text-sm ${textClass}`}>
              <strong className="text-red-500">-2 = Avoid:</strong> Macro headwinds. Don&apos;t add new money.
            </li>
          </ul>
        </div>
      </section>

      {/* Weekly Playbook */}
      <section id="playbook" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Weekly Playbook
        </h2>

        <div className={`rounded-lg border ${cardClass} p-6`}>
          <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Your Weekly Routine</h3>
          <p className={`text-sm ${textClass} mb-4`}>
            Check the dashboard once a week (Sunday night or Monday morning). It takes 10 minutes.
          </p>
          <ol className="space-y-3">
            {[
              "Check the macro regime (Risk-On or Risk-Off)",
              "Review confirmation layers (breadth, BTC, microstress)",
              "Look at engine scores to see what&apos;s favored/blocked",
              "Adjust new contributions (401k, IRA) toward favored engines",
              "Only rebalance if regime shifted significantly (e.g., Risk-On → Risk-Off)",
              "Don&apos;t panic on single bad days—wait for 2-3 confirmations"
            ].map((step, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className={`mr-2 font-bold ${highlightClass}`}>{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Data Updates */}
      <section id="data-timing" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Data Updates
        </h2>
        <DataUpdateExplainer isPrintMode={isPrintMode} variant="full" />
      </section>

      {/* Glossary */}
      <section id="glossary" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Glossary
        </h2>

        <div className="space-y-3">
          {[
            { term: "Risk-On", meaning: "Favorable environment for stocks and risky assets" },
            { term: "Risk-Off", meaning: "Defensive environment, favor bonds and cash" },
            { term: "HY OAS", meaning: "High Yield spread—measures credit stress. >500 = high stress." },
            { term: "z-score", meaning: "Standard deviations from average. +2 = very high, -2 = very low." },
            { term: "Yield Curve", meaning: "Difference between long and short rates. Inverted = recession warning." },
            { term: "Liquidity", meaning: "Amount of cash in the system. More liquidity = easier markets." },
            { term: "Breadth", meaning: "% of stocks above 200-day average. >60% = healthy, <40% = weak." },
            { term: "Microstress", meaning: "Short-term stress gauge from VIX and credit spreads." },
            { term: "200D MA", meaning: "200-day moving average—trend indicator. Above = uptrend, below = downtrend." },
            { term: "Regime", meaning: "Current macro environment (Risk-On or Risk-Off)." },
            { term: "Engine", meaning: "A category of investments grouped by how they make money." },
            { term: "Composite", meaning: "Combined signal from multiple indicators." }
          ].map((item, i) => (
            <div key={i} className={`rounded-lg border ${cardClass} p-4`}>
              <p className={`text-sm font-semibold mb-1 ${headingClass}`}>{item.term}</p>
              <p className={`text-sm ${textClass}`}>{item.meaning}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
