/**
 * Shared Navigation Configuration
 *
 * Used by both desktop Sidebar and mobile MobileNavDrawer
 */

import {
  HomeIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  ArrowsRightLeftIcon,
  BeakerIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  BookOpenIcon,
  BuildingOffice2Icon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  TruckIcon,
  NewspaperIcon,
  SignalIcon,
  LightBulbIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface NavSection {
  title: string;
  items: NavItem[];
  defaultExpanded?: boolean;
}

// Main navigation items
export const mainNavigation: NavItem[] = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Guide", href: "/guide", icon: BookOpenIcon },
  { name: "Data Explorer", href: "/explore", icon: MagnifyingGlassIcon },
  { name: "Chart Builder", href: "/charts", icon: ChartBarIcon },
  { name: "Correlations", href: "/correlations", icon: ArrowsRightLeftIcon },
  { name: "Custom Analysis", href: "/analysis", icon: BeakerIcon },
];

// Macro Analysis section
export const macroNavigation: NavItem[] = [
  { name: "Macro Regime", href: "/macro/regime", icon: BeakerIcon },
  { name: "Equity Breadth", href: "/macro/breadth", icon: ChartBarIcon },
  { name: "Credit Microstress", href: "/macro/microstress", icon: BeakerIcon },
  { name: "Bitcoin Analysis", href: "/bitcoin", icon: CurrencyDollarIcon },
  { name: "U.S. Macro", href: "/macro/us", icon: HomeIcon },
];

// Company Analysis section
export const companyNavigation: NavItem[] = [
  { name: "Company Search", href: "/company", icon: MagnifyingGlassIcon },
  { name: "Overview", href: "/company/AAPL/overview", icon: BuildingOffice2Icon },
  { name: "Financials", href: "/company/AAPL/financials", icon: DocumentChartBarIcon },
  { name: "Quality & Returns", href: "/company/AAPL/quality", icon: ShieldCheckIcon },
  { name: "Capital Allocation", href: "/company/AAPL/capital", icon: BanknotesIcon },
  { name: "Supply Chain", href: "/company/AAPL/supply-chain", icon: TruckIcon },
  { name: "Macro Sensitivity", href: "/company/AAPL/macro-news", icon: NewspaperIcon },
  { name: "Positioning", href: "/company/AAPL/positioning", icon: SignalIcon },
  { name: "Scenarios", href: "/company/AAPL/scenarios", icon: LightBulbIcon },
  { name: "Report", href: "/company/AAPL/report", icon: ClipboardDocumentListIcon },
];

// Dev Tabs section
export const devTabsNavigation: NavItem[] = [
  { name: "Data Sources", href: "/data-sources", icon: DocumentTextIcon },
  { name: "Global Macro", href: "/macro/global", icon: GlobeAltIcon },
  { name: "China Macro", href: "/macro/china", icon: GlobeAltIcon },
  { name: "India Macro", href: "/macro/india", icon: GlobeAltIcon },
  { name: "Europe Macro", href: "/macro/europe", icon: GlobeAltIcon },
  { name: "Bitcoin (FRED)", href: "/macro/bitcoin", icon: CurrencyDollarIcon },
  { name: "Blockchain.com", href: "/blockchain", icon: CurrencyDollarIcon },
  { name: "MCP Data Sources", href: "/mcp", icon: GlobeAltIcon },
];

// All navigation sections
export const navSections: NavSection[] = [
  {
    title: "Main",
    items: mainNavigation,
    defaultExpanded: true,
  },
  {
    title: "Macro Analysis",
    items: macroNavigation,
    defaultExpanded: true,
  },
  {
    title: "Company Analysis",
    items: companyNavigation,
    defaultExpanded: true,
  },
  {
    title: "Dev Tabs",
    items: devTabsNavigation,
    defaultExpanded: false,
  },
];

// Flatten all nav items for easy searching
export const allNavItems: NavItem[] = [
  ...mainNavigation,
  ...macroNavigation,
  ...companyNavigation,
  ...devTabsNavigation,
];
