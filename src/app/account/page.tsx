"use client";

import { useSession, signOut } from "next-auth/react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  if (!session) {
    router.push("/");
    return null;
  }

  const user = session.user;
  const isPro = user?.isPro || false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
                <span className="text-lg font-bold text-white">Web App Template</span>
              </Link>
            </div>
            <Button
              variant="secondary"
              onClick={() => router.push("/")}
              size="sm"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Account" },
          ]}
        />
      </div>

      <div className="py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Card */}
          <Card glow="cyan">
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-4">Profile</h2>
              <div className="flex items-center gap-4 mb-6">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                    {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <div>
                  <div className="text-white font-semibold">{user.name}</div>
                  <div className="text-white/60 text-sm">{user.email}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-white/70 text-sm">Plan</span>
                  <span className={`font-semibold ${isPro ? "text-amber-300" : "text-white/90"}`}>
                    {isPro ? "Pro" : "Free"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-white/70 text-sm">Member since</span>
                  <span className="text-white/90 text-sm">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button
                  variant="secondary"
                  onClick={() => router.push("/billing")}
                  className="w-full justify-between"
                >
                  <span>{isPro ? "Manage Subscription" : "Upgrade to Pro"}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
                <Button
                  variant="danger"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </Card>

          {/* Info */}
          <div className="text-center">
            <p className="text-xs text-white/40">
              Your data is secure and never shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
