"use client";

import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Loader2, MailPlus } from 'lucide-react';
import type { InstitutionAdmin } from '@/types/system-admin';

interface ResendInvitationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: InstitutionAdmin | null;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export default function ResendInvitationDialog({
  open,
  onOpenChange,
  admin,
  onConfirm,
  loading,
}: ResendInvitationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <MailPlus className="h-5 w-5 text-primary" />
            Resend Invitation Email?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Re-issue an invitation link to <strong>{admin?.name}</strong> at <strong>{admin?.email}</strong>?
            <br /><br />
            This will invalidate any previously sent invitation links and generate a fresh 24-hour invitation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Resend Email
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
