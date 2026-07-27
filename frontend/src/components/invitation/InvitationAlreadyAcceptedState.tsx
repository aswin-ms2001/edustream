"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InvitationAlreadyAcceptedStateProps {
  email?: string;
}

export default function InvitationAlreadyAcceptedState({ email }: InvitationAlreadyAcceptedStateProps) {
  return (
    <Card className="w-full max-w-md border-emerald-500/30 shadow-xl backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl text-emerald-600 dark:text-emerald-400">Invitation Already Accepted</CardTitle>
        <CardDescription>
          {email ? (
            <>Account for <strong>{email}</strong> has already been activated.</>
          ) : (
            'This invitation has already been accepted and your account is active.'
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center text-sm text-muted-foreground">
        You can log into your account using your email and the password you previously created.
      </CardContent>
      <CardFooter className="flex justify-center pt-2">
        <Button asChild className="w-full sm:w-auto gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link href="/login">
            Go to Login
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
