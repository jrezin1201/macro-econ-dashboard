"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MobileNavDrawer } from "@/components/nav/MobileNavDrawer";
import { PortfolioStatusPill } from "@/components/portfolio/PortfolioStatusPill";
import { PortfolioQuickDrawer } from "@/components/portfolio/PortfolioQuickDrawer";
import {
  mainNavigation,
  weeklyWorkflowNavigation,
  analysisToolsNavigation,
  companyNavigation,
  devTabsNavigation,
  allNavItems,
} from "@/lib/nav/navItems";

export function Sidebar() {
  const pathname = usePathname();
  const [weeklyWorkflowExpanded, setWeeklyWorkflowExpanded] = useState(true);
  const [analysisToolsExpanded, setAnalysisToolsExpanded] = useState(false);
  const [companyExpanded, setCompanyExpanded] = useState(false);
  const [devTabsExpanded, setDevTabsExpanded] = useState(false);
  const [portfolioDrawerOpen, setPortfolioDrawerOpen] = useState(false);

  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900/95 backdrop-blur-sm border-r border-white/10 px-6 pb-4">
          {/* Logo/Brand */}
          <div className="flex h-16 shrink-0 items-center justify-between">
            <h1 className="text-xl font-bold text-white">Finance Dashboard</h1>
          </div>

          {/* Portfolio Status Pill */}
          <div className="-mx-2">
            <PortfolioStatusPill onClick={() => setPortfolioDrawerOpen(true)} />
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              {/* Start Here Section */}
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400 mb-2">START HERE</div>
                <ul role="list" className="-mx-2 space-y-1">
                  {mainNavigation.map((item) => {
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

              {/* Weekly Workflow Section */}
              <li>
                <button
                  onClick={() => setWeeklyWorkflowExpanded(!weeklyWorkflowExpanded)}
                  className="flex items-center justify-between w-full text-xs font-semibold leading-6 text-gray-400 hover:text-white"
                >
                  WEEKLY WORKFLOW
                  <svg
                    className={`h-5 w-5 transition-transform ${weeklyWorkflowExpanded ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {weeklyWorkflowExpanded && (
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {weeklyWorkflowNavigation.map((item) => {
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

              {/* Analysis Tools Section */}
              <li>
                <button
                  onClick={() => setAnalysisToolsExpanded(!analysisToolsExpanded)}
                  className="flex items-center justify-between w-full text-xs font-semibold leading-6 text-gray-400 hover:text-white"
                >
                  ANALYSIS TOOLS
                  <svg
                    className={`h-5 w-5 transition-transform ${analysisToolsExpanded ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {analysisToolsExpanded && (
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {analysisToolsNavigation.map((item) => {
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

              {/* Company Analysis Section */}
              <li>
                <button
                  onClick={() => setCompanyExpanded(!companyExpanded)}
                  className="flex items-center justify-between w-full text-xs font-semibold leading-6 text-gray-400 hover:text-white"
                >
                  COMPANY ANALYSIS
                  <svg
                    className={`h-5 w-5 transition-transform ${companyExpanded ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {companyExpanded && (
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {companyNavigation.map((item) => {
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

              {/* Dev Tabs Section */}
              <li>
                <button
                  onClick={() => setDevTabsExpanded(!devTabsExpanded)}
                  className="flex items-center justify-between w-full text-xs font-semibold leading-6 text-gray-400 hover:text-white"
                >
                  DEV TABS
                  <svg
                    className={`h-5 w-5 transition-transform ${devTabsExpanded ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {devTabsExpanded && (
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {devTabsNavigation.map((item) => {
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

      {/* Portfolio Quick Drawer */}
      <PortfolioQuickDrawer
        open={portfolioDrawerOpen}
        onClose={() => setPortfolioDrawerOpen(false)}
      />
    </div>
  );
}

export function MobileSidebar() {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [portfolioDrawerOpen, setPortfolioDrawerOpen] = useState(false);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileNavOpen]);

  // Find current page name
  const currentPageName = allNavItems.find(item => item.href === pathname)?.name || "Finance Dashboard";

  return (
    <div>
      <div className="lg:hidden">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-2 border-b border-white/10 bg-gray-900/95 backdrop-blur-sm px-4 shadow-sm">
          {/* Hamburger Button */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="text-white/80 hover:text-white p-2 -ml-2"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Page Title */}
          <h1 className="flex-1 text-sm md:text-base font-semibold text-white truncate">
            {currentPageName}
          </h1>

          {/* Portfolio Status Pill */}
          <PortfolioStatusPill onClick={() => setPortfolioDrawerOpen(true)} />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        currentPath={pathname}
      />

      {/* Portfolio Quick Drawer */}
      <PortfolioQuickDrawer
        open={portfolioDrawerOpen}
        onClose={() => setPortfolioDrawerOpen(false)}
      />
    </div>
  );
}
