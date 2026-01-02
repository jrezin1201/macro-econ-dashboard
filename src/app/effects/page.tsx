/**
 * Interactive Effects Showcase
 *
 * Demonstrates typewriter effects, confetti, image hotspots, and progress circles
 */

"use client";

import { useState } from "react";
import {
  TypewriterEffect,
  TypewriterLines,
  ConfettiButton,
  useConfetti,
  ImageHotspot,
  NumberedHotspot,
  ProgressCircle,
  MultiSegmentCircle,
  ProfileCompletion,
  type Hotspot,
} from "@/modules/effects";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function EffectsPage() {
  const { fire, ConfettiContainer } = useConfetti();
  const [progress, setProgress] = useState(65);

  // Sample hotspots for image demo
  const hotspots: Hotspot[] = [
    {
      id: "1",
      x: 30,
      y: 40,
      title: "Feature A",
      description: "This is an amazing feature that helps users accomplish their goals faster.",
      link: "#",
    },
    {
      id: "2",
      x: 70,
      y: 35,
      title: "Feature B",
      description: "Another powerful capability built into the platform.",
    },
    {
      id: "3",
      x: 50,
      y: 70,
      title: "Feature C",
      description: "Collaborative tools that make teamwork seamless.",
      link: "#",
    },
  ];

  // Profile completion example
  const [profileTasks, setProfileTasks] = useState([
    { id: "1", label: "Add profile photo", completed: true },
    { id: "2", label: "Complete bio", completed: true },
    { id: "3", label: "Verify email", completed: true },
    { id: "4", label: "Connect social accounts", completed: false },
    { id: "5", label: "Add payment method", completed: false },
  ]);

  const toggleTask = (id: string) => {
    setProfileTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <ConfettiContainer />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            <TypewriterEffect
              text="Interactive Effects Library"
              speed={80}
              cursor={false}
            />
          </h1>
          <p className="text-xl text-white/60">
            Typewriters, confetti, hotspots, and progress indicators
          </p>
        </div>

        {/* Typewriter Section */}
        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Typewriter Effects
              </h2>

              <div className="space-y-6">
                {/* Single line */}
                <div>
                  <p className="text-sm text-white/60 mb-2">Single Line:</p>
                  <div className="text-xl text-white">
                    <TypewriterEffect
                      text="This text types out one character at a time..."
                      speed={50}
                    />
                  </div>
                </div>

                {/* Multi-line */}
                <div>
                  <p className="text-sm text-white/60 mb-2">Multi-Line:</p>
                  <TypewriterLines
                    lines={[
                      "First line appears...",
                      "Then the second line...",
                      "And finally the third!",
                    ]}
                    speed={40}
                    lineDelay={300}
                    className="text-lg text-white space-y-2"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-black/40 rounded-lg">
                <code className="text-sm text-green-400">
{`<TypewriterEffect
  text="Your text here"
  speed={50}
  cursor={true}
/>`}
                </code>
              </div>
            </div>
          </Card>
        </section>

        {/* Confetti Section */}
        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Confetti Effects
              </h2>

              <div className="flex flex-wrap gap-4">
                <ConfettiButton>
                  Click for Confetti!
                </ConfettiButton>

                <Button
                  onClick={() => fire({ count: 100 })}
                  variant="secondary"
                >
                  Full Screen Confetti
                </Button>

                <Button
                  onClick={() =>
                    fire({
                      count: 50,
                      colors: ["#ff0000", "#ffd700", "#ff1493"],
                    })
                  }
                  variant="secondary"
                >
                  Custom Colors
                </Button>
              </div>

              <div className="mt-6 p-4 bg-black/40 rounded-lg">
                <code className="text-sm text-green-400">
{`<ConfettiButton>Celebrate!</ConfettiButton>

// Or use the hook:
const { fire, ConfettiContainer } = useConfetti();
<button onClick={() => fire({ count: 100 })}>Fire!</button>
<ConfettiContainer />`}
                </code>
              </div>
            </div>
          </Card>
        </section>

        {/* Image Hotspot Section */}
        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Image Hotspots
              </h2>

              <p className="text-white/60 mb-4">
                Click the pulsing dots to reveal information
              </p>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Pulse style */}
                <div>
                  <p className="text-sm text-white/60 mb-3">Pulse Style:</p>
                  <ImageHotspot
                    imageUrl="https://via.placeholder.com/600x400/1a1a1a/666?text=Product+Demo"
                    hotspots={hotspots}
                    imageAlt="Product demo"
                  />
                </div>

                {/* Numbered style */}
                <div>
                  <p className="text-sm text-white/60 mb-3">Numbered Style:</p>
                  <NumberedHotspot
                    imageUrl="https://via.placeholder.com/600x400/1a1a1a/666?text=Feature+Tour"
                    hotspots={hotspots}
                    imageAlt="Feature tour"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-black/40 rounded-lg">
                <code className="text-sm text-green-400">
{`<ImageHotspot
  imageUrl="/product.jpg"
  hotspots={[{
    id: "1",
    x: 30, y: 40,
    title: "Feature",
    description: "Details..."
  }]}
/>`}
                </code>
              </div>
            </div>
          </Card>
        </section>

        {/* Progress Circle Section */}
        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Progress Circles
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Single progress */}
                <div className="flex flex-col items-center gap-4">
                  <ProgressCircle
                    percentage={progress}
                    color="#8b5cf6"
                    label="Loading..."
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                    >
                      -10%
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                    >
                      +10%
                    </Button>
                  </div>
                </div>

                {/* Multi-segment */}
                <div className="flex flex-col items-center">
                  <MultiSegmentCircle
                    segments={[
                      { label: "Completed", percentage: 40, color: "#10b981" },
                      { label: "In Progress", percentage: 30, color: "#3b82f6" },
                      { label: "Pending", percentage: 15, color: "#f59e0b" },
                    ]}
                  />
                </div>

                {/* Profile completion */}
                <div className="flex flex-col items-center">
                  <ProfileCompletion tasks={profileTasks} size={100} />
                  <div className="mt-4 space-y-2">
                    {profileTasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className="text-xs text-white/60 hover:text-white"
                      >
                        Toggle {task.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-black/40 rounded-lg">
                <code className="text-sm text-green-400">
{`<ProgressCircle
  percentage={75}
  size={120}
  color="#8b5cf6"
  label="Complete"
/>`}
                </code>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
