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
import { Loader2, ShieldAlert } from 'lucide-react';
import type { InstitutionAdmin } from '@/types/system-admin';

interface SuspendAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: InstitutionAdmin | null;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export default function SuspendAdminDialog({
  open,
  onOpenChange,
  admin,
  onConfirm,
  loading,
}: SuspendAdminDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <ShieldAlert className="h-5 w-5" />
            Suspend Institution Administrator?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to suspend <strong>{admin?.name}</strong> ({admin?.email})?
            <br /><br />
            This will immediately prevent login and revoke all active login sessions across all devices.
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
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Suspend Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
