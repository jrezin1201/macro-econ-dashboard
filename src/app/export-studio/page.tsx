/**
 * Data Export Studio Page
 *
 * Comprehensive data export tool with format selection, field customization, and history
 */

"use client";

import { ExportStudio } from "@/modules/export-studio";
import { Card } from "@/components/ui/Card";

export default function ExportStudioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Data Export Studio
          </h1>
          <p className="text-xl text-white/60">
            Export your data in multiple formats with custom field selection
          </p>
        </div>

        {/* Export Studio Demo */}
        <section>
          <ExportStudio />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Features */}
        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📦</span>
                    Multiple Formats
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• CSV - Excel-compatible spreadsheets</li>
                    <li>• JSON - Structured data for APIs</li>
                    <li>• Excel - Native .xlsx with formatting</li>
                    <li>• PDF - Print-ready documents</li>
                    <li>• Format-specific options</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    Data Source Selection
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Users database export</li>
                    <li>• Sales deals and opportunities</li>
                    <li>• Analytics and metrics</li>
                    <li>• Generated reports</li>
                    <li>• Record count preview</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">⚙️</span>
                    Field Customization
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Select specific fields to export</li>
                    <li>• Select all / deselect all shortcuts</li>
                    <li>• Field ordering and arrangement</li>
                    <li>• Source-specific field options</li>
                    <li>• Real-time selection count</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Preview & History
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Data preview before export</li>
                    <li>• Export history sidebar</li>
                    <li>• Download previous exports</li>
                    <li>• Status tracking (completed/processing/failed)</li>
                    <li>• File size and record counts</li>
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
                {/* ExportStudio */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    ExportStudio
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Complete export configuration wizard with history
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { ExportStudio } from "@/modules/export-studio";

<ExportStudio />`}
                    </code>
                  </div>
                </div>

                {/* ExportConfig Type */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    ExportConfig Type
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    TypeScript interface for export configuration
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`interface ExportConfig {
  source: "users" | "deals" | "analytics" | "reports";
  format: "csv" | "json" | "excel" | "pdf";
  fields: string[];
  filters: Record<string, unknown>;
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
}`}
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
