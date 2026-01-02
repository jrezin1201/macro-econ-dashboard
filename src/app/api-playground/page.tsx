/**
 * API Playground Page
 *
 * Interactive API documentation and testing tool with code snippets
 */

"use client";

import { APIPlayground } from "@/modules/api-playground";
import { Card } from "@/components/ui/Card";

export default function APIPlaygroundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-[1600px] mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            API Playground
          </h1>
          <p className="text-xl text-white/60">
            Interactive API documentation with request builder and code generation
          </p>
        </div>

        {/* API Playground */}
        <section>
          <APIPlayground />
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
                    <span className="text-2xl">📖</span>
                    Endpoint Browser
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Organized by category</li>
                    <li>• Search functionality</li>
                    <li>• Method color coding</li>
                    <li>• Quick endpoint selection</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔧</span>
                    Request Builder
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Method selector (GET, POST, etc.)</li>
                    <li>• Headers editor</li>
                    <li>• JSON body editor</li>
                    <li>• Send & test requests</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">💻</span>
                    Code Generation
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• cURL commands</li>
                    <li>• JavaScript/Fetch</li>
                    <li>• Python/Requests</li>
                    <li>• Ruby/Net::HTTP</li>
                    <li>• One-click copy</li>
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
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    APIPlayground
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Complete API testing interface with endpoints, request builder, and response viewer
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { APIPlayground } from "@/modules/api-playground";

<APIPlayground />`}
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    CodeSnippets
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Multi-language code generator for API requests
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { CodeSnippets } from "@/modules/api-playground";

<CodeSnippets request={requestData} />`}
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
