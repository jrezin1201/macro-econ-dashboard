/**
 * Company Header Component
 *
 * Shared header for all company analysis pages.
 * Shows ticker, name, current price, market cap, and data coverage.
 */

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { CompanyProfile } from "@/lib/company/providers/types";

interface Props {
  ticker: string;
  profile: CompanyProfile;
  price?: number | null;
  marketCap?: number | null;
  lastUpdated?: Date;
}

export function CompanyHeader({
  ticker,
  profile,
  price,
  marketCap,
  lastUpdated,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Back Button */}
      <Link
        href="/company"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Search
      </Link>

      {/* Main Header */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Left: Company Info */}
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
              <span className="text-xl font-mono font-semibold text-blue-400">
                {ticker}
              </span>
            </div>
            {profile.exchange && (
              <p className="text-sm text-white/60">
                {profile.exchange}
                {profile.sector && ` • ${profile.sector}`}
                {profile.industry && ` • ${profile.industry}`}
              </p>
            )}
          </div>

          {/* Right: Price & Market Cap */}
          {(price || marketCap) && (
            <div className="flex gap-6">
              {price && (
                <div>
                  <p className="text-sm text-white/40">Price</p>
                  <p className="text-2xl font-bold text-white">
                    ${price.toFixed(2)}
                  </p>
                </div>
              )}
              {marketCap && (
                <div>
                  <p className="text-sm text-white/40">Market Cap</p>
                  <p className="text-2xl font-bold text-white">
                    {formatMarketCap(marketCap)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Data Coverage Notice */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <p className="text-xs text-white/40">
              {lastUpdated
                ? `Last updated: ${lastUpdated.toLocaleString()}`
                : "Data coverage: Provider not configured"}
            </p>
            <div className="flex gap-2">
              <StatusBadge label="Financials" status="stub" />
              <StatusBadge label="Market Data" status="stub" />
              <StatusBadge label="Positioning" status="stub" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation ticker={ticker} />
    </div>
  );
}

function formatMarketCap(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
}

function StatusBadge({
  label,
  status,
}: {
  label: string;
  status: "active" | "stub";
}) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded ${
        status === "active"
          ? "bg-green-500/20 text-green-300 border border-green-500/30"
          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
      }`}
    >
      {label}
    </span>
  );
}

function TabNavigation({ ticker }: { ticker: string }) {
  const tabs = [
    { name: "Overview", href: `/company/${ticker}/overview` },
    { name: "Financials", href: `/company/${ticker}/financials` },
    { name: "Quality", href: `/company/${ticker}/quality` },
    { name: "Capital", href: `/company/${ticker}/capital` },
    { name: "Supply Chain", href: `/company/${ticker}/supply-chain` },
    { name: "Macro", href: `/company/${ticker}/macro-news` },
    { name: "Positioning", href: `/company/${ticker}/positioning` },
    { name: "Scenarios", href: `/company/${ticker}/scenarios` },
    { name: "Report", href: `/company/${ticker}/report` },
  ];

  return (
    <div className="border-b border-white/10 overflow-x-auto">
      <nav className="flex gap-1 min-w-max">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className="px-4 py-3 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 border-b-2 border-transparent hover:border-blue-500 transition-all whitespace-nowrap"
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
