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
import { Loader2, RefreshCw } from 'lucide-react';
import type { Teacher } from '@/types/teacher';

interface ResendTeacherInvitationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher | null;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export default function ResendTeacherInvitationDialog({
  open,
  onOpenChange,
  teacher,
  onConfirm,
  loading,
}: ResendTeacherInvitationDialogProps) {
  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            Resend Invitation Link
          </DialogTitle>
          <DialogDescription>
            Re-issue a fresh 24-hour setup invitation email to{' '}
            <strong className="text-foreground">{teacher.name}</strong> ({teacher.email}).
          </DialogDescription>
        </DialogHeader>

        <p className="text-xs text-muted-foreground">
          Any previous pending invitation tokens issued to this email address will be automatically revoked.
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
          <Button onClick={onConfirm} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Resend Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
