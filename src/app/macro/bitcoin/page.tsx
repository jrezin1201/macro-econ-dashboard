"use client";

import { EconomicIndicatorCard, TimeSeriesChart } from "@/modules/fred-api";
import { useFredSeries } from "@/modules/fred-api";

export default function BitcoinPage() {
  const { data } = useFredSeries("CBBTCUSD");

  const allTimeHigh = data ? Math.max(...data.map((d) => d.value)) : 0;
  const allTimeLow = data ? Math.min(...data.filter((d) => d.value > 0).map((d) => d.value)) : 0;
  const currentPrice = data && data.length > 0 ? data[data.length - 1].value : 0;
  const fromATH = allTimeHigh > 0 ? ((currentPrice - allTimeHigh) / allTimeHigh) * 100 : 0;

  // Different time periods
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
  const allTime = "2014-01-01"; // Coinbase data starts around 2014

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">₿ Bitcoin</h1>
        <p className="text-xl text-white/60">
          Digital gold and the world's first cryptocurrency
        </p>
      </div>

      {/* Current Price */}
      <section>
        <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-lg p-8 border border-orange-500/30">
          <EconomicIndicatorCard
            seriesId="CBBTCUSD"
            title="Bitcoin Price (Coinbase)"
            description="BTC/USD spot price"
            formatValue={(v) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          />
        </div>
      </section>

      {/* Key Stats */}
      {data && data.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Historical Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <p className="text-sm text-white/60 mb-2">All-Time High</p>
              <p className="text-2xl font-bold text-green-400">
                ${allTimeHigh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <p className="text-sm text-white/60 mb-2">All-Time Low</p>
              <p className="text-2xl font-bold text-red-400">
                ${allTimeLow.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <p className="text-sm text-white/60 mb-2">From ATH</p>
              <p className={`text-2xl font-bold ${fromATH >= 0 ? "text-green-400" : "text-red-400"}`}>
                {fromATH >= 0 ? "+" : ""}{fromATH.toFixed(1)}%
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <p className="text-sm text-white/60 mb-2">ATH to ATL Ratio</p>
              <p className="text-2xl font-bold text-blue-400">
                {allTimeLow > 0 ? `${(allTimeHigh / allTimeLow).toFixed(0)}x` : "N/A"}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Price Charts - Different Timeframes */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Price History</h2>
        <div className="space-y-6">
          <TimeSeriesChart
            seriesId="CBBTCUSD"
            title="Bitcoin Price - All Time (Since 2014)"
            color="#f7931a"
            observationStart={allTime}
            formatValue={(v) => `$${v.toLocaleString()}`}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TimeSeriesChart
              seriesId="CBBTCUSD"
              title="Bitcoin Price - Last 3 Years"
              color="#f7931a"
              observationStart={threeYearsAgo.toISOString().split("T")[0]}
              formatValue={(v) => `$${v.toLocaleString()}`}
            />
            <TimeSeriesChart
              seriesId="CBBTCUSD"
              title="Bitcoin Price - Last Year"
              color="#f7931a"
              observationStart={oneYearAgo.toISOString().split("T")[0]}
              formatValue={(v) => `$${v.toLocaleString()}`}
            />
          </div>
        </div>
      </section>

      {/* Bitcoin vs Traditional Assets */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Bitcoin vs Traditional Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">vs Gold</h3>
            <p className="text-sm text-white/60">
              Bitcoin is often called "digital gold" as a store of value, but with higher
              volatility and 24/7 trading.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">vs S&P 500</h3>
            <p className="text-sm text-white/60">
              Historically more volatile than stocks but has delivered higher returns over
              long periods.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">vs Fiat</h3>
            <p className="text-sm text-white/60">
              Fixed supply of 21 million coins makes Bitcoin deflationary, unlike fiat
              currencies that can be printed.
            </p>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Bitcoin Fundamentals</h3>
        <ul className="space-y-3 text-white/80">
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">₿</span>
            <span>
              <strong>Fixed Supply:</strong> Only 21 million Bitcoin will ever exist, making
              it inherently scarce unlike fiat currencies.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">₿</span>
            <span>
              <strong>Halving Cycles:</strong> Mining rewards cut in half approximately every
              4 years, historically triggering bull markets.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">₿</span>
            <span>
              <strong>Institutional Adoption:</strong> Major companies and countries are now
              adding Bitcoin to their balance sheets and reserves.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">₿</span>
            <span>
              <strong>24/7 Market:</strong> Unlike traditional markets, Bitcoin trades
              continuously around the clock, every day of the year.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">₿</span>
            <span>
              <strong>Macro Correlation:</strong> Bitcoin increasingly correlates with
              tech stocks and responds to Fed policy and inflation concerns.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">₿</span>
            <span>
              <strong>Volatility:</strong> Bitcoin is significantly more volatile than
              traditional assets, with potential for both massive gains and drawdowns.
            </span>
          </li>
        </ul>
      </section>

      {/* Data Source Note */}
      <div className="text-center text-sm text-white/40">
        <p>Bitcoin price data sourced from Coinbase via FRED</p>
        <p className="mt-1">
          Data availability: {data && data.length > 0 ?
            `${data[0].dateString} to ${data[data.length - 1].dateString}` :
            "Loading..."}
        </p>
      </div>
    </div>
  );
}
