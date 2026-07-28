"use client";

import React from 'react';
import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoTeachersEmptyStateProps {
  onInvite: () => void;
}

export default function NoTeachersEmptyState({ onInvite }: NoTeachersEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl border border-dashed border-border/60 bg-muted/20">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
        <Users className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground mb-1">
        No Teachers Found
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        Your institution does not have any teachers registered yet. Invite your first teacher to get started.
      </p>
      <Button onClick={onInvite} className="gap-2">
        <Plus className="h-4 w-4" />
        Invite Teacher
      </Button>
    </div>
  );
}
