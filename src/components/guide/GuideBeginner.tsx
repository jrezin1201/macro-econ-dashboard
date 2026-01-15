/**
 * Beginner Guide Component
 *
 * Simple, beginner-friendly guide for family members who only know "news + 401k"
 */

import { DataUpdateExplainer } from "@/components/shared/DataUpdateExplainer";
import { useState } from "react";

interface GuideBeginnerProps {
  isPrintMode?: boolean;
}

export function GuideBeginner({ isPrintMode = false }: GuideBeginnerProps) {
  const [expandedEngine, setExpandedEngine] = useState<string | null>(null);

  const textClass = isPrintMode ? "text-gray-800" : "text-white/80";
  const headingClass = isPrintMode ? "text-black" : "text-white";
  const cardClass = isPrintMode ? "bg-gray-50 border-gray-300" : "bg-white/5 border-white/10";
  const highlightClass = isPrintMode ? "text-blue-900" : "text-blue-400";

  const engines = [
    { id: "cashflow", name: "Cashflow Compounders", simple: "Big stable companies (Apple, Microsoft)", examples: "AAPL, MSFT, JNJ" },
    { id: "quality", name: "Quality Defensives", simple: "Safe companies that don't crash much", examples: "PG, KO, WMT" },
    { id: "value", name: "Value Recovery", simple: "Cheap unloved stocks that might bounce back", examples: "BAC, XLE, financials" },
    { id: "growth", name: "Early-Stage Growth", simple: "Small fast-growing companies (risky)", examples: "ARKK, small-cap tech" },
    { id: "cyclical", name: "Cyclical Growth", simple: "Companies that do well when economy is hot", examples: "CAT, airlines, industrials" },
    { id: "real-assets", name: "Real Assets", simple: "Gold, commodities, inflation protection", examples: "GLD, DBC, PDBC" },
    { id: "stability", name: "Stability", simple: "Very safe but boring (bonds, utilities)", examples: "TLT, SGOV, utilities" },
    { id: "volatility", name: "Volatility (Crypto)", simple: "Bitcoin, high-risk crypto plays", examples: "BTC, MSTR, COIN" },
    { id: "tail-hedge", name: "Tail Hedge", simple: "Insurance against market crashes", examples: "VIX puts, long vol" },
    { id: "credit-income", name: "Credit Income", simple: "Corporate bonds for steady income", examples: "HYG, LQD, corporate debt" },
    { id: "duration", name: "Duration (Long Bonds)", simple: "Long-term government bonds", examples: "TLT, EDV, 20Y+ bonds" },
    { id: "cash", name: "Cash", simple: "Money market, T-bills, safest of all", examples: "SGOV, BIL, cash" }
  ];

  return (
    <div className="space-y-8">
      {/* Start Here */}
      <section id="start" className="scroll-mt-20">
        <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/30 p-6">
          <h2 className={`text-2xl font-bold mb-4 ${headingClass}`}>
            ✨ Start Here (10 minutes per week)
          </h2>
          <p className={`text-sm mb-4 ${textClass}`}>
            This dashboard is like a <strong className={highlightClass}>weather app for investing</strong>. It tells you
            if conditions are good (green), caution (yellow), or risky (red).
          </p>
          <p className={`text-sm mb-4 ${textClass}`}>
            <strong className={highlightClass}>Your weekly routine:</strong>
          </p>
          <ol className="space-y-3">
            {[
              { step: "Check the Alert Level", detail: "Is it Green, Yellow, or Red?" },
              { step: "Read the 'This Week Actions' box", detail: "It tells you exactly what to do" },
              { step: "If adding new money (paycheck, 401k contribution)", detail: "Follow the suggested tilts" }
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <p className={`text-sm font-semibold ${headingClass}`}>{item.step}</p>
                  <p className={`text-xs ${textClass}`}>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={`mt-4 p-3 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"}`}>
            <p className={`text-sm ${isPrintMode ? "text-green-900" : "text-green-300"}`}>
              ✅ <strong>That&apos;s it!</strong> No need to watch the news every day or stress about every market move.
              Check once a week, make small adjustments with new money, and stick to the plan.
            </p>
          </div>
        </div>
      </section>

      {/* Why This Exists */}
      <section id="why" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${headingClass}`}>
          Why This Exists
        </h2>

        <div className={`rounded-lg border ${cardClass} p-6 space-y-4`}>
          <div>
            <h3 className={`text-lg font-semibold mb-2 ${headingClass}`}>What It Is</h3>
            <p className={`text-sm ${textClass}`}>
              Think of this as a <strong className={highlightClass}>simple traffic light system</strong> for your investments:
            </p>
            <ul className="space-y-2 mt-2">
              <li className={`text-sm ${textClass}`}>
                <strong className="text-green-500">🟢 Green:</strong> Good time to add stocks, economy looks healthy
              </li>
              <li className={`text-sm ${textClass}`}>
                <strong className="text-yellow-500">🟡 Yellow:</strong> Be cautious, some warning signs
              </li>
              <li className={`text-sm ${textClass}`}>
                <strong className="text-red-500">🔴 Red:</strong> Risky conditions, protect what you have
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"}`}>
              <p className={`font-semibold mb-2 text-sm ${isPrintMode ? "text-green-900" : "text-green-400"}`}>
                ✓ What it IS:
              </p>
              <ul className="space-y-1.5">
                <li className={`text-sm ${textClass}`}>• A simple decision helper</li>
                <li className={`text-sm ${textClass}`}>• A weekly check-in routine</li>
                <li className={`text-sm ${textClass}`}>• Guidance for 401k contributions</li>
                <li className={`text-sm ${textClass}`}>• A way to avoid panic selling</li>
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
                <li className={`text-sm ${textClass}`}>• NOT a get-rich-quick scheme</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Routine */}
      <section id="weekly-routine" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${headingClass}`}>
          Your Weekly Routine
        </h2>

        <div className={`rounded-lg border ${cardClass} p-6 space-y-4`}>
          <p className={`text-sm ${textClass}`}>
            <strong className={highlightClass}>Best time to check:</strong> Sunday night or Monday morning (10 minutes)
          </p>

          <div className="space-y-4">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <p className={`font-semibold mb-2 text-sm ${headingClass}`}>Step 1: Check the Dashboard</p>
              <p className={`text-sm ${textClass}`}>
                Go to the main page and look at the big alert box. Is it Green, Yellow, or Red?
              </p>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <p className={`font-semibold mb-2 text-sm ${headingClass}`}>Step 2: Read the Actions</p>
              <p className={`text-sm ${textClass}`}>
                The &quot;This Week Actions&quot; box tells you exactly what to do. Examples:
              </p>
              <ul className="mt-2 space-y-1">
                <li className={`text-xs ${textClass}`}>
                  • &quot;Add stocks gradually&quot; → Put new 401k money into stock funds
                </li>
                <li className={`text-xs ${textClass}`}>
                  • &quot;Favor stable companies&quot; → Choose big, safe names over small risky ones
                </li>
                <li className={`text-xs ${textClass}`}>
                  • &quot;Avoid new crypto&quot; → Don&apos;t add Bitcoin or crypto funds this week
                </li>
              </ul>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
              <p className={`font-semibold mb-2 text-sm ${headingClass}`}>Step 3: Apply to Your 401k</p>
              <p className={`text-sm ${textClass} mb-2`}>
                When you make your weekly/monthly 401k contribution, use the guidance:
              </p>
              <ul className="space-y-1">
                <li className={`text-xs ${textClass}`}>
                  • <strong className="text-green-500">Green + Stocks favored:</strong> Put more into S&P 500 / Total Stock Market funds
                </li>
                <li className={`text-xs ${textClass}`}>
                  • <strong className="text-yellow-500">Yellow + Cautious:</strong> Split between stocks and bonds / stable funds
                </li>
                <li className={`text-xs ${textClass}`}>
                  • <strong className="text-red-500">Red + Defensive:</strong> More into bonds, money market, or stable value funds
                </li>
              </ul>
            </div>
          </div>

          <div className={`mt-4 p-4 rounded border ${isPrintMode ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/20 border-yellow-500/30"}`}>
            <p className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-yellow-900" : "text-yellow-300"}`}>
              ⚠️ Important: Only adjust NEW contributions
            </p>
            <p className={`text-sm ${isPrintMode ? "text-gray-800" : "text-white/70"}`}>
              Don&apos;t sell everything and panic. Only adjust where your <em>new money</em> goes each paycheck.
              Your existing holdings can stay put unless there&apos;s a major alert change (Green to Red).
            </p>
          </div>
        </div>
      </section>

      {/* What Each Engine Means */}
      <section id="engines-explained" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${headingClass}`}>
          What Each &quot;Engine&quot; Means
        </h2>

        <div className={`rounded-lg border ${cardClass} p-6 space-y-4`}>
          <p className={`text-sm ${textClass} mb-4`}>
            The dashboard groups investments into 12 &quot;engines&quot; (categories). You don&apos;t need to memorize all of them,
            but here&apos;s a quick reference:
          </p>

          <div className="space-y-2">
            {engines.map((engine) => (
              <div key={engine.id} className={`border rounded ${isPrintMode ? "border-gray-200" : "border-white/10"}`}>
                <button
                  onClick={() => setExpandedEngine(expandedEngine === engine.id ? null : engine.id)}
                  className={`w-full text-left p-3 flex items-center justify-between ${isPrintMode ? "hover:bg-gray-100" : "hover:bg-white/5"}`}
                >
                  <div>
                    <p className={`text-sm font-semibold ${headingClass}`}>{engine.name}</p>
                    <p className={`text-xs ${textClass}`}>{engine.simple}</p>
                  </div>
                  <span className={`text-xl ${textClass}`}>
                    {expandedEngine === engine.id ? "−" : "+"}
                  </span>
                </button>
                {expandedEngine === engine.id && (
                  <div className={`p-3 border-t ${isPrintMode ? "border-gray-200 bg-gray-50" : "border-white/10 bg-white/5"}`}>
                    <p className={`text-xs ${textClass}`}>
                      <strong className={highlightClass}>Examples:</strong> {engine.examples}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={`mt-4 p-3 rounded border ${isPrintMode ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-500/30"}`}>
            <p className={`text-xs ${isPrintMode ? "text-blue-900" : "text-blue-300"}`}>
              💡 <strong>For 401k users:</strong> Your plan might not have all these categories. That&apos;s fine!
              Most 401ks have a &quot;Total Stock Market&quot; fund (covers Cashflow + Growth),
              a &quot;Bond Fund&quot; (Stability), and maybe an &quot;International Fund.&quot; Start simple.
            </p>
          </div>
        </div>
      </section>

      {/* When to Rebalance */}
      <section id="rebalance-rules" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${headingClass}`}>
          When to Rebalance
        </h2>

        <div className={`rounded-lg border ${cardClass} p-6 space-y-4`}>
          <p className={`text-sm ${textClass} mb-3`}>
            &quot;Rebalancing&quot; just means adjusting your mix of stocks and bonds.
          </p>

          <div className="space-y-3">
            <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"}`}>
              <p className={`font-semibold text-sm mb-2 ${isPrintMode ? "text-green-900" : "text-green-400"}`}>
                ✅ DO rebalance when:
              </p>
              <ul className="space-y-1">
                <li className={`text-sm ${textClass}`}>
                  • The alert changes significantly (e.g., Green → Red or Red → Green)
                </li>
                <li className={`text-sm ${textClass}`}>
                  • You&apos;re adding new money (paycheck, bonus, 401k contribution)
                </li>
                <li className={`text-sm ${textClass}`}>
                  • Once per quarter as a routine check-in
                </li>
              </ul>
            </div>

            <div className={`p-4 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-900/20 border-red-500/30"}`}>
              <p className={`font-semibold text-sm mb-2 ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                ⚠️ DON&apos;T rebalance when:
              </p>
              <ul className="space-y-1">
                <li className={`text-sm ${textClass}`}>
                  • The market is down 2% one day (normal noise, ignore it)
                </li>
                <li className={`text-sm ${textClass}`}>
                  • You&apos;re panicking based on headlines
                </li>
                <li className={`text-sm ${textClass}`}>
                  • Nothing has changed on the dashboard (it&apos;s still Green and you&apos;re already following the plan)
                </li>
              </ul>
            </div>
          </div>

          <div className={`p-4 rounded border ${isPrintMode ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-500/30"}`}>
            <p className={`text-sm ${isPrintMode ? "text-blue-900" : "text-blue-300"}`}>
              💡 <strong>Rule of thumb:</strong> Check weekly, act monthly (or when adding new money).
              Don&apos;t overthink it.
            </p>
          </div>
        </div>
      </section>

      {/* Data Timing */}
      <section id="data-timing" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${headingClass}`}>
          About Data Updates
        </h2>
        <DataUpdateExplainer isPrintMode={isPrintMode} variant="full" />
      </section>

      {/* Simple Glossary */}
      <section id="glossary" className="scroll-mt-20">
        <h2 className={`text-2xl font-bold mb-4 ${headingClass}`}>
          Simple Glossary
        </h2>

        <div className="space-y-3">
          {[
            { term: "Risk-On", meaning: "Good time to own stocks (green light)" },
            { term: "Risk-Off", meaning: "Defensive time, reduce stock exposure (red light)" },
            { term: "Alert Level", meaning: "The traffic light: Green (good), Yellow (caution), Red (risky)" },
            { term: "Regime", meaning: "The current economic &quot;weather&quot; (Risk-On or Risk-Off)" },
            { term: "Engine", meaning: "A category of investments (like &quot;Big Tech&quot; or &quot;Bonds&quot;)" },
            { term: "Rebalance", meaning: "Adjust your mix of stocks/bonds to match the current plan" },
            { term: "401k", meaning: "Your retirement account from work (tax-advantaged)" },
            { term: "The Fed", meaning: "The Federal Reserve, controls interest rates in the US" },
            { term: "Inflation", meaning: "How fast prices are rising (milk, gas, rent, etc.)" },
            { term: "Yield Curve", meaning: "A fancy way to see if a recession might be coming" },
            { term: "Credit Stress", meaning: "How nervous investors are about lending money (high = bad)" },
            { term: "Breadth", meaning: "How many stocks are doing well (narrow = risky, broad = healthy)" }
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
