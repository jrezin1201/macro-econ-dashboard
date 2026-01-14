"use client";

/**
 * Portfolio Quick Drawer
 *
 * Slide-out panel showing portfolio summary
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPortfolio } from "@/lib/portfolio/store";
import { generatePortfolioSummary, type PortfolioSummary } from "@/lib/portfolio/calc";
import { getEngine } from "@/lib/engines/engineConfig";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function PortfolioQuickDrawer({ open, onClose }: Props) {
  const [summary, setSummary] = useState<PortfolioSummary | null>(null);

  useEffect(() => {
    if (open) {
      const portfolio = getPortfolio();
      const portfolioSummary = generatePortfolioSummary(portfolio);
      setSummary(portfolioSummary);
    }
  }, [open]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open, onClose]);

  if (!open || !summary) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className="fixed right-0 top-0 h-full w-[320px] max-w-[85vw] bg-gray-900/95 backdrop-blur-sm border-l border-white/10 z-50 shadow-2xl overflow-y-auto transition-transform duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio summary"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Portfolio Summary</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-2 -mr-2"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Validation Status */}
          <div
            className={`p-3 rounded-lg ${
              summary.isValid
                ? "bg-green-500/10 border border-green-500/20"
                : "bg-yellow-500/10 border border-yellow-500/20"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  summary.isValid ? "bg-green-400" : "bg-yellow-400"
                }`}
              />
              <span
                className={`text-sm font-semibold ${
                  summary.isValid ? "text-green-200" : "text-yellow-200"
                }`}
              >
                {summary.isValid ? "Valid" : "Needs Attention"}
              </span>
            </div>
            <p className="text-xs text-white/60 mt-1">
              Total: {summary.totalWeight.toFixed(2)}%
            </p>
          </div>

          {/* Top Overweights */}
          {summary.topOverweights.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-red-200">
                Top Overweights
              </h3>
              <ul className="space-y-2">
                {summary.topOverweights.slice(0, 3).map((delta) => {
                  const engine = getEngine(delta.engine);
                  return (
                    <li
                      key={delta.engine}
                      className="p-2 bg-red-500/10 border border-red-500/20 rounded text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-red-200 font-medium">
                          {engine?.label}
                        </span>
                        <span className="text-red-300 font-mono">
                          +{delta.delta.toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-white/50 mt-1">
                        At {delta.currentPct.toFixed(1)}% (target{" "}
                        {delta.targetPct}%)
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Top Underweights */}
          {summary.topUnderweights.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-yellow-200">
                Top Underweights
              </h3>
              <ul className="space-y-2">
                {summary.topUnderweights.slice(0, 3).map((delta) => {
                  const engine = getEngine(delta.engine);
                  return (
                    <li
                      key={delta.engine}
                      className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-200 font-medium">
                          {engine?.label}
                        </span>
                        <span className="text-yellow-300 font-mono">
                          {delta.delta.toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-white/50 mt-1">
                        At {delta.currentPct.toFixed(1)}% (target{" "}
                        {delta.targetPct}%)
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Balanced state */}
          {summary.topOverweights.length === 0 &&
            summary.topUnderweights.length === 0 && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                <p className="text-sm text-green-200 font-medium">
                  ✓ All engines in range
                </p>
                <p className="text-xs text-white/50 mt-1">
                  Portfolio is well-balanced
                </p>
              </div>
            )}

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <Link
              href="/portfolio"
              onClick={onClose}
              className="block w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg text-center transition-colors"
            >
              View Full Portfolio
            </Link>
            <Link
              href="/engines"
              onClick={onClose}
              className="block w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg text-center transition-colors"
            >
              View Engine Scores
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
