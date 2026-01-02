/**
 * FRED API Type Definitions
 *
 * Based on FRED API documentation: https://fred.stlouisfed.org/docs/api/
 */

export interface FREDSeriesObservation {
  realtime_start: string;
  realtime_end: string;
  date: string;
  value: string;
}

export interface FREDSeriesObservationsResponse {
  realtime_start: string;
  realtime_end: string;
  observation_start: string;
  observation_end: string;
  units: string;
  output_type: number;
  file_type: string;
  order_by: string;
  sort_order: string;
  count: number;
  offset: number;
  limit: number;
  observations: FREDSeriesObservation[];
}

export interface FREDSeriesInfo {
  id: string;
  realtime_start: string;
  realtime_end: string;
  title: string;
  observation_start: string;
  observation_end: string;
  frequency: string;
  frequency_short: string;
  units: string;
  units_short: string;
  seasonal_adjustment: string;
  seasonal_adjustment_short: string;
  last_updated: string;
  popularity: number;
  notes: string;
}

export interface FREDSeriesResponse {
  realtime_start: string;
  realtime_end: string;
  seriess: FREDSeriesInfo[];
}

export interface FREDCategory {
  id: number;
  name: string;
  parent_id: number;
}

export interface FREDCategoriesResponse {
  categories: FREDCategory[];
}

/**
 * Parsed time series data point for visualization
 */
export interface TimeSeriesDataPoint {
  date: Date;
  value: number;
  dateString: string;
}

/**
 * Common economic indicators available in FRED
 */
export const POPULAR_SERIES = {
  GDP: "GDP",
  UNEMPLOYMENT: "UNRATE",
  INFLATION: "CPIAUCSL",
  FED_FUNDS_RATE: "FEDFUNDS",
  SP500: "SP500",
  TREASURY_10Y: "DGS10",
  TREASURY_2Y: "DGS2",
  M2_MONEY_SUPPLY: "M2SL",
  INDUSTRIAL_PRODUCTION: "INDPRO",
  CONSUMER_SENTIMENT: "UMCSENT",
  RETAIL_SALES: "RSXFS",
  HOUSING_STARTS: "HOUST",
  PAYROLL: "PAYEMS",
  PCE: "PCE",
  CORE_PCE: "PCEPILFE",
} as const;

export type PopularSeriesKey = keyof typeof POPULAR_SERIES;
export type PopularSeriesId = typeof POPULAR_SERIES[PopularSeriesKey];
