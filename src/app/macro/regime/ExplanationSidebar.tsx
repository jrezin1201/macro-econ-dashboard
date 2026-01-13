"use client";

/**
 * Explanation Sidebar - "How to Read This Page" for beginners
 *
 * Collapsible panel that explains key concepts
 */

import { useState } from "react";

export function ExplanationSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-2 py-6 rounded-l-lg shadow-lg hover:bg-blue-700 transition-colors z-50 text-sm font-medium"
      >
        <span className="block rotate-90 whitespace-nowrap">📖 How to Read This</span>
      </button>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-gray-900/95 backdrop-blur-sm border-l border-white/10 shadow-2xl z-50 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">How to Read This Page</h2>
            <p className="text-xs text-white/60">Your guide to understanding macro signals</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Regime Explanation */}
        <Section
          title="What is 'Regime'?"
          emoji="🌊"
          content="The regime tells you whether markets favor owning stocks (Risk-On), being defensive (Risk-Off), or dealing with inflation/deflation. Think of it as the 'weather' for investing."
          examples={[
            { label: "Risk-On", desc: "Good time for stocks" },
            { label: "Risk-Off", desc: "Time for safety" },
            { label: "Mixed", desc: "Be balanced" },
          ]}
        />

        {/* Alert Level Explanation */}
        <Section
          title="What do the Alert Colors Mean?"
          emoji="🚦"
          content="Alerts show how many warning signs are present in the market. Think of them like traffic lights for your portfolio."
          examples={[
            { label: "GREEN", desc: "All clear - safe to invest", color: "text-green-400" },
            { label: "YELLOW", desc: "Caution - be selective", color: "text-yellow-400" },
            { label: "RED", desc: "Warning - reduce risk", color: "text-red-400" },
          ]}
        />

        {/* BTC Trend Explanation */}
        <Section
          title="Why Does Bitcoin Matter?"
          emoji="₿"
          content="Bitcoin's trend affects whether you should add to MSTR and crypto positions. It's a momentum signal for the riskiest part of your portfolio."
          examples={[
            { label: "BTC GREEN", desc: "OK to add MSTR/crypto", color: "text-green-400" },
            { label: "BTC RED", desc: "Avoid adding crypto", color: "text-red-400" },
          ]}
        />

        {/* Microstress Explanation */}
        <Section
          title="What is 'Microstress'?"
          emoji="🏦"
          content="Microstress measures stress in the banking and credit system. When banks are stressed, markets can freeze up quickly."
          examples={[
            { label: "GREEN", desc: "Banks healthy", color: "text-green-400" },
            { label: "RED", desc: "Credit stress - be defensive", color: "text-red-400" },
          ]}
        />

        {/* This Week Actions Explanation */}
        <Section
          title="How to Use 'This Week Actions'"
          emoji="📋"
          content="This is your action plan. It tells you exactly what to do with new money this week based on all the signals above."
          examples={[
            { label: "Deploy Layers", desc: "Where to put new money" },
            { label: "Avoid Layers", desc: "What not to buy right now" },
            { label: "Stability Minimum", desc: "How much cash to keep" },
          ]}
        />

        {/* Breadth Explanation */}
        <Section
          title="What is 'Breadth'?"
          emoji="📊"
          content="Breadth measures how many stocks are participating in the market move. Strong breadth = healthy rally. Weak breadth = warning sign."
          examples={[
            { label: "CONFIRMS", desc: "Rally is healthy", color: "text-green-400" },
            { label: "DIVERGES", desc: "Rally is narrow/weak", color: "text-red-400" },
          ]}
        />

        {/* Bottom tip */}
        <div className="bg-blue-900/20 rounded-lg border border-blue-500/30 p-4">
          <p className="text-xs text-blue-300 font-semibold mb-2">💡 Pro Tip</p>
          <p className="text-xs text-white/70">
            You don't need to predict the future. Just follow the signals, adjust when they change, and stay diversified.
            That's 90% of successful macro investing.
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  emoji,
  content,
  examples,
}: {
  title: string;
  emoji: string;
  content: string;
  examples: Array<{ label: string; desc: string; color?: string }>;
}) {
  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
        <span>{emoji}</span>
        <span>{title}</span>
      </h3>
      <p className="text-xs text-white/70 mb-3">{content}</p>
      <div className="space-y-1.5">
        {examples.map((ex, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className={`text-xs font-mono font-bold ${ex.color || "text-white/90"}`}>
              {ex.label}:
            </span>
            <span className="text-xs text-white/60">{ex.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
