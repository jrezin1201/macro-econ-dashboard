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

  return (
    <div className="space-y-12">
      {/* Start Here */}
      <section id="start" className="scroll-mt-20">
        <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/30 p-6">
          <h2 className={`text-2xl font-bold mb-4 ${headingClass}`}>
            How to Use the Finance Dashboard (Intermediate)
          </h2>
          <div className={`text-sm ${textClass} space-y-3`}>
            <p className="font-semibold">Weekly Flow:</p>
            <div className={`rounded p-4 font-mono text-xs ${isPrintMode ? "bg-gray-100 text-gray-900" : "bg-white/10 text-white/90"}`}>
              <div>Macro → Engines → Confirmations → Action</div>
            </div>
            <ol className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-500">1.</span>
                <span>Check the Regime + Alert Level — Determines whether the environment favors risk-taking or defense</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-500">2.</span>
                <span>Review Confirmation Layers — Prevents false positives during fragile rallies or hidden stress</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-500">3.</span>
                <span>Read &quot;This Week Actions&quot; — Converts the environment into clear allocation guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-500">4.</span>
                <span>Deploy New Capital or Rebalance Only If Triggers Hit — Avoid unnecessary trading</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section id="why" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-6 ${headingClass}`}>
          Purpose of This Dashboard
        </h2>

        <div className={`rounded-lg border ${cardClass} p-6 space-y-4`}>
          <p className={`text-sm ${textClass}`}>
            This dashboard exists to convert complex macroeconomic and market data into a <strong className={highlightClass}>repeatable decision framework</strong>.
          </p>
          <p className={`text-sm ${textClass}`}>
            Instead of reacting to headlines, opinions, or emotions, it answers three consistent questions:
          </p>
          <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"} space-y-2`}>
            <p className={`text-sm font-semibold ${highlightClass}`}>
              1. Is the environment supportive of risk?
            </p>
            <p className={`text-sm font-semibold ${highlightClass}`}>
              2. Where should new capital be allocated right now?
            </p>
            <p className={`text-sm font-semibold ${highlightClass}`}>
              3. What specific signals would force a change in behavior?
            </p>
          </div>
          <div className={`p-4 rounded border ${isPrintMode ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-500/30"}`}>
            <p className={`text-sm ${textClass}`}>
              <strong className={highlightClass}>This is a risk management and allocation system, not a prediction engine.</strong>
            </p>
          </div>

          {/* What It Is / Is Not */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`rounded-lg border ${isPrintMode ? "bg-green-50 border-green-300" : "bg-green-900/20 border-green-500/30"} p-4`}>
              <p className={`font-semibold mb-3 text-sm ${isPrintMode ? "text-green-900" : "text-green-400"}`}>
                ✓ What It IS:
              </p>
              <ul className="space-y-1.5">
                {[
                  "A probability-based framework",
                  "A weekly investment decision checklist",
                  "A macro → allocation → confirmation → action pipeline",
                  "A system designed to reduce behavioral mistakes"
                ].map((item, i) => (
                  <li key={i} className={`text-sm ${textClass}`}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className={`rounded-lg border ${isPrintMode ? "bg-red-50 border-red-300" : "bg-red-900/20 border-red-500/30"} p-4`}>
              <p className={`font-semibold mb-3 text-sm ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                ✗ What It IS NOT:
              </p>
              <ul className="space-y-1.5">
                {[
                  "A market timing tool",
                  "A day-trading system",
                  "A stock-picking service",
                  "A guarantee of returns"
                ].map((item, i) => (
                  <li key={i} className={`text-sm ${textClass}`}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Building Blocks */}
      <section id="building-blocks" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-6 ${headingClass}`}>
          Understanding the Core Building Blocks
        </h2>

        <div className="space-y-6">
          {/* Rates & Yield Curve */}
          <div className={`rounded-lg border ${cardClass} p-5`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Rates &amp; Yield Curve</h3>
            <p className={`text-sm mb-3 ${textClass}`}>
              Rates determine the cost of capital and the discount rate applied to future earnings.
            </p>
            <ul className="space-y-1.5 mb-3">
              <li className={`text-sm ${textClass}`}>
                <strong className={highlightClass}>Falling rates</strong> → tailwind for long-duration assets
              </li>
              <li className={`text-sm ${textClass}`}>
                <strong className={highlightClass}>Rising rates</strong> → pressure on growth and speculative assets
              </li>
              <li className={`text-sm ${textClass}`}>
                <strong className={highlightClass}>Inverted yield curve</strong> → elevated recession risk
              </li>
            </ul>
            <div className={`p-3 rounded border ${isPrintMode ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-500/30"}`}>
              <p className={`text-xs ${isPrintMode ? "text-blue-900" : "text-blue-300"}`}>
                <strong>Key Insight:</strong> High rates are not uniformly bad. Some assets (banks, insurance, short-duration carry) can benefit.
              </p>
            </div>
          </div>

          {/* Growth Indicators */}
          <div className={`rounded-lg border ${cardClass} p-5`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Growth Indicators</h3>
            <p className={`text-sm mb-3 ${textClass}`}>
              Growth data measures the real economy, not markets directly.
            </p>
            <p className={`text-sm mb-2 ${textClass}`}>
              <strong className={highlightClass}>Includes:</strong>
            </p>
            <ul className="space-y-1 mb-3">
              {["Payrolls", "Industrial production", "Claims", "Consumer sentiment"].map((item, i) => (
                <li key={i} className={`text-sm ${textClass}`}>• {item}</li>
              ))}
            </ul>
            <p className={`text-sm mb-2 font-semibold ${highlightClass}`}>Why it matters:</p>
            <ul className="space-y-1">
              <li className={`text-sm ${textClass}`}>• Strong growth supports earnings</li>
              <li className={`text-sm ${textClass}`}>• Weak growth increases recession risk</li>
              <li className={`text-sm ${textClass}`}>• Growth deterioration often precedes equity weakness</li>
            </ul>
          </div>

          {/* Inflation Indicators */}
          <div className={`rounded-lg border ${cardClass} p-5`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Inflation Indicators</h3>
            <p className={`text-sm mb-3 ${textClass}`}>
              Inflation determines central bank behavior.
            </p>
            <ul className="space-y-1.5 mb-3">
              <li className={`text-sm ${textClass}`}>
                <strong className={highlightClass}>High inflation</strong> → restrictive policy
              </li>
              <li className={`text-sm ${textClass}`}>
                <strong className={highlightClass}>Stable inflation</strong> → favorable for risk assets
              </li>
              <li className={`text-sm ${textClass}`}>
                <strong className={highlightClass}>Falling inflation with stable growth</strong> → &quot;Goldilocks&quot; environment
              </li>
            </ul>
            <p className={`text-sm ${textClass}`}>
              The dashboard prioritizes <strong className={highlightClass}>Core PCE</strong>, the Fed&apos;s preferred measure.
            </p>
          </div>

          {/* Credit & Stress */}
          <div className={`rounded-lg border ${cardClass} p-5`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Credit &amp; Stress</h3>
            <p className={`text-sm mb-3 ${textClass}`}>
              Credit is the early warning system.
            </p>
            <p className={`text-sm mb-2 ${textClass}`}>
              <strong className={highlightClass}>Key metrics:</strong>
            </p>
            <ul className="space-y-1 mb-3">
              <li className={`text-sm ${textClass}`}>• High Yield OAS</li>
              <li className={`text-sm ${textClass}`}>• Financial Stress Index</li>
            </ul>
            <p className={`text-sm mb-2 font-semibold ${highlightClass}`}>Why it matters:</p>
            <ul className="space-y-1 mb-3">
              <li className={`text-sm ${textClass}`}>• Credit stress appears before equity selloffs</li>
              <li className={`text-sm ${textClass}`}>• Spreads widening rapidly = rising systemic risk</li>
            </ul>
            <div className={`p-3 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-900/20 border-red-500/30"}`}>
              <p className={`text-sm font-bold ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                Rule of thumb: Credit breaks first. Stocks follow.
              </p>
            </div>
          </div>

          {/* Liquidity */}
          <div className={`rounded-lg border ${cardClass} p-5`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Liquidity</h3>
            <p className={`text-sm mb-3 ${textClass}`}>
              Liquidity is the fuel for asset prices.
            </p>
            <p className={`text-sm mb-2 ${textClass}`}>
              <strong className={highlightClass}>Tracked via:</strong>
            </p>
            <ul className="space-y-1 mb-3">
              {["Fed balance sheet", "Bank reserves", "Reverse repo usage", "Treasury cash balances"].map((item, i) => (
                <li key={i} className={`text-sm ${textClass}`}>• {item}</li>
              ))}
            </ul>
            <p className={`text-sm mb-2 font-semibold ${highlightClass}`}>Why it matters:</p>
            <ul className="space-y-1">
              <li className={`text-sm ${textClass}`}>• Expanding liquidity supports equities and crypto</li>
              <li className={`text-sm ${textClass}`}>• Liquidity contraction creates persistent headwinds</li>
            </ul>
          </div>

          {/* Confirmation Layers */}
          <div className={`rounded-lg border ${cardClass} p-5`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Confirmation Layers (Risk Gates)</h3>
            <p className={`text-sm mb-4 ${textClass}`}>
              Confirmation layers do not drive the regime — <strong className={highlightClass}>they validate or block it</strong>.
            </p>

            <div className="space-y-4">
              <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
                <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>Equity Breadth</h4>
                <p className={`text-sm mb-2 ${textClass}`}>
                  Measures participation across the market.
                </p>
                <ul className="space-y-1">
                  <li className={`text-sm ${textClass}`}>
                    <strong className="text-green-500">Broad participation</strong> = healthy rally
                  </li>
                  <li className={`text-sm ${textClass}`}>
                    <strong className="text-red-500">Narrow leadership</strong> = fragile conditions
                  </li>
                </ul>
              </div>

              <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
                <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>Bitcoin Trend</h4>
                <p className={`text-sm mb-2 ${textClass}`}>
                  Bitcoin acts as a high-beta liquidity sensor.
                </p>
                <div className={`p-2 rounded ${isPrintMode ? "bg-gray-100" : "bg-white/5"}`}>
                  <p className={`text-sm font-semibold ${highlightClass}`}>Rule:</p>
                  <ul className="space-y-1 mt-1">
                    <li className={`text-xs ${textClass}`}>
                      BTC above 200-day MA → speculative risk allowed
                    </li>
                    <li className={`text-xs ${textClass}`}>
                      BTC below 200-day MA → block new crypto/MSTR exposure
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
                <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>Credit Microstress</h4>
                <p className={`text-sm mb-2 ${textClass}`}>
                  Captures short-term funding pressure.
                </p>
                <p className={`text-sm ${textClass}`}>
                  <strong className={highlightClass}>Why it matters:</strong> Stress can appear even when equities are calm.
                  Yellow/Red microstress gates risk regardless of regime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regime Engine */}
      <section id="regime-engine" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-6 ${headingClass}`}>
          How the Regime Engine Works
        </h2>

        <div className={`rounded-lg border ${cardClass} p-6 space-y-4`}>
          <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Signal Compression</h3>
          <p className={`text-sm ${textClass}`}>
            The system compresses dozens of indicators into:
          </p>
          <ul className="space-y-1.5 mb-4">
            {[
              "Regime: Risk-On / Risk-Off",
              "Alert Level: Green / Yellow / Red",
              "Suggested Tilts",
              "This Week Actions"
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass}`}>• {item}</li>
            ))}
          </ul>
          <div className={`p-4 rounded border ${isPrintMode ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-500/30"}`}>
            <p className={`text-sm ${textClass}`}>
              <strong className={highlightClass}>The objective is clarity, not precision.</strong>
            </p>
            <p className={`text-sm mt-2 ${textClass}`}>
              Key principle: You don&apos;t need to predict the future — you need to respond correctly to current conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio & Engines */}
      <section id="portfolio-engines" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-6 ${headingClass}`}>
          Portfolio &amp; Economic Engines
        </h2>

        <div className="space-y-6">
          {/* What Are Economic Engines */}
          <div className={`rounded-lg border ${cardClass} p-6`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>What Are Economic Engines?</h3>
            <p className={`text-sm mb-3 ${textClass}`}>
              Economic engines represent <strong className={highlightClass}>distinct return mechanisms</strong> — not sectors.
            </p>
            <p className={`text-sm mb-3 ${textClass}`}>
              They explain how investments tend to make money under different macro conditions.
            </p>
            <div className={`p-4 rounded border ${isPrintMode ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/20 border-yellow-500/30"}`}>
              <p className={`text-sm ${isPrintMode ? "text-yellow-900" : "text-yellow-300"}`}>
                <strong>Why this matters:</strong> Owning 20 stocks does not guarantee diversification if they all rely on the same engine.
              </p>
            </div>
          </div>

          {/* Why ~12 Engines */}
          <div className={`rounded-lg border ${cardClass} p-6`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Why ~12 Engines?</h3>
            <ul className="space-y-2 mb-3">
              <li className={`text-sm ${textClass}`}>
                • Most investment themes collapse into a small number of macro-sensitive return drivers
              </li>
              <li className={`text-sm ${textClass}`}>
                • Engines must be: <strong className={highlightClass}>distinct, allocatable, macro-responsive</strong>
              </li>
              <li className={`text-sm ${textClass}`}>
                • ~12 balances completeness with usability
              </li>
            </ul>
          </div>

          {/* Engines vs Sectors */}
          <div className={`rounded-lg border ${cardClass} p-6`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Engines vs Sectors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div className={`p-3 rounded ${isPrintMode ? "bg-gray-100" : "bg-white/5"}`}>
                <p className={`text-sm font-semibold mb-1 ${highlightClass}`}>Sectors</p>
                <p className={`text-sm ${textClass}`}>Describe <em>what</em> a company does</p>
              </div>
              <div className={`p-3 rounded ${isPrintMode ? "bg-gray-100" : "bg-white/5"}`}>
                <p className={`text-sm font-semibold mb-1 ${highlightClass}`}>Engines</p>
                <p className={`text-sm ${textClass}`}>Describe <em>why</em> it might outperform</p>
              </div>
            </div>
            <div className={`p-3 rounded border ${isPrintMode ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-500/30"}`}>
              <p className={`text-xs ${isPrintMode ? "text-blue-900" : "text-blue-300"}`}>
                <strong>Example:</strong> AI exposure can live in: Growth &amp; Duration, Infrastructure &amp; Capex, Credit &amp; Carry
              </p>
            </div>
          </div>

          {/* Macro-Driven Scoring */}
          <div className={`rounded-lg border ${cardClass} p-6`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>Macro-Driven Engine Scoring</h3>
            <p className={`text-sm mb-3 ${textClass}`}>
              Each engine is scored 0–100 based on:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {["Liquidity", "Inflation regime", "Growth risk", "Fed policy", "Breadth", "Bitcoin trend"].map((factor, i) => (
                <div key={i} className={`p-2 rounded text-xs text-center ${isPrintMode ? "bg-gray-100" : "bg-white/5"} ${textClass}`}>
                  {factor}
                </div>
              ))}
            </div>
            <p className={`text-sm mb-2 ${textClass}`}>
              <strong className={highlightClass}>Outputs:</strong>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className={`p-2 rounded text-xs text-center ${isPrintMode ? "bg-green-100 text-green-900" : "bg-green-900/20 text-green-400"}`}>
                Overweight
              </div>
              <div className={`p-2 rounded text-xs text-center ${isPrintMode ? "bg-blue-100 text-blue-900" : "bg-blue-900/20 text-blue-400"}`}>
                Neutral
              </div>
              <div className={`p-2 rounded text-xs text-center ${isPrintMode ? "bg-yellow-100 text-yellow-900" : "bg-yellow-900/20 text-yellow-400"}`}>
                Underweight
              </div>
              <div className={`p-2 rounded text-xs text-center ${isPrintMode ? "bg-red-100 text-red-900" : "bg-red-900/20 text-red-400"}`}>
                Gated (blocked)
              </div>
            </div>
          </div>

          {/* Full Engines Explainer */}
          <EnginesExplainer variant="full" mode="expert" />

          {/* When to Rebalance */}
          <div className={`rounded-lg border ${cardClass} p-6`}>
            <h3 className={`text-lg font-semibold mb-3 ${headingClass}`}>When to Rebalance</h3>
            <p className={`text-sm mb-3 ${textClass}`}>
              Rebalancing should occur <strong className={highlightClass}>only when</strong>:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Alert level changes",
                "Confirmations break",
                "Portfolio is materially misaligned",
                "New capital is added"
              ].map((item, i) => (
                <li key={i} className={`text-sm ${textClass}`}>• {item}</li>
              ))}
            </ul>
            <div className={`p-4 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-900/20 border-red-500/30"}`}>
              <p className={`text-sm font-semibold ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                ⚠️ Avoid rebalancing simply because numbers moved slightly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Playbook */}
      <section id="playbook" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-6 ${headingClass}`}>
          Time Horizon Lens
        </h2>

        <div className={`rounded-lg border ${cardClass} p-6`}>
          <p className={`text-sm mb-4 ${textClass}`}>
            Different signals matter for different time frames:
          </p>
          <div className="space-y-4">
            {[
              {
                horizon: "6 Months (Tactical)",
                signals: ["Credit", "Liquidity", "Microstress"]
              },
              {
                horizon: "12 Months (Cyclical)",
                signals: ["Rates trajectory", "Inflation trend", "Fed stance"]
              },
              {
                horizon: "24+ Months (Structural)",
                signals: ["Liquidity regimes", "Technology adoption", "Real asset cycles"]
              }
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
                <p className={`text-sm font-semibold mb-2 ${headingClass}`}>{item.horizon}</p>
                <div className="flex flex-wrap gap-2">
                  {item.signals.map((signal, j) => (
                    <span key={j} className={`px-2 py-1 rounded text-xs ${isPrintMode ? "bg-gray-100" : "bg-white/10"} ${textClass}`}>
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-4 p-4 rounded border ${isPrintMode ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-500/30"}`}>
            <p className={`text-sm ${isPrintMode ? "text-blue-900" : "text-blue-300"}`}>
              <strong>Stack horizons</strong> — do not let short-term noise override long-term structure.
            </p>
          </div>
        </div>
      </section>

      {/* Data Timing */}
      <section id="data-timing" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-6 ${headingClass}`}>
          Data Updates
        </h2>
        <DataUpdateExplainer isPrintMode={isPrintMode} variant="compact" />
      </section>

      {/* Glossary */}
      <section id="glossary" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-6 ${headingClass}`}>
          Key Terms
        </h2>

        <div className="space-y-3">
          {[
            { term: "Regime", def: "Risk-On or Risk-Off classification based on current macro conditions" },
            { term: "Alert Level", def: "Green/Yellow/Red status indicating risk permission regardless of regime" },
            { term: "Economic Engine", def: "A distinct return mechanism (not a sector) with specific macro sensitivities" },
            { term: "Confirmation Layer", def: "Secondary signal (breadth, BTC, microstress) that validates or gates the regime" },
            { term: "HY OAS", def: "High Yield Option-Adjusted Spread — extra yield junk bonds pay over Treasuries" },
            { term: "Yield Curve", def: "Difference between long-term and short-term rates (10Y-2Y); inversion signals recession risk" },
            { term: "Liquidity", def: "Amount of money in the financial system (Fed balance sheet, reserves, RRP)" },
            { term: "Breadth", def: "Market participation measure — narrow = fragile, broad = healthy" },
            { term: "Microstress", def: "Short-term funding pressure (SOFR spreads, CP rates, TED spread)" }
          ].map((item, i) => (
            <div key={i} className={`rounded-lg border ${cardClass} p-4`}>
              <p className={`text-sm font-semibold mb-1 ${headingClass}`}>{item.term}</p>
              <p className={`text-sm ${textClass}`}>{item.def}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
