/**
 * Operations Center Showcase
 *
 * Demonstrates system health, roadmap, changelog, and support ticket components
 */

"use client";

import {
  SystemHealthMonitor,
  PublicRoadmap,
  ChangelogTimeline,
  SupportTicketForm,
  type RoadmapItem,
  type ChangelogEntry,
} from "@/modules/admin-ops";
import { Card } from "@/components/ui/Card";

export default function AdminOpsPage() {
  // Sample roadmap data
  const roadmapItems: RoadmapItem[] = [
    {
      id: "1",
      title: "Dark Mode Support",
      description:
        "Add system-wide dark mode with automatic theme detection and manual toggle.",
      status: "in-progress",
      votes: 234,
      category: "UI/UX",
      estimatedQuarter: "Q1 2025",
    },
    {
      id: "2",
      title: "API Rate Limiting",
      description:
        "Implement configurable rate limiting for all public API endpoints to prevent abuse.",
      status: "planned",
      votes: 156,
      category: "Backend",
      estimatedQuarter: "Q1 2025",
    },
    {
      id: "3",
      title: "Real-time Collaboration",
      description:
        "Enable multiple users to collaborate on documents simultaneously with live cursors.",
      status: "planned",
      votes: 189,
      category: "Features",
      estimatedQuarter: "Q2 2025",
    },
    {
      id: "4",
      title: "Mobile App (iOS/Android)",
      description:
        "Native mobile applications for iOS and Android with offline support.",
      status: "planned",
      votes: 412,
      category: "Mobile",
      estimatedQuarter: "Q2 2025",
    },
    {
      id: "5",
      title: "Advanced Analytics Dashboard",
      description:
        "Comprehensive analytics dashboard with custom reports and data export.",
      status: "completed",
      votes: 298,
      category: "Analytics",
    },
    {
      id: "6",
      title: "Two-Factor Authentication",
      description:
        "Add 2FA support with authenticator apps and SMS backup codes.",
      status: "completed",
      votes: 321,
      category: "Security",
    },
  ];

  // Sample changelog data
  const changelogEntries: ChangelogEntry[] = [
    {
      id: "1",
      version: "2.4.0",
      date: new Date("2024-12-15"),
      title: "Winter Release",
      changes: [
        {
          type: "feature",
          description:
            "Added advanced filtering and sorting options to data tables",
        },
        {
          type: "feature",
          description:
            "New keyboard shortcuts for faster navigation (Press ? to view all)",
        },
        {
          type: "improvement",
          description:
            "Improved page load times by 40% with optimized asset loading",
        },
        {
          type: "improvement",
          description:
            "Enhanced mobile responsiveness across all dashboard pages",
        },
        {
          type: "bugfix",
          description:
            "Fixed issue where notification emails were not being sent",
        },
      ],
    },
    {
      id: "2",
      version: "2.3.0",
      date: new Date("2024-11-20"),
      title: "Security & Performance Update",
      changes: [
        {
          type: "feature",
          description:
            "Implemented two-factor authentication for enhanced security",
        },
        {
          type: "improvement",
          description:
            "Database query optimization reducing average response time by 60%",
        },
        {
          type: "bugfix",
          description:
            "Resolved memory leak in real-time notification system",
        },
        {
          type: "breaking",
          description:
            "API v1 has been deprecated. Please migrate to v2 by January 2025",
        },
      ],
    },
    {
      id: "3",
      version: "2.2.0",
      date: new Date("2024-10-10"),
      title: "Analytics Dashboard Launch",
      changes: [
        {
          type: "feature",
          description:
            "Launched comprehensive analytics dashboard with 15+ customizable widgets",
        },
        {
          type: "feature",
          description:
            "Added CSV and PDF export functionality for all reports",
        },
        {
          type: "improvement",
          description:
            "Redesigned user settings page with improved organization",
        },
        {
          type: "bugfix",
          description:
            "Fixed date picker timezone issues for international users",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Operations Center
          </h1>
          <p className="text-xl text-white/60">
            System health monitoring, product roadmap, changelog, and support
          </p>
        </div>

        {/* System Health Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              System Health Monitor
            </h2>
            <p className="text-white/60">
              Real-time infrastructure and service monitoring
            </p>
          </div>
          <SystemHealthMonitor autoRefresh={false} />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Roadmap & Changelog Section */}
        <section className="grid lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Public Roadmap
              </h2>
              <p className="text-white/60">
                Vote on upcoming features and improvements
              </p>
            </div>
            <PublicRoadmap
              items={roadmapItems}
              onVote={(itemId) => console.log("Voted on:", itemId)}
              allowVoting={true}
            />
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Changelog
              </h2>
              <p className="text-white/60">Recent product updates and releases</p>
            </div>
            <ChangelogTimeline entries={changelogEntries} />
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Support Ticket Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Support Center
            </h2>
            <p className="text-white/60">
              Submit a support ticket and we&apos;ll get back to you soon
            </p>
          </div>
          <SupportTicketForm
            onSubmit={(ticket) =>
              console.log("Support ticket submitted:", ticket)
            }
          />
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
                {/* System Health Monitor */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    System Health Monitor
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Real-time health monitoring with status indicators, response
                    times, and uptime tracking.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { SystemHealthMonitor } from "@/modules/admin-ops";

<SystemHealthMonitor
  metrics={metrics}
  autoRefresh={true}
  refreshInterval={30000}
/>`}
                    </code>
                  </div>
                </div>

                {/* Public Roadmap */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Public Roadmap
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Interactive roadmap with upvoting, filtering by status, and
                    feature categorization.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { PublicRoadmap } from "@/modules/admin-ops";

<PublicRoadmap
  items={roadmapItems}
  onVote={(itemId) => {}}
  allowVoting={true}
/>`}
                    </code>
                  </div>
                </div>

                {/* Changelog Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Changelog Timeline
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Vertical timeline showing product updates with categorized
                    changes (features, improvements, bugfixes).
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { ChangelogTimeline } from "@/modules/admin-ops";

<ChangelogTimeline
  entries={changelogEntries}
/>`}
                    </code>
                  </div>
                </div>

                {/* Support Ticket Form */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Support Ticket Form
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Validated support form with priority levels, categories, and
                    success confirmation.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { SupportTicketForm } from "@/modules/admin-ops";

<SupportTicketForm
  onSubmit={(ticket) => {}}
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
