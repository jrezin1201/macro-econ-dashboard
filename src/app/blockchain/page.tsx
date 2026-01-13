"use client";

import { useBlockchainStats, useTicker, useChartData } from "@/modules/blockchain/hooks/useBlockchainData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowTrendingUpIcon, CubeIcon, CircleStackIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { InfoTooltip } from "@/components/InfoTooltip";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
  source,
  calculation,
  updateFrequency,
  notes,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
  source?: string;
  calculation?: string;
  updateFrequency?: string;
  notes?: string;
}) {
  const colorClasses = {
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    orange: "from-orange-500/20 to-yellow-500/20 border-orange-500/30",
    green: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    purple: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  };

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm rounded-lg p-6 border`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center">
            <p className="text-sm text-white/60 mb-1">{title}</p>
            {source && updateFrequency && (
              <InfoTooltip
                title={title}
                source={source}
                calculation={calculation}
                updateFrequency={updateFrequency}
                notes={notes}
              />
            )}
          </div>
          <p className="text-3xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-xs text-white/50 mt-1">{subtitle}</p>}
        </div>
        {Icon && <Icon className="h-8 w-8 text-white/40" />}
      </div>
    </div>
  );
}

function MiniChart({ chartName, title, color = "#3b82f6" }: { chartName: string; title: string; color?: string }) {
  const { data, loading } = useChartData(chartName, "30days");

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <h4 className="text-sm font-semibold text-white mb-2">{title}</h4>
        <div className="h-32 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (!data || !data.values || data.values.length === 0) {
    return null;
  }

  const chartData = data.values.map((point) => ({
    timestamp: point.x * 1000,
    value: point.y,
    date: new Date(point.x * 1000).toLocaleDateString(),
  }));

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
      <h4 className="text-sm font-semibold text-white mb-2">{title}</h4>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" hide />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "rgba(255,255,255,0.9)" }}
          />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-white/40 mt-1">Last 30 days</p>
    </div>
  );
}

export default function BlockchainPage() {
  const { data: stats, loading: statsLoading } = useBlockchainStats();
  const { data: ticker, loading: tickerLoading } = useTicker("USD");

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(2);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">⛓️ Blockchain.com Data</h1>
        <p className="text-xl text-white/60">
          Real-time Bitcoin blockchain statistics and network metrics
        </p>
      </div>

      {/* Live Bitcoin Price */}
      <section>
        <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-lg p-8 border border-orange-500/30">
          {tickerLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-white/10 rounded w-48 mb-2"></div>
              <div className="h-16 bg-white/10 rounded w-64"></div>
            </div>
          ) : ticker ? (
            <div>
              <p className="text-lg text-white/60 mb-2">Bitcoin Price (Live)</p>
              <p className="text-5xl font-bold text-white mb-4">
                ${ticker.last.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-white/40">15min Average</p>
                  <p className="text-lg text-white">${ticker["15m"].toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Buy Price</p>
                  <p className="text-lg text-green-400">${ticker.buy.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Sell Price</p>
                  <p className="text-lg text-red-400">${ticker.sell.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-white/60">Unable to load price data</p>
          )}
        </div>
      </section>

      {/* Key Network Stats */}
      {!statsLoading && stats && (
        <>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Network Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Hash Rate"
                value={`${formatLargeNumber(stats.hash_rate)} GH/s`}
                subtitle="Network computing power"
                icon={CubeIcon}
                color="blue"
                source="Blockchain.com API"
                calculation="Total estimated hashes per second generated by all miners in the Bitcoin network"
                updateFrequency="Real-time (updated every ~10 minutes with new blocks)"
                notes="Higher hash rate means more network security. Represents total computational power securing the blockchain."
              />
              <StatCard
                title="Difficulty"
                value={formatLargeNumber(stats.difficulty)}
                subtitle="Mining difficulty"
                icon={ArrowTrendingUpIcon}
                color="purple"
                source="Blockchain.com API"
                calculation="A measure of how difficult it is to find a new block relative to the easiest it can ever be"
                updateFrequency="Adjusts every 2,016 blocks (~2 weeks)"
                notes="Automatically adjusts to maintain ~10 minute block times as miners join/leave the network."
              />
              <StatCard
                title="Total BTC"
                value={`${(stats.totalbc / 1e8).toFixed(2)}M`}
                subtitle={`of 21M (${((stats.totalbc / 1e8 / 21).toFixed(2))}% mined)`}
                icon={CircleStackIcon}
                color="orange"
                source="Blockchain.com API"
                calculation="Total number of bitcoins in circulation (mined supply)"
                updateFrequency="Updated with each new block (~10 minutes)"
                notes="Hard cap of 21 million BTC. Last bitcoin will be mined around year 2140. Block reward halves every 210,000 blocks (~4 years)."
              />
              <StatCard
                title="Market Cap"
                value={`$${formatLargeNumber(stats.market_price_usd * stats.totalbc / 1e8)}`}
                subtitle="Total market value"
                icon={BanknotesIcon}
                color="green"
                source="Blockchain.com API (calculated)"
                calculation="Current Bitcoin price multiplied by circulating supply"
                updateFrequency="Real-time (updated with price changes)"
                notes="Total value of all bitcoins in circulation at current market price. Ranks Bitcoin among top assets globally."
              />
            </div>
          </section>

          {/* Block & Transaction Stats */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Blocks & Transactions (24h)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Blocks Mined"
                value={stats.n_blocks_mined}
                subtitle={`${stats.minutes_between_blocks.toFixed(1)} min/block`}
              />
              <StatCard
                title="Transactions"
                value={stats.n_tx.toLocaleString()}
                subtitle="Total transactions today"
              />
              <StatCard
                title="BTC Mined"
                value={`${(stats.n_btc_mined / 1e8).toFixed(2)} BTC`}
                subtitle="New coins created today"
              />
              <StatCard
                title="Total Fees"
                value={`${(stats.total_fees_btc / 1e8).toFixed(2)} BTC`}
                subtitle={`$${formatLargeNumber(stats.total_fees_btc / 1e8 * stats.market_price_usd)}`}
              />
            </div>
          </section>

          {/* Mining & Revenue */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Mining & Revenue (24h)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Miners Revenue (USD)"
                value={`$${formatLargeNumber(stats.miners_revenue_usd)}`}
                subtitle="Total mining revenue"
                color="green"
              />
              <StatCard
                title="Miners Revenue (BTC)"
                value={`${(stats.miners_revenue_btc / 1e8).toFixed(2)} BTC`}
                subtitle="Block rewards + fees"
                color="orange"
              />
              <StatCard
                title="Block Size"
                value={`${(stats.blocks_size / 1e6).toFixed(2)} MB`}
                subtitle="Total size of blocks"
                color="blue"
              />
            </div>
          </section>

          {/* Trading Volume */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Trading Volume (24h)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard
                title="Trade Volume (USD)"
                value={`$${formatLargeNumber(stats.trade_volume_usd)}`}
                subtitle="USD trading volume"
                color="green"
              />
              <StatCard
                title="Trade Volume (BTC)"
                value={`${formatLargeNumber(stats.trade_volume_btc)} BTC`}
                subtitle="BTC trading volume"
                color="orange"
              />
            </div>
          </section>
        </>
      )}

      {/* Historical Charts */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">30-Day Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MiniChart chartName="market-price" title="Market Price (USD)" color="#f59e0b" />
          <MiniChart chartName="hash-rate" title="Hash Rate" color="#3b82f6" />
          <MiniChart chartName="difficulty" title="Mining Difficulty" color="#8b5cf6" />
          <MiniChart chartName="n-transactions" title="Daily Transactions" color="#10b981" />
          <MiniChart chartName="mempool-count" title="Mempool Size" color="#ef4444" />
          <MiniChart chartName="avg-block-size" title="Avg Block Size (MB)" color="#06b6d4" />
          <MiniChart chartName="miners-revenue" title="Miners Revenue (USD)" color="#10b981" />
          <MiniChart chartName="transaction-fees" title="Transaction Fees (BTC)" color="#f59e0b" />
          <MiniChart chartName="trade-volume" title="Trade Volume (USD)" color="#8b5cf6" />
        </div>
      </section>

      {/* Data Insights */}
      <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Understanding Blockchain Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-white mb-2">Network Security</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong>Hash Rate:</strong> Higher hash rate = more secure network. Measures total computing power.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong>Difficulty:</strong> Adjusts every 2016 blocks to maintain ~10min block time.</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Economic Activity</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span><strong>Mempool:</strong> Unconfirmed transactions waiting to be included in blocks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span><strong>Transaction Fees:</strong> Higher fees = more network congestion.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* API Attribution */}
      <div className="text-center text-sm text-white/40">
        <p>Data provided by <a href="https://www.blockchain.com/api" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Blockchain.com API</a></p>
        <p className="mt-1">Updated in real-time • Public blockchain data</p>
      </div>
    </div>
  );
}
