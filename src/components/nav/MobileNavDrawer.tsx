"use client";

/**
 * Mobile Navigation Drawer
 *
 * Slide-over navigation panel for mobile devices
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { navSections } from "@/lib/nav/navItems";

interface Props {
  open: boolean;
  onClose: () => void;
  currentPath: string;
}

export function MobileNavDrawer({ open, onClose, currentPath }: Props) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Main": true,
    "Macro Analysis": true,
    "Company Analysis": true,
    "Dev Tabs": false,
  });

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open, onClose]);

  if (!open) return null;

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className="fixed left-0 top-0 h-full w-[280px] max-w-[85vw] bg-gray-900/95 backdrop-blur-sm border-r border-white/10 z-50 shadow-2xl overflow-y-auto transition-transform duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Finance Dashboard</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-2 -mr-2"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="p-4 space-y-6">
          {navSections.map((section) => {
            const isExpanded = expandedSections[section.title] ?? section.defaultExpanded ?? true;

            return (
              <div key={section.title}>
                {/* Section Header */}
                {section.title !== "Main" && (
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex items-center justify-between w-full text-xs font-semibold leading-6 text-gray-400 hover:text-white mb-2"
                  >
                    {section.title}
                    <svg
                      className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                {/* Section Items */}
                {isExpanded && (
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = currentPath === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={onClose} // Close drawer on navigation
                            className={`
                              flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold transition-all min-h-[44px]
                              ${
                                isActive
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-300 hover:text-white hover:bg-white/10 active:bg-white/20"
                              }
                            `}
                          >
                            <item.icon
                              className={`h-6 w-6 shrink-0 ${
                                isActive ? "text-white" : "text-gray-400"
                              }`}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="p-4 mt-auto border-t border-white/10">
          <div className="rounded-lg bg-white/5 p-3 border border-white/10">
            <p className="text-xs text-white/60 mb-1">Data Source</p>
            <a
              href="https://fred.stlouisfed.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              FRED API
            </a>
            <p className="text-xs text-white/40 mt-1">
              Federal Reserve Economic Data
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
