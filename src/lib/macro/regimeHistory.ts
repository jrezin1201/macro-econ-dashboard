/**
 * Regime History Tracking
 *
 * Stores regime changes in localStorage for historical analysis
 */

export interface RegimeSnapshot {
  timestamp: string; // ISO string
  regime: string; // "Risk-On", "Risk-Off", etc.
  confidence: number;
  alertLevel: string; // "GREEN", "YELLOW", "RED"
}

const STORAGE_KEY = "macro_regime_history";
const MAX_HISTORY_DAYS = 90; // Keep last 90 days

/**
 * Get regime history from localStorage
 */
export function getRegimeHistory(): RegimeSnapshot[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const history: RegimeSnapshot[] = JSON.parse(stored);

    // Filter out old entries
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_HISTORY_DAYS);

    return history.filter((snapshot) => {
      const snapshotDate = new Date(snapshot.timestamp);
      return snapshotDate >= cutoffDate;
    });
  } catch (error) {
    console.error("Failed to load regime history:", error);
    return [];
  }
}

/**
 * Add a new regime snapshot
 * Only records if regime or alert level changed
 */
export function recordRegimeSnapshot(
  regime: string,
  confidence: number,
  alertLevel: string
): void {
  if (typeof window === "undefined") return;

  try {
    const history = getRegimeHistory();
    const latest = history[history.length - 1];

    // Only record if regime or alert changed
    if (latest && latest.regime === regime && latest.alertLevel === alertLevel) {
      return; // No change
    }

    const snapshot: RegimeSnapshot = {
      timestamp: new Date().toISOString(),
      regime,
      confidence,
      alertLevel,
    };

    const newHistory = [...history, snapshot];

    // Keep only recent history
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_HISTORY_DAYS);

    const filteredHistory = newHistory.filter((s) => {
      const snapshotDate = new Date(s.timestamp);
      return snapshotDate >= cutoffDate;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory));
  } catch (error) {
    console.error("Failed to record regime snapshot:", error);
  }
}

/**
 * Get regime changes (transitions)
 */
export function getRegimeChanges(): RegimeSnapshot[] {
  const history = getRegimeHistory();

  if (history.length <= 1) return history;

  const changes: RegimeSnapshot[] = [history[0]];

  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1];
    const current = history[i];

    // Record if regime or alert changed
    if (prev.regime !== current.regime || prev.alertLevel !== current.alertLevel) {
      changes.push(current);
    }
  }

  return changes;
}

/**
 * Get stats about regime history
 */
export function getRegimeStats() {
  const history = getRegimeHistory();

  if (history.length === 0) {
    return {
      totalSnapshots: 0,
      regimeCounts: {},
      mostCommonRegime: null,
      latestChange: null,
      daysSinceLastChange: null,
    };
  }

  // Count regimes
  const regimeCounts: Record<string, number> = {};
  for (const snapshot of history) {
    regimeCounts[snapshot.regime] = (regimeCounts[snapshot.regime] || 0) + 1;
  }

  // Find most common
  let mostCommonRegime = null;
  let maxCount = 0;
  for (const [regime, count] of Object.entries(regimeCounts)) {
    if (count > maxCount) {
      maxCount = count;
      mostCommonRegime = regime;
    }
  }

  // Get latest change
  const changes = getRegimeChanges();
  const latestChange = changes[changes.length - 1] || null;

  // Days since last change
  let daysSinceLastChange = null;
  if (latestChange) {
    const changeDate = new Date(latestChange.timestamp);
    const now = new Date();
    daysSinceLastChange = Math.floor(
      (now.getTime() - changeDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  return {
    totalSnapshots: history.length,
    regimeCounts,
    mostCommonRegime,
    latestChange,
    daysSinceLastChange,
  };
}
