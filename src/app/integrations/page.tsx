"use client";

import { IntegrationMarketplace } from "@/modules/integrations";

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Integration Marketplace</h1>
          <p className="text-xl text-white/60">
            Connect with your favorite tools and supercharge your workflow
          </p>
        </div>
        <section>
          <IntegrationMarketplace />
        </section>
      </div>
    </div>
  );
}
