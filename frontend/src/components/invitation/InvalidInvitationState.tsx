"use client";

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InvalidInvitationStateProps {
  message?: string;
}

export default function InvalidInvitationState({ message }: InvalidInvitationStateProps) {
  return (
    <Card className="w-full max-w-md border-destructive/30 shadow-xl backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl text-destructive">Invalid Invitation Link</CardTitle>
        <CardDescription>
          {message || 'The invitation link you followed is invalid, tampered, or missing a valid security token.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center text-sm text-muted-foreground">
        If you believe this is an error, please check the link in your email or contact your System Administrator to issue a new invitation.
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
