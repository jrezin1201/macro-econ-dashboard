"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SERIES_CATALOG, getAllCategories, searchSeries } from "@/modules/fred-api/lib/series-catalog";
import { EconomicIndicatorCard } from "@/modules/fred-api";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...getAllCategories()];

  const filteredSeries = searchQuery
    ? searchSeries(searchQuery)
    : selectedCategory === "All"
    ? SERIES_CATALOG
    : SERIES_CATALOG.filter((s) => s.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Data Explorer</h1>
        <p className="text-white/60">
          Browse and search {SERIES_CATALOG.length} economic indicators from FRED
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search indicators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-0 bg-white/10 py-2 pl-10 pr-3 text-white placeholder:text-gray-400 focus:bg-white/20 focus:ring-2 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-md border-0 bg-white/10 py-2 pl-3 pr-10 text-white focus:bg-white/20 focus:ring-2 focus:ring-blue-500 sm:text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-gray-900">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-white/60">
        Showing {filteredSeries.length} indicator{filteredSeries.length !== 1 ? "s" : ""}
      </div>

      {/* Series Grid */}
      {filteredSeries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/60">No indicators found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSeries.map((series) => (
            <EconomicIndicatorCard
              key={series.id}
              seriesId={series.id}
              title={series.name}
              description={series.description}
              unit={series.units}
            />
          ))}
        </div>
      )}
    </div>
  );
}
