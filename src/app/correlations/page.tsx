"use client";

import { useState } from "react";
import { useFredSeries, POPULAR_SERIES } from "@/modules/fred-api";

// Calculate correlation between two datasets
function calculateCorrelation(data1: number[], data2: number[]): number {
  const n = Math.min(data1.length, data2.length);
  if (n === 0) return 0;

  const mean1 = data1.reduce((a, b) => a + b, 0) / n;
  const mean2 = data2.reduce((a, b) => a + b, 0) / n;

  let numerator = 0;
  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < n; i++) {
    const diff1 = data1[i] - mean1;
    const diff2 = data2[i] - mean2;
    numerator += diff1 * diff2;
    sum1 += diff1 * diff1;
    sum2 += diff2 * diff2;
  }

  const denominator = Math.sqrt(sum1 * sum2);
  return denominator === 0 ? 0 : numerator / denominator;
}

const correlationPairs = [
  {
    series1: POPULAR_SERIES.UNEMPLOYMENT,
    series2: POPULAR_SERIES.SP500,
    name1: "Unemployment",
    name2: "S&P 500",
    description: "Labor market vs Stock market",
  },
  {
    series1: POPULAR_SERIES.INFLATION,
    series2: POPULAR_SERIES.FED_FUNDS_RATE,
    name1: "CPI",
    name2: "Fed Funds Rate",
    description: "Inflation vs Monetary policy",
  },
  {
    series1: POPULAR_SERIES.TREASURY_10Y,
    series2: POPULAR_SERIES.TREASURY_2Y,
    name1: "10Y Treasury",
    name2: "2Y Treasury",
    description: "Long-term vs Short-term rates",
  },
  {
    series1: POPULAR_SERIES.GDP,
    series2: POPULAR_SERIES.UNEMPLOYMENT,
    name1: "GDP",
    name2: "Unemployment",
    description: "Economic output vs Labor market",
  },
  {
    series1: POPULAR_SERIES.RETAIL_SALES,
    series2: POPULAR_SERIES.CONSUMER_SENTIMENT,
    name1: "Retail Sales",
    name2: "Consumer Sentiment",
    description: "Spending vs Confidence",
  },
  {
    series1: POPULAR_SERIES.HOUSING_STARTS,
    series2: POPULAR_SERIES.TREASURY_10Y,
    name1: "Housing Starts",
    name2: "10Y Treasury",
    description: "Housing vs Interest rates",
  },
];

function CorrelationCard({ pair }: { pair: typeof correlationPairs[0] }) {
  const { data: data1, loading: loading1 } = useFredSeries(pair.series1);
  const { data: data2, loading: loading2 } = useFredSeries(pair.series2);

  if (loading1 || loading2) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
          <div className="h-20 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data1 || !data2 || data1.length === 0 || data2.length === 0) {
    return null;
  }

  // Align data by date
  const dateMap = new Map<string, { val1?: number; val2?: number }>();
  data1.forEach((d) => {
    dateMap.set(d.dateString, { val1: d.value });
  });
  data2.forEach((d) => {
    const existing = dateMap.get(d.dateString);
    if (existing) {
      existing.val2 = d.value;
    }
  });

  const aligned = Array.from(dateMap.values()).filter(
    (d) => d.val1 !== undefined && d.val2 !== undefined
  );

  const values1 = aligned.map((d) => d.val1!);
  const values2 = aligned.map((d) => d.val2!);

  const correlation = calculateCorrelation(values1, values2);

  const getCorrelationColor = (corr: number) => {
    if (corr > 0.7) return "text-green-400";
    if (corr > 0.3) return "text-blue-400";
    if (corr > -0.3) return "text-gray-400";
    if (corr > -0.7) return "text-orange-400";
    return "text-red-400";
  };

  const getCorrelationStrength = (corr: number) => {
    const abs = Math.abs(corr);
    if (abs > 0.7) return "Strong";
    if (abs > 0.3) return "Moderate";
    return "Weak";
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">
            {pair.name1} vs {pair.name2}
          </h3>
          <p className="text-sm text-white/60">{pair.description}</p>
        </div>
        <div className={`text-3xl font-bold ${getCorrelationColor(correlation)}`}>
          {correlation.toFixed(2)}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Strength:</span>
          <span className="text-white font-medium">
            {getCorrelationStrength(correlation)} {correlation > 0 ? "Positive" : "Negative"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Data points:</span>
          <span className="text-white">{aligned.length}</span>
        </div>

        {/* Visual bar */}
        <div className="mt-4">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                correlation > 0 ? "bg-green-500" : "bg-red-500"
              }`}
              style={{ width: `${Math.abs(correlation) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-2 text-xs text-white/40">
          {correlation > 0.7 && "These indicators move strongly together"}
          {correlation > 0.3 && correlation <= 0.7 && "These indicators tend to move together"}
          {correlation > -0.3 && correlation <= 0.3 && "Little relationship between these indicators"}
          {correlation > -0.7 && correlation <= -0.3 && "These indicators tend to move opposite"}
          {correlation <= -0.7 && "These indicators move strongly in opposite directions"}
        </div>
      </div>
    </div>
  );
}

export default function CorrelationsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Economic Correlations
        </h1>
        <p className="text-white/60">
          Discover how different economic indicators relate to each other
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <h3 className="font-semibold text-blue-400 mb-2">
          Understanding Correlation
        </h3>
        <div className="text-sm text-blue-300/80 space-y-1">
          <p>
            <strong>+1.0:</strong> Perfect positive correlation (move together)
          </p>
          <p>
            <strong>0.0:</strong> No correlation (independent)
          </p>
          <p>
            <strong>-1.0:</strong> Perfect negative correlation (move opposite)
          </p>
        </div>
      </div>

      {/* Correlation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {correlationPairs.map((pair, idx) => (
          <CorrelationCard key={idx} pair={pair} />
        ))}
      </div>

      {/* Insights */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Key Insights</h3>
        <ul className="space-y-3 text-white/80">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Negative unemployment-stock correlation:</strong> Lower unemployment
              typically coincides with higher stock prices, reflecting economic strength.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Fed follows inflation:</strong> The Federal Reserve raises rates in
              response to rising inflation to cool the economy.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Yield curve relationships:</strong> Long and short-term rates usually
              move together, but inversions (negative spread) can signal recession.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>Housing and rates:</strong> Higher interest rates typically reduce
              housing activity as mortgages become more expensive.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
