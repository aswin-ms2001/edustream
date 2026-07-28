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
  updateTeacherNameSchema,
  type UpdateTeacherNameFormValues,
} from '@/lib/validations/teacher';
import type { Teacher } from '@/types/teacher';

interface EditTeacherNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher | null;
  onSubmit: (name: string) => Promise<void>;
  loading: boolean;
}

export default function EditTeacherNameDialog({
  open,
  onOpenChange,
  teacher,
  onSubmit,
  loading,
}: EditTeacherNameDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateTeacherNameFormValues>({
    resolver: zodResolver(updateTeacherNameSchema as any),
  });

  useEffect(() => {
    if (teacher) {
      setValue('name', teacher.name);
    }
  }, [teacher, setValue]);

  const handleFormSubmit = async (values: UpdateTeacherNameFormValues) => {
    await onSubmit(values.name);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-primary" />
            Edit Teacher Name
          </DialogTitle>
          <DialogDescription>
            Update full display name for {teacher?.email || 'this teacher'}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="e.g. Dr. Sarah Jenkins"
              {...register('name')}
              disabled={loading}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
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
