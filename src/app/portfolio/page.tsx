/**
 * Portfolio Management Page
 *
 * Central hub for portfolio configuration:
 * - Holdings editor
 * - Engine allocation view
 * - Target bands configuration
 */

import { PortfolioClient } from "@/components/portfolio/PortfolioClient";

export const metadata = {
  title: "Portfolio | Finance Dashboard",
  description: "Manage your portfolio allocation across 12 economic engines",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
            <p className="text-white/60">
              Manual portfolio allocation across 12 economic engines
            </p>
          </div>
        </div>

        {/* Client-side Portfolio UI */}
        <PortfolioClient />

        {/* Important Notes */}
        <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-200 mb-2">
            Important Notes
          </h3>
          <ul className="text-sm text-blue-200/70 space-y-1 list-disc list-inside">
            <li>This is not a brokerage sync - it&apos;s an allocation model</li>
            <li>Data is stored locally in your browser (localStorage)</li>
            <li>Holdings are classified into 12 economic engines automatically</li>
            <li>Total weight must sum to 100% (±0.25% tolerance)</li>
            <li>Changes affect all macro dashboards in real-time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
