/**
 * Company Overview Page
 *
 * High-level summary with quality/risk scores, valuation snapshot,
 * and company intent analysis.
 */

import { notFound } from "next/navigation";
import { CompanyHeader } from "@/components/company/CompanyHeader";
import { CompanyPortfolioImpact } from "@/components/company/CompanyPortfolioImpact";
import { providers } from "@/lib/company/providers";
import { getPortfolio } from "@/lib/portfolio/store";

interface Props {
  params: Promise<{ ticker: string }>;
}

export async function generateMetadata(props: Props) {
  const { ticker } = await props.params;
  return {
    title: `${ticker.toUpperCase()} Overview | Company Analysis`,
    description: `Company overview and analysis for ${ticker.toUpperCase()}`,
  };
}

export default async function CompanyOverviewPage(props: Props) {
  const { ticker } = await props.params;
  const upperTicker = ticker.toUpperCase();

  // Fetch basic company profile
  let profile;
  try {
    profile = await providers.financial?.getCompanyProfile(upperTicker);
  } catch (error) {
    console.error("Failed to fetch company profile:", error);
    notFound();
  }

  if (!profile) {
    notFound();
  }

  // Get portfolio for holdings check
  const portfolio = getPortfolio();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Company Header */}
        <CompanyHeader ticker={upperTicker} profile={profile} />

        {/* Overview Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Description */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">What is {profile.name}?</h2>
              <p className="text-white/70 leading-relaxed">
                {profile.description || "Company description not available. Connect a data provider to see full details."}
              </p>
              {profile.sector && (
                <div className="mt-4 flex gap-4">
                  <div>
                    <span className="text-sm text-white/40">Sector</span>
                    <p className="text-white font-semibold">{profile.sector}</p>
                  </div>
                  {profile.industry && (
                    <div>
                      <span className="text-sm text-white/40">Industry</span>
                      <p className="text-white font-semibold">{profile.industry}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Placeholder for Quality/Risk Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScoreCard
                title="Quality Score"
                score={null}
                status="pending"
                description="Connect a financial data provider to calculate quality metrics."
              />
              <ScoreCard
                title="Risk Score"
                score={null}
                status="pending"
                description="Connect a financial data provider to calculate risk metrics."
              />
            </div>

            {/* Data Provider Notice */}
            <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-200 mb-2">
                Limited Data Available
              </h3>
              <p className="text-sm text-yellow-200/70">
                To see full financial analysis, quality scores, and scenarios, add API keys for:
              </p>
              <ul className="mt-2 text-sm text-yellow-200/70 list-disc list-inside">
                <li>Financial Modeling Prep (financials + fundamentals)</li>
                <li>Alpha Vantage (market data + price history)</li>
                <li>SEC Edgar (filings + documents)</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
              <div className="space-y-2">
                <QuickLink href={`/company/${upperTicker}/financials`} label="Financials" />
                <QuickLink href={`/company/${upperTicker}/quality`} label="Quality & Returns" />
                <QuickLink href={`/company/${upperTicker}/capital`} label="Capital Allocation" />
                <QuickLink href={`/company/${upperTicker}/supply-chain`} label="Supply Chain" />
                <QuickLink href={`/company/${upperTicker}/macro-news`} label="Macro Sensitivity" />
                <QuickLink href={`/company/${upperTicker}/positioning`} label="Positioning" />
                <QuickLink href={`/company/${upperTicker}/scenarios`} label="Scenarios" />
              </div>
            </div>

            {/* Portfolio Status */}
            <CompanyPortfolioImpact ticker={upperTicker} portfolio={portfolio} />

            {/* Company Info */}
            {profile.website && (
              <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Company Info</h3>
                <div className="space-y-2 text-sm">
                  <InfoRow label="Website" value={profile.website} isLink />
                  {profile.exchange && <InfoRow label="Exchange" value={profile.exchange} />}
                  {profile.ipoDate && <InfoRow label="IPO Date" value={profile.ipoDate} />}
                  {profile.employees && <InfoRow label="Employees" value={profile.employees.toLocaleString()} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({
  title,
  score,
  status,
  description,
}: {
  title: string;
  score: number | null;
  status: "good" | "warning" | "bad" | "pending";
  description: string;
}) {
  const colors = {
    good: "from-green-600/20 to-green-600/10 border-green-500/30",
    warning: "from-yellow-600/20 to-yellow-600/10 border-yellow-500/30",
    bad: "from-red-600/20 to-red-600/10 border-red-500/30",
    pending: "from-gray-600/20 to-gray-600/10 border-gray-500/30",
  };

  return (
    <div className={`p-6 bg-gradient-to-br ${colors[status]} border rounded-lg`}>
      <h3 className="text-sm font-semibold text-white/60 mb-2">{title}</h3>
      {score !== null ? (
        <div className="text-4xl font-bold text-white mb-2">{score}/100</div>
      ) : (
        <div className="text-2xl font-bold text-white/40 mb-2">—</div>
      )}
      <p className="text-sm text-white/60">{description}</p>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="block px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/80 hover:text-white transition-colors"
    >
      {label}
    </a>
  );
}

function InfoRow({
  label,
  value,
  isLink,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-white/40">{label}</span>
      {isLink ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          Link ↗
        </a>
      ) : (
        <span className="text-white/80">{value}</span>
      )}
    </div>
  );
}
