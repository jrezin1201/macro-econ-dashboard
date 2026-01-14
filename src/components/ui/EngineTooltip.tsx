"use client";

/**
 * Engine Tooltip Component
 *
 * Displays engine shortDefinition on hover/tap
 */

import { useState } from "react";
import type { EngineId } from "@/lib/portfolio/schema";
import { getEngine } from "@/lib/engines/engineConfig";

interface Props {
  engineId: EngineId;
  children: React.ReactNode;
  className?: string;
}

export function EngineTooltip({ engineId, children, className = "" }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const engine = getEngine(engineId);

  if (!engine) return <>{children}</>;

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children}

      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 pointer-events-none">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg border border-white/20">
            <div className="font-semibold mb-1">{engine.label}</div>
            <div className="text-white/80">{engine.shortDefinition}</div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
              <div className="border-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
