/**
 * Time Series Chart with Auto-fetched Metadata
 *
 * Automatically looks up metadata from catalogs and passes to TimeSeriesChart
 */

"use client";

import { TimeSeriesChart } from "./TimeSeriesChart";
import { getSeriesById } from "../lib/series-catalog";
import { getMacroSeriesById } from "../lib/macro-series";

interface TimeSeriesChartWithMetaProps {
  seriesId: string;
  title: string;
  color?: string;
  observationStart?: string;
  observationEnd?: string;
  unit?: string;
  formatValue?: (value: number) => string;
}

export function TimeSeriesChartWithMeta(props: TimeSeriesChartWithMetaProps) {
  // Try to find metadata from catalogs
  const seriesInfo = getSeriesById(props.seriesId) || getMacroSeriesById(props.seriesId);

  return (
    <TimeSeriesChart
      {...props}
      source={seriesInfo?.source}
      calculation={seriesInfo?.calculation}
      updateFrequency={seriesInfo?.updateFrequency}
      notes={seriesInfo?.notes}
    />
  );
}
