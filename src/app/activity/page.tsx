/**
 * Activity Feed Page
 *
 * Real-time activity stream with filtering, grouping, and type-based organization
 */

"use client";

import { ActivityFeed } from "@/modules/activity";
import { Card } from "@/components/ui/Card";

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Activity Feed</h1>
          <p className="text-xl text-white/60">
            Real-time activity stream with filtering and smart grouping
          </p>
        </div>

        <section>
          <ActivityFeed />
        </section>

        <div className="border-t border-white/10"></div>

        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Activity Types
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• User signups and invites</li>
                    <li>• Deal creation and updates</li>
                    <li>• Payment transactions</li>
                    <li>• File uploads</li>
                    <li>• Comments and mentions</li>
                    <li>• Status changes</li>
                    <li>• Task completions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔍</span>
                    Smart Filtering
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Filter by activity type</li>
                    <li>• View all or specific activities</li>
                    <li>• Real-time updates</li>
                    <li>• Activity count badges</li>
                    <li>• Type-based color coding</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📅</span>
                    Smart Grouping
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Group by time (Today, Yesterday, This Week)</li>
                    <li>• Group by activity type</li>
                    <li>• Chronological ordering</li>
                    <li>• Relative timestamps</li>
                    <li>• Sticky group headers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Rich Details
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• User attribution</li>
                    <li>• Target objects and links</li>
                    <li>• Additional metadata</li>
                    <li>• Visual type indicators</li>
                    <li>• Hover interactions</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
