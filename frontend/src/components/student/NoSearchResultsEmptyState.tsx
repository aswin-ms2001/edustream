'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoSearchResultsEmptyStateProps {
  onClearFilters: () => void;
}

export const NoSearchResultsEmptyState: React.FC<NoSearchResultsEmptyStateProps> = ({
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
        <Search className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-1">No Matching Students Found</h3>
      <p className="max-w-md text-sm text-slate-500 mb-6">
        No students matched your search terms or filter criteria. Try searching with a different keyword or resetting your filters.
      </p>
      <Button variant="outline" onClick={onClearFilters}>
        Clear Search & Filters
      </Button>
    </div>
  );
};
