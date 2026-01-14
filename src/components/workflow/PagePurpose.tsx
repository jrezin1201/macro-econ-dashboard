/**
 * Page Purpose Component
 *
 * Shows a one-liner explaining what this page does
 * Helps users understand the role of each page in the workflow
 */

"use client";

interface Props {
  purpose: string;
  className?: string;
}

export function PagePurpose({ purpose, className = "" }: Props) {
  return (
    <div className={`mb-4 ${className}`}>
      <p className="text-sm md:text-base text-white/60 italic">
        {purpose}
      </p>
    </div>
  );
}

/**
 * Predefined purposes for weekly workflow pages
 */
export const PAGE_PURPOSES = {
  portfolio: "Set up your holdings and see how they map to economic engines.",
  macroRegime: "Identify the environment and risk posture.",
  engines: "Translate the environment into what to overweight/avoid.",
  breadth: "Confirmation: Market participation health signals.",
  microstress: "Confirmation: Short-term funding stress signals that validate or block risk.",
  bitcoin: "Confirmation: Crypto trend for volatility exposure decisions.",
} as const;
