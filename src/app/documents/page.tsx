/**
 * Document Generator Page
 *
 * Create professional documents from templates with variable filling and PDF export
 */

"use client";

import { DocumentGenerator } from "@/modules/documents";
import { Card } from "@/components/ui/Card";

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Document Generator</h1>
          <p className="text-xl text-white/60">
            Create professional documents from templates with automated variable filling
          </p>
        </div>

        <section>
          <DocumentGenerator />
        </section>

        <div className="border-t border-white/10"></div>

        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📄</span>
                    Multiple Templates
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Professional invoices</li>
                    <li>• Service contracts</li>
                    <li>• Project proposals</li>
                    <li>• Business reports</li>
                    <li>• NDA agreements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Smart Variables
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Auto-populated fields</li>
                    <li>• Date pickers</li>
                    <li>• Currency formatting</li>
                    <li>• Required field validation</li>
                    <li>• Real-time preview</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📤</span>
                    Export & Download
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• PDF export</li>
                    <li>• Professional formatting</li>
                    <li>• Print-ready documents</li>
                    <li>• Instant download</li>
                    <li>• Save as template</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎨</span>
                    Professional Design
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Clean layouts</li>
                    <li>• Branded headers</li>
                    <li>• Structured sections</li>
                    <li>• Responsive preview</li>
                    <li>• Typography optimized</li>
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
