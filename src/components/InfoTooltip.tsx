"use client";

import { useState, useRef, useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface InfoTooltipProps {
  title: string;
  source: string;
  calculation?: string;
  notes?: string;
  updateFrequency?: string;
}

export function InfoTooltip({
  title,
  source,
  calculation,
  notes,
  updateFrequency,
}: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-2 text-white/40 hover:text-white/80 transition-colors"
        title="Data source information"
      >
        <InformationCircleIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-80 bg-gray-900 border border-white/20 rounded-lg shadow-xl p-4 right-0">
          {/* Arrow pointing up */}
          <div className="absolute -top-2 right-4 w-4 h-4 bg-gray-900 border-l border-t border-white/20 transform rotate-45"></div>

          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
            </div>

            <div>
              <p className="text-xs font-semibold text-blue-400 mb-1">Data Source:</p>
              <p className="text-xs text-white/80">{source}</p>
            </div>

            {calculation && (
              <div>
                <p className="text-xs font-semibold text-green-400 mb-1">Calculation:</p>
                <p className="text-xs text-white/80">{calculation}</p>
              </div>
            )}

            {updateFrequency && (
              <div>
                <p className="text-xs font-semibold text-purple-400 mb-1">Update Frequency:</p>
                <p className="text-xs text-white/80">{updateFrequency}</p>
              </div>
            )}

            {notes && (
              <div>
                <p className="text-xs font-semibold text-orange-400 mb-1">Notes:</p>
                <p className="text-xs text-white/80">{notes}</p>
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-white/40 hover:text-white/80"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
