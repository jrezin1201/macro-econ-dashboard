/**
 * Dashboard Builder Page
 *
 * Drag-and-drop analytics dashboard creator with customizable widgets
 */

"use client";

import { DashboardBuilder } from "@/modules/dashboard-builder";
import { Card } from "@/components/ui/Card";

export default function DashboardBuilderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-[1600px] mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Dashboard Builder
          </h1>
          <p className="text-xl text-white/60">
            Create custom analytics dashboards with drag-and-drop widgets
          </p>
        </div>

        {/* Dashboard Builder */}
        <section>
          <DashboardBuilder />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Features */}
        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    Widget Library
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• KPI cards with trends</li>
                    <li>• Line, bar, and pie charts</li>
                    <li>• Data tables</li>
                    <li>• Progress indicators</li>
                    <li>• Click to add to dashboard</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">⚙️</span>
                    Customization
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Click widget to configure</li>
                    <li>• Edit titles and values</li>
                    <li>• Choose data sources</li>
                    <li>• Adjust widget sizes</li>
                    <li>• Color scheme options</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">💾</span>
                    Save & Share
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Save dashboard layouts</li>
                    <li>• Load saved dashboards</li>
                    <li>• Fullscreen presentation mode</li>
                    <li>• Time range filtering</li>
                    <li>• Export capabilities</li>
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
                {/* DashboardBuilder */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    DashboardBuilder
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Main dashboard component with widget library, grid layout, and configuration panel
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { DashboardBuilder } from "@/modules/dashboard-builder";

<DashboardBuilder />`}
                    </code>
                  </div>
                </div>

                {/* Widget */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Widget
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Individual widget component supporting multiple visualization types
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { Widget } from "@/modules/dashboard-builder";

<Widget
  widget={widgetInstance}
  onSelect={() => {}}
  onDelete={() => {}}
  onMove={(id, dx, dy) => {}}
  isSelected={false}
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
