/**
 * Quality & Returns Page
 *
 * Displays quality score breakdown, ROIC/ROE trends, FCF conversion, etc.
 */

import { CompanyHeader } from "@/components/company/CompanyHeader";
import { providers } from "@/lib/company/providers";

interface Props {
  params: Promise<{ ticker: string }>;
}

export async function generateMetadata(props: Props) {
  const { ticker } = await props.params;
  return {
    title: `${ticker.toUpperCase()} Quality & Returns | Company Analysis`,
  };
}

export default async function QualityPage(props: Props) {
  const { ticker } = await props.params;
  const upperTicker = ticker.toUpperCase();

  const profile = await providers.financial?.getCompanyProfile(upperTicker);

  if (!profile) {
    return <div className="p-6 text-white">Company not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <CompanyHeader ticker={upperTicker} profile={profile} />

        {/* Quality Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QualityScoreCard
            title="Overall Quality"
            score={null}
            max={100}
            description="Composite score based on profitability, cash generation, and balance sheet strength."
          />
          <QualityScoreCard
            title="Profitability"
            score={null}
            max={100}
            description="Gross, operating, and net margin trends vs. peers."
          />
          <QualityScoreCard
            title="Cash Generation"
            score={null}
            max={100}
            description="FCF conversion and consistency."
          />
        </div>

        {/* Placeholder for Quality Analysis */}
        <div className="p-12 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-yellow-200 mb-4">
            Quality Analysis Not Available
          </h2>
          <p className="text-yellow-200/70 max-w-2xl mx-auto">
            Connect a financial data provider to calculate quality metrics including:
          </p>
          <ul className="mt-4 text-left text-yellow-200/70 max-w-xl mx-auto list-disc list-inside">
            <li>Return on Invested Capital (ROIC) trends</li>
            <li>Return on Equity (ROE) and Return on Assets (ROA)</li>
            <li>Free Cash Flow conversion (FCF / Net Income)</li>
            <li>Margin stability and incremental margins</li>
            <li>Cash flow consistency vs. earnings volatility</li>
          </ul>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="ROIC (3Y Avg)"
            value="—"
            description="Return on Invested Capital measures capital efficiency."
          />
          <MetricCard
            title="ROE (3Y Avg)"
            value="—"
            description="Return on Equity shows profitability relative to shareholder equity."
          />
          <MetricCard
            title="FCF Conversion"
            value="—"
            description="Free Cash Flow divided by Net Income (higher is better)."
          />
          <MetricCard
            title="Gross Margin"
            value="—"
            description="Current gross margin vs. 5-year average."
          />
          <MetricCard
            title="Operating Margin"
            value="—"
            description="Current operating margin vs. 5-year average."
          />
          <MetricCard
            title="Incremental Margin"
            value="—"
            description="Change in operating income / change in revenue (5Y)."
          />
        </div>
      </div>
    </div>
  );
}

function QualityScoreCard({
  title,
  score,
  max,
  description,
}: {
  title: string;
  score: number | null;
  max: number;
  description: string;
}) {
  const percentage = score !== null ? (score / max) * 100 : 0;
  const color =
    percentage >= 70
      ? "from-green-600/20 to-green-600/10 border-green-500/30"
      : percentage >= 40
      ? "from-yellow-600/20 to-yellow-600/10 border-yellow-500/30"
      : "from-gray-600/20 to-gray-600/10 border-gray-500/30";

  return (
    <div className={`p-6 bg-gradient-to-br ${color} border rounded-lg`}>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <div className="text-4xl font-bold text-white mb-2">
        {score !== null ? `${score}/${max}` : "—"}
      </div>
      <p className="text-sm text-white/60 mb-4">{description}</p>
      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
      <h4 className="text-sm font-semibold text-white/60 mb-2">{title}</h4>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <p className="text-sm text-white/50">{description}</p>
    </div>
  );
}
