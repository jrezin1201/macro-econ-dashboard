/**
 * Workflow Automation Builder Page
 *
 * Visual automation builder with node-based workflow editor
 */

"use client";

import { WorkflowBuilder } from "@/modules/workflows";
import { Card } from "@/components/ui/Card";

export default function WorkflowsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-[1600px] mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Workflow Automation Builder
          </h1>
          <p className="text-xl text-white/60">
            Visual node-based automation builder like Zapier or Make
          </p>
        </div>

        {/* Workflow Builder */}
        <section>
          <WorkflowBuilder />
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
                    <span className="text-2xl">🎯</span>
                    Node Types
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Triggers (webhook, schedule, form)</li>
                    <li>• Conditions (if/else branching)</li>
                    <li>• Actions (email, API, database)</li>
                    <li>• Drag from sidebar to add</li>
                    <li>• Click to configure</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔗</span>
                    Visual Connections
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Drag from output to input ports</li>
                    <li>• Animated flow lines</li>
                    <li>• Visual execution indicators</li>
                    <li>• Bezier curve connections</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">▶️</span>
                    Test & Execute
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Test workflow button</li>
                    <li>• Live execution log</li>
                    <li>• Step-by-step simulation</li>
                    <li>• Save/load workflows</li>
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
                    WorkflowBuilder
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Main workflow component with canvas, node library, and execution engine
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { WorkflowBuilder } from "@/modules/workflows";

<WorkflowBuilder />`}
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    WorkflowNode
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Individual workflow node with input/output ports
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { WorkflowNode } from "@/modules/workflows";

<WorkflowNode
  node={nodeData}
  isSelected={false}
  onSelect={() => {}}
  onDelete={() => {}}
  onMove={(x, y) => {}}
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
