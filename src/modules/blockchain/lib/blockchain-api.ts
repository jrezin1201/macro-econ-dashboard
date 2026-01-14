/**
 * Blockchain.com API Client
 *
 * Public APIs for Bitcoin blockchain data, statistics, and market data
 * Docs: https://www.blockchain.com/api
 */

const BLOCKCHAIN_API = "https://blockchain.info";
const CHARTS_API = "https://api.blockchain.info/charts";

export interface BlockchainStats {
  market_price_usd: number;
  hash_rate: number;
  total_fees_btc: number;
  n_btc_mined: number;
  n_tx: number;
  n_blocks_mined: number;
  minutes_between_blocks: number;
  totalbc: number;
  n_blocks_total: number;
  estimated_transaction_volume_usd: number;
  blocks_size: number;
  miners_revenue_usd: number;
  nextretarget: number;
  difficulty: number;
  estimated_btc_sent: number;
  miners_revenue_btc: number;
  total_btc_sent: number;
  trade_volume_btc: number;
  trade_volume_usd: number;
  timestamp: number;
}

export interface ChartDataPoint {
  x: number; // timestamp
  y: number; // value
}

export interface ChartData {
  status: string;
  name: string;
  unit: string;
  period: string;
  description: string;
  values: ChartDataPoint[];
}

export interface TickerPrice {
  "15m": number;
  last: number;
  buy: number;
  sell: number;
  symbol: string;
}

export interface ExchangeRates {
  [currency: string]: {
    "15m": number;
    last: number;
    buy: number;
    sell: number;
    symbol: string;
  };
}

/**
 * Get current blockchain statistics
 */
export async function getBlockchainStats(): Promise<BlockchainStats> {
  const response = await fetch(`${BLOCKCHAIN_API}/stats`, {
    next: { revalidate: 60 }, // Cache for 1 minute
  });

  if (!response.ok) {
    throw new Error(`Blockchain API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Get Bitcoin ticker price
 */
export async function getTicker(currency: string = "USD"): Promise<TickerPrice> {
  const response = await fetch(`${BLOCKCHAIN_API}/ticker`, {
    cache: "no-store", // No cache for real-time data
  });

  if (!response.ok) {
    throw new Error(`Blockchain API error: ${response.status}`);
  }

  const data: ExchangeRates = await response.json();
  return data[currency];
}

/**
 * Get all exchange rates
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
  const response = await fetch(`${BLOCKCHAIN_API}/ticker`, {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error(`Blockchain API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Get chart data for a specific metric
 *
 * Available charts:
 * - market-price: Bitcoin market price in USD
 * - hash-rate: Estimated hash rate in gigahashes per second
 * - difficulty: Mining difficulty
 * - n-transactions: Number of transactions per day
 * - n-transactions-total: Total number of transactions
 * - n-transactions-excluding-popular: Transactions excluding most popular addresses
 * - n-transactions-excluding-chains-longer-than-100: Excluding long chains
 * - output-volume: Total output volume
 * - market-cap: Market capitalization
 * - trade-volume: USD trade volume
 * - blocks-size: Total size of all blocks in MB
 * - avg-block-size: Average block size in MB
 * - n-orphaned-blocks: Number of orphaned blocks
 * - n-transactions-per-block: Average transactions per block
 * - median-confirmation-time: Median confirmation time
 * - miners-revenue: Total miner revenue
 * - transaction-fees: Total transaction fees in BTC
 * - cost-per-transaction-percent: Miners revenue as percentage of transaction volume
 * - cost-per-transaction: Miners revenue per transaction
 * - n-unique-addresses: Number of unique addresses used
 * - n-transactions-total: Cumulative number of transactions
 * - mempool-count: Number of unconfirmed transactions
 * - mempool-size: Mempool size in bytes
 * - utxo-count: Number of unspent transaction outputs
 */
export async function getChartData(
  chartName: string,
  timespan: string = "1year",
  rollingAverage?: string
): Promise<ChartData> {
  const params = new URLSearchParams({
    timespan,
    format: "json",
  });

  if (rollingAverage) {
    params.append("rollingAverage", rollingAverage);
  }

  const response = await fetch(`${CHARTS_API}/${chartName}?${params}`, {
    cache: "no-store", // No cache for fresh data
  });

  if (!response.ok) {
    throw new Error(`Charts API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Get mempool statistics
 */
export async function getMempoolStats() {
  const [count, size] = await Promise.all([
    getChartData("mempool-count", "1days"),
    getChartData("mempool-size", "1days"),
  ]);

  return { count, size };
}

/**
 * Get network statistics
 */
export async function getNetworkStats() {
  const [hashRate, difficulty, blockSize] = await Promise.all([
    getChartData("hash-rate", "30days"),
    getChartData("difficulty", "30days"),
    getChartData("avg-block-size", "30days"),
  ]);

  return { hashRate, difficulty, blockSize };
}
