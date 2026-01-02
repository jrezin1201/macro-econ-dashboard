/**
 * Module Showcase Page
 *
 * Displays all 14 modules in The Nexus catalog
 * Access at /showcase to see all components
 */

import { getAllModules } from "@/config/registry";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { isFeatureActive } from "@/config/site-config";

export default function ShowcasePage() {
  const modules = getAllModules();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            The Nexus Module Catalog
          </h1>
          <p className="text-xl text-white/60">
            14 production-ready modules across 10 categories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const active = isFeatureActive(module.id);

            return (
              <Link key={module.id} href={module.route}>
                <Card hover={true} glow={active ? "purple" : undefined}>
                  <div className="p-6">
                    <div className="text-4xl mb-4">{module.icon}</div>

                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {module.name}
                      </h3>
                      {module.isNew && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-green-500 text-white rounded">
                          NEW
                        </span>
                      )}
                      {module.isPro && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-purple-500 text-white rounded">
                          PRO
                        </span>
                      )}
                      {!active && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-gray-500 text-white rounded">
                          OFF
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-white/60 mb-4 line-clamp-3">
                      {module.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {module.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-white/5 text-white/60 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 text-sm text-purple-400 font-medium">
                      View Module →
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm">
            Toggle modules in <code className="bg-white/10 px-2 py-1 rounded">src/config/site-config.ts</code>
          </p>
        </div>
      </div>
    </div>
  );
}
