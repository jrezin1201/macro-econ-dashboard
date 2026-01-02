/**
 * FRED API Integration Module
 *
 * Federal Reserve Economic Data API client and utilities
 */

// Type exports
export type {
  FREDSeriesObservation,
  FREDSeriesObservationsResponse,
  FREDSeriesInfo,
  FREDSeriesResponse,
  TimeSeriesDataPoint,
  PopularSeriesKey,
  PopularSeriesId,
} from "./types";

export { POPULAR_SERIES } from "./types";

// Client functions
export {
  getSeriesObservations,
  getSeriesInfo,
  parseObservations,
  getSeriesData,
} from "./lib/fred-client";

// React hooks
export { useFredSeries, useFredMultipleSeries } from "./hooks/useFredSeries";

// Components
export { EconomicIndicatorCard } from "./components/EconomicIndicatorCard";
export { TimeSeriesChart } from "./components/TimeSeriesChart";
export { EconomicIndicatorCardWithMeta } from "./components/EconomicIndicatorCardWithMeta";
export { TimeSeriesChartWithMeta } from "./components/TimeSeriesChartWithMeta";
