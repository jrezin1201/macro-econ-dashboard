/**
 * App Estimator Page
 *
 * Multi-step wizard for estimating development costs with feature selection and lead capture
 */

"use client";

import { AppEstimator } from "@/modules/estimator";
import { Card } from "@/components/ui/Card";

export default function EstimatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Build Your App Estimator
          </h1>
          <p className="text-xl text-white/60">
            Select features you need and get an instant development estimate
          </p>
        </div>

        {/* Estimator */}
        <section>
          <AppEstimator />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Features */}
        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">1️⃣</span>
                    Select Features
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Choose from 15+ feature categories</li>
                    <li>• See complexity indicators</li>
                    <li>• View suggested tech stack</li>
                    <li>• Real-time hour estimates</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">2️⃣</span>
                    Review Estimate
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• See total hours (min-max range)</li>
                    <li>• Adjust hourly rate ($50-$300)</li>
                    <li>• View feature breakdown by category</li>
                    <li>• Export as PDF (coming soon)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">3️⃣</span>
                    Request Quote
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Fill in contact details</li>
                    <li>• Add project specifics</li>
                    <li>• Submit for detailed proposal</li>
                    <li>• Get response within 24 hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Component Documentation */}
        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Component Documentation
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    AppEstimator
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Complete multi-step estimator with feature selection, calculation, and lead capture
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { AppEstimator } from "@/modules/estimator";

<AppEstimator />`}
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    FeatureSelector
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Grid of selectable features with category filtering
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { FeatureSelector } from "@/modules/estimator";

<FeatureSelector
  features={features}
  selectedFeatures={selected}
  onToggleFeature={(id) => {}}
  categories={categories}
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
