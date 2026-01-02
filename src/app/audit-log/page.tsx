/**
 * Audit Log Viewer Page
 *
 * Comprehensive audit trail with advanced filtering, timeline view, and event details
 */

"use client";

import { AuditLogViewer } from "@/modules/audit-log";
import { Card } from "@/components/ui/Card";

export default function AuditLogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Audit Log Viewer
          </h1>
          <p className="text-xl text-white/60">
            Comprehensive audit trail with filtering, timeline view, and detailed event inspection
          </p>
        </div>

        {/* Audit Log Demo */}
        <section>
          <AuditLogViewer />
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
                    <span className="text-2xl">🔍</span>
                    Advanced Filtering
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Filter by user, action type, resource</li>
                    <li>• Date range selection</li>
                    <li>• Status filtering (success/failed/warning)</li>
                    <li>• Full-text search across all fields</li>
                    <li>• Multi-select filters with active count</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Statistics Dashboard
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Total events count with trends</li>
                    <li>• Success rate percentage</li>
                    <li>• Failed events tracking</li>
                    <li>• Active users count</li>
                    <li>• Real-time statistics updates</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📅</span>
                    Dual View Modes
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Table view: Sortable columns, compact data</li>
                    <li>• Timeline view: Chronological event flow</li>
                    <li>• Visual status indicators</li>
                    <li>• Color-coded action types</li>
                    <li>• Click to select events</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔎</span>
                    Event Details Panel
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Full event metadata display</li>
                    <li>• User and resource information</li>
                    <li>• IP address and location tracking</li>
                    <li>• JSON payload inspection</li>
                    <li>• Related events navigation</li>
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
                {/* AuditLogViewer */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    AuditLogViewer
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Main component with filtering, table/timeline views, and event details
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { AuditLogViewer } from "@/modules/audit-log";

<AuditLogViewer />`}
                    </code>
                  </div>
                </div>

                {/* LogStats */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    LogStats
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Statistics dashboard showing event metrics
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { LogStats } from "@/modules/audit-log";

<LogStats
  logs={allLogs}
  filteredLogs={filteredLogs}
/>`}
                    </code>
                  </div>
                </div>

                {/* LogFilters */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    LogFilters
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Advanced filter panel with multi-select options
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { LogFilters } from "@/modules/audit-log";

<LogFilters
  filters={filters}
  onChange={setFilters}
  logs={logs}
/>`}
                    </code>
                  </div>
                </div>

                {/* LogTable */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    LogTable
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Displays logs in table or timeline view
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { LogTable } from "@/modules/audit-log";

<LogTable
  logs={filteredLogs}
  viewMode="table" // or "timeline"
  onSelectLog={handleSelect}
  selectedLogId={selectedId}
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
