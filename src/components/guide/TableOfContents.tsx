"use client";

/**
 * Table of Contents Component
 *
 * Sticky TOC with smooth scrolling and active section tracking
 */

import { useState, useEffect } from "react";

interface Section {
  id: string;
  title: string;
  subsections?: { id: string; title: string }[];
}

interface Props {
  sections: Section[];
}

export function TableOfContents({ sections }: Props) {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);

      section.subsections?.forEach((subsection) => {
        const subElement = document.getElementById(subsection.id);
        if (subElement) observer.observe(subElement);
      });
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile TOC - Collapsible */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3"
        >
          <span className="text-sm font-semibold text-white">Sections</span>
          <svg
            className={`w-5 h-5 text-white/60 transition-transform ${
              isMobileOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isMobileOpen && (
          <div className="mt-2 bg-white/5 border border-white/10 rounded-lg p-3 space-y-2">
            {sections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    text-sm text-left w-full px-2 py-1.5 rounded transition-colors
                    ${activeSection === section.id ? "bg-blue-600 text-white font-medium" : "text-white/70 hover:text-white hover:bg-white/10"}
                  `}
                >
                  {section.title}
                </button>
                {section.subsections && (
                  <div className="ml-4 mt-1 space-y-1">
                    {section.subsections.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => scrollToSection(sub.id)}
                        className={`
                          text-xs text-left w-full px-2 py-1 rounded transition-colors
                          ${activeSection === sub.id ? "bg-blue-600/80 text-white" : "text-white/60 hover:text-white hover:bg-white/10"}
                        `}
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop TOC - Sticky Sidebar */}
      <div className="hidden lg:block sticky top-20 h-fit">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Contents</h3>
          <nav className="space-y-2">
            {sections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    text-sm text-left w-full px-3 py-2 rounded-md transition-colors
                    ${activeSection === section.id ? "bg-blue-600 text-white font-medium" : "text-white/70 hover:text-white hover:bg-white/10"}
                  `}
                >
                  {section.title}
                </button>
                {section.subsections && (
                  <div className="ml-3 mt-1 space-y-1 border-l-2 border-white/10 pl-3">
                    {section.subsections.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => scrollToSection(sub.id)}
                        className={`
                          text-xs text-left w-full px-2 py-1.5 rounded transition-colors
                          ${activeSection === sub.id ? "bg-blue-600/80 text-white" : "text-white/60 hover:text-white hover:bg-white/10"}
                        `}
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
