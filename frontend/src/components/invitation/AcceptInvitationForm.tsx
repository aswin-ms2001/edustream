"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff, ShieldCheck, Mail, AlertCircle } from 'lucide-react';
import {
  acceptInvitationSchema,
  type AcceptInvitationFormValues,
} from '@/lib/validations/invitation';
import type { InvitationResult } from '@/types/invitation';

interface AcceptInvitationFormProps {
  invitation: InvitationResult;
  onSubmit: (password: string) => Promise<void>;
  loading: boolean;
  error?: string | null;
}

export default function AcceptInvitationForm({
  invitation,
  onSubmit,
  loading,
  error,
}: AcceptInvitationFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcceptInvitationFormValues>({
    resolver: zodResolver(acceptInvitationSchema as any),
  });

  const handleFormSubmit = async (values: AcceptInvitationFormValues) => {
    await onSubmit(values.password);
  };

  return (
    <Card className="w-full max-w-md border-border/40 shadow-xl backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center space-y-1">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Activate Account</CardTitle>
        <CardDescription>
          Create a secure password to complete your administrator setup.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Email & Role Summary Box */}
        <div className="rounded-lg bg-muted/60 p-3 text-sm flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground">
            <Mail className="h-4 w-4 text-primary" />
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-foreground truncate">{invitation.email}</p>
            <p className="text-xs text-muted-foreground">Role: <span className="font-medium text-primary">{invitation.role}</span></p>
          </div>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
              </Button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('confirmPassword')}
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showConfirmPassword ? 'Hide password' : 'Show password'}</span>
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          <CardFooter className="px-0 pt-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Activate Account & Log In
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
