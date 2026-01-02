/**
 * Notification Center Page
 *
 * Real-time notification feed with filtering, read/unread status, and actions
 */

"use client";

import { NotificationCenter } from "@/modules/notifications";
import { Card } from "@/components/ui/Card";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Notification Center
          </h1>
          <p className="text-xl text-white/60">
            Real-time notification feed with filtering and actionable alerts
          </p>
        </div>

        {/* Notification Center Demo */}
        <section>
          <NotificationCenter />
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
                    <span className="text-2xl">🔔</span>
                    Real-time Notifications
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Live notification feed</li>
                    <li>• Instant updates</li>
                    <li>• Unread count badge</li>
                    <li>• Relative timestamps (e.g., &quot;5m ago&quot;)</li>
                    <li>• Source attribution</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎨</span>
                    Type-based Styling
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Info notifications (blue)</li>
                    <li>• Success notifications (green)</li>
                    <li>• Warning notifications (yellow)</li>
                    <li>• Error notifications (red)</li>
                    <li>• Custom icons per type</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔍</span>
                    Advanced Filtering
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• View all notifications</li>
                    <li>• Filter by unread only</li>
                    <li>• Filter by type (info/success/warning/error)</li>
                    <li>• Active filter indicator</li>
                    <li>• Quick filter switching</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    Bulk Actions
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Mark all as read</li>
                    <li>• Clear all notifications</li>
                    <li>• Individual mark as read</li>
                    <li>• Delete individual notifications</li>
                    <li>• Actionable notification links</li>
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
                {/* NotificationCenter */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    NotificationCenter
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Complete notification feed with filtering and management
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { NotificationCenter } from "@/modules/notifications";

<NotificationCenter />`}
                    </code>
                  </div>
                </div>

                {/* Notification Type */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Notification Type
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    TypeScript interface for notification data
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
  source?: string;
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
