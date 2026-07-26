"use client";

import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoSearchResultsEmptyStateProps {
  onReset: () => void;
}

export default function NoSearchResultsEmptyState({ onReset }: NoSearchResultsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center bg-card">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
        <SearchX className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">No Matching Administrators Found</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        We couldn&apos;t find any Institution Administrators matching your current search or status filter parameters.
      </p>
      <Button variant="outline" onClick={onReset} className="mt-6 gap-2">
        <RotateCcw className="h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
}
