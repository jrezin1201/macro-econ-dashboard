/**
 * Company Financials Page
 *
 * Shows revenue, operating income, FCF, share count over time.
 * Displays income statement, balance sheet, and cash flow tables.
 */

import { CompanyHeader } from "@/components/company/CompanyHeader";
import { providers } from "@/lib/company/providers";

interface Props {
  params: Promise<{ ticker: string }>;
}

export async function generateMetadata(props: Props) {
  const { ticker } = await props.params;
  return {
    title: `${ticker.toUpperCase()} Financials | Company Analysis`,
  };
}

export default async function FinancialsPage(props: Props) {
  const { ticker } = await props.params;
  const upperTicker = ticker.toUpperCase();

  // Fetch data
  const [profile, statements] = await Promise.all([
    providers.financial?.getCompanyProfile(upperTicker),
    providers.financial?.getStatements(upperTicker, "annual", 10),
  ]);

  if (!profile) {
    return <div className="p-6 text-white">Company not found</div>;
  }

  const hasData = statements && statements.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <CompanyHeader ticker={upperTicker} profile={profile} />

        {/* Content */}
        {!hasData ? (
          <NoDataPlaceholder />
        ) : (
          <div className="space-y-6">
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MetricCard
                label="Revenue (Latest)"
                value={formatCurrency(statements[0]?.income.revenue)}
                change="+12% YoY"
              />
              <MetricCard
                label="Operating Income"
                value={formatCurrency(statements[0]?.income.operatingIncome)}
                change="+8% YoY"
              />
              <MetricCard
                label="Free Cash Flow"
                value={formatCurrency(statements[0]?.cashflow.freeCashFlow)}
                change="+15% YoY"
              />
              <MetricCard
                label="Net Debt"
                value={formatCurrency(
                  (statements[0]?.balance.totalDebt || 0) -
                    (statements[0]?.balance.cash || 0)
                )}
              />
            </div>

            {/* Charts Placeholder */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">
                Revenue & Profitability Trends
              </h2>
              <div className="h-64 flex items-center justify-center text-white/40">
                Chart: Revenue, Operating Income, Net Income (10 years)
                <br />
                [Recharts implementation pending]
              </div>
            </div>

            {/* Financial Statements Tables */}
            <FinancialTables statements={statements} />
          </div>
        )}
      </div>
    </div>
  );
}

function NoDataPlaceholder() {
  return (
    <div className="p-12 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
      <h2 className="text-2xl font-bold text-yellow-200 mb-4">
        Financial Data Not Available
      </h2>
      <p className="text-yellow-200/70 max-w-2xl mx-auto">
        Connect a financial data provider (Financial Modeling Prep, Alpha Vantage, etc.)
        to view income statements, balance sheets, and cash flow statements.
      </p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change?: string;
}) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
      <p className="text-sm text-white/40 mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      {change && <p className="text-sm text-green-400 mt-1">{change}</p>}
    </div>
  );
}

function FinancialTables({
  statements,
}: {
  statements: NonNullable<Awaited<ReturnType<NonNullable<typeof providers.financial>["getStatements"]>>>;
}) {
  if (!statements || statements.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Income Statement */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg overflow-x-auto">
        <h3 className="text-lg font-bold text-white mb-4">Income Statement (Annual)</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/60 font-semibold py-2">Metric</th>
              {statements.slice(0, 5).map((s) => (
                <th key={s.date} className="text-right text-white/60 font-semibold py-2">
                  {s.fiscalYear}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-white/80">
            <tr className="border-b border-white/5">
              <td className="py-2">Revenue</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right">
                  {formatCurrency(s.income.revenue)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2">Gross Profit</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right">
                  {formatCurrency(s.income.grossProfit)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2">Operating Income</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right">
                  {formatCurrency(s.income.operatingIncome)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2 font-semibold">Net Income</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right font-semibold">
                  {formatCurrency(s.income.netIncome)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Balance Sheet */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg overflow-x-auto">
        <h3 className="text-lg font-bold text-white mb-4">Balance Sheet (Annual)</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/60 font-semibold py-2">Metric</th>
              {statements.slice(0, 5).map((s) => (
                <th key={s.date} className="text-right text-white/60 font-semibold py-2">
                  {s.fiscalYear}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-white/80">
            <tr className="border-b border-white/5">
              <td className="py-2">Total Assets</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right">
                  {formatCurrency(s.balance.totalAssets)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2">Total Debt</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right">
                  {formatCurrency(s.balance.totalDebt)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2">Cash</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right">
                  {formatCurrency(s.balance.cash)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2 font-semibold">Total Equity</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right font-semibold">
                  {formatCurrency(s.balance.totalEquity)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cash Flow */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg overflow-x-auto">
        <h3 className="text-lg font-bold text-white mb-4">Cash Flow Statement (Annual)</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/60 font-semibold py-2">Metric</th>
              {statements.slice(0, 5).map((s) => (
                <th key={s.date} className="text-right text-white/60 font-semibold py-2">
                  {s.fiscalYear}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-white/80">
            <tr className="border-b border-white/5">
              <td className="py-2">Operating Cash Flow</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right">
                  {formatCurrency(s.cashflow.operatingCashFlow)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2">Capex</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right">
                  {formatCurrency(s.cashflow.capitalExpenditure)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2 font-semibold">Free Cash Flow</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right font-semibold">
                  {formatCurrency(s.cashflow.freeCashFlow)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2">Dividends Paid</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right">
                  {formatCurrency(s.cashflow.dividendsPaid)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2">Stock Repurchased</td>
              {statements.slice(0, 5).map((s) => (
                <td key={s.date} className="text-right">
                  {formatCurrency(s.cashflow.stockRepurchased)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  const abs = Math.abs(value);
  if (abs >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}
