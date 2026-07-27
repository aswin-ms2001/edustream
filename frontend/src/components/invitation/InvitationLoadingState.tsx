"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function InvitationLoadingState() {
  return (
    <Card className="w-full max-w-md border-border/40 shadow-xl backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Verifying Invitation</CardTitle>
        <CardDescription>
          Please wait while we validate your invitation link...
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-8">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </CardContent>
    </Card>
  );
}
