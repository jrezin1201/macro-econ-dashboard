"use client";

import { MediaLibrary } from "@/modules/media";

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Media Library</h1>
          <p className="text-xl text-white/60">
            Organize and manage your media assets with powerful filtering and views
          </p>
        </div>
        <section>
          <MediaLibrary />
        </section>
      </div>
    </div>
  );
}
