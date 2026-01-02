/**
 * Admin Panel Showcase
 *
 * Demonstrates user management, analytics, feature flags, and activity logging
 */

"use client";

import {
  UserManagement,
  AnalyticsDashboard,
  FeatureFlagsManager,
  ActivityLog,
  type User,
  type FeatureFlag,
  type ActivityLogEntry,
} from "@/modules/admin";
import { Card } from "@/components/ui/Card";

// Pre-calculate timestamps
const NOW = Date.now();
const ONE_HOUR_AGO = NOW - 3600000;
const TWO_HOURS_AGO = NOW - 7200000;
const THREE_HOURS_AGO = NOW - 10800000;
const ONE_DAY_AGO = NOW - 86400000;
const TWO_DAYS_AGO = NOW - 172800000;
const THREE_DAYS_AGO = NOW - 259200000;

export default function AdminPage() {
  // Sample users
  const sampleUsers: User[] = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "admin",
      status: "active",
      lastActive: new Date(ONE_HOUR_AGO),
      createdAt: new Date(THREE_DAYS_AGO),
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      role: "moderator",
      status: "active",
      lastActive: new Date(TWO_HOURS_AGO),
      createdAt: new Date(TWO_DAYS_AGO),
    },
    {
      id: "3",
      name: "Carol White",
      email: "carol@example.com",
      role: "user",
      status: "active",
      lastActive: new Date(THREE_HOURS_AGO),
      createdAt: new Date(ONE_DAY_AGO),
    },
    {
      id: "4",
      name: "David Brown",
      email: "david@example.com",
      role: "user",
      status: "pending",
      lastActive: new Date(ONE_DAY_AGO),
      createdAt: new Date(ONE_HOUR_AGO),
    },
    {
      id: "5",
      name: "Eve Davis",
      email: "eve@example.com",
      role: "user",
      status: "suspended",
      lastActive: new Date(TWO_DAYS_AGO),
      createdAt: new Date(THREE_DAYS_AGO),
    },
  ];

  // Sample feature flags
  const sampleFlags: FeatureFlag[] = [
    {
      id: "1",
      name: "Dark Mode",
      description: "Enable dark mode across the application",
      enabled: true,
      category: "UI",
      environment: "production",
      rolloutPercentage: 100,
    },
    {
      id: "2",
      name: "New Dashboard",
      description: "Redesigned analytics dashboard with enhanced metrics",
      enabled: true,
      category: "Features",
      environment: "staging",
      rolloutPercentage: 50,
    },
    {
      id: "3",
      name: "AI Autocomplete",
      description: "AI-powered text completion in forms",
      enabled: false,
      category: "Experiments",
      environment: "development",
      rolloutPercentage: 0,
    },
    {
      id: "4",
      name: "Advanced Search",
      description: "Full-text search with filters and facets",
      enabled: true,
      category: "Features",
      environment: "all",
      rolloutPercentage: 75,
    },
    {
      id: "5",
      name: "Beta Program",
      description: "Access to beta features for selected users",
      enabled: true,
      category: "Beta",
      environment: "production",
      rolloutPercentage: 25,
    },
    {
      id: "6",
      name: "GraphQL API",
      description: "New GraphQL endpoint for data fetching",
      enabled: false,
      category: "Backend",
      environment: "development",
    },
  ];

  // Sample activity log
  const sampleLogs: ActivityLogEntry[] = [
    {
      id: "1",
      timestamp: new Date(ONE_HOUR_AGO),
      user: "Alice Johnson",
      action: "Updated",
      resource: "User Settings",
      details: "Changed role from user to moderator for Bob Smith",
      severity: "info",
    },
    {
      id: "2",
      timestamp: new Date(TWO_HOURS_AGO),
      user: "Bob Smith",
      action: "Enabled",
      resource: "Feature Flag",
      details: "Enabled 'Dark Mode' feature for production",
      severity: "success",
    },
    {
      id: "3",
      timestamp: new Date(THREE_HOURS_AGO),
      user: "System",
      action: "Warning",
      resource: "Database",
      details: "High CPU usage detected on primary database server",
      severity: "warning",
    },
    {
      id: "4",
      timestamp: new Date(ONE_DAY_AGO),
      user: "Alice Johnson",
      action: "Created",
      resource: "User Account",
      details: "New user account created for Carol White",
      severity: "success",
    },
    {
      id: "5",
      timestamp: new Date(ONE_DAY_AGO),
      user: "System",
      action: "Failed",
      resource: "Payment Processing",
      details: "Payment gateway timeout - 3 transactions affected",
      severity: "error",
    },
    {
      id: "6",
      timestamp: new Date(TWO_DAYS_AGO),
      user: "Bob Smith",
      action: "Deployed",
      resource: "Application",
      details: "Version 2.4.0 deployed to production",
      severity: "success",
    },
    {
      id: "7",
      timestamp: new Date(TWO_DAYS_AGO),
      user: "Alice Johnson",
      action: "Suspended",
      resource: "User Account",
      details: "Suspended account for Eve Davis due to policy violation",
      severity: "warning",
    },
    {
      id: "8",
      timestamp: new Date(THREE_DAYS_AGO),
      user: "System",
      action: "Backup Completed",
      resource: "Database",
      details: "Automated daily backup completed successfully",
      severity: "info",
    },
  ];

  // Sample analytics data
  const analyticsData = {
    totalUsers: 12543,
    activeUsers: 8721,
    totalRevenue: 284500,
    monthlyGrowth: 12.4,
    averageSessionTime: "4m 32s",
    conversionRate: 3.8,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Panel</h1>
          <p className="text-xl text-white/60">
            User management, analytics, feature flags, and activity monitoring
          </p>
        </div>

        {/* Analytics Dashboard Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Analytics Dashboard
            </h2>
            <p className="text-white/60">
              Real-time metrics and performance indicators
            </p>
          </div>
          <AnalyticsDashboard data={analyticsData} period="30d" />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* User Management Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              User Management
            </h2>
            <p className="text-white/60">
              Manage users, roles, and permissions
            </p>
          </div>
          <UserManagement
            users={sampleUsers}
            onUpdateUser={(id, updates) =>
              console.log("Update user:", id, updates)
            }
            onDeleteUser={(id) => console.log("Delete user:", id)}
          />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Feature Flags & Activity Log */}
        <section className="grid lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Feature Flags
              </h2>
              <p className="text-white/60">
                Control feature rollouts across environments
              </p>
            </div>
            <FeatureFlagsManager
              flags={sampleFlags}
              onToggleFlag={(id, enabled) =>
                console.log("Toggle flag:", id, enabled)
              }
              onUpdateRollout={(id, percentage) =>
                console.log("Update rollout:", id, percentage)
              }
            />
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Activity Log
              </h2>
              <p className="text-white/60">
                Audit trail of all system activities
              </p>
            </div>
            <ActivityLog entries={sampleLogs} maxEntries={20} />
          </div>
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
                {/* User Management */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    User Management
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Full-featured user table with role and status management,
                    filtering, and search.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { UserManagement } from "@/modules/admin";

<UserManagement
  users={users}
  onUpdateUser={(id, updates) => {...}}
  onDeleteUser={(id) => {...}}
/>`}
                    </code>
                  </div>
                </div>

                {/* Analytics Dashboard */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Analytics Dashboard
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Real-time metrics with charts, growth indicators, and
                    period selection.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { AnalyticsDashboard } from "@/modules/admin";

<AnalyticsDashboard
  data={analyticsData}
  period="30d"
/>`}
                    </code>
                  </div>
                </div>

                {/* Feature Flags Manager */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Feature Flags Manager
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Toggle features by environment with rollout percentage
                    control.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { FeatureFlagsManager } from "@/modules/admin";

<FeatureFlagsManager
  flags={flags}
  onToggleFlag={(id, enabled) => {...}}
  onUpdateRollout={(id, pct) => {...}}
/>`}
                    </code>
                  </div>
                </div>

                {/* Activity Log */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Activity Log
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Audit trail with severity filtering, user filtering, and
                    summary stats.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { ActivityLog } from "@/modules/admin";

<ActivityLog
  entries={logEntries}
  maxEntries={50}
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
