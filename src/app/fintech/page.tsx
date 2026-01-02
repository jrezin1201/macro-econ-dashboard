/**
 * Financial Analytics Showcase
 *
 * Demonstrates P&L statement, burn rate gauge, cap table, and tax estimator
 */

"use client";

import {
  ProfitLossStatement,
  BurnRateGauge,
  CapTableVisualizer,
  TaxEstimator,
  type PLLineItem,
  type Shareholder,
} from "@/modules/fintech";
import { Card } from "@/components/ui/Card";

export default function FintechPage() {
  // Sample P&L data
  const plData = {
    period: "Q4 2024",
    revenue: [
      {
        category: "SaaS Subscriptions",
        amount: 450000,
        subcategories: [
          { category: "Enterprise Tier", amount: 280000 },
          { category: "Pro Tier", amount: 120000 },
          { category: "Starter Tier", amount: 50000 },
        ],
      },
      {
        category: "Professional Services",
        amount: 85000,
        subcategories: [
          { category: "Implementation", amount: 60000 },
          { category: "Consulting", amount: 25000 },
        ],
      },
    ] as PLLineItem[],
    cogs: [
      {
        category: "Infrastructure",
        amount: 75000,
        subcategories: [
          { category: "AWS Hosting", amount: 45000 },
          { category: "Database", amount: 18000 },
          { category: "CDN & Storage", amount: 12000 },
        ],
      },
      {
        category: "Support & Success",
        amount: 95000,
        subcategories: [
          { category: "Customer Success Team", amount: 60000 },
          { category: "Support Tools", amount: 35000 },
        ],
      },
    ] as PLLineItem[],
    opex: [
      {
        category: "Sales & Marketing",
        amount: 120000,
        subcategories: [
          { category: "Marketing Spend", amount: 65000 },
          { category: "Sales Commissions", amount: 55000 },
        ],
      },
      {
        category: "Engineering",
        amount: 180000,
        subcategories: [
          { category: "Salaries", amount: 150000 },
          { category: "Tools & Licenses", amount: 30000 },
        ],
      },
      {
        category: "General & Administrative",
        amount: 55000,
        subcategories: [
          { category: "Office & Operations", amount: 30000 },
          { category: "Legal & Accounting", amount: 25000 },
        ],
      },
    ] as PLLineItem[],
  };

  // Sample cap table data
  const shareholders: Shareholder[] = [
    {
      name: "Founders",
      shares: 6000000,
      shareClass: "Common",
      investmentAmount: 0,
    },
    {
      name: "Seed Investors (Series Seed)",
      shares: 1500000,
      shareClass: "Preferred",
      investmentAmount: 2000000,
    },
    {
      name: "Series A Investors",
      shares: 2000000,
      shareClass: "Preferred",
      investmentAmount: 8000000,
    },
    {
      name: "Employee Option Pool",
      shares: 1200000,
      shareClass: "Options",
    },
    {
      name: "Advisors",
      shares: 300000,
      shareClass: "Common",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Financial Analytics
          </h1>
          <p className="text-xl text-white/60">
            P&L statements, burn rate monitoring, cap table, and tax estimation
          </p>
        </div>

        {/* P&L Statement Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Profit & Loss Statement
            </h2>
            <p className="text-white/60">
              Comprehensive income statement with revenue, COGS, and operating
              expenses
            </p>
          </div>
          <ProfitLossStatement data={plData} />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Burn Rate & Cap Table Section */}
        <section className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Burn Rate Monitor
              </h2>
              <p className="text-white/60">
                Track cash runway with semi-circle gauge visualization
              </p>
            </div>
            <BurnRateGauge
              cashBalance={2400000}
              monthlyBurn={280000}
              monthlyRevenue={180000}
            />
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Cap Table Breakdown
              </h2>
              <p className="text-white/60">
                Ownership distribution with pie chart visualization
              </p>
            </div>
            <CapTableVisualizer
              shareholders={shareholders}
              companyValuation={50000000}
            />
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Tax Estimator Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Tax Estimator
            </h2>
            <p className="text-white/60">
              Interactive federal tax calculator with business structure options
            </p>
          </div>
          <TaxEstimator initialIncome={150000} initialDeductions={25000} />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Documentation */}
        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Component Documentation
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* P&L Statement */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Profit & Loss Statement
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Hierarchical P&L table with revenue, COGS, operating
                    expenses, and calculated margins.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { ProfitLossStatement } from "@/modules/fintech";

<ProfitLossStatement
  data={{
    period: "Q4 2024",
    revenue: [...],
    cogs: [...],
    opex: [...]
  }}
/>`}
                    </code>
                  </div>
                </div>

                {/* Burn Rate Gauge */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Burn Rate Gauge
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Semi-circle gauge showing cash runway with color-coded zones
                    and alerts.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { BurnRateGauge } from "@/modules/fintech";

<BurnRateGauge
  cashBalance={2400000}
  monthlyBurn={280000}
  monthlyRevenue={180000}
/>`}
                    </code>
                  </div>
                </div>

                {/* Cap Table Visualizer */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Cap Table Visualizer
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Interactive pie chart showing ownership distribution with
                    hover effects.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { CapTableVisualizer } from "@/modules/fintech";

<CapTableVisualizer
  shareholders={shareholders}
  companyValuation={50000000}
/>`}
                    </code>
                  </div>
                </div>

                {/* Tax Estimator */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Tax Estimator
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Interactive tax calculator with filing status and business
                    structure options.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { TaxEstimator } from "@/modules/fintech";

<TaxEstimator
  initialIncome={150000}
  initialDeductions={25000}
/>`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
