/**
 * Economic Indicator Card with Auto-fetched Metadata
 *
 * Automatically looks up metadata from catalogs and passes to EconomicIndicatorCard
 */

"use client";

import { EconomicIndicatorCard } from "./EconomicIndicatorCard";
import { getSeriesById } from "../lib/series-catalog";
import { getMacroSeriesById } from "../lib/macro-series";

interface EconomicIndicatorCardWithMetaProps {
  seriesId: string;
  title: string;
  description?: string;
  unit?: string;
  formatValue?: (value: number) => string;
}

export function EconomicIndicatorCardWithMeta(props: EconomicIndicatorCardWithMetaProps) {
  // Try to find metadata from catalogs
  const seriesInfo = getSeriesById(props.seriesId) || getMacroSeriesById(props.seriesId);

  return (
    <EconomicIndicatorCard
      {...props}
      source={seriesInfo?.source}
      calculation={seriesInfo?.calculation}
      updateFrequency={seriesInfo?.updateFrequency}
      notes={seriesInfo?.notes}
    />
  );
}
