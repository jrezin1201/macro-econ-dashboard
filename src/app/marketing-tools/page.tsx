/**
 * Marketing Tools Showcase
 *
 * Demonstrates ROI calculator, logo cloud, countdown banner, and exit-intent popup
 */

"use client";

import {
  ROICalculator,
  InfiniteLogoCloud,
  CountdownBanner,
  ExitIntentPopup,
} from "@/modules/marketing-tools";
import { Card } from "@/components/ui/Card";

export default function MarketingToolsPage() {
  // Set countdown to 7 days from now for demo
  const countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 7);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Countdown Banner */}
      <CountdownBanner
        endDate={countdownDate}
        title="Limited Time Offer"
        message="Get 50% off our Pro plan"
      />

      {/* Exit Intent Popup */}
      <ExitIntentPopup
        title="Wait! Before you go..."
        message="Get exclusive access to our marketing toolkit"
        onSubmit={(email) => console.log("Email captured:", email)}
      />

      <div className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Marketing Toolkit
          </h1>
          <p className="text-xl text-white/60">
            ROI calculators, social proof, and lead capture tools
          </p>
        </div>

        {/* ROI Calculator Section */}
        <section id="roi-calculator">
          <ROICalculator />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Logo Cloud Section */}
        <section id="logo-cloud">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Infinite Logo Cloud
            </h2>
            <p className="text-white/60">
              Showcase your clients with smooth infinite scroll
            </p>
          </div>
          <InfiniteLogoCloud />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Component Documentation */}
        <section id="documentation">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Component Documentation
            </h2>
            <p className="text-white/60">How to use these marketing tools</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* ROI Calculator Card */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  ROI Calculator
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Interactive calculator with real-time charts. Helps prospects
                  quantify the value of your solution.
                </p>
                <div className="bg-black/40 p-4 rounded-lg text-xs font-mono">
                  <code className="text-green-400">
                    {`import { ROICalculator } from "@/modules/marketing-tools";

<ROICalculator />`}
                  </code>
                </div>
              </div>
            </Card>

            {/* Logo Cloud Card */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Infinite Logo Cloud
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Smooth infinite scrolling logo showcase. Pauses on hover.
                  Configurable speed and direction.
                </p>
                <div className="bg-black/40 p-4 rounded-lg text-xs font-mono">
                  <code className="text-green-400">
                    {`import { InfiniteLogoCloud } from "@/modules/marketing-tools";

<InfiniteLogoCloud
  logos={myLogos}
  speed={30}
  direction="left"
/>`}
                  </code>
                </div>
              </div>
            </Card>

            {/* Countdown Banner Card */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Countdown Banner
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Sticky countdown banner for urgency. Dismissible with
                  localStorage persistence.
                </p>
                <div className="bg-black/40 p-4 rounded-lg text-xs font-mono">
                  <code className="text-green-400">
                    {`import { CountdownBanner } from "@/modules/marketing-tools";

<CountdownBanner
  endDate={new Date("2025-12-31")}
  title="Limited Offer"
  message="50% off!"
/>`}
                  </code>
                </div>
              </div>
            </Card>

            {/* Exit Intent Card */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Exit-Intent Popup
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Lead capture triggered on exit intent. Shows once per session
                  using localStorage.
                </p>
                <div className="bg-black/40 p-4 rounded-lg text-xs font-mono">
                  <code className="text-green-400">
                    {`import { ExitIntentPopup } from "@/modules/marketing-tools";

<ExitIntentPopup
  title="Wait!"
  message="Get updates"
  onSubmit={(email) => save(email)}
/>`}
                  </code>
                </div>
                <p className="text-xs text-white/40 mt-4">
                  💡 Move your mouse toward the top of the browser to trigger
                </p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
