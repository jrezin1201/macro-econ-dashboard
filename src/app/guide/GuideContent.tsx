"use client";

/**
 * Guide Content Component
 *
 * Main content for the comprehensive dashboard guide
 */

import { useState, useEffect } from "react";
import { TableOfContents } from "@/components/guide/TableOfContents";
import { GuideBeginner } from "@/components/guide/GuideBeginner";
import { GuideIntermediate } from "@/components/guide/GuideIntermediate";
import { GuideExpert } from "@/components/guide/GuideExpert";

export type GuideMode = "beginner" | "intermediate" | "expert";

export function GuideContent() {
  // Initialize print mode from URL params (lazy initializer)
  const [isPrintMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("print") === "1";
  });

  // Initialize guide mode from URL params or localStorage (lazy initializer)
  const [guideMode, setGuideMode] = useState<GuideMode>(() => {
    if (typeof window === 'undefined') return "beginner";
    // Check URL params first
    const urlParams = new URLSearchParams(window.location.search);
    const modeParam = urlParams.get("mode");
    if (modeParam === "beginner" || modeParam === "intermediate" || modeParam === "expert") {
      return modeParam;
    }
    // Fall back to localStorage
    const stored = localStorage.getItem("guide_mode");
    if (stored === "beginner" || stored === "intermediate" || stored === "expert") {
      return stored;
    }
    return "beginner";
  });

  // Update localStorage when mode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("guide_mode", guideMode);
    }
  }, [guideMode]);

  const setMode = (mode: GuideMode) => {
    setGuideMode(mode);
  };

  const handleShareLink = () => {
    const url = `${window.location.origin}/guide?mode=${guideMode}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handlePrint = () => {
    window.open(`/guide?print=1&mode=${guideMode}`, "_blank");
  };

  // Define sections based on mode
  const getSections = () => {
    if (guideMode === "beginner") {
      return [
        { id: "start", title: "Start Here" },
        { id: "why", title: "Why This Exists" },
        { id: "weekly-routine", title: "Your Weekly Routine" },
        { id: "engines-explained", title: "What Each Engine Means" },
        { id: "rebalance-rules", title: "When to Rebalance" },
        { id: "data-timing", title: "About Data Updates" },
        { id: "glossary", title: "Simple Glossary" }
      ];
    } else if (guideMode === "intermediate") {
      return [
        { id: "start", title: "Start Here" },
        { id: "why", title: "Why This Exists" },
        { id: "building-blocks", title: "The Building Blocks" },
        { id: "regime-engine", title: "How the Regime Works" },
        { id: "portfolio-engines", title: "Portfolio & Engines" },
        { id: "playbook", title: "Weekly Playbook" },
        { id: "data-timing", title: "Data Updates" },
        { id: "glossary", title: "Glossary" }
      ];
    } else {
      // Expert mode - full sections
      return [
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
        { id: "data-timing", title: "Data Update Timing" },
        { id: "glossary", title: "Glossary" }
      ];
    }
  };

  const sections = getSections();

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
              {/* 3-Way Mode Toggle */}
              <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setMode("beginner")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    guideMode === "beginner"
                      ? "bg-blue-600 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Beginner
                </button>
                <button
                  onClick={() => setMode("intermediate")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    guideMode === "intermediate"
                      ? "bg-blue-600 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Intermediate
                </button>
                <button
                  onClick={() => setMode("expert")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    guideMode === "expert"
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
            {/* Render appropriate guide based on mode */}
            {guideMode === "beginner" && <GuideBeginner isPrintMode={isPrintMode} />}
            {guideMode === "intermediate" && <GuideIntermediate isPrintMode={isPrintMode} />}
            {guideMode === "expert" && <GuideExpert isPrintMode={isPrintMode} />}

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
