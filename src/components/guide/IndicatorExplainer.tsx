"use client";

/**
 * Indicator Explainer Component
 *
 * Displays comprehensive explanation of an indicator wired to the data source registry
 */

import { getSeriesMeta } from "@/lib/data/dataSourceRegistry";

interface Props {
  seriesId: string;
  titleOverride?: string;
  whatItMeasures: string;
  whyItMatters: string[];
  howToInterpret: string;
  commonMistakes?: string;
}

export function IndicatorExplainer({
  seriesId,
  titleOverride,
  whatItMeasures,
  whyItMatters,
  howToInterpret,
  commonMistakes,
}: Props) {
  const meta = getSeriesMeta(seriesId);
  const title = titleOverride || meta?.displayName || seriesId;

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        {meta && (
          <div className="text-right">
            <div className={`
              px-2 py-1 rounded text-xs font-medium
              ${meta.updateCadence === "Real-time" ? "bg-green-900/30 text-green-400" :
                meta.updateCadence === "Daily" ? "bg-blue-900/30 text-blue-400" :
                meta.updateCadence === "Weekly" ? "bg-yellow-900/30 text-yellow-400" :
                "bg-orange-900/30 text-orange-400"}
            `}>
              {meta.updateCadence}
            </div>
          </div>
        )}
      </div>

      {/* What it measures */}
      <div className="mb-4">
        <p className="text-sm text-white/80">{whatItMeasures}</p>
      </div>

      {/* Why it matters */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-blue-400 mb-2">Why it matters:</p>
        <ul className="space-y-1.5">
          {whyItMatters.map((point, i) => (
            <li key={i} className="text-sm text-white/70 flex items-start">
              <span className="mr-2 text-blue-400">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* How to interpret */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-green-400 mb-2">How to interpret:</p>
        <p className="text-sm text-white/70">{howToInterpret}</p>
      </div>

      {/* Common mistakes */}
      {commonMistakes && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-red-400 mb-2">Common mistake:</p>
          <p className="text-sm text-white/70">{commonMistakes}</p>
        </div>
      )}

      {/* Data source info */}
      {meta && (
        <div className="border-t border-white/10 pt-3 mt-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-white/40">Source:</span>{" "}
              <span className="text-white/70">{meta.source}</span>
            </div>
            <div>
              <span className="text-white/40">Series ID:</span>{" "}
              <span className="text-white/60 font-mono">{seriesId}</span>
            </div>
          </div>
          {meta.typicalLag && (
            <div className="mt-2 text-xs">
              <span className="text-white/40">Typical lag:</span>{" "}
              <span className="text-white/60">{meta.typicalLag}</span>
            </div>
          )}
          {meta.notes && (
            <div className="mt-2 text-xs text-white/50 italic">
              {meta.notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
