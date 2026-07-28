"use client";

import React from 'react';
import { SearchX, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoSearchResultsEmptyStateProps {
  onClearFilters: () => void;
}

export default function NoSearchResultsEmptyState({ onClearFilters }: NoSearchResultsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl border border-dashed border-border/60 bg-muted/20">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
        <SearchX className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground mb-1">
        No Matching Results
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        No teachers match your search query or status filter. Try resetting your search parameters.
      </p>
      <Button variant="outline" onClick={onClearFilters} className="gap-2">
        <XCircle className="h-4 w-4" />
        Clear Filters
      </Button>
    </div>
  );
}
