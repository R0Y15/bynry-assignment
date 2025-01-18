"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

interface SearchBarProps {
  filters: {
    query: string
  }
  onFiltersChange: (filters: { query: string }) => void
}

export default function SearchBar({ filters, onFiltersChange }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Profiles</h1>
      <div className="relative max-w-xs sm:max-w-sm w-full">
        <input
          type="text"
          placeholder="Search profiles..."
          value={filters.query}
          onChange={(e) => onFiltersChange({ ...filters, query: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  )
} 