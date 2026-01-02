/**
 * Two-Factor Authentication Setup Page
 *
 * Step-by-step wizard for setting up 2FA with authenticator apps or SMS
 */

"use client";

import { TwoFactorSetup } from "@/modules/2fa-setup";
import { Card } from "@/components/ui/Card";

export default function TwoFactorSetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Two-Factor Authentication Setup
          </h1>
          <p className="text-xl text-white/60">
            Secure your account with 2FA using authenticator apps or SMS
          </p>
        </div>

        {/* 2FA Setup Demo */}
        <section>
          <TwoFactorSetup />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Features */}
        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    Multiple Methods
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Authenticator app (TOTP)</li>
                    <li>• SMS verification</li>
                    <li>• Both methods for redundancy</li>
                    <li>• Works with Google Authenticator, Authy, 1Password</li>
                    <li>• International SMS support</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔐</span>
                    Security Features
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• QR code for easy setup</li>
                    <li>• Manual secret key entry</li>
                    <li>• 8 backup recovery codes</li>
                    <li>• Code verification before activation</li>
                    <li>• Secure code download/copy</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    Guided Setup Flow
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Step-by-step wizard interface</li>
                    <li>• Progress bar showing completion</li>
                    <li>• Clear instructions at each step</li>
                    <li>• Method selection with recommendations</li>
                    <li>• Verification before completion</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">💾</span>
                    Backup & Recovery
                  </h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>• Download backup codes as text file</li>
                    <li>• Copy all codes to clipboard</li>
                    <li>• One-time use codes</li>
                    <li>• Recovery options explained</li>
                    <li>• Secure storage recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Component Documentation */}
        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Component Documentation
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* TwoFactorSetup */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    TwoFactorSetup
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Main wizard component managing the entire setup flow
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { TwoFactorSetup } from "@/modules/2fa-setup";

<TwoFactorSetup />`}
                    </code>
                  </div>
                </div>

                {/* MethodSelection */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    MethodSelection
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Choose between authenticator, SMS, or both methods
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { MethodSelection } from "@/modules/2fa-setup";

<MethodSelection
  onSelect={(method) => {}}
/>`}
                    </code>
                  </div>
                </div>

                {/* AuthenticatorSetup */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    AuthenticatorSetup
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    QR code and manual entry for authenticator apps
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { AuthenticatorSetup } from "@/modules/2fa-setup";

<AuthenticatorSetup
  secretKey="JBSWY3DPEHPK3PXP"
  qrCode="data:image/..."
  onComplete={() => {}}
/>`}
                    </code>
                  </div>
                </div>

                {/* BackupCodes */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    BackupCodes
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Display and save recovery backup codes
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { BackupCodes } from "@/modules/2fa-setup";

<BackupCodes
  codes={["ABC123", "DEF456", ...]}
  onAcknowledge={() => {}}
/>`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
