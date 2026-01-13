"use client";

/**
 * Explanation Badge - Inline explanation text under cards/sections
 *
 * Shows human-readable context in beginner mode
 */

interface Props {
  text: string;
  show: boolean;
}

export function ExplanationBadge({ text, show }: Props) {
  if (!show) {
    return null;
  }

  return (
    <div className="mt-2 bg-blue-900/20 rounded-lg p-2 border border-blue-500/30">
      <p className="text-xs text-blue-200/90 leading-relaxed flex items-start gap-2">
        <span className="text-blue-400 font-bold mt-0.5">💡</span>
        <span>{text}</span>
      </p>
    </div>
  );
}
