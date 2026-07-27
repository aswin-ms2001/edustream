"use client";

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function InvitationExpiredState() {
  return (
    <Card className="w-full max-w-md border-amber-500/30 shadow-xl backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <Clock className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl text-amber-600 dark:text-amber-400">Invitation Link Expired</CardTitle>
        <CardDescription>
          For security purposes, EduStream invitation links expire after 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center text-sm text-muted-foreground space-y-2">
        <p>This invitation link has expired and can no longer be used to set up your account.</p>
        <p className="font-medium text-foreground">
          Please contact your System Administrator to request a new invitation email.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center pt-2">
        <Button asChild variant="outline" className="w-full sm:w-auto gap-2">
          <Link href="/login">
            <ArrowLeft className="h-4 w-4" />
            Go to Login
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
