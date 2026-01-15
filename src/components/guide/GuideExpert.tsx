/**
 * Expert Guide Component
 *
 * Comprehensive expert-level guide with full technical details
 */

import { IndicatorExplainer } from "@/components/guide/IndicatorExplainer";
import { EnginesExplainer } from "@/components/engines/EnginesExplainer";
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
            Start Here
          </h2>
          <div className="space-y-4">
            <p className={`text-sm ${textClass}`}>
              This dashboard is a <strong className={highlightClass}>macro regime framework</strong> that translates
              50+ economic indicators into actionable portfolio guidance. It&apos;s designed for systematic, evidence-based
              allocation decisions—not market timing or stock picking.
            </p>
            <ol className="space-y-3">
              {[
                {
                  step: "Check Regime State",
                  detail: "Review the macro composite (Risk-On/Risk-Off) and confirmation layers (breadth, microstress, BTC trend)"
                },
                {
                  step: "Review Engine Scores",
                  detail: "See which economic engines are favored (+2) or blocked (-2) by current conditions"
                },
                {
                  step: "Implement Changes",
                  detail: "Adjust new capital flows or rebalance if regime shifted significantly (e.g., Risk-On → Risk-Off)"
                }
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
        </div>
      </section>

      {/* Why This Exists */}
      <section id="why" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Why This Exists
        </h2>

        {/* Goal */}
        <div id="goal" className={`rounded-lg border ${cardClass} p-6 mb-4`}>
          <h3 className={`text-lg font-semibold mb-3 ${h3Class}`}>Goal</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            Traditional portfolio construction uses static allocations (60/40, risk parity) or discretionary market timing.
            This framework is designed to be <strong className={highlightClass}>systematic, macro-driven, and repeatable</strong>.
          </p>
          <ul className="space-y-2">
            {[
              "Compress 50+ indicators into a single regime state (Risk-On/Risk-Off)",
              "Map portfolio holdings to ~12 economic engines based on return mechanisms",
              "Provide actionable guidance on which engines to favor/avoid in the current environment",
              "Enable weekly check-ins without constant monitoring or emotional decision-making"
            ].map((point, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What It Is / Isn't */}
        <div id="what-it-is" className={`rounded-lg border ${cardClass} p-6 mb-4`}>
          <h3 className={`text-lg font-semibold mb-3 ${h3Class}`}>What It Is / Isn&apos;t</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"}`}>
              <p className={`font-semibold mb-2 text-sm ${isPrintMode ? "text-green-900" : "text-green-400"}`}>
                ✓ What it IS:
              </p>
              <ul className="space-y-1.5">
                {[
                  "A systematic macro regime framework",
                  "A weekly/monthly allocation tool",
                  "An engine-based diversification model",
                  "A confirmation-layer system to avoid false signals"
                ].map((item, i) => (
                  <li key={i} className={`text-sm ${textClass}`}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-900/20 border-red-500/30"}`}>
              <p className={`font-semibold mb-2 text-sm ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                ✗ What it ISN&apos;T:
              </p>
              <ul className="space-y-1.5">
                {[
                  "NOT a market timing tool",
                  "NOT stock-picking advice",
                  "NOT intraday trading signals",
                  "NOT a prediction engine (it&apos;s diagnostic, not prophetic)"
                ].map((item, i) => (
                  <li key={i} className={`text-sm ${textClass}`}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div id="how-to-use" className={`rounded-lg border ${cardClass} p-6`}>
          <h3 className={`text-lg font-semibold mb-3 ${h3Class}`}>How to Use (10 min/week)</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            <strong className={highlightClass}>Weekly Routine:</strong>
          </p>
          <ol className="space-y-2">
            {[
              "Review macro composite (Risk-On vs Risk-Off)",
              "Check confirmation layers (breadth, microstress, BTC trend)",
              "Review engine scores to see which are favored/blocked",
              "Adjust new contributions or rebalance if regime shifted",
              "Use Company Analysis to map specific holdings to engines",
              "Monitor for major regime changes (requires 2-3 confirmations)"
            ].map((step, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className={`mr-2 font-bold ${highlightClass}`}>{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The Building Blocks */}
      <section id="building-blocks" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          The Building Blocks
        </h2>
        <p className={`text-sm ${textClass} mb-6`}>
          The dashboard tracks 50+ indicators across 6 macro categories. Each category contributes to the overall
          regime classification (Risk-On vs Risk-Off).
        </p>

        {/* Rates & Curve */}
        <div id="rates" className="mb-6">
          <h3 className={`text-xl font-semibold mb-4 ${h3Class}`}>Rates &amp; Curve</h3>
          <div className="space-y-4">
            <IndicatorExplainer
              seriesId="FEDFUNDS"
              whatItMeasures="The Federal Reserve's target interest rate for overnight lending between banks. This is the primary tool the Fed uses to control inflation and employment."
              whyItMatters={[
                "Sets the baseline cost of money across the entire economy",
                "When rates rise, borrowing becomes expensive → slows economy, hurts growth stocks",
                "When rates fall, borrowing is cheap → fuels growth, supports risk assets",
                "The Fed adjusts this based on inflation (too hot → raise rates) and unemployment (too weak → cut rates)"
              ]}
              howToInterpret="Rising rates = headwind for long-duration assets (tech, crypto). Falling rates = tailwind for growth and leverage."
              commonMistakes="Ignoring the DIRECTION of change. A high rate that's falling is very different from a low rate that's rising."
            />

            <div className={`rounded-lg border ${cardClass} p-4`}>
              <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>Other Rate Indicators</h4>
              <ul className="space-y-1.5">
                {[
                  { name: "10Y Treasury Yield (DGS10)", why: "Benchmark for long-term borrowing costs" },
                  { name: "2Y-10Y Yield Curve (T10Y2Y)", why: "Inverted curve often precedes recession" },
                  { name: "Real Rates (10Y - Inflation)", why: "Inflation-adjusted cost of capital" }
                ].map((item, i) => (
                  <li key={i} className={`text-sm ${textClass}`}>
                    <strong className={highlightClass}>{item.name}:</strong> {item.why}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Growth */}
        <div id="growth" className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Growth</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            Tracks the economy&apos;s expansion or contraction through jobs, output, and leading indicators.
          </p>
          <ul className="space-y-2">
            {[
              { name: "Nonfarm Payrolls (PAYEMS)", why: "Monthly job creation (strong jobs = healthy economy)" },
              { name: "Unemployment Rate (UNRATE)", why: "% of people looking for work (low = tight labor market)" },
              { name: "ISM Manufacturing PMI (MANEMP)", why: "Survey of factory managers (>50 = expansion)" },
              { name: "Industrial Production (INDPRO)", why: "Output from factories and mines" }
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <div>
                  <strong className={highlightClass}>{item.name}:</strong> {item.why}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Inflation */}
        <div id="inflation" className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Inflation</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            Measures how fast prices are rising. The Fed targets ~2% inflation. Too high → rate hikes. Too low → deflation risk.
          </p>
          <ul className="space-y-2">
            {[
              { name: "CPI (CPIAUCSL)", why: "Consumer Price Index (headline inflation)" },
              { name: "Core CPI (CPILFESL)", why: "Excludes food & energy (more stable signal)" },
              { name: "PCE (PCEPI)", why: "Fed's preferred inflation gauge" },
              { name: "5Y Breakeven (T5YIE)", why: "Market's inflation expectations" }
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <div>
                  <strong className={highlightClass}>{item.name}:</strong> {item.why}
                </div>
              </li>
            ))}
          </ul>
          <div className={`mt-3 p-3 rounded border ${isPrintMode ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/20 border-yellow-500/30"}`}>
            <p className={`text-xs ${isPrintMode ? "text-yellow-900" : "text-yellow-300"}`}>
              ⚠️ High inflation forces the Fed to raise rates, which hurts stocks. Low inflation allows rate cuts, which helps risk assets.
            </p>
          </div>
        </div>

        {/* Credit & Stress */}
        <div id="credit" className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Credit &amp; Stress</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            Measures how willing investors are to lend money and take risk. When credit spreads widen (lenders demand more compensation),
            it signals rising stress and potential recession.
          </p>
          <ul className="space-y-2">
            {[
              {
                name: "High Yield OAS (BAMLH0A0HYM2)",
                why: "Spread between junk bonds and Treasuries. >500 = stress, <300 = complacent"
              },
              {
                name: "Investment Grade OAS (BAMLC0A0CM)",
                why: "Spread for higher-quality corporate debt"
              },
              {
                name: "VIX",
                why: "Stock market volatility (fear gauge). >25 = elevated stress"
              }
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <div>
                  <strong className={highlightClass}>{item.name}:</strong> {item.why}
                </div>
              </li>
            ))}
          </ul>
          <div className={`mt-3 p-3 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-900/20 border-red-500/30"}`}>
            <p className={`text-xs ${isPrintMode ? "text-red-900" : "text-red-300"}`}>
              🚨 Widening credit spreads are often the first warning sign of a major downturn. Monitor HY OAS closely.
            </p>
          </div>
        </div>

        {/* Liquidity */}
        <div id="liquidity" className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Liquidity</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            Tracks the availability of cash and credit in the financial system. More liquidity = easier market conditions.
            Less liquidity = tighter conditions, more volatility.
          </p>
          <ul className="space-y-2">
            {[
              {
                name: "Fed Balance Sheet (WALCL)",
                why: "Total assets held by the Fed. Expanding = QE (good for risk). Contracting = QT (bad for risk)"
              },
              {
                name: "M2 Money Supply (M2SL)",
                why: "Broad measure of money in circulation"
              },
              {
                name: "Bank Reserves",
                why: "Cash banks hold at the Fed. Low reserves = tighter liquidity"
              }
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <div>
                  <strong className={highlightClass}>{item.name}:</strong> {item.why}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* USD */}
        <div id="usd" className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>USD</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            The U.S. dollar&apos;s strength impacts global risk appetite. A strong dollar hurts emerging markets and commodities.
            A weak dollar supports international equities and real assets.
          </p>
          <ul className="space-y-2">
            {[
              {
                name: "DXY (Dollar Index)",
                why: "Measures USD vs basket of currencies. Rising = headwind for EM and commodities"
              },
              {
                name: "EUR/USD",
                why: "Most traded currency pair"
              }
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <div>
                  <strong className={highlightClass}>{item.name}:</strong> {item.why}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Market Indicators */}
        <div id="market" className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Market Indicators</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            Price-based signals that reflect investor sentiment and risk appetite.
          </p>
          <ul className="space-y-2">
            {[
              { name: "S&P 500 (^GSPC)", why: "Broad US equity benchmark" },
              { name: "Small Caps (Russell 2000)", why: "Higher beta, more sensitive to growth/rates" },
              { name: "Nasdaq (^IXIC)", why: "Tech-heavy, long-duration exposure" }
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className="mr-2 text-blue-400">•</span>
                <div>
                  <strong className={highlightClass}>{item.name}:</strong> {item.why}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Confirmation Layers */}
        <div id="confirmations" className={`rounded-lg border ${cardClass} p-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Confirmation Layers</h3>
          <p className={`text-sm ${textClass} mb-4`}>
            These are secondary signals used to confirm or challenge the primary regime. They help filter false signals.
          </p>

          <div className="space-y-4">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>Breadth</h4>
              <p className={`text-sm ${textClass} mb-2`}>
                Measures how many stocks are participating in the rally. Narrow breadth (only a few stocks up) = fragile rally.
                Broad breadth (most stocks up) = healthy market.
              </p>
              <p className={`text-xs ${textClass}`}>
                <strong className={highlightClass}>Key metric:</strong> % of S&P 500 above 200-day MA. &gt;60% = healthy. &lt;40% = weak.
              </p>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>BTC Trend</h4>
              <p className={`text-sm ${textClass} mb-2`}>
                Bitcoin acts as a risk-on barometer. BTC above 200D MA = liquidity is ample. BTC below 200D MA = liquidity tightening.
              </p>
              <p className={`text-xs ${textClass}`}>
                <strong className={highlightClass}>Why it works:</strong> BTC is pure beta—no earnings, no cashflows, just liquidity and sentiment.
              </p>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>Microstress</h4>
              <p className={`text-sm ${textClass} mb-2`}>
                Short-term stress gauge derived from VIX, credit spreads, and put/call ratios. Helps detect rapid deterioration.
              </p>
              <p className={`text-xs ${textClass}`}>
                <strong className={highlightClass}>Interpretation:</strong> Elevated microstress = avoid adding risk, even if macro regime is Risk-On.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How the Regime Engine Works */}
      <section id="regime-engine" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          How the Regime Engine Works
        </h2>

        {/* Signal Compression */}
        <div id="compression" className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Signal Compression</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            The dashboard tracks 50+ indicators. To make them actionable, we:
          </p>
          <ol className="space-y-2">
            {[
              "Normalize each indicator to a z-score (standard deviations from historical mean)",
              "Group indicators into 6 macro categories (Rates, Growth, Inflation, Credit, Liquidity, USD)",
              "Weight each category based on current relevance (e.g., inflation matters more during high-inflation regimes)",
              "Compute a composite score: positive = Risk-On, negative = Risk-Off",
              "Cross-check with confirmation layers (breadth, BTC, microstress) to avoid false signals"
            ].map((step, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className={`mr-2 font-bold ${highlightClass}`}>{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Example Interpretations */}
        <div id="examples" className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Example Interpretations</h3>
          <div className="space-y-4">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-green-900" : "text-green-400"}`}>
                Strong Risk-On
              </h4>
              <p className={`text-sm ${textClass} mb-2`}>
                • Rates falling or stable<br />
                • Growth accelerating (jobs strong, PMI &gt;50)<br />
                • Inflation under control (&lt;3%)<br />
                • Credit spreads tight (HY OAS &lt;400)<br />
                • Liquidity ample (Fed balance sheet stable/expanding)<br />
                • Breadth strong (&gt;60% above 200D MA)
              </p>
              <p className={`text-xs ${isPrintMode ? "text-green-800" : "text-green-300"}`}>
                <strong>Action:</strong> Favor growth, cyclicals, crypto. Avoid tail hedges.
              </p>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/20 border-yellow-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-yellow-900" : "text-yellow-400"}`}>
                Mixed / Transitional
              </h4>
              <p className={`text-sm ${textClass} mb-2`}>
                • Rates rising but growth still okay<br />
                • Inflation elevated but peaking<br />
                • Credit spreads widening modestly<br />
                • Breadth narrowing (50-60%)<br />
                • BTC choppy around 200D MA
              </p>
              <p className={`text-xs ${isPrintMode ? "text-yellow-800" : "text-yellow-300"}`}>
                <strong>Action:</strong> Favor quality, defensives, credit income. Reduce cyclicals and crypto.
              </p>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-900/20 border-red-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                Strong Risk-Off
              </h4>
              <p className={`text-sm ${textClass} mb-2`}>
                • Rates spiking or inverted curve<br />
                • Growth slowing/contracting (PMI &lt;50, job losses)<br />
                • Credit spreads blowing out (HY OAS &gt;600)<br />
                • Liquidity draining (QT, high rates)<br />
                • Breadth collapsing (&lt;40% above 200D MA)<br />
                • BTC below 200D MA
              </p>
              <p className={`text-xs ${isPrintMode ? "text-red-800" : "text-red-300"}`}>
                <strong>Action:</strong> Favor duration (long bonds), tail hedges, cash. Avoid growth, cyclicals, crypto.
              </p>
            </div>
          </div>
        </div>

        {/* What Changes the Regime */}
        <div id="triggers" className={`rounded-lg border ${cardClass} p-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>What Changes the Regime</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            A regime shift typically requires 2-3 confirmations. Single-day spikes are noise. Look for:
          </p>
          <ul className="space-y-2">
            {[
              {
                trigger: "Fed policy pivot",
                example: "Rate hike cycle ending, QE starting"
              },
              {
                trigger: "Credit stress spike",
                example: "HY OAS jumping 100+ bps in 2 weeks"
              },
              {
                trigger: "Growth inflection",
                example: "ISM PMI crossing 50 (expansion/contraction threshold)"
              },
              {
                trigger: "Breadth collapse",
                example: "% above 200D MA falling below 40%"
              },
              {
                trigger: "BTC trend break",
                example: "Bitcoin breaking below/above 200D MA decisively"
              }
            ].map((item, i) => (
              <li key={i} className={`text-sm ${textClass}`}>
                <strong className={highlightClass}>{item.trigger}:</strong> {item.example}
              </li>
            ))}
          </ul>
          <div className={`mt-4 p-3 rounded border ${isPrintMode ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-500/30"}`}>
            <p className={`text-xs ${isPrintMode ? "text-blue-900" : "text-blue-300"}`}>
              💡 <strong>Key principle:</strong> Wait for confirmation. One bad day ≠ regime change. 2-3 signals deteriorating over 1-2 weeks = regime shift.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio & Economic Engines */}
      <section id="portfolio-engines" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Portfolio &amp; Economic Engines
        </h2>

        {/* Setting Up Your Portfolio */}
        <div id="portfolio-setup" className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Setting Up Your Portfolio</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            To use the portfolio analysis features:
          </p>
          <ol className="space-y-2">
            {[
              "Go to the Portfolio tab and add your holdings (ticker + weight %)",
              "The system will classify each holding into 1-2 engines based on its macro characteristics",
              "View your engine exposure: Are you overweight growth? Underweight stability?",
              "Compare your allocation to the current macro regime guidance",
              "Use the Engines tab to see which engines are favored/blocked right now"
            ].map((step, i) => (
              <li key={i} className={`text-sm ${textClass} flex items-start`}>
                <span className={`mr-2 font-bold ${highlightClass}`}>{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 12 Economic Engines */}
        <div id="engine-classification">
          <h3 className={`text-xl font-semibold mb-4 ${h3Class}`}>12 Economic Engines</h3>
          <EnginesExplainer variant="full" mode="expert" />
        </div>

        {/* Macro-Driven Scoring */}
        <div id="macro-scoring" className={`rounded-lg border ${cardClass} p-6 mb-6 mt-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Macro-Driven Scoring</h3>
          <p className={`text-sm ${textClass} mb-3`}>
            Each engine receives a score from -2 (strongly blocked) to +2 (strongly favored) based on current macro conditions.
          </p>
          <div className="space-y-3">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>Scoring Logic</h4>
              <ul className="space-y-1.5 text-sm">
                <li className={textClass}>
                  <strong className={highlightClass}>+2 (Strong Favor):</strong> Macro tailwinds aligned (e.g., Growth engines when Risk-On + strong employment)
                </li>
                <li className={textClass}>
                  <strong className={highlightClass}>+1 (Mild Favor):</strong> Some tailwinds but mixed signals
                </li>
                <li className={textClass}>
                  <strong className={highlightClass}>0 (Neutral):</strong> Macro environment neither helps nor hurts
                </li>
                <li className={textClass}>
                  <strong className={highlightClass}>-1 (Mild Block):</strong> Some headwinds
                </li>
                <li className={textClass}>
                  <strong className={highlightClass}>-2 (Strong Block):</strong> Macro headwinds aligned (e.g., Crypto when Risk-Off + tightening liquidity)
                </li>
              </ul>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>Visualized on Charts</h4>
              <p className={`text-sm ${textClass}`}>
                The Engines tab shows a heatmap and bar charts of all 12 engines. Green = favored, Red = blocked.
                Use this to identify which parts of your portfolio have tailwinds vs headwinds.
              </p>
            </div>
          </div>
        </div>

        {/* When to Rebalance */}
        <div id="rebalancing" className={`rounded-lg border ${cardClass} p-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>When to Rebalance</h3>
          <p className={`text-sm ${textClass} mb-4`}>
            Use the traffic light system:
          </p>

          <div className="space-y-3">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-green-900" : "text-green-400"}`}>
                🟢 Add (Score +1 to +2)
              </h4>
              <p className={`text-sm ${textClass}`}>
                Engines with strong macro tailwinds. Tilt new capital here. Examples: Cashflow Compounders, Growth engines during Risk-On.
              </p>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/20 border-yellow-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-yellow-900" : "text-yellow-400"}`}>
                🟡 Hold (Score -0.5 to +0.5)
              </h4>
              <p className={`text-sm ${textClass}`}>
                Neutral engines. Maintain existing exposure but don&apos;t add aggressively. Examples: Quality Defensives, Credit Income in mixed environments.
              </p>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-900/20 border-red-500/30"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                🔴 Avoid (Score -1 to -2)
              </h4>
              <p className={`text-sm ${textClass}`}>
                Engines with strong macro headwinds. Avoid new capital, consider trimming if regime shift is confirmed. Examples: Crypto during Risk-Off, Cyclicals during recession.
              </p>
            </div>
          </div>

          <div className={`mt-4 p-3 rounded border ${isPrintMode ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-500/30"}`}>
            <p className={`text-xs ${isPrintMode ? "text-blue-900" : "text-blue-300"}`}>
              💡 <strong>Rebalancing frequency:</strong> Weekly check-ins, monthly/quarterly action. Only rebalance when regime shifts significantly (2-3 confirmations).
            </p>
          </div>
        </div>
      </section>

      {/* Weekly Playbook */}
      <section id="playbook" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Weekly Playbook
        </h2>

        {/* 10-Minute Checklist */}
        <div id="checklist" className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>10-Minute Checklist</h3>
          <p className={`text-sm ${textClass} mb-4`}>
            <strong className={highlightClass}>Sunday night or Monday morning routine:</strong>
          </p>
          <ol className="space-y-3">
            {[
              {
                step: "Open Dashboard",
                detail: "Check the main Macro tab for current regime state"
              },
              {
                step: "Review Confirmation Layers",
                detail: "Breadth, BTC trend, microstress—do they align with the regime?"
              },
              {
                step: "Check Engines Tab",
                detail: "Which engines are +2 (add), which are -2 (avoid)?"
              },
              {
                step: "Review Your Portfolio",
                detail: "Are you overweight blocked engines? Underweight favored ones?"
              },
              {
                step: "Adjust New Capital",
                detail: "If adding money this week (401k, IRA), tilt toward favored engines"
              },
              {
                step: "Check for Regime Shifts",
                detail: "Did anything major change? If yes, consider rebalancing. If no, stay the course."
              }
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

        {/* By Account Type */}
        <div id="by-account" className={`rounded-lg border ${cardClass} p-6 mb-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>By Account Type</h3>
          <div className="space-y-4">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>401k (Tax-Deferred)</h4>
              <p className={`text-sm ${textClass} mb-2`}>
                <strong className={highlightClass}>Goal:</strong> Long-term growth with tax efficiency.
              </p>
              <ul className="space-y-1 text-xs">
                <li className={textClass}>• Use regime to tilt new contributions (not rebalance entire account monthly)</li>
                <li className={textClass}>• Risk-On: Favor stock funds (S&P 500, Total Stock Market)</li>
                <li className={textClass}>• Risk-Off: Tilt toward bonds, stable value, or money market</li>
                <li className={textClass}>• Rebalance 1-2x per year unless major regime shift</li>
              </ul>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>Taxable Brokerage</h4>
              <p className={`text-sm ${textClass} mb-2`}>
                <strong className={highlightClass}>Goal:</strong> Tactical allocation with tax-loss harvesting.
              </p>
              <ul className="space-y-1 text-xs">
                <li className={textClass}>• More flexibility to rebalance (but watch short-term capital gains)</li>
                <li className={textClass}>• Use engine scores to rotate between sectors/themes</li>
                <li className={textClass}>• Harvest losses in blocked engines during Risk-Off periods</li>
                <li className={textClass}>• Consider municipal bonds for tax efficiency if in high bracket</li>
              </ul>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>Roth IRA</h4>
              <p className={`text-sm ${textClass} mb-2`}>
                <strong className={highlightClass}>Goal:</strong> Maximum long-term growth (tax-free withdrawals).
              </p>
              <ul className="space-y-1 text-xs">
                <li className={textClass}>• Most aggressive allocation (long time horizon, no taxes)</li>
                <li className={textClass}>• Overweight growth engines (Cashflow Compounders, Early-Stage Growth, Crypto)</li>
                <li className={textClass}>• Use regime to time additions (max out Roth during Risk-On)</li>
                <li className={textClass}>• Can hold tax-inefficient assets (REITs, high-turnover strategies)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Time Horizon Lens */}
        <div id="time-horizons" className={`rounded-lg border ${cardClass} p-6`}>
          <h3 className={`text-xl font-semibold mb-3 ${h3Class}`}>Time Horizon Lens</h3>
          <div className="space-y-4">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>0-6 Months (Short-Term)</h4>
              <ul className="space-y-1 text-xs">
                <li className={textClass}>• Pay close attention to microstress and breadth</li>
                <li className={textClass}>• Risk-Off: Shift to cash, duration, tail hedges immediately</li>
                <li className={textClass}>• Risk-On: Can add cyclicals, growth, but keep 20-30% dry powder</li>
              </ul>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>6-12 Months (Medium-Term)</h4>
              <ul className="space-y-1 text-xs">
                <li className={textClass}>• Focus on regime direction (improving vs deteriorating)</li>
                <li className={textClass}>• If Risk-On confirmed: Overweight growth, cyclicals, crypto</li>
                <li className={textClass}>• If Risk-Off confirmed: Overweight quality, defensives, credit income</li>
                <li className={textClass}>• Rebalance quarterly or when regime shifts</li>
              </ul>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <h4 className={`text-sm font-semibold mb-2 ${headingClass}`}>12-24+ Months (Long-Term)</h4>
              <ul className="space-y-1 text-xs">
                <li className={textClass}>• Use regime for strategic tilts, not tactical trades</li>
                <li className={textClass}>• Maintain core allocations (Cashflow Compounders, Quality Defensives)</li>
                <li className={textClass}>• Add to growth engines during Risk-Off dips (contrarian)</li>
                <li className={textClass}>• Rebalance 1-2x per year or during major regime changes only</li>
              </ul>
            </div>
          </div>

          <div className={`mt-4 p-3 rounded border ${isPrintMode ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/20 border-yellow-500/30"}`}>
            <p className={`text-xs ${isPrintMode ? "text-yellow-900" : "text-yellow-300"}`}>
              ⚠️ <strong>Key principle:</strong> The longer your horizon, the less you should react to short-term regime noise.
              Use Risk-Off periods as buying opportunities for long-term engines.
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

      {/* Glossary */}
      <section id="glossary" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${h2Class}`}>
          Glossary
        </h2>

        <div className="space-y-3">
          {[
            {
              term: "HY OAS (High Yield Option-Adjusted Spread)",
              definition: "The extra yield investors demand to hold junk bonds vs Treasuries. Measures credit stress.",
              whyMatters: "Widening spreads (>500) signal fear and potential recession. Tight spreads (<300) signal complacency."
            },
            {
              term: "z-score",
              definition: "Standard deviations from the historical mean. Normalizes indicators for comparison.",
              whyMatters: "A z-score of +2 means 'unusually high,' -2 means 'unusually low.' Helps spot extremes."
            },
            {
              term: "Yield Curve",
              definition: "The difference between long-term and short-term interest rates (e.g., 10Y - 2Y).",
              whyMatters: "Inverted curve (short rates > long rates) often precedes recession within 6-18 months."
            },
            {
              term: "Liquidity",
              definition: "The availability of cash and credit in the financial system (Fed balance sheet, M2 money supply).",
              whyMatters: "More liquidity = easier market conditions. Less liquidity = tighter conditions, more volatility."
            },
            {
              term: "Breadth",
              definition: "The % of stocks participating in a rally (e.g., % of S&P 500 above 200-day moving average).",
              whyMatters: "Narrow breadth = fragile rally (only a few stocks). Broad breadth = healthy market."
            },
            {
              term: "Microstress",
              definition: "Short-term stress gauge from VIX, credit spreads, and put/call ratios.",
              whyMatters: "Elevated microstress = avoid adding risk, even if macro regime looks okay."
            },
            {
              term: "200-Day Moving Average (200D MA)",
              definition: "Average price over the past 200 trading days. Common trend indicator.",
              whyMatters: "Price above 200D MA = uptrend. Below = downtrend. Used for BTC trend confirmation."
            },
            {
              term: "Regime",
              definition: "The current macro environment: Risk-On (favorable for risk assets) or Risk-Off (defensive).",
              whyMatters: "Regime determines which engines are favored/blocked. Shifts require 2-3 confirmations."
            },
            {
              term: "Composite",
              definition: "A weighted average of multiple indicators, compressed into a single signal.",
              whyMatters: "Simplifies 50+ indicators into one actionable metric (Risk-On vs Risk-Off)."
            },
            {
              term: "Confirmation Layer",
              definition: "Secondary signals (breadth, BTC trend, microstress) used to validate the primary regime.",
              whyMatters: "Prevents false signals. A regime shift needs 2-3 confirmations, not just one bad day."
            },
            {
              term: "Economic Engine",
              definition: "A broad, repeatable return mechanism (e.g., Growth, Carry, Duration) that describes HOW an asset makes money.",
              whyMatters: "Diversify by HOW you make money, not just what you own. ~12 engines capture most return sources."
            },
            {
              term: "Duration",
              definition: "Sensitivity to interest rate changes. Long-duration assets (growth stocks, long bonds) fall when rates rise.",
              whyMatters: "High duration = more volatile when Fed changes rates. Low duration = more stable."
            }
          ].map((item, i) => (
            <div key={i} className={`rounded-lg border ${cardClass} p-4`}>
              <p className={`text-sm font-semibold mb-1 ${headingClass}`}>{item.term}</p>
              <p className={`text-sm ${textClass} mb-2`}>
                <strong className={highlightClass}>Definition:</strong> {item.definition}
              </p>
              <p className={`text-xs ${textClass}`}>
                <strong className={highlightClass}>Why it matters:</strong> {item.whyMatters}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
