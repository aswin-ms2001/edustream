"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle } from 'lucide-react';
import type { Teacher } from '@/types/teacher';

interface SuspendTeacherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher | null;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export default function SuspendTeacherDialog({
  open,
  onOpenChange,
  teacher,
  onConfirm,
  loading,
}: SuspendTeacherDialogProps) {
  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-amber-500/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-5 w-5" />
            Suspend Teacher Account
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to suspend account access for{' '}
            <strong className="text-foreground">{teacher.name}</strong> ({teacher.email})?
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-xs text-amber-800 dark:text-amber-300 space-y-1">
          <p className="font-semibold">Security Action Impact:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>All active login refresh sessions will be immediately revoked.</li>
            <li>The teacher will be logged out on all devices.</li>
            <li>Access can be restored anytime by activating the account.</li>
          </ul>
        </div>

        <DialogFooter className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Suspend Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
