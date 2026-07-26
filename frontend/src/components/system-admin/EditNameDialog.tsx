"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Edit3 } from 'lucide-react';
import {
  updateInstitutionAdminNameSchema,
  type UpdateInstitutionAdminNameFormValues,
} from '@/lib/validations/system-admin';
import type { InstitutionAdmin } from '@/types/system-admin';

interface EditNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: InstitutionAdmin | null;
  onSubmit: (name: string) => Promise<void>;
  loading: boolean;
}

export default function EditNameDialog({
  open,
  onOpenChange,
  admin,
  onSubmit,
  loading,
}: EditNameDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateInstitutionAdminNameFormValues>({
    resolver: zodResolver(updateInstitutionAdminNameSchema as any),
  });

  useEffect(() => {
    if (admin) {
      setValue('name', admin.name);
    }
  }, [admin, setValue]);

  const handleFormSubmit = async (values: UpdateInstitutionAdminNameFormValues) => {
    await onSubmit(values.name);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-primary" />
            Edit Institution Admin Name
          </DialogTitle>
          <DialogDescription>
            Update the full name of {admin?.name || 'this Administrator'}. Email and role remain immutable.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Full Name</Label>
            <Input
              id="edit-name"
              placeholder="e.g. Jane Doe"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
