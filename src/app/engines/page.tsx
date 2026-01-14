/**
 * Economic Engines Page
 *
 * Shows which engines are favored by current macro conditions
 * and compares to your portfolio allocation.
 */

"use client";

import { useState } from "react";
import { EnginesClient } from "@/components/engines/EnginesClient";
import { WorkflowBreadcrumb } from "@/components/workflow/WorkflowBreadcrumb";
import { PagePurpose, PAGE_PURPOSES } from "@/components/workflow/PagePurpose";
import { EnginesExplainer } from "@/components/engines/EnginesExplainer";

export default function EnginesPage() {
  const [mode, setMode] = useState<"beginner" | "expert">("beginner");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Workflow Breadcrumb */}
        <WorkflowBreadcrumb currentKey="engines" />

        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-3xl font-bold text-white">Economic Engines</h1>
            {/* Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">View:</span>
              <button
                onClick={() => setMode(mode === "beginner" ? "expert" : "beginner")}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  mode === "beginner"
                    ? "bg-blue-600 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setMode(mode === "expert" ? "beginner" : "expert")}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  mode === "expert"
                    ? "bg-purple-600 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                Expert
              </button>
            </div>
          </div>
          <PagePurpose purpose={PAGE_PURPOSES.engines} />
        </div>

        {/* About these engines (inline explainer) */}
        <EnginesExplainer variant="inline" mode={mode} />

        {/* Client-side Engines UI */}
        <EnginesClient />
      </div>
    </div>
  );
}
