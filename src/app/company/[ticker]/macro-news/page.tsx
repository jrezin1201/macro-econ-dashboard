/**
 * Macro / News Sensitivity Page
 *
 * Shows how rates, credit, USD, oil, and macro events impact the stock.
 */

import { CompanyHeader } from "@/components/company/CompanyHeader";
import { providers } from "@/lib/company/providers";

interface Props {
  params: Promise<{ ticker: string }>;
}

export async function generateMetadata(props: Props) {
  const { ticker } = await props.params;
  return {
    title: `${ticker.toUpperCase()} Macro Sensitivity | Company Analysis`,
  };
}

export default async function MacroNewsPage(props: Props) {
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

        <div className="p-12 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-yellow-200 mb-4">
            Macro Sensitivity Analysis Coming Soon
          </h2>
          <p className="text-yellow-200/70">
            This tab will show how rates, credit spreads, USD, oil, and macro news impact the stock.
          </p>
        </div>
      </div>
    </div>
  );
}
