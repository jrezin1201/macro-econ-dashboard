"use client";

/**
 * Mode Toggle - Switch between Expert and Beginner modes
 *
 * Stores preference in localStorage
 */

import { useState, useEffect } from "react";

interface Props {
  onChange?: (isBeginnerMode: boolean) => void;
}

export function ModeToggle({ onChange }: Props) {
  // Initialize state from localStorage (lazy initializer)
  const [isBeginnerMode, setIsBeginnerMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem("macroRegimeMode");
    if (stored === null) {
      localStorage.setItem("macroRegimeMode", "beginner");
      return true;
    }
    return stored === "beginner";
  });

  // Notify parent of initial mode
  useEffect(() => {
    onChange?.(isBeginnerMode);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggle = (mode: "beginner" | "expert") => {
    const beginnerMode = mode === "beginner";
    setIsBeginnerMode(beginnerMode);
    localStorage.setItem("macroRegimeMode", mode);
    onChange?.(beginnerMode);
  };

  return (
    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/10">
      <button
        onClick={() => handleToggle("beginner")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          isBeginnerMode
            ? "bg-blue-600 text-white"
            : "text-white/60 hover:text-white hover:bg-white/5"
        }`}
      >
        👋 Beginner
      </button>
      <button
        onClick={() => handleToggle("expert")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          !isBeginnerMode
            ? "bg-purple-600 text-white"
            : "text-white/60 hover:text-white hover:bg-white/5"
        }`}
      >
        🧠 Expert
      </button>
    </div>
  );
}

/**
 * Hook to get current mode
 */
export function useBeginnerMode(): boolean {
  // Initialize state from localStorage (lazy initializer)
  const [isBeginnerMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem("macroRegimeMode");
    return stored !== "expert";
  });

  return isBeginnerMode;
}
