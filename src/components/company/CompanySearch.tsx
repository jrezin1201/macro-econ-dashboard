"use client";

/**
 * Company Search Component
 *
 * Handles ticker input and navigation to company deep dive.
 * Stores recent searches in localStorage.
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const RECENT_TICKERS_KEY = "finance-dashboard:recent-tickers";
const MAX_RECENT = 8;

export function CompanySearch() {
  const router = useRouter();
  const [ticker, setTicker] = useState("");
  const [recentTickers, setRecentTickers] = useState<string[]>([]);

  // Load recent tickers from localStorage
  useEffect(() => {
    const loadRecentTickers = () => {
      try {
        const stored = localStorage.getItem(RECENT_TICKERS_KEY);
        if (stored) {
          setRecentTickers(JSON.parse(stored));
        }
      } catch (error) {
        console.warn("Failed to load recent tickers:", error);
      }
    };

    loadRecentTickers();
  }, []);

  const saveRecentTicker = (t: string) => {
    const normalized = t.toUpperCase();
    const updated = [
      normalized,
      ...recentTickers.filter((r) => r !== normalized),
    ].slice(0, MAX_RECENT);
    setRecentTickers(updated);
    localStorage.setItem(RECENT_TICKERS_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker.trim()) return;

    const normalized = ticker.trim().toUpperCase();
    saveRecentTicker(normalized);
    router.push(`/company/${normalized}/overview`);
  };

  const handleRecentClick = (t: string) => {
    saveRecentTicker(t);
    router.push(`/company/${t}/overview`);
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Enter ticker symbol (e.g., AAPL, MSFT, TSLA)"
            className="w-full px-6 py-4 pl-14 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            autoFocus
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-white/40" />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!ticker.trim()}
        >
          Analyze
        </button>
      </form>

      {/* Recent Tickers */}
      {recentTickers.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white/60 mb-3">
            Recently Viewed
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentTickers.map((t) => (
              <button
                key={t}
                onClick={() => handleRecentClick(t)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-mono font-semibold transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Examples */}
      <div>
        <h3 className="text-sm font-semibold text-white/60 mb-3">
          Popular Examples
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "JPM"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTicker(t);
                saveRecentTicker(t);
                router.push(`/company/${t}/overview`);
              }}
              className="px-4 py-3 bg-gradient-to-br from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-white/20 rounded-lg text-white font-mono font-semibold transition-all hover:scale-105"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
