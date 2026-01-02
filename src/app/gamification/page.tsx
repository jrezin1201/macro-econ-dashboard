/**
 * Gamification System Page
 *
 * Points, badges, achievements, leaderboards, and progress tracking
 */

"use client";

import { GamificationDashboard } from "@/modules/gamification";
import { Card } from "@/components/ui/Card";

export default function GamificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Gamification System</h1>
          <p className="text-xl text-white/60">
            Points, badges, achievements, and leaderboards to drive engagement
          </p>
        </div>

        <section>
          <GamificationDashboard />
        </section>

        <div className="border-t border-white/10"></div>

        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    Points & Levels
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Earn points for activities</li>
                    <li>• Level up system</li>
                    <li>• Progress tracking</li>
                    <li>• XP requirements per level</li>
                    <li>• Visual progress bars</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎖️</span>
                    Badge System
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Collectible badges</li>
                    <li>• Rarity tiers (common to legendary)</li>
                    <li>• Progress tracking per badge</li>
                    <li>• Earned/locked states</li>
                    <li>• Visual badge gallery</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    Achievements
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Unlockable achievements</li>
                    <li>• Point rewards</li>
                    <li>• Completion tracking</li>
                    <li>• Achievement history</li>
                    <li>• Milestone celebrations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Leaderboards
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Global rankings</li>
                    <li>• Top player highlights</li>
                    <li>• Rank badges (gold/silver/bronze)</li>
                    <li>• Real-time updates</li>
                    <li>• Competitive stats</li>
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
