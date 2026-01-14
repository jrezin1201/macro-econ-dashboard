"use client";

/**
 * Time Horizon View - Shows implications across different time periods
 *
 * Helps users bridge short-term caution with long-term conviction
 */

interface Props {
  sixMonth: string;
  twelveMonth: string;
  twoToThreeYear: string;
  isBeginnerMode: boolean;
}

export function TimeHorizonView({ sixMonth, twelveMonth, twoToThreeYear, isBeginnerMode }: Props) {
  if (!isBeginnerMode) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-lg border border-indigo-500/30 p-4 md:p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🔮</span>
        <h3 className="text-lg font-bold text-white">Time Horizon View</h3>
      </div>

      <p className="text-sm text-white/70 mb-4">
        Short-term signals don&apos;t always match long-term trends. Here&apos;s what current conditions suggest for
        different time horizons:
      </p>

      <div className="space-y-3">
        {/* 6-Month View */}
        <HorizonCard
          period="Next 6 Months"
          periodLabel="Tactical"
          content={sixMonth}
          color="from-blue-600/20"
          borderColor="border-blue-500/30"
          icon="📅"
        />

        {/* 12-Month View */}
        <HorizonCard
          period="Next 12 Months"
          periodLabel="Strategic"
          content={twelveMonth}
          color="from-purple-600/20"
          borderColor="border-purple-500/30"
          icon="📊"
        />

        {/* 2-3 Year View */}
        <HorizonCard
          period="Next 2–3 Years"
          periodLabel="Long-term"
          content={twoToThreeYear}
          color="from-indigo-600/20"
          borderColor="border-indigo-500/30"
          icon="🎯"
        />
      </div>

      <div className="mt-4 bg-white/5 rounded-lg p-3 border border-white/10">
        <p className="text-xs text-white/70">
          <span className="font-semibold text-white">Key Insight:</span> Tactical caution (6 months) can coexist
          with strategic optimism (2-3 years). Use short-term weakness to build long-term positions.
        </p>
      </div>
    </div>
  );
}

function HorizonCard({
  period,
  periodLabel,
  content,
  color,
  borderColor,
  icon,
}: {
  period: string;
  periodLabel: string;
  content: string;
  color: string;
  borderColor: string;
  icon: string;
}) {
  return (
    <div className={`bg-gradient-to-r ${color} rounded-lg p-3 border ${borderColor}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">{icon}</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-white">{period}</p>
          <p className="text-xs text-white/60">{periodLabel}</p>
        </div>
      </div>
      <p className="text-sm text-white/80 leading-relaxed">{content}</p>
    </div>
  );
}
