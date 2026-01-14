/**
 * Workflow Breadcrumb Component
 *
 * Shows the current position in the weekly workflow
 * Helps users understand the decision flow: environment → allocation → confirmation → action
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface WorkflowStep {
  key: string;
  label: string;
  href: string;
}

interface Props {
  currentKey: string;
  variant?: "compact" | "full";
}

// Default weekly workflow steps
export const WORKFLOW_STEPS: WorkflowStep[] = [
  { key: "portfolio", label: "Portfolio", href: "/portfolio" },
  { key: "macro", label: "Macro Regime", href: "/macro/regime" },
  { key: "engines", label: "Economic Engines", href: "/engines" },
  { key: "confirmations", label: "Confirmations", href: "/macro/regime#confirmations" },
  { key: "action", label: "Action", href: "/macro/regime#action" },
];

export function WorkflowBreadcrumb({ currentKey, variant = "full" }: Props) {
  const currentIndex = WORKFLOW_STEPS.findIndex((step) => step.key === currentKey);
  const pathname = usePathname();

  // Handle smooth scroll for anchor links on the same page
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const url = new URL(href, window.location.origin);
    const hash = url.hash;

    // If there's a hash and we're on the same page, smooth scroll instead of navigating
    if (hash && pathname === url.pathname) {
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL hash without triggering navigation
        window.history.pushState(null, "", hash);
      }
    }
    // Otherwise, let Next.js Link handle the navigation
  };

  return (
    <div className="mb-6">
      {/* Breadcrumb Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {WORKFLOW_STEPS.map((step, index) => {
          const isCurrent = step.key === currentKey;
          const isPast = currentIndex > -1 && index < currentIndex;
          const isFuture = currentIndex > -1 && index > currentIndex;

          return (
            <div key={step.key} className="flex items-center gap-2">
              {/* Step Pill */}
              <Link
                href={step.href}
                onClick={(e) => handleClick(e, step.href)}
                className={`
                  px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all
                  ${
                    isCurrent
                      ? "bg-blue-600 text-white font-bold ring-2 ring-blue-400/50"
                      : isPast
                      ? "bg-green-600/20 text-green-300 hover:bg-green-600/30 border border-green-500/30"
                      : isFuture
                      ? "bg-white/5 text-white/50 hover:bg-white/10 border border-white/10"
                      : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/20"
                  }
                `}
                title={step.label}
              >
                {step.label}
              </Link>

              {/* Arrow Separator */}
              {index < WORKFLOW_STEPS.length - 1 && (
                <svg
                  className="w-4 h-4 text-white/30 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* Workflow Caption (only in full variant) */}
      {variant === "full" && (
        <div className="mt-3">
          <p className="text-xs text-white/50 italic">
            Workflow: environment → allocation → confirmation → action
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Compact variant for mobile or tight spaces
 */
export function WorkflowBreadcrumbCompact({ currentKey }: { currentKey: string }) {
  return <WorkflowBreadcrumb currentKey={currentKey} variant="compact" />;
}
