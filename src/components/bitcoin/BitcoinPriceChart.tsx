/**
 * Bitcoin Price Chart with Moving Averages
 */

"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

interface BitcoinPrice {
  date: string;
  price: number;
}

interface Props {
  prices: BitcoinPrice[];
}

export function BitcoinPriceChart({ prices }: Props) {
  // Calculate moving averages
  const chartData = prices.map((point, i) => {
    const ma20Value = i >= 19 ? calculateMA(prices.slice(i - 19, i + 1)) : null;
    const ma50Value = i >= 49 ? calculateMA(prices.slice(i - 49, i + 1)) : null;
    const ma200Value = i >= 199 ? calculateMA(prices.slice(i - 199, i + 1)) : null;

    return {
      date: point.date,
      price: point.price,
      ma20: ma20Value,
      ma50: ma50Value,
      ma200: ma200Value,
    };
  });

  // Only show last 365 days for performance
  const recentData = chartData.slice(-365);

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Bitcoin Price Chart (Last Year)</h2>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={recentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.6)"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              tickFormatter={(value) => {
                try {
                  return format(new Date(value), "MMM yy");
                } catch {
                  return value;
                }
              }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="rgba(255,255,255,0.6)"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(17, 24, 39, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number | undefined) => value !== undefined ? [`$${value.toLocaleString()}`, ""] : ["", ""]}
              labelFormatter={(label) => {
                try {
                  return format(new Date(label), "MMM dd, yyyy");
                } catch {
                  return label;
                }
              }}
            />
            <Legend
              wrapperStyle={{ color: "rgba(255,255,255,0.8)" }}
              iconType="line"
            />

            {/* Price line */}
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="BTC Price"
            />

            {/* 20D MA */}
            <Line
              type="monotone"
              dataKey="ma20"
              stroke="#fbbf24"
              strokeWidth={1.5}
              dot={false}
              name="20D MA"
              strokeDasharray="5 5"
            />

            {/* 50D MA */}
            <Line
              type="monotone"
              dataKey="ma50"
              stroke="#f97316"
              strokeWidth={1.5}
              dot={false}
              name="50D MA"
              strokeDasharray="3 3"
            />

            {/* 200D MA - Most important */}
            <Line
              type="monotone"
              dataKey="ma200"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              name="200D MA"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend explanation */}
      <div className="mt-4 text-xs text-white/60 space-y-1">
        <p>• <span className="text-blue-400">Blue line</span>: Bitcoin price</p>
        <p>• <span className="text-red-400">Red line</span>: 200-day moving average (key support/resistance)</p>
        <p>• <span className="text-orange-400">Orange dashed</span>: 50-day MA</p>
        <p>• <span className="text-yellow-400">Yellow dashed</span>: 20-day MA</p>
      </div>
    </div>
  );
}

function calculateMA(prices: BitcoinPrice[]): number {
  const sum = prices.reduce((acc, p) => acc + p.price, 0);
  return sum / prices.length;
}
