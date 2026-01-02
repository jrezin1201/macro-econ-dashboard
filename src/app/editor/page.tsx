"use client";
import { RichTextEditor } from "@/modules/editor";
export default function EditorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Rich Text Editor</h1>
          <p className="text-xl text-white/60">WYSIWYG content editor with formatting tools</p>
        </div>
        <section><RichTextEditor /></section>
      </div>
    </div>
  );
}
