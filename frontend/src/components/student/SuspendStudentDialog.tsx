'use client';

import React from 'react';
import type { StudentSummary, StudentDetails } from '@/types/student';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface SuspendStudentDialogProps {
  open: boolean;
  student: StudentSummary | StudentDetails | null;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const SuspendStudentDialog: React.FC<SuspendStudentDialogProps> = ({
  open,
  student,
  loading,
  onOpenChange,
  onConfirm,
}) => {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center text-lg font-semibold text-slate-900">
            Suspend Student Account
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-slate-500">
            Are you sure you want to suspend <span className="font-medium text-slate-900">{student.name}</span> (<span className="font-medium text-slate-900">{student.email}</span>)?
          </DialogDescription>
        </DialogHeader>

        <div className="my-2 rounded-md bg-amber-50 p-3 border border-amber-200 text-xs text-amber-800">
          <p className="font-semibold mb-1">Impact of suspension:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>The student will be immediately logged out from all active sessions.</li>
            <li>The student will be unable to log in until unsuspended.</li>
          </ul>
        </div>

        <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Suspending...
              </>
            ) : (
              'Suspend Account'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
