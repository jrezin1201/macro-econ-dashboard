/**
 * Real-time Collaboration Canvas Page
 *
 * Figma/Miro-style infinite whiteboard with simulated real-time collaboration
 */

"use client";

import { CollaborationCanvas } from "@/modules/canvas";
import { Card } from "@/components/ui/Card";

export default function CanvasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Collaboration Canvas
          </h1>
          <p className="text-xl text-white/60">
            Infinite whiteboard with simulated real-time collaboration, pan & zoom
          </p>
        </div>

        {/* Canvas Demo */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Interactive Canvas</h2>
            <p className="text-white/60">
              Use the toolbar to select tools, click to create sticky notes, drag to move them around.
              Mouse wheel to zoom, click and drag background to pan.
            </p>
          </div>
          <CollaborationCanvas />
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
                    <span className="text-2xl">🎨</span>
                    Infinite Canvas
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Pan: Click and drag background</li>
                    <li>• Zoom: Mouse wheel (50% - 200%)</li>
                    <li>• Grid background with responsive scaling</li>
                    <li>• Smooth transform animations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📝</span>
                    Sticky Notes
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Click canvas to create notes</li>
                    <li>• Drag to reposition</li>
                    <li>• Double-click to edit content</li>
                    <li>• 5 color options (hover to see picker)</li>
                    <li>• Delete with × button</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">👥</span>
                    Simulated Collaboration
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Avatar indicators show &quot;online users&quot;</li>
                    <li>• Animated cursors with user names</li>
                    <li>• Real-time cursor movement simulation</li>
                    <li>• Presence awareness visualization</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🗺️</span>
                    Navigation Tools
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Mini-map showing viewport position</li>
                    <li>• Layers panel listing all objects</li>
                    <li>• Click layer to pan to object</li>
                    <li>• Visual object type indicators</li>
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
                {/* CollaborationCanvas */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    CollaborationCanvas
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Main canvas component with infinite pan/zoom and tool support
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { CollaborationCanvas } from "@/modules/canvas";

<CollaborationCanvas />`}
                    </code>
                  </div>
                </div>

                {/* StickyNote */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    StickyNote
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Draggable, editable sticky note with color options
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { StickyNote } from "@/modules/canvas";

<StickyNote
  id="1"
  x={100}
  y={100}
  content="Note text"
  color="yellow"
  onUpdate={(id, content, color) => {}}
  onDelete={(id) => {}}
  onMove={(id, dx, dy) => {}}
/>`}
                    </code>
                  </div>
                </div>

                {/* Toolbar */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Toolbar
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Tool selection and zoom controls
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { Toolbar } from "@/modules/canvas";

<Toolbar
  currentTool="select"
  onSelectTool={(tool) => {}}
  zoom={1}
  onZoomChange={(zoom) => {}}
/>`}
                    </code>
                  </div>
                </div>

                {/* PresenceIndicators */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    PresenceIndicators
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Simulated user avatars and animated cursors
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { PresenceIndicators } from "@/modules/canvas";

<PresenceIndicators />`}
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
