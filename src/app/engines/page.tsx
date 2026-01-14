/**
 * Economic Engines Page
 *
 * Shows which engines are favored by current macro conditions
 * and compares to your portfolio allocation.
 */

import { EnginesClient } from "@/components/engines/EnginesClient";
import { WorkflowBreadcrumb } from "@/components/workflow/WorkflowBreadcrumb";
import { PagePurpose, PAGE_PURPOSES } from "@/components/workflow/PagePurpose";

export const metadata = {
  title: "Economic Engines | Finance Dashboard",
  description: "12 economic engines mapped to current macro regime",
};

export default function EnginesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Workflow Breadcrumb */}
        <WorkflowBreadcrumb currentKey="engines" />

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Economic Engines</h1>
          <PagePurpose purpose={PAGE_PURPOSES.engines} />
        </div>

        {/* Client-side Engines UI */}
        <EnginesClient />
      </div>
    </div>
  );
}
