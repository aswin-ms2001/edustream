"use client";

import React from 'react';
import { Building2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoAdminsEmptyStateProps {
  onInvite: () => void;
}

export default function NoAdminsEmptyState({ onInvite }: NoAdminsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center bg-card">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
        <Building2 className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">No Institution Administrators</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        There are no Institution Administrators appointed yet. Invite your first administrator to manage institution courses and staff.
      </p>
      <Button onClick={onInvite} className="mt-6 gap-2">
        <UserPlus className="h-4 w-4" />
        Invite First Administrator
      </Button>
    </div>
  );
}
