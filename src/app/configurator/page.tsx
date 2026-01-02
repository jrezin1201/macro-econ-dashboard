"use client";

import { ProductConfigurator } from "@/modules/configurator";

export default function ConfiguratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Product Configurator</h1>
          <p className="text-xl text-white/60">
            Customize your product with real-time pricing
          </p>
        </div>
        <section>
          <ProductConfigurator />
        </section>
      </div>
    </div>
  );
}
