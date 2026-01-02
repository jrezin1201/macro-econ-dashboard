/**
 * Site Configuration - The Master Toggle
 *
 * This file controls which features are visible/active in the app.
 * Edit this file to turn features on/off without touching code.
 */

export type Theme = "purple" | "blue" | "green" | "orange" | "pink" | "monochrome";

export type FeatureId =
  | "landing"
  | "auth"
  | "billing"
  | "component-lib"
  | "ai-studio"
  | "admin"
  // Professional Services & CRM
  | "crm"
  | "scheduler"
  // Marketing & Social Proof
  | "marketing-tools"
  // Education & Community
  | "lms"
  | "community"
  // Advanced Admin & Operations
  | "admin-ops"
  // Fintech & Data Visualization
  | "fintech"
  // Creative & Interactive
  | "effects"
  // NEW: Priority Showcase Modules
  | "canvas"
  | "dashboard-builder"
  | "workflows"
  | "api-playground"
  | "estimator"
  // Batch 1: Additional Modules
  | "audit-log"
  | "2fa-setup"
  | "notifications"
  | "export-studio"
  // Batch 2: More Modules
  | "documents"
  | "activity"
  | "gamification"
  | "affiliates"
  // Batch 3: Final Modules
  | "configurator"
  | "webhooks"
  | "editor"
  | "media"
  | "product-tour"
  | "knowledge-base"
  | "integrations"
  | "templates";

export interface SiteConfig {
  // App Metadata
  name: string;
  description: string;
  url: string;

  // Feature Flags - Turn modules on/off
  activeFeatures: FeatureId[];

  // UI Configuration
  theme: Theme;
  isCatalog: boolean;  // Show sidebar catalog of all modules
  showAdmin: boolean;  // Hidden admin panel toggle

  // Social & SEO
  links: {
    twitter?: string;
    github?: string;
    docs?: string;
  };
}

export const siteConfig: SiteConfig = {
  // App Metadata
  name: "Finance Dashboard",
  description: "Economic data visualization platform powered by FRED (Federal Reserve Economic Data)",
  url: "https://finance-dashboard.example.com",

  // Feature Flags
  // Add/remove features from this array to enable/disable them
  activeFeatures: [
    "landing",      // Landing page
    "fintech",      // Financial analytics & FRED data
    "dashboard-builder", // Custom dashboard builder
    "export-studio", // Data export studio
    "notifications", // Notification center
  ],

  // UI Configuration
  theme: "blue",             // Financial blue theme
  isCatalog: false,          // Dashboard mode, not catalog
  showAdmin: true,           // Admin features for data management

  // Social & SEO
  links: {
    github: "https://github.com/yourusername/finance-dashboard",
    docs: "https://fred.stlouisfed.org/docs/api/",
  },
};

/**
 * Helper function to check if a feature is active
 */
export function isFeatureActive(featureId: FeatureId): boolean {
  return siteConfig.activeFeatures.includes(featureId);
}

/**
 * Get all active features
 */
export function getActiveFeatures(): FeatureId[] {
  return siteConfig.activeFeatures;
}

/**
 * Get current theme
 */
export function getCurrentTheme(): Theme {
  return siteConfig.theme;
}
