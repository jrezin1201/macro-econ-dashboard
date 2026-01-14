/**
 * Holding Editor Modal
 *
 * Modal for adding or editing a portfolio holding
 */

"use client";

import { useState, useEffect } from "react";
import type { Holding, AccountType } from "@/lib/portfolio/schema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (holding: Partial<Holding>) => void;
  existingHolding?: Holding;
  mode: "add" | "edit";
}

// Common stock tickers for autocomplete
const COMMON_TICKERS = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B",
  "V", "MA", "JPM", "JNJ", "WMT", "PG", "UNH", "HD", "DIS", "NFLX",
  "QQQM", "QQQ", "SPY", "VOO", "VTI", "IWM", "SGOV", "BIL", "SHY",
  "GLD", "IAU", "VNQ", "MSTR", "COIN", "XLE", "XOM", "CVX"
];

export function HoldingEditorModal({ isOpen, onClose, onSave, existingHolding, mode }: Props) {
  const [ticker, setTicker] = useState("");
  const [account, setAccount] = useState<AccountType>("TAXABLE");
  const [weightPct, setWeightPct] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredTickers, setFilteredTickers] = useState<string[]>([]);

  // Load existing holding data when editing
  useEffect(() => {
    if (existingHolding) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTicker(existingHolding.ticker);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAccount(existingHolding.account);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWeightPct(existingHolding.weightPct.toString());
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNotes(existingHolding.notes || "");
    } else {
      // Reset for add mode
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTicker("");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAccount("TAXABLE");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWeightPct("");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNotes("");
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSuggestions(false);
  }, [existingHolding, isOpen]);

  // Handle ticker input change
  const handleTickerChange = (value: string) => {
    setTicker(value);

    if (value.length > 0) {
      const filtered = COMMON_TICKERS.filter(t =>
        t.toLowerCase().startsWith(value.toLowerCase())
      ).slice(0, 10); // Show max 10 suggestions
      setFilteredTickers(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredTickers([]);
    }
  };

  // Handle selecting a ticker from suggestions
  const handleSelectTicker = (selectedTicker: string) => {
    setTicker(selectedTicker);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const weight = parseFloat(weightPct);
    if (isNaN(weight) || weight <= 0) {
      alert("Please enter a valid weight percentage");
      return;
    }

    if (!ticker.trim()) {
      alert("Please enter a ticker symbol");
      return;
    }

    onSave({
      ticker: ticker.toUpperCase().trim(),
      account,
      weightPct: weight,
      notes: notes.trim() || undefined,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-white/20 rounded-lg shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            {mode === "add" ? "Add Holding" : "Edit Holding"}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ticker */}
          <div className="relative">
            <label className="block text-sm font-medium text-white/80 mb-1">
              Ticker Symbol *
            </label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => handleTickerChange(e.target.value)}
              onFocus={() => {
                if (ticker.length > 0 && filteredTickers.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                // Delay to allow clicking on suggestions
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              placeholder="AAPL"
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
              required
              autoComplete="off"
            />
            {showSuggestions && filteredTickers.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-white/20 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                {filteredTickers.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleSelectTicker(t)}
                    className="w-full px-3 py-2 text-left text-white hover:bg-blue-600/30 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-white/40 mt-1">
              Start typing to see suggestions
            </p>
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Account Type *
            </label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value as AccountType)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white focus:outline-none focus:border-blue-500"
              required
            >
              <option value="TAXABLE">Taxable</option>
              <option value="ROTH">Roth IRA</option>
              <option value="401K">401(k)</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Weight % *
            </label>
            <input
              type="number"
              value={weightPct}
              onChange={(e) => setWeightPct(e.target.value)}
              placeholder="10.5"
              step="0.1"
              min="0"
              max="100"
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
              required
            />
            <p className="text-xs text-white/40 mt-1">
              Percentage of your total portfolio (must sum to 100%)
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this holding..."
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
            >
              {mode === "add" ? "Add Holding" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
