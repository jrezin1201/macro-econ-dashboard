"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  ArrowsRightLeftIcon,
  BeakerIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Data Explorer", href: "/explore", icon: MagnifyingGlassIcon },
  { name: "Chart Builder", href: "/charts", icon: ChartBarIcon },
  { name: "Correlations", href: "/correlations", icon: ArrowsRightLeftIcon },
  { name: "Custom Analysis", href: "/analysis", icon: BeakerIcon },
];

const macroNavigation = [
  { name: "Global Macro", href: "/macro/global", icon: GlobeAltIcon },
  { name: "U.S. Macro", href: "/macro/us", icon: HomeIcon },
  { name: "China Macro", href: "/macro/china", icon: GlobeAltIcon },
  { name: "India Macro", href: "/macro/india", icon: GlobeAltIcon },
  { name: "Europe Macro", href: "/macro/europe", icon: GlobeAltIcon },
  { name: "Bitcoin (FRED)", href: "/macro/bitcoin", icon: CurrencyDollarIcon },
  { name: "Blockchain.com", href: "/blockchain", icon: CurrencyDollarIcon },
  { name: "MCP Data Sources", href: "/mcp", icon: GlobeAltIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const [macroExpanded, setMacroExpanded] = useState(true);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900/95 backdrop-blur-sm border-r border-white/10 px-6 pb-4">
        {/* Logo/Brand */}
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-xl font-bold text-white">
            Finance Dashboard
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            {/* Main Navigation */}
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all
                          ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:text-white hover:bg-white/10"
                          }
                        `}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${
                            isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            {/* Macro Analysis Section */}
            <li>
              <button
                onClick={() => setMacroExpanded(!macroExpanded)}
                className="flex items-center justify-between w-full text-xs font-semibold leading-6 text-gray-400 hover:text-white"
              >
                Macro Analysis
                <svg
                  className={`h-5 w-5 transition-transform ${macroExpanded ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {macroExpanded && (
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {macroNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`
                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all
                            ${
                              isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:text-white hover:bg-white/10"
                            }
                          `}
                        >
                          <item.icon
                            className={`h-6 w-6 shrink-0 ${
                              isActive ? "text-white" : "text-gray-400 group-hover:text-white"
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
            </li>

            {/* Info Section */}
            <li className="mt-auto">
              <div className="rounded-lg bg-white/5 p-4 border border-white/10">
                <p className="text-xs text-white/60 mb-2">Data Source</p>
                <a
                  href="https://fred.stlouisfed.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  FRED API
                </a>
                <p className="text-xs text-white/40 mt-2">
                  Federal Reserve Economic Data
                </p>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  return (
    <div className="lg:hidden">
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/10 bg-gray-900/95 backdrop-blur-sm px-4 shadow-sm">
        <h1 className="text-lg font-bold text-white">Finance Dashboard</h1>
      </div>
    </div>
  );
}
