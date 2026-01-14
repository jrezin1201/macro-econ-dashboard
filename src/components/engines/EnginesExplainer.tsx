"use client";

/**
 * Engines Explainer Component
 *
 * Educational content explaining what economic engines are and why we use them
 * Supports both inline (compact) and full (detailed) variants
 */

import { useState } from "react";
import { engines } from "@/lib/engines/engineConfig";
import { AccordionSimple } from "@/components/ui/AccordionSimple";

interface Props {
  variant: "inline" | "full";
  mode?: "beginner" | "expert";
}

export function EnginesExplainer({ variant, mode = "beginner" }: Props) {
  const [isExpanded, setIsExpanded] = useState(mode === "beginner");

  // Inline variant: compact explainer for the Engines page
  if (variant === "inline") {
    if (mode === "expert") {
      // Expert mode: collapsed by default with "Learn more"
      return (
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What are Economic Engines?</h3>
              <p className="text-white/70 text-sm">
                Broad, repeatable return mechanisms that describe HOW investments make money across macro environments—not what industry they&apos;re in.
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-400 hover:text-blue-300 text-sm underline whitespace-nowrap ml-4"
            >
              {isExpanded ? "Show less" : "Learn more"}
            </button>
          </div>

          {isExpanded && (
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <p>
                We use ~12 engines instead of 50+ sectors because most themes are implementations of the same few return mechanisms.
                This framework helps you diversify by HOW you make money, not just what you own.
              </p>
            </div>
          )}
        </div>
      );
    } else {
      // Beginner mode: expanded by default with more detail
      return (
        <div className="bg-blue-900/20 rounded-lg border border-blue-500/30 p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">About Economic Engines</h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-400 hover:text-blue-300 text-sm underline whitespace-nowrap ml-4"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          </div>

          <div className="space-y-4 text-white/80 text-sm">
            <p className="leading-relaxed">
              <strong>Economic engines are broad, repeatable return mechanisms.</strong> They describe HOW investments
              tend to make money across macro environments (rates, inflation, liquidity, credit), not what industry
              a company is in.
            </p>

            {isExpanded && (
              <>
                <p className="leading-relaxed">
                  Think of engines as the underlying forces that drive returns. A tech company could belong to
                  &quot;Growth &amp; Duration&quot; (if it&apos;s a long-duration growth story), &quot;Infrastructure &amp; Capex&quot; (if it builds
                  data centers), or even &quot;Credit &amp; Carry&quot; (if you&apos;re investing in its bonds).
                </p>

                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                  <p className="text-yellow-200/90 text-xs">
                    💡 <strong>Key insight:</strong> You&apos;re not diversifying by how many stocks you own, but by how many
                    independent ways you have to make money when the macro environment changes.
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-white mb-2">Why only ~12 engines?</h4>
                  <ul className="space-y-1 list-disc list-inside text-xs text-white/70">
                    <li>Hundreds of sectors exist, but most are implementations of the same few return mechanisms</li>
                    <li>A good engine must be distinct, allocatable, and macro-sensitive</li>
                    <li>~12 is the practical sweet spot: enough to diversify, small enough to act on</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* What are Economic Engines? */}
      <div className="bg-blue-900/20 rounded-lg border border-blue-500/30 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">What are Economic Engines?</h2>
        <div className="space-y-4 text-white/80">
          <p className="text-base leading-relaxed">
            <strong>Economic engines are broad, repeatable return mechanisms.</strong> They describe HOW investments
            tend to make money across macro environments (rates, inflation, liquidity, credit), not what industry
            a company is in.
          </p>
          <p className="text-sm leading-relaxed">
            Think of engines as the underlying forces that drive returns. A tech company could belong to
            &quot;Growth &amp; Duration&quot; (if it&apos;s a long-duration growth story), &quot;Infrastructure &amp; Capex&quot; (if it builds
            data centers), or even &quot;Credit &amp; Carry&quot; (if you&apos;re investing in its bonds). The engine framework helps
            you understand the macro sensitivities of your portfolio.
          </p>
        </div>
      </div>

      {/* Why only ~12 engines? */}
      <div className="bg-white/5 rounded-lg border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Why only ~12 engines?</h2>
        <div className="space-y-3 text-white/80 text-sm">
          <ul className="space-y-2 list-disc list-inside">
            <li>
              <strong>Hundreds of sectors and themes exist</strong>, but most are implementations of the same few return mechanisms
            </li>
            <li>
              <strong>A good engine must be distinct, allocatable, and macro-sensitive</strong> — it should respond differently
              to changes in rates, inflation, liquidity, and credit
            </li>
            <li>
              <strong>~12 is the practical sweet spot</strong>: enough to diversify return sources, small enough to act on
            </li>
          </ul>
          <p className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-200/90 text-xs">
            💡 <strong>Key insight:</strong> You&apos;re not diversifying by how many stocks you own, but by how many
            independent ways you have to make money when the macro environment changes.
          </p>
        </div>
      </div>

      {/* Engines vs Sectors */}
      <div className="bg-purple-900/20 rounded-lg border border-purple-500/30 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Engines vs Sectors</h2>
        <div className="space-y-4 text-white/80 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded">
              <h3 className="font-semibold text-white mb-2">Sectors</h3>
              <p className="text-xs">
                What a company <em>does</em>: Technology, Healthcare, Energy, Financials
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded">
              <h3 className="font-semibold text-white mb-2">Engines</h3>
              <p className="text-xs">
                Why it might <em>outperform</em>: Duration sensitivity, carry, inflation hedge, capex cycle
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded">
            <h3 className="font-semibold text-blue-200 mb-2 text-sm">Example: AI Stocks</h3>
            <p className="text-xs text-blue-200/80">
              AI stocks can belong to <strong>Growth & Duration</strong> (long-duration tech),
              <strong> Infrastructure & Capex</strong> (data centers/power), or even
              <strong> Credit & Carry</strong> (financing the buildout)—depending on where you invest in the stack.
            </p>
          </div>
        </div>
      </div>

      {/* How to use this in the app */}
      <div className="bg-green-900/20 rounded-lg border border-green-500/30 p-6">
        <h2 className="text-xl font-bold text-white mb-4">How to use this in the app</h2>
        <div className="space-y-3">
          <ol className="space-y-2 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span><strong>Set your Portfolio</strong> — Add your holdings and see how they map to the 12 engines</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span><strong>Check Macro Regime</strong> — Understand the current environment (risk-on/off, inflation, rates)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span><strong>Use Engines tab</strong> — See which engines are favored or blocked by current conditions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold">4</span>
              <span><strong>Check Confirmations</strong> — Use breadth, microstress, and Bitcoin to avoid false signals</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold">5</span>
              <span><strong>Implement</strong> — Use Company Analysis to find specific holdings within favored engines</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Important note */}
      <div className="bg-red-900/20 rounded-lg border border-red-500/30 p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="text-sm">
            <h3 className="font-semibold text-red-200 mb-1">Important Note</h3>
            <p className="text-red-200/80 text-xs">
              This is <strong>strategic, weekly/monthly guidance</strong>—not intraday trading signals.
              The engine framework helps you understand macro sensitivities and position for environments,
              not predict daily moves.
            </p>
          </div>
        </div>
      </div>

      {/* Full variant: Per-engine glossary */}
      {variant === "full" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">The 12 Economic Engines</h2>
          <p className="text-white/60 text-sm mb-6">
            Click each engine to learn more about its return mechanism, macro sensitivity, and examples.
          </p>

          {engines.map((engine) => (
            <AccordionSimple
              key={engine.id}
              title={engine.label}
              defaultOpen={false}
              alwaysOpenOnDesktop={false}
            >
              <div className="space-y-4 p-4 bg-white/5 rounded">
                {/* Short Definition */}
                <div>
                  <h4 className="text-sm font-semibold text-white/70 mb-1">Definition</h4>
                  <p className="text-white text-sm">{engine.shortDefinition}</p>
                </div>

                {/* Long Definition */}
                <div>
                  <h4 className="text-sm font-semibold text-white/70 mb-1">Detailed Explanation</h4>
                  <p className="text-white/80 text-sm">{engine.longDefinition}</p>
                </div>

                {/* Return Mechanism */}
                <div>
                  <h4 className="text-sm font-semibold text-white/70 mb-2">Return Mechanism</h4>
                  <ul className="space-y-1">
                    {engine.returnMechanism.map((mechanism, idx) => (
                      <li key={idx} className="text-white/70 text-xs flex items-start gap-2">
                        <span className="text-blue-400 mt-1">→</span>
                        <span>{mechanism}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Macro Sensitivity */}
                <div>
                  <h4 className="text-sm font-semibold text-white/70 mb-2">When It Tends to Win</h4>
                  <ul className="space-y-1">
                    {engine.macroSensitivity.map((sensitivity, idx) => (
                      <li key={idx} className="text-white/70 text-xs flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{sensitivity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Examples */}
                <div>
                  <h4 className="text-sm font-semibold text-white/70 mb-2">Examples</h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {engine.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/10 rounded text-xs text-white/80 border border-white/10"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-yellow-400/70 italic">{engine.examplesDisclaimer}</p>
                </div>
              </div>
            </AccordionSimple>
          ))}
        </div>
      )}
    </div>
  );
}
