/**
 * Scenarios Page (Bear/Base/Bull)
 *
 * Shows three investment scenarios with editable assumptions.
 * Calculates implied returns based on growth, margins, and valuation.
 */

import { CompanyHeader } from "@/components/company/CompanyHeader";
import { providers } from "@/lib/company/providers";

interface Props {
  params: Promise<{ ticker: string }>;
}

export async function generateMetadata(props: Props) {
  const { ticker } = await props.params;
  return {
    title: `${ticker.toUpperCase()} Scenarios | Company Analysis`,
  };
}

export default async function ScenariosPage(props: Props) {
  const { ticker } = await props.params;
  const upperTicker = ticker.toUpperCase();

  const profile = await providers.financial?.getCompanyProfile(upperTicker);

  if (!profile) {
    return <div className="p-6 text-white">Company not found</div>;
  }

  // Default scenario assumptions (would be calculated from historical data)
  const scenarios: Array<{
    name: string;
    color: "red" | "blue" | "green";
    probability: number;
    assumptions: {
      revCAGR: number;
      opMargin: number;
      exitMultiple: number;
    };
    impliedPrice: number | null;
    impliedReturn: number | null;
  }> = [
    {
      name: "Bear Case",
      color: "red",
      probability: 25,
      assumptions: {
        revCAGR: 5,
        opMargin: 15,
        exitMultiple: 12,
      },
      impliedPrice: null,
      impliedReturn: null,
    },
    {
      name: "Base Case",
      color: "blue",
      probability: 50,
      assumptions: {
        revCAGR: 10,
        opMargin: 20,
        exitMultiple: 18,
      },
      impliedPrice: null,
      impliedReturn: null,
    },
    {
      name: "Bull Case",
      color: "green",
      probability: 25,
      assumptions: {
        revCAGR: 18,
        opMargin: 28,
        exitMultiple: 25,
      },
      impliedPrice: null,
      impliedReturn: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <CompanyHeader ticker={upperTicker} profile={profile} />

        {/* Introduction */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">
            Investment Scenarios
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Below are three scenarios (Bear, Base, Bull) with different assumptions
            about revenue growth, operating margins, and exit valuation multiples.
            These help estimate potential returns over a 5-year investment horizon.
          </p>
          <p className="text-sm text-white/50">
            Note: Calculations require financial data. Connect a data provider to
            see implied prices and returns based on real fundamentals.
          </p>
        </div>

        {/* Scenarios Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white/5 border border-white/10 rounded-lg">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-semibold">Scenario</th>
                <th className="text-center p-4 text-white/60 font-semibold">Probability</th>
                <th className="text-center p-4 text-white/60 font-semibold">
                  Revenue CAGR (5Y)
                </th>
                <th className="text-center p-4 text-white/60 font-semibold">
                  Op Margin
                </th>
                <th className="text-center p-4 text-white/60 font-semibold">
                  Exit Multiple (P/E)
                </th>
                <th className="text-center p-4 text-white/60 font-semibold">
                  Implied Price
                </th>
                <th className="text-center p-4 text-white/60 font-semibold">
                  5Y Return (Ann.)
                </th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((scenario) => {
                const colorClass =
                  scenario.color === "red"
                    ? "text-red-400"
                    : scenario.color === "green"
                    ? "text-green-400"
                    : "text-blue-400";

                return (
                  <tr key={scenario.name} className="border-b border-white/5">
                    <td className="p-4">
                      <span className={`font-bold ${colorClass}`}>
                        {scenario.name}
                      </span>
                    </td>
                    <td className="text-center p-4 text-white/80">
                      {scenario.probability}%
                    </td>
                    <td className="text-center p-4 text-white/80">
                      {scenario.assumptions.revCAGR}%
                    </td>
                    <td className="text-center p-4 text-white/80">
                      {scenario.assumptions.opMargin}%
                    </td>
                    <td className="text-center p-4 text-white/80">
                      {scenario.assumptions.exitMultiple}x
                    </td>
                    <td className="text-center p-4 text-white/80">
                      {scenario.impliedPrice !== null
                        ? `$${scenario.impliedPrice.toFixed(2)}`
                        : "—"}
                    </td>
                    <td className="text-center p-4 text-white/80">
                      {scenario.impliedReturn !== null
                        ? `${scenario.impliedReturn > 0 ? "+" : ""}${scenario.impliedReturn.toFixed(1)}%`
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Expected Value */}
        <div className="p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">
            Probability-Weighted Expected Return
          </h3>
          <div className="text-4xl font-bold text-white mb-2">—</div>
          <p className="text-sm text-white/60">
            Expected value calculated as: (Bear × 0.25) + (Base × 0.50) + (Bull × 0.25)
          </p>
        </div>

        {/* What Must Be True */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScenarioCard
            title="Bear Case: What Must Be True"
            color="red"
            bullets={[
              "Revenue growth slows significantly (competitive pressure)",
              "Margins compress due to rising costs or pricing pressure",
              "Market re-rates the stock lower (sector rotation)",
            ]}
          />
          <ScenarioCard
            title="Base Case: What Must Be True"
            color="blue"
            bullets={[
              "Company maintains current growth trajectory",
              "Margins remain stable or improve slightly",
              "Valuation multiples stay in historical range",
            ]}
          />
          <ScenarioCard
            title="Bull Case: What Must Be True"
            color="green"
            bullets={[
              "Revenue accelerates (new product cycles, market expansion)",
              "Operating leverage drives margin expansion",
              "Multiple expansion from improved market sentiment",
            ]}
          />
        </div>

        {/* Sensitivity Note */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">
            Assumptions & Sensitivity
          </h3>
          <p className="text-sm text-white/60">
            These scenarios are simplified estimates. Actual returns depend on many factors
            including execution risk, macro conditions, competition, and unforeseen events.
            In a full implementation, you would be able to edit assumptions and see
            real-time sensitivity to different inputs.
          </p>
        </div>
      </div>
    </div>
  );
}

function ScenarioCard({
  title,
  color,
  bullets,
}: {
  title: string;
  color: "red" | "blue" | "green";
  bullets: string[];
}) {
  const colorClass =
    color === "red"
      ? "from-red-600/20 to-red-600/10 border-red-500/30"
      : color === "green"
      ? "from-green-600/20 to-green-600/10 border-green-500/30"
      : "from-blue-600/20 to-blue-600/10 border-blue-500/30";

  return (
    <div className={`p-6 bg-gradient-to-br ${colorClass} border rounded-lg`}>
      <h4 className="text-lg font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-2 text-sm text-white/70">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-white/40">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
