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
import { Loader2, CheckCircle2 } from 'lucide-react';
import type { Teacher } from '@/types/teacher';

interface ActivateTeacherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher | null;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export default function ActivateTeacherDialog({
  open,
  onOpenChange,
  teacher,
  onConfirm,
  loading,
}: ActivateTeacherDialogProps) {
  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-emerald-500/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            Activate Teacher Account
          </DialogTitle>
          <DialogDescription>
            Restore access for <strong className="text-foreground">{teacher.name}</strong> ({teacher.email})?
          </DialogDescription>
        </DialogHeader>

        <p className="text-xs text-muted-foreground">
          Activating this account will allow the teacher to log in using their established password.
        </p>

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
            onClick={onConfirm}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Activate Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
