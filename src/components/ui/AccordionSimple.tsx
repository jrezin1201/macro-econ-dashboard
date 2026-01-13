"use client";

/**
 * Simple Accordion Component for Mobile Collapsible Sections
 */

import { useState } from "react";

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  alwaysOpenOnDesktop?: boolean;
}

export function AccordionSimple({
  title,
  defaultOpen = false,
  children,
  alwaysOpenOnDesktop = true,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
      {/* Header - only clickable on mobile if alwaysOpenOnDesktop */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 flex items-center justify-between text-left ${
          alwaysOpenOnDesktop ? "lg:cursor-default" : ""
        }`}
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <svg
          className={`h-5 w-5 text-white/60 transition-transform ${
            alwaysOpenOnDesktop ? "lg:hidden" : ""
          } ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Content - always shown on desktop if alwaysOpenOnDesktop */}
      <div
        className={`overflow-hidden transition-all ${
          alwaysOpenOnDesktop
            ? `${isOpen ? "block" : "hidden"} lg:block`
            : isOpen
            ? "block"
            : "hidden"
        }`}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}
