/**
 * Centralized Navigation Configuration
 * Single source of truth for sidebar and mobile navigation
 * Organized by workflow-first principles
 */

import {
  HomeIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BeakerIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  BuildingOffice2Icon,
  DocumentTextIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: string;
  description?: string; // For tooltips or page purpose
}

export interface NavGroup {
  label: string;
  items: NavItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

/**
 * Workflow-first navigation structure
 * Order matches natural decision flow:
 * 1. Learn + Setup (Guide, Portfolio)
 * 2. Weekly Workflow (Macro → Engines → Confirmations)
 * 3. Analysis Tools (deeper dives)
 * 4. Dev Tabs (experimental)
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "START HERE",
    defaultOpen: true,
    items: [
      {
        label: "Guide",
        href: "/guide",
        icon: BookOpenIcon,
        description: "Learn how to use this dashboard",
      },
      {
        label: "Portfolio",
        href: "/portfolio",
        icon: BriefcaseIcon,
        description: "Manage your holdings and see engine allocation",
      },
    ],
  },
  {
    label: "WEEKLY WORKFLOW",
    defaultOpen: true,
    items: [
      {
        label: "Macro Regime",
        href: "/macro/regime",
        icon: BeakerIcon,
        description: "Identify the environment and risk posture",
      },
      {
        label: "Equity Breadth",
        href: "/macro/breadth",
        icon: ChartBarIcon,
        description: "Confirmation: Market participation health",
      },
      {
        label: "Credit Microstress",
        href: "/macro/microstress",
        icon: ShieldCheckIcon,
        description: "Confirmation: Short-term funding stress signals",
      },
      {
        label: "Bitcoin Analysis",
        href: "/bitcoin",
        icon: CurrencyDollarIcon,
        description: "Confirmation: Crypto trend for volatility exposure",
      },
      {
        label: "Economic Engines",
        href: "/engines",
        icon: Cog6ToothIcon,
        description: "Translate environment into what to overweight/avoid",
      },
    ],
  },
  {
    label: "ANALYSIS TOOLS",
    defaultOpen: false,
    collapsible: true,
    items: [
      {
        label: "Dashboard",
        href: "/",
        icon: HomeIcon,
        description: "Overview of all metrics",
      },
      {
        label: "Company Analysis",
        href: "/company",
        icon: BuildingOffice2Icon,
        description: "Deep dive on individual stocks",
      },
      {
        label: "Data Explorer",
        href: "/explore",
        icon: MagnifyingGlassIcon,
        description: "Browse FRED economic data",
      },
      {
        label: "Chart Builder",
        href: "/charts",
        icon: ChartBarIcon,
        description: "Custom chart creation",
      },
      {
        label: "Correlations",
        href: "/correlations",
        icon: ChartBarIcon,
        description: "Cross-asset correlation analysis",
      },
      {
        label: "Custom Analysis",
        href: "/analysis",
        icon: BeakerIcon,
        description: "Build custom indicators",
      },
      {
        label: "U.S. Macro",
        href: "/macro/us",
        icon: HomeIcon,
        description: "Detailed U.S. economic data",
      },
    ],
  },
  {
    label: "DEV TABS",
    defaultOpen: false,
    collapsible: true,
    items: [
      {
        label: "Data Sources",
        href: "/data-sources",
        icon: DocumentTextIcon,
        description: "API documentation",
      },
      {
        label: "Global Macro",
        href: "/macro/global",
        icon: GlobeAltIcon,
        description: "International economic data",
      },
      {
        label: "China Macro",
        href: "/macro/china",
        icon: GlobeAltIcon,
        description: "Chinese economic indicators",
      },
      {
        label: "India Macro",
        href: "/macro/india",
        icon: GlobeAltIcon,
        description: "Indian economic data",
      },
      {
        label: "Europe Macro",
        href: "/macro/europe",
        icon: GlobeAltIcon,
        description: "European economic indicators",
      },
      {
        label: "Blockchain.com",
        href: "/blockchain",
        icon: CurrencyDollarIcon,
        description: "Bitcoin blockchain metrics",
      },
      {
        label: "MCP Data Sources",
        href: "/mcp",
        icon: GlobeAltIcon,
        description: "Model Context Protocol data",
      },
    ],
  },
];

/**
 * Flatten all nav items for search/lookup
 */
export const ALL_NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((group) => group.items);

/**
 * Find nav item by href
 */
export function findNavItem(href: string): NavItem | undefined {
  return ALL_NAV_ITEMS.find((item) => item.href === href);
}

/**
 * Get group containing a specific href
 */
export function findGroupForHref(href: string): NavGroup | undefined {
  return NAV_GROUPS.find((group) => group.items.some((item) => item.href === href));
}
