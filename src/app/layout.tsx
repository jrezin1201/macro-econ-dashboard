import React from "react";
import "./globals.css";
import "./theme.css";
import type { Metadata, Viewport } from "next";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { Sidebar, MobileSidebar } from "@/components/navigation/Sidebar";
import { siteConfig } from "@/config/site-config";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} - Next.js + Auth + Payments`,
  description: siteConfig.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={robotoMono.variable} data-theme="purple" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'purple';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen" suppressHydrationWarning>
        <ErrorBoundary>
          <SessionProvider>
            <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
              <Sidebar />
              <div className="lg:pl-64 flex-1">
                <MobileSidebar />
                <main className="py-6 px-4 sm:px-6 lg:px-8">
                  {children}
                </main>
              </div>
            </div>
            <FeedbackWidget />
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
