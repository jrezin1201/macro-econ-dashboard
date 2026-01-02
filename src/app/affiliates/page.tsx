/**
 * Affiliate Dashboard Page
 *
 * Referral tracking, commission management, payouts, and performance analytics
 */

"use client";

import { AffiliateDashboard } from "@/modules/affiliates";
import { Card } from "@/components/ui/Card";

export default function AffiliatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Affiliate Dashboard</h1>
          <p className="text-xl text-white/60">
            Track referrals, earnings, and commissions from your affiliate program
          </p>
        </div>

        <section>
          <AffiliateDashboard />
        </section>

        <div className="border-t border-white/10"></div>

        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    Earnings Tracking
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Total earnings overview</li>
                    <li>• Pending commission tracker</li>
                    <li>• Payout history</li>
                    <li>• Lifetime value per referral</li>
                    <li>• Monthly performance charts</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">👥</span>
                    Referral Management
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Active referrals list</li>
                    <li>• Referral status tracking</li>
                    <li>• Conversion rate metrics</li>
                    <li>• Plan tier breakdown</li>
                    <li>• Churn detection</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔗</span>
                    Affiliate Links
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Unique affiliate URL</li>
                    <li>• One-click copy</li>
                    <li>• Click tracking</li>
                    <li>• Custom link parameters</li>
                    <li>• Share analytics</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">💸</span>
                    Payout Management
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Scheduled payouts</li>
                    <li>• Payment method selection</li>
                    <li>• Early payout requests</li>
                    <li>• Transaction history</li>
                    <li>• Payment status tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
