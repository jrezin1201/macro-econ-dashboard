/**
 * Company Analysis - Search Page
 *
 * Landing page for company analysis. Allows users to:
 * - Enter a ticker symbol
 * - View recently searched tickers
 * - Navigate to company deep dive
 */

import { CompanySearch } from "@/components/company/CompanySearch";

export const metadata = {
  title: "Company Analysis | Finance Dashboard",
  description: "Deep dive into company financials, quality metrics, and investment scenarios",
};

export default function CompanySearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Company Analysis
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Deep dive into company fundamentals, quality metrics, supply chain dynamics,
            and investment scenarios. Built for both beginners and experts.
          </p>
        </div>

        {/* Search Component */}
        <CompanySearch />

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            title="Financial Deep Dive"
            description="10+ years of income statements, balance sheets, and cash flow analysis with trend charts."
            icon="📊"
          />
          <FeatureCard
            title="Quality & Risk Scores"
            description="Automated quality scoring based on profitability, cash generation, and balance sheet strength."
            icon="✅"
          />
          <FeatureCard
            title="Supply Chain Mapping"
            description="Understand upstream dependencies, cost drivers, and beneficiaries of company growth."
            icon="🚚"
          />
          <FeatureCard
            title="Scenario Analysis"
            description="Bear/Base/Bull scenarios with editable assumptions and implied return calculations."
            icon="💡"
          />
          <FeatureCard
            title="Macro Sensitivity"
            description="See how rates, credit spreads, USD, and oil impact the stock with plain-English explanations."
            icon="🌍"
          />
          <FeatureCard
            title="Positioning Data"
            description="Short interest, options flow, and positioning metrics to understand market sentiment."
            icon="📡"
          />
        </div>

        {/* Data Provider Status */}
        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-lg">
          <h3 className="text-sm font-semibold text-white/60 mb-2">Data Providers</h3>
          <p className="text-sm text-white/40">
            Currently using stub providers for demo. Add API keys to enable real data from
            Financial Modeling Prep, Alpha Vantage, or other providers.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  );
}
