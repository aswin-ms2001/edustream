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
import { Loader2, ShieldCheck } from 'lucide-react';
import type { InstitutionAdmin } from '@/types/system-admin';

interface ActivateAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: InstitutionAdmin | null;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export default function ActivateAdminDialog({
  open,
  onOpenChange,
  admin,
  onConfirm,
  loading,
}: ActivateAdminDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
            Activate Institution Administrator?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to restore access for <strong>{admin?.name}</strong> ({admin?.email})?
            <br /><br />
            This will allow the administrator to log in again with their existing password. No new invitation is required.
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
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Activate Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
