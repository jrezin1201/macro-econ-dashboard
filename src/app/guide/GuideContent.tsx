"use client";

/**
 * Guide Content Component
 *
 * Main content for the comprehensive dashboard guide
 */

import { useState } from "react";
import { TableOfContents } from "@/components/guide/TableOfContents";
import { IndicatorExplainer } from "@/components/guide/IndicatorExplainer";

export function GuideContent() {
  // Initialize print mode from URL params (lazy initializer)
  const [isPrintMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("print") === "1";
  });

  // Initialize beginner mode from localStorage (lazy initializer)
  const [isBeginnerMode, setIsBeginnerMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem("guideMode");
    return stored !== "expert";
  });

  const toggleMode = (beginner: boolean) => {
    setIsBeginnerMode(beginner);
    localStorage.setItem("guideMode", beginner ? "beginner" : "expert");
  };

  const handleShareLink = () => {
    const url = window.location.origin + "/guide";
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handlePrint = () => {
    window.open("/guide?print=1", "_blank");
  };

  const sections = [
    { id: "start", title: "Start Here" },
    { id: "why", title: "Why This Exists", subsections: [
      { id: "goal", title: "Goal" },
      { id: "what-it-is", title: "What It Is / Isn't" },
      { id: "how-to-use", title: "How to Use (10 min/week)" }
    ]},
    { id: "building-blocks", title: "The Building Blocks", subsections: [
      { id: "rates", title: "Rates & Curve" },
      { id: "growth", title: "Growth" },
      { id: "inflation", title: "Inflation" },
      { id: "credit", title: "Credit & Stress" },
      { id: "liquidity", title: "Liquidity" },
      { id: "usd", title: "USD" },
      { id: "market", title: "Market Indicators" },
      { id: "confirmations", title: "Confirmation Layers" }
    ]},
    { id: "regime-engine", title: "How the Regime Engine Works", subsections: [
      { id: "compression", title: "Signal Compression" },
      { id: "examples", title: "Example Interpretations" },
      { id: "triggers", title: "What Changes the Regime" }
    ]},
    { id: "portfolio-engines", title: "Portfolio & Economic Engines", subsections: [
      { id: "portfolio-setup", title: "Setting Up Your Portfolio" },
      { id: "engine-classification", title: "12 Economic Engines" },
      { id: "macro-scoring", title: "Macro-Driven Scoring" },
      { id: "rebalancing", title: "When to Rebalance" }
    ]},
    { id: "playbook", title: "Weekly Playbook", subsections: [
      { id: "checklist", title: "10-Minute Checklist" },
      { id: "by-account", title: "By Account Type" },
      { id: "time-horizons", title: "Time Horizon Lens" }
    ]},
    { id: "glossary", title: "Glossary" }
  ];

  const printClass = isPrintMode ? "bg-white text-black" : "";
  const containerClass = isPrintMode ? "max-w-full p-8" : "max-w-7xl mx-auto px-3 md:px-6 lg:px-8";

  return (
    <div className={`py-6 space-y-8 ${printClass}`}>
      <div className={containerClass}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isPrintMode ? "text-black" : "text-white"}`}>
            Guide: How to Use the Finance Dashboard
          </h1>
          <p className={`text-sm md:text-base ${isPrintMode ? "text-gray-700" : "text-white/60"}`}>
            This dashboard turns macro + market data into a simple risk framework.
          </p>

          {/* Mode Toggle + Actions */}
          {!isPrintMode && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              {/* Beginner/Expert Toggle */}
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => toggleMode(true)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    isBeginnerMode
                      ? "bg-blue-600 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Beginner
                </button>
                <button
                  onClick={() => toggleMode(false)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    !isBeginnerMode
                      ? "bg-blue-600 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Expert
                </button>
              </div>

              {/* Share Link */}
              <button
                onClick={handleShareLink}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                📋 Copy Share Link
              </button>

              {/* Print Mode */}
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors border border-white/20"
              >
                🖨️ Print-Friendly View
              </button>
            </div>
          )}
        </div>

        {/* Layout: TOC + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: TOC */}
          {!isPrintMode && (
            <div className="lg:col-span-1">
              <TableOfContents sections={sections} />
            </div>
          )}

          {/* Right: Content */}
          <div className={isPrintMode ? "col-span-full" : "lg:col-span-3"}>
            {/* Start Here Card */}
            <section id="start" className="mb-12 scroll-mt-20">
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/30 p-6">
                <h2 className={`text-2xl font-bold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                  ✨ Start Here
                </h2>
                <p className={`text-sm mb-4 ${isPrintMode ? "text-gray-700" : "text-white/80"}`}>
                  New to this? Follow these three steps every week:
                </p>
                <ol className="space-y-3">
                  {[
                    "First check the Regime + Alert Level",
                    "Then check confirmation layers (Breadth, BTC, Microstress)",
                    "Use This Week Actions to deploy new money"
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className={`text-sm ${isPrintMode ? "text-gray-800" : "text-white/90"}`}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* SECTION 1: Why This Exists */}
            <section id="why" className="mb-12 scroll-mt-20">
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isPrintMode ? "text-black" : "text-white"}`}>
                Why This Exists
              </h2>

              <div className="space-y-6">
                {/* Goal */}
                <div id="goal" className="scroll-mt-20">
                  <h3 className={`text-xl font-semibold mb-3 ${isPrintMode ? "text-black" : "text-white"}`}>
                    Goal
                  </h3>
                  <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4`}>
                    <p className={`text-sm mb-3 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                      Most investors either follow headlines (too late) or use random indicators without a decision framework.
                      This dashboard solves three core questions:
                    </p>
                    <ul className="space-y-2">
                      {[
                        { q: "When is it safe to take risk?", a: "Check Regime + Alert Level" },
                        { q: "What should I add this week?", a: "Follow This Week Actions" },
                        { q: "What would change my mind?", a: "Monitor the trigger levels" }
                      ].map((item, i) => (
                        <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                          <span className="font-semibold text-blue-400">Q:</span> {item.q}<br/>
                          <span className="font-semibold text-green-400">A:</span> {item.a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* What It Is / Isn't */}
                <div id="what-it-is" className="scroll-mt-20">
                  <h3 className={`text-xl font-semibold mb-3 ${isPrintMode ? "text-black" : "text-white"}`}>
                    What It Is / Isn&apos;t
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* What it is */}
                    <div className={`bg-green-900/20 rounded-lg border ${isPrintMode ? "bg-green-50 border-green-300" : "border-green-500/30"} p-4`}>
                      <p className={`font-semibold mb-2 text-sm ${isPrintMode ? "text-green-900" : "text-green-400"}`}>
                        ✓ What it IS:
                      </p>
                      <ul className="space-y-1.5">
                        {[
                          "A probability framework",
                          "A risk management system",
                          "A weekly decision checklist",
                          "Data → regime → suggested tilts"
                        ].map((item, i) => (
                          <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What it isn't */}
                    <div className={`bg-red-900/20 rounded-lg border ${isPrintMode ? "bg-red-50 border-red-300" : "border-red-500/30"} p-4`}>
                      <p className={`font-semibold mb-2 text-sm ${isPrintMode ? "text-red-900" : "text-red-400"}`}>
                        ✗ What it ISN&apos;T:
                      </p>
                      <ul className="space-y-1.5">
                        {[
                          "NOT a crystal ball",
                          "NOT market timing",
                          "NOT individual stock picks",
                          "NOT a get-rich-quick scheme"
                        ].map((item, i) => (
                          <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* How to Use */}
                <div id="how-to-use" className="scroll-mt-20">
                  <h3 className={`text-xl font-semibold mb-3 ${isPrintMode ? "text-black" : "text-white"}`}>
                    How to Use (10 minutes per week)
                  </h3>
                  <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4`}>
                    <div className={`text-sm ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                      <p className="mb-3 font-semibold">Simple Flow Diagram:</p>
                      <div className={`bg-white/10 rounded p-4 font-mono text-xs ${isPrintMode ? "bg-gray-100 text-gray-900" : "text-white/90"}`}>
                        <div>Macro Data → Composites</div>
                        <div className="ml-4">↓</div>
                        <div>Composites → Regime Classification</div>
                        <div className="ml-4">↓</div>
                        <div>Microstress Gates Risk</div>
                        <div className="ml-4">↓</div>
                        <div>Breadth/BTC Confirm Sectors</div>
                        <div className="ml-4">↓</div>
                        <div>Output: Suggested Tilts + This Week Actions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: Building Blocks */}
            <section id="building-blocks" className="mb-12 scroll-mt-20">
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isPrintMode ? "text-black" : "text-white"}`}>
                The Building Blocks
              </h2>
              <p className={`text-sm mb-6 ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                Understanding what each category means individually:
              </p>

              <div className="space-y-8">
                {/* Rates & Curve */}
                <div id="rates" className="scroll-mt-20">
                  <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                    Rates & Curve
                  </h3>
                  <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4 mb-4`}>
                    <p className={`text-sm mb-3 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                      <strong>What this tells you:</strong> Interest rates affect borrowing costs and the value of future profits.
                      The yield curve (10Y-2Y) shows market expectations for growth vs. recession.
                    </p>
                    <p className={`text-sm mb-3 font-semibold ${isPrintMode ? "text-gray-900" : "text-blue-400"}`}>Why it matters:</p>
                    <ul className="space-y-1 mb-3">
                      {[
                        "Lower rates = cheaper money = boost for growth stocks",
                        "Inverted curve (2Y > 10Y) historically precedes recessions",
                        "Fed Funds Rate sets the baseline for all borrowing costs"
                      ].map((item, i) => (
                        <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>• {item}</li>
                      ))}
                    </ul>
                    <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                      <strong className={isPrintMode ? "text-red-900" : "text-red-400"}>Common mistake:</strong> Assuming
                      high rates = bad for all stocks. Tech/growth hurt most; banks/insurance can benefit.
                    </p>
                  </div>

                  {!isBeginnerMode && (
                    <IndicatorExplainer
                      seriesId="FEDFUNDS"
                      whatItMeasures="The overnight rate banks charge each other for reserves"
                      whyItMatters={[
                        "Sets the baseline for all short-term borrowing costs",
                        "Controlled directly by the Federal Reserve",
                        "Changes ripple through mortgages, credit cards, business loans"
                      ]}
                      howToInterpret="Rising Fed Funds = tightening = headwind for growth. Falling = easing = tailwind."
                      commonMistakes="Don't confuse with long-term rates (10Y). Fed controls short end, market controls long end."
                    />
                  )}
                </div>

                {/* Growth */}
                <div id="growth" className="scroll-mt-20">
                  <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                    Growth
                  </h3>
                  <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4 mb-4`}>
                    <p className={`text-sm mb-3 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                      <strong>What this tells you:</strong> Is the economy expanding or contracting? Employment,
                      production, and sentiment show the health of the real economy.
                    </p>
                    <p className={`text-sm mb-3 font-semibold ${isPrintMode ? "text-gray-900" : "text-blue-400"}`}>Why it matters:</p>
                    <ul className="space-y-1">
                      {[
                        "Strong growth = corporate earnings grow = stocks up",
                        "Weak growth = risk of recession = defensive positioning",
                        "Payrolls are the most watched monthly datapoint"
                      ].map((item, i) => (
                        <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Inflation */}
                <div id="inflation" className="scroll-mt-20">
                  <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                    Inflation
                  </h3>
                  <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4`}>
                    <p className={`text-sm mb-3 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                      <strong>What this tells you:</strong> How fast are prices rising? CPI and PCE track cost of living.
                    </p>
                    <p className={`text-sm mb-3 font-semibold ${isPrintMode ? "text-gray-900" : "text-blue-400"}`}>Why it matters:</p>
                    <ul className="space-y-1">
                      {[
                        "High inflation = Fed raises rates = headwind for stocks",
                        "Low/stable inflation = goldilocks for risk assets",
                        "PCE is the Fed's preferred measure (watches Core PCE closely)"
                      ].map((item, i) => (
                        <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Credit & Stress */}
                <div id="credit" className="scroll-mt-20">
                  <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                    Credit & Stress
                  </h3>
                  <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4 mb-4`}>
                    <p className={`text-sm mb-3 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                      <strong>What this tells you:</strong> Credit stress is like the market&apos;s blood pressure.
                      When credit spreads widen, it means investors are demanding more yield for risk.
                    </p>
                    <p className={`text-sm mb-3 font-semibold ${isPrintMode ? "text-gray-900" : "text-blue-400"}`}>Why it matters:</p>
                    <ul className="space-y-1 mb-3">
                      {[
                        "High Yield OAS > 6.5% = significant stress",
                        "Credit breaks BEFORE equities in a crisis",
                        "Financial Stress Index captures broad funding conditions"
                      ].map((item, i) => (
                        <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>• {item}</li>
                      ))}
                    </ul>
                    <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                      <strong className={isPrintMode ? "text-red-900" : "text-red-400"}>Common mistake:</strong> Ignoring
                      credit when stocks are rallying. Credit leads, stocks follow.
                    </p>
                  </div>
                </div>

                {/* Liquidity */}
                <div id="liquidity" className="scroll-mt-20">
                  <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                    Liquidity
                  </h3>
                  <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4`}>
                    <p className={`text-sm mb-3 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                      <strong>What this tells you:</strong> Liquidity is the fuel for asset prices. Fed balance sheet,
                      bank reserves, and RRP show how much money is in the system.
                    </p>
                    <p className={`text-sm mb-3 font-semibold ${isPrintMode ? "text-gray-900" : "text-blue-400"}`}>Why it matters:</p>
                    <ul className="space-y-1">
                      {[
                        "More liquidity = easier conditions = stocks/crypto rise",
                        "QT (Quantitative Tightening) = draining liquidity = headwind",
                        "RRP falling can mean money moving into risk assets"
                      ].map((item, i) => (
                        <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Confirmation Layers */}
                <div id="confirmations" className="scroll-mt-20">
                  <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                    Confirmation Layers
                  </h3>

                  <div className="space-y-4">
                    {/* Breadth */}
                    <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4`}>
                      <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-black" : "text-white"}`}>Equity Breadth</h4>
                      <p className={`text-sm mb-2 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                        <strong>What it measures:</strong> How many stocks are participating in a rally vs. just a few big names.
                      </p>
                      <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                        <strong className={isPrintMode ? "text-gray-900" : "text-blue-400"}>Why it matters:</strong> Narrow breadth
                        (only big tech rallying) = fragile rally. Broad breadth = healthy, sustainable.
                      </p>
                    </div>

                    {/* BTC Trend */}
                    <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4`}>
                      <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-black" : "text-white"}`}>Bitcoin Trend</h4>
                      <p className={`text-sm mb-2 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                        <strong>What it measures:</strong> BTC acts like a high-beta liquidity sensor. We use 200-day moving average.
                      </p>
                      <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                        <strong className={isPrintMode ? "text-gray-900" : "text-blue-400"}>Why it matters:</strong> BTC above 200D MA
                        = trend supportive for crypto/MSTR adds. Below = avoid new crypto exposure.
                      </p>
                    </div>

                    {/* Microstress */}
                    <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4`}>
                      <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-black" : "text-white"}`}>Credit Microstress</h4>
                      <p className={`text-sm mb-2 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                        <strong>What it measures:</strong> Short-term funding stress (SOFR, CP rates, TED spread).
                      </p>
                      <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                        <strong className={isPrintMode ? "text-gray-900" : "text-blue-400"}>Why it matters:</strong> Microstress
                        gates risk-taking. Even if macro looks good, microstress Yellow/Red = caution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: Regime Engine */}
            <section id="regime-engine" className="mb-12 scroll-mt-20">
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isPrintMode ? "text-black" : "text-white"}`}>
                How the Regime Engine Works
              </h2>

              {/* Signal Compression */}
              <div id="compression" className="mb-8 scroll-mt-20">
                <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                  Signal Compression
                </h3>
                <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4 mb-4`}>
                  <p className={`text-sm mb-4 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                    The dashboard compresses many signals into a simple framework:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`bg-white/5 rounded p-3 border ${isPrintMode ? "bg-white border-gray-300" : "border-white/10"}`}>
                      <p className={`font-semibold text-sm mb-2 ${isPrintMode ? "text-gray-900" : "text-blue-400"}`}>Inputs:</p>
                      <ul className="space-y-1">
                        {["Macro composites (Growth, Inflation, Credit, Liquidity, USD)", "Rates & curve", "Market indicators"].map((item, i) => (
                          <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={`bg-white/5 rounded p-3 border ${isPrintMode ? "bg-white border-gray-300" : "border-white/10"}`}>
                      <p className={`font-semibold text-sm mb-2 ${isPrintMode ? "text-gray-900" : "text-green-400"}`}>Outputs:</p>
                      <ul className="space-y-1">
                        {["Regime (Risk-On / Risk-Off)", "Alert Level (Green / Yellow / Red)", "Suggested tilts", "This Week Actions"].map((item, i) => (
                          <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={`mt-4 p-3 rounded ${isPrintMode ? "bg-blue-50 border-blue-300" : "bg-blue-900/20"} border border-blue-500/30`}>
                    <p className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-gray-900" : "text-white"}`}>Key point:</p>
                    <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/80"}`}>
                      The point is NOT prediction. It&apos;s probability + positioning. We don&apos;t need to know what will happen -
                      we just need to know what the current conditions suggest.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example Interpretations */}
              <div id="examples" className="mb-8 scroll-mt-20">
                <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                  Example Interpretations
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      scenario: "Risk-On + BTC Red",
                      interpretation: "Add growth/cashflow-generating assets, but AVOID new MSTR/crypto. BTC trend is broken.",
                      action: "Buy QQQ/tech, skip crypto adds"
                    },
                    {
                      scenario: "Risk-Off + Microstress Yellow",
                      interpretation: "Defensive positioning. Credit stress is building even if stocks haven&apos;t broken yet.",
                      action: "Reduce beta, add stability (utilities, consumer staples)"
                    },
                    {
                      scenario: "Risk-On + Breadth Green + BTC Green",
                      interpretation: "All systems go. Rally is broad, healthy, and crypto-friendly.",
                      action: "Aggressive risk deployment across equities + crypto"
                    }
                  ].map((example, i) => (
                    <div key={i} className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4`}>
                      <p className={`font-semibold mb-2 text-sm ${isPrintMode ? "text-black" : "text-white"}`}>
                        Example {i + 1}: {example.scenario}
                      </p>
                      <p className={`text-sm mb-2 ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                        <strong className={isPrintMode ? "text-gray-900" : "text-blue-400"}>Interpretation:</strong> {example.interpretation}
                      </p>
                      <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                        <strong className={isPrintMode ? "text-gray-900" : "text-green-400"}>Action:</strong> {example.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Changes the Regime */}
              <div id="triggers" className="scroll-mt-20">
                <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                  What Changes the Regime?
                </h3>
                <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4`}>
                  <p className={`text-sm mb-4 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                    These are if-then rules. Watch these key triggers:
                  </p>
                  <ul className="space-y-2">
                    {[
                      { trigger: "HY OAS > 6.5%", meaning: "Significant credit stress, shift to Risk-Off" },
                      { trigger: "Microstress turns Yellow/Red", meaning: "Gate new risk-taking even if regime is Risk-On" },
                      { trigger: "Liquidity composite < -1.25", meaning: "Liquidity draining, headwind for risk" },
                      { trigger: "BTC crosses below 200D MA", meaning: "Avoid new crypto/MSTR exposure" },
                      { trigger: "Breadth DIVERGES", meaning: "Rally is narrow, reduce conviction" }
                    ].map((item, i) => (
                      <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                        <strong className={isPrintMode ? "text-red-900" : "text-red-400"}>{item.trigger}</strong> → {item.meaning}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 4: Portfolio & Economic Engines */}
            <section id="portfolio-engines" className="mb-12 scroll-mt-20">
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isPrintMode ? "text-black" : "text-white"}`}>
                Portfolio & Economic Engines
              </h2>

              {/* Setting Up Your Portfolio */}
              <div id="portfolio-setup" className="mb-8 scroll-mt-20">
                <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                  Setting Up Your Portfolio
                </h3>
                <div className={`rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "bg-white/5 border-white/10"} p-6 space-y-4`}>
                  <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                    The Portfolio page (<code>/portfolio</code>) is where you track your holdings and see how they map to the 12 economic engines.
                    The system automatically classifies each holding and shows real-time allocation charts.
                  </p>
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-black" : "text-white"}`}>
                      How to Add Holdings:
                    </h4>
                    <ol className="space-y-2">
                      {[
                        "Navigate to /portfolio",
                        "Click the green 'Add Holding' button",
                        "Start typing a ticker - autocomplete will suggest 35+ common stocks/ETFs",
                        "Select ticker, enter weight % and account type (Taxable, Roth, 401k, Other)",
                        "Optional: Add notes about the position",
                        "System auto-classifies using 75+ ticker database (AAPL → Cashflow Compounders)"
                      ].map((step, i) => (
                        <li key={i} className={`text-sm flex gap-2 ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                          <span className={`font-semibold ${isPrintMode ? "text-blue-900" : "text-blue-400"}`}>{i + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-black" : "text-white"}`}>
                      Features:
                    </h4>
                    <ul className="space-y-2">
                      {[
                        { feature: "Ticker Autocomplete", desc: "Start typing and see suggestions instantly (supports AAPL, MSFT, QQQ, SGOV, MSTR, etc.)" },
                        { feature: "Smart Classification", desc: "75+ ticker mappings + sector-based fallbacks ensure accurate engine classification" },
                        { feature: "Allocation Chart", desc: "See your portfolio broken down by engine with an interactive pie chart" },
                        { feature: "Demo Mode", desc: "Toggle between demo portfolio and your own - great for testing" },
                        { feature: "Full CRUD", desc: "Add, edit, delete holdings with validation (total must be 100% ±0.25%)" },
                        { feature: "Edit/Delete Icons", desc: "Quick actions on each row for easy portfolio management" }
                      ].map((item, i) => (
                        <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                          <strong className={isPrintMode ? "text-blue-900" : "text-blue-400"}>{item.feature}:</strong> {item.desc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-500/10 border-green-500/20"}`}>
                    <p className={`text-xs mb-2 ${isPrintMode ? "text-green-900" : "text-green-300"}`}>
                      ✨ <strong>New:</strong> Auto-Refresh Every 5 Minutes
                    </p>
                    <p className={`text-xs ${isPrintMode ? "text-green-900" : "text-green-200/80"}`}>
                      Portfolio, Engines, Bitcoin, and Macro Regime pages now auto-refresh data every 5 minutes.
                      See the refresh indicator in the top-right with last update time and manual refresh button.
                    </p>
                  </div>

                  <div className={`p-4 rounded border ${isPrintMode ? "bg-blue-50 border-blue-200" : "bg-blue-500/10 border-blue-500/20"}`}>
                    <p className={`text-xs ${isPrintMode ? "text-blue-900" : "text-blue-300"}`}>
                      💡 <strong>Storage:</strong> All portfolio data persists in your browser&apos;s localStorage.
                      It won&apos;t sync across devices, but it&apos;s perfect for personal tracking without needing an account.
                    </p>
                  </div>
                </div>
              </div>

              {/* 12 Economic Engines */}
              <div id="engine-classification" className="mb-8 scroll-mt-20">
                <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                  The 12 Economic Engines
                </h3>
                <div className={`rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "bg-white/5 border-white/10"} p-6 space-y-4`}>
                  <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                    Every holding in your portfolio is classified by its primary economic driver.
                    These 12 engines represent distinct return sources that respond differently to macro conditions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Quality Factor", examples: "AAPL, MSFT, UNH", driver: "Moats, pricing power, cash flow" },
                      { name: "Growth Duration", examples: "NVDA, TSLA, AMZN", driver: "Revenue growth, future earnings" },
                      { name: "Volatility/Optionality", examples: "BTC, COIN, MSTR", driver: "Speculation, asymmetric upside" },
                      { name: "Defensive", examples: "PG, KO, WMT", driver: "Stability, dividends, recession-proof" },
                      { name: "Cyclical Value", examples: "XOM, CAT, JPM", driver: "Economic reacceleration" },
                      { name: "AI/Tech Infrastructure", examples: "NVDA, SMCI, TSM", driver: "AI capex cycle" },
                      { name: "Real Assets", examples: "GLD, TIP, commodities", driver: "Inflation hedge" },
                      { name: "International", examples: "EEM, VEA, INDA", driver: "Global growth, currency" },
                      { name: "Fixed Income", examples: "AGG, TLT, HYG", driver: "Yield, duration sensitivity" },
                      { name: "Small Cap", examples: "IWM, VB", driver: "Domestic growth, M&A" },
                      { name: "Thematic", examples: "ARKK, sectoral bets", driver: "Narrative-driven" },
                      { name: "Cash/Stable", examples: "Money market, SGOV", driver: "Capital preservation" }
                    ].map((engine, i) => (
                      <div key={i} className={`p-3 rounded border ${isPrintMode ? "bg-white border-gray-200" : "bg-white/5 border-white/10"}`}>
                        <h4 className={`text-sm font-bold mb-1 ${isPrintMode ? "text-black" : "text-white"}`}>
                          {engine.name}
                        </h4>
                        <p className={`text-xs mb-2 ${isPrintMode ? "text-gray-600" : "text-white/50"}`}>
                          {engine.examples}
                        </p>
                        <p className={`text-xs ${isPrintMode ? "text-gray-700" : "text-white/60"}`}>
                          {engine.driver}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Macro-Driven Scoring */}
              <div id="macro-scoring" className="mb-8 scroll-mt-20">
                <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                  Macro-Driven Scoring
                </h3>
                <div className={`rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "bg-white/5 border-white/10"} p-6 space-y-4`}>
                  <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                    The Engines page (<code>/engines</code>) scores each engine based on current macro conditions.
                    Each engine gets an OVERWEIGHT, NEUTRAL, or UNDERWEIGHT stance with a 0-100 score, visualized with an interactive bar chart.
                  </p>
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-black" : "text-white"}`}>
                      Scoring Inputs:
                    </h4>
                    <ul className="space-y-2">
                      {[
                        { factor: "Liquidity", impact: "More liquidity → favor Growth/Tech/Crypto" },
                        { factor: "Inflation Regime", impact: "High inflation → favor Real Assets/Value" },
                        { factor: "Growth/Recession Risk", impact: "Slowdown → favor Defensive/Quality" },
                        { factor: "Fed Policy", impact: "Hawkish → penalize Duration, favor Cash" },
                        { factor: "Breadth & Sentiment", impact: "Narrow rallies → reduce conviction" },
                        { factor: "Bitcoin Trend", impact: "BTC > 200D MA → favor Volatility engine" }
                      ].map((item, i) => (
                        <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                          <strong className={isPrintMode ? "text-blue-900" : "text-blue-400"}>{item.factor}:</strong> {item.impact}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-black" : "text-white"}`}>
                      Charts & Visualizations:
                    </h4>
                    <ul className="space-y-2">
                      {[
                        { page: "Engines (/engines)", chart: "Horizontal bar chart showing engine scores with color-coded stances" },
                        { page: "Portfolio (/portfolio)", chart: "Pie chart of your allocation across the 12 engines" },
                        { page: "Bitcoin (/bitcoin)", chart: "365-day price chart with 20D, 50D, and 200D moving averages" },
                        { page: "Macro Regime (/macro/regime)", chart: "Time-series charts for 8 key FRED indicators (Fed Funds, 10Y, CPI, PCE, etc.)" },
                        { page: "Regime History", chart: "Timeline showing regime changes over time with confidence levels" }
                      ].map((item, i) => (
                        <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                          <strong className={isPrintMode ? "text-purple-900" : "text-purple-400"}>{item.page}:</strong> {item.chart}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-500/10 border-green-500/20"}`}>
                    <p className={`text-xs mb-2 ${isPrintMode ? "text-green-900" : "text-green-300"}`}>
                      💡 <strong>Interactive Charts:</strong> All charts are built with Recharts and include tooltips on hover.
                    </p>
                    <p className={`text-xs ${isPrintMode ? "text-green-900" : "text-green-200/80"}`}>
                      Each engine card is expandable - click to see tailwinds/headwinds, confidence level, and specific reasons for the stance.
                    </p>
                  </div>

                  <div className={`p-4 rounded border ${isPrintMode ? "bg-purple-50 border-purple-200" : "bg-purple-500/10 border-purple-500/20"}`}>
                    <p className={`text-xs mb-2 ${isPrintMode ? "text-purple-900" : "text-purple-300"}`}>
                      📈 <strong>Regime History Tracking:</strong> The Macro Regime page now tracks regime changes automatically.
                    </p>
                    <p className={`text-xs ${isPrintMode ? "text-purple-900" : "text-purple-200/80"}`}>
                      See when regimes shifted, days since last change, and most common regime over the last 90 days (stored in localStorage).
                    </p>
                  </div>
                </div>
              </div>

              {/* When to Rebalance */}
              <div id="rebalancing" className="mb-8 scroll-mt-20">
                <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                  When to Rebalance
                </h3>
                <div className={`rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "bg-white/5 border-white/10"} p-6 space-y-4`}>
                  <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                    The system compares your current portfolio weight to target ranges for each engine.
                    Use the three action buckets on /engines to guide decisions:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded border ${isPrintMode ? "bg-green-50 border-green-200" : "bg-green-500/10 border-green-500/20"}`}>
                      <h4 className={`text-sm font-bold mb-2 ${isPrintMode ? "text-green-900" : "text-green-300"}`}>
                        ✓ Add (Favored + Under)
                      </h4>
                      <p className={`text-xs ${isPrintMode ? "text-green-900" : "text-green-200/80"}`}>
                        Engines that are OVERWEIGHT stance AND your portfolio is underweight.
                        Deploy new capital here.
                      </p>
                    </div>
                    <div className={`p-4 rounded border ${isPrintMode ? "bg-blue-50 border-blue-200" : "bg-blue-500/10 border-blue-500/20"}`}>
                      <h4 className={`text-sm font-bold mb-2 ${isPrintMode ? "text-blue-900" : "text-blue-300"}`}>
                        — Hold (In Range)
                      </h4>
                      <p className={`text-xs ${isPrintMode ? "text-blue-900" : "text-blue-200/80"}`}>
                        Your weight is within target range. No action needed.
                      </p>
                    </div>
                    <div className={`p-4 rounded border ${isPrintMode ? "bg-red-50 border-red-200" : "bg-red-500/10 border-red-500/20"}`}>
                      <h4 className={`text-sm font-bold mb-2 ${isPrintMode ? "text-red-900" : "text-red-300"}`}>
                        ✗ Avoid (Gated or Over)
                      </h4>
                      <p className={`text-xs ${isPrintMode ? "text-red-900" : "text-red-200/80"}`}>
                        Engines that are GATED (risk-off signal) OR you&apos;re overweight an UNDERWEIGHT stance.
                        Consider trimming.
                      </p>
                    </div>
                  </div>
                  <div className={`p-4 rounded border ${isPrintMode ? "bg-yellow-50 border-yellow-200" : "bg-yellow-500/10 border-yellow-500/20"}`}>
                    <p className={`text-xs ${isPrintMode ? "text-yellow-900" : "text-yellow-200/70"}`}>
                      ⚠️ <strong>Rebalancing Frequency:</strong> Only rebalance when a trigger hits or when adding new capital.
                      Don&apos;t force trades just because deltas exist—transaction costs and taxes matter.
                    </p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-black" : "text-white"}`}>
                      Rebalancing Examples:
                    </h4>
                    <ul className="space-y-2">
                      {[
                        { scenario: "New paycheck arrives", action: "Deploy to 'Add' bucket engines" },
                        { scenario: "BTC crosses 200D MA upward", action: "Consider adding MSTR/COIN if under target" },
                        { scenario: "Alert goes RED + breadth diverges", action: "Trim 'Avoid' bucket, move to Cash/Defensive" },
                        { scenario: "Regime shifts to 'Soft Landing'", action: "Reweight toward Quality/Cyclicals per new scores" }
                      ].map((item, i) => (
                        <li key={i} className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                          <strong className={isPrintMode ? "text-purple-900" : "text-purple-400"}>{item.scenario}:</strong> {item.action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: Weekly Playbook */}
            <section id="playbook" className="mb-12 scroll-mt-20">
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isPrintMode ? "text-black" : "text-white"}`}>
                Weekly Playbook (10 minutes)
              </h2>

              {/* 10-Minute Checklist */}
              <div id="checklist" className="mb-8 scroll-mt-20">
                <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                  10-Minute Checklist
                </h3>
                <div className={`bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-green-500/30"} p-4`}>
                  <ol className="space-y-3">
                    {[
                      "Check Alert Level (green/yellow/red)",
                      "Check Confirmation Layers (Breadth, BTC, Microstress)",
                      "Read This Week Actions panel",
                      "Deploy new contributions accordingly",
                      "Only rebalance if triggers hit",
                      "(Optional) Log the decision"
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-7 h-7 rounded-full ${isPrintMode ? "bg-blue-600 text-white" : "bg-green-600 text-white"} text-sm font-bold flex items-center justify-center`}>
                          {i + 1}
                        </span>
                        <span className={`text-sm pt-1 ${isPrintMode ? "text-gray-800" : "text-white/90"}`}>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* By Account Type */}
              <div id="by-account" className="mb-8 scroll-mt-20">
                <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                  Decision Examples by Account
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      type: "401(k) / Traditional Retirement",
                      approach: "Slow rebalance, broad index funds, less active trading",
                      example: "Risk-On → gradually shift from bonds to stock index. Risk-Off → gradually add bonds."
                    },
                    {
                      type: "Taxable Brokerage",
                      approach: "Incremental adds, tax-aware (prefer long-term holds)",
                      example: "Risk-On → add growth/tech with new money. Risk-Off → harvest losses, rotate to defensive."
                    },
                    {
                      type: "Roth IRA",
                      approach: "Higher volatility OK, optionality, but rules still apply",
                      example: "Risk-On + BTC Green → can add crypto/MSTR. Microstress Red → caution even in Roth."
                    }
                  ].map((account, i) => (
                    <div key={i} className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4`}>
                      <p className={`font-semibold mb-2 text-sm ${isPrintMode ? "text-black" : "text-white"}`}>{account.type}</p>
                      <p className={`text-sm mb-2 ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                        <strong className={isPrintMode ? "text-gray-900" : "text-blue-400"}>Approach:</strong> {account.approach}
                      </p>
                      <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                        <strong className={isPrintMode ? "text-gray-900" : "text-green-400"}>Example:</strong> {account.example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Horizon Lens */}
              <div id="time-horizons" className="scroll-mt-20">
                <h3 className={`text-xl font-semibold mb-4 ${isPrintMode ? "text-black" : "text-white"}`}>
                  Time Horizon Lens
                </h3>
                <div className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4`}>
                  <p className={`text-sm mb-4 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                    Different signals matter for different time frames:
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        horizon: "Next 6 Months (Tactical)",
                        signals: "Risk control signals dominate (credit stress, microstress, liquidity)",
                        example: "If credit stress is rising, reduce risk even if fundamentals look OK"
                      },
                      {
                        horizon: "Next 12 Months (Cyclical)",
                        signals: "Policy/cycle signals dominate (rates trajectory, inflation trend, Fed stance)",
                        example: "If Fed is cutting and inflation is falling, this favors growth stocks over 12M"
                      },
                      {
                        horizon: "24+ Months (Structural)",
                        signals: "Structural engines dominate (tech adoption, liquidity regime, real asset trends)",
                        example: "Long-term liquidity regime more important than short-term credit wiggles"
                      }
                    ].map((horizon, i) => (
                      <div key={i} className={`p-3 rounded ${isPrintMode ? "bg-white border-gray-300" : "bg-white/5"} border border-white/10`}>
                        <p className={`font-semibold text-sm mb-1 ${isPrintMode ? "text-black" : "text-white"}`}>{horizon.horizon}</p>
                        <p className={`text-xs mb-1 ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                          <strong className={isPrintMode ? "text-gray-900" : "text-blue-400"}>Signals:</strong> {horizon.signals}
                        </p>
                        <p className={`text-xs ${isPrintMode ? "text-gray-600" : "text-white/60"}`}>
                          <strong className={isPrintMode ? "text-gray-800" : "text-white/70"}>Example:</strong> {horizon.example}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className={`mt-4 p-3 rounded ${isPrintMode ? "bg-yellow-50 border-yellow-300" : "bg-yellow-900/20"} border border-yellow-500/30`}>
                    <p className={`text-xs font-semibold mb-1 ${isPrintMode ? "text-gray-900" : "text-yellow-300"}`}>How to stack horizons:</p>
                    <p className={`text-xs ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                      Use 6M signals for deployment pace (aggressive vs. cautious). Use 12M+ signals for sector allocation
                      (growth vs. value, cyclical vs. defensive). Don&apos;t let short-term noise override long-term conviction.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: Glossary */}
            <section id="glossary" className="mb-12 scroll-mt-20">
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isPrintMode ? "text-black" : "text-white"}`}>
                Glossary
              </h2>
              <div className="space-y-4">
                {[
                  {
                    term: "HY OAS (High Yield Option-Adjusted Spread)",
                    definition: "The extra yield junk bonds pay over Treasuries",
                    why: "Rising spreads = investors demanding more compensation for risk = credit stress building"
                  },
                  {
                    term: "z-score",
                    definition: "How many standard deviations away from average a value is",
                    why: "z > 2 = extreme. Helps spot when something is unusually high/low."
                  },
                  {
                    term: "Yield Curve (10Y-2Y)",
                    definition: "Difference between 10-year and 2-year Treasury yields",
                    why: "Negative (inverted) = historically precedes recessions. Normal curve = healthy growth expectations."
                  },
                  {
                    term: "Liquidity",
                    definition: "Amount of money in the financial system (Fed balance sheet, bank reserves, RRP)",
                    why: "More liquidity = fuel for asset prices. QE adds liquidity, QT removes it."
                  },
                  {
                    term: "Breadth",
                    definition: "How many stocks are participating in a move (advancing vs. declining, % above 200D MA)",
                    why: "Narrow breadth = fragile rally driven by few names. Broad breadth = healthy, sustainable."
                  },
                  {
                    term: "Microstress",
                    definition: "Short-term funding stress (SOFR spreads, CP rates, TED spread, NFCI)",
                    why: "Gates risk-taking. Even if macro looks OK, microstress can signal hidden stress."
                  },
                  {
                    term: "200D MA (200-Day Moving Average)",
                    definition: "Average price over the last 200 trading days",
                    why: "Classic trend indicator. Above = uptrend, below = downtrend. Used for BTC trend filter."
                  },
                  {
                    term: "Regime",
                    definition: "Risk-On or Risk-Off classification based on macro conditions",
                    why: "Simplifies complex data into actionable framework. Risk-On = favor growth, Risk-Off = favor defense."
                  },
                  {
                    term: "Composite",
                    definition: "Weighted average of multiple indicators (e.g., Growth composite = payrolls + sentiment + production)",
                    why: "Reduces noise by combining signals. More robust than single indicator."
                  },
                  {
                    term: "Confirmation Layer",
                    definition: "Secondary signal (breadth, BTC, microstress) that confirms or contradicts the main regime",
                    why: "Prevents false signals. Multiple confirmations = higher confidence."
                  }
                ].map((entry, i) => (
                  <div key={i} className={`bg-white/5 rounded-lg border ${isPrintMode ? "bg-gray-50 border-gray-300" : "border-white/10"} p-4`}>
                    <h4 className={`text-sm font-semibold mb-2 ${isPrintMode ? "text-black" : "text-white"}`}>{entry.term}</h4>
                    <p className={`text-sm mb-2 ${isPrintMode ? "text-gray-800" : "text-white/80"}`}>
                      <strong className={isPrintMode ? "text-gray-900" : "text-blue-400"}>Definition:</strong> {entry.definition}
                    </p>
                    <p className={`text-sm ${isPrintMode ? "text-gray-700" : "text-white/70"}`}>
                      <strong className={isPrintMode ? "text-gray-900" : "text-green-400"}>Why it matters:</strong> {entry.why}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            {!isPrintMode && (
              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-white/60 mb-4">
                  Questions? Share this guide with friends and discuss together.
                </p>
                <button
                  onClick={handleShareLink}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  📋 Copy Share Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
