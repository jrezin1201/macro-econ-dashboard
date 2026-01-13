"use client";

/**
 * What Could Go Wrong - Risk scenario panel
 *
 * Teaches users what to watch for and when to adjust
 */

interface Props {
  scenarios: string[];
  isBeginnerMode: boolean;
}

export function WhatCouldGoWrong({ scenarios, isBeginnerMode }: Props) {
  if (!isBeginnerMode || scenarios.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-900/20 rounded-lg border border-red-500/30 p-4 md:p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">⚠️</span>
        <h3 className="text-lg font-bold text-white">What Could Change This?</h3>
      </div>

      <p className="text-sm text-white/70 mb-4">
        You don't need to predict the future. Just watch these key signals. If they change, adjust your
        strategy accordingly:
      </p>

      <ul className="space-y-2.5">
        {scenarios.map((scenario, i) => (
          <li key={i} className="flex items-start gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
            <span className="text-red-400 text-sm font-bold mt-0.5">→</span>
            <span className="text-sm text-white/80 flex-1">{scenario}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 bg-white/5 rounded-lg p-3 border border-white/10">
        <p className="text-xs text-white/70">
          <span className="font-semibold text-white">Remember:</span> Markets don't move in straight lines.
          These triggers help you stay disciplined instead of emotional.
        </p>
      </div>
    </div>
  );
}
