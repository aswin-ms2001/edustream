"use client";

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutThunk } from '@/store/features/auth/authThunk';
import { selectIsAuthenticated } from '@/store/features/auth/authSelectors';
import { invitationService } from '@/services/invitation/invitationService';
import type { InvitationResult } from '@/types/invitation';
import { toast } from '@/components/ui/sonner';

import InvitationLoadingState from '@/components/invitation/InvitationLoadingState';
import InvalidInvitationState from '@/components/invitation/InvalidInvitationState';
import InvitationExpiredState from '@/components/invitation/InvitationExpiredState';
import InvitationAlreadyAcceptedState from '@/components/invitation/InvitationAlreadyAcceptedState';
import InvitationRevokedState from '@/components/invitation/InvitationRevokedState';
import AcceptInvitationForm from '@/components/invitation/AcceptInvitationForm';

type PageState =
  | 'LOADING'
  | 'INVALID_TOKEN'
  | 'EXPIRED'
  | 'ALREADY_ACCEPTED'
  | 'REVOKED'
  | 'READY_TO_ACCEPT';

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default function AcceptInvitationPage({ searchParams }: PageProps) {
  const resolvedSearchParams = use(searchParams);
  const token = resolvedSearchParams.token;

  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Local Page State
  const [pageState, setPageState] = useState<PageState>('LOADING');
  const [invitation, setInvitation] = useState<InvitationResult | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Force Logout if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(logoutThunk());
    }
  }, [isAuthenticated, dispatch]);

  // 2. Token Verification Effect
  useEffect(() => {
    if (!token) {
      setPageState('INVALID_TOKEN');
      return;
    }

    let isMounted = true;
    setPageState('LOADING');

    invitationService
      .verifyInvitationToken(token)
      .then((response) => {
        if (!isMounted) return;
        const inv = response.data;
        setInvitation(inv);

        // Check dynamic expiration client-side as fallback
        if (inv.expiresAt && new Date(inv.expiresAt).getTime() < Date.now()) {
          setPageState('EXPIRED');
          return;
        }

        switch (inv.status) {
          case 'PENDING':
            setPageState('READY_TO_ACCEPT');
            break;
          case 'ACCEPTED':
            setPageState('ALREADY_ACCEPTED');
            break;
          case 'REVOKED':
            setPageState('REVOKED');
            break;
          default:
            setPageState('INVALID_TOKEN');
            break;
        }
      })
      .catch((error: any) => {
        if (!isMounted) return;
        const message = error.response?.data?.message || '';
        const errorCode = error.response?.data?.errorCode || '';

        if (errorCode === 'INVITATION_EXPIRED' || message.toLowerCase().includes('expired')) {
          setPageState('EXPIRED');
        } else if (message.toLowerCase().includes('accepted')) {
          setPageState('ALREADY_ACCEPTED');
        } else if (message.toLowerCase().includes('revoked')) {
          setPageState('REVOKED');
        } else {
          setPageState('INVALID_TOKEN');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  // 3. Form Submission Handler
  const handleAcceptSubmit = async (password: string) => {
    if (!token) return;
    setSubmitLoading(true);
    setErrorMessage(null);

    try {
      const response = await invitationService.acceptInvitation({ token, password });
      toast.success(response.data.message || 'Account activated successfully! Redirecting to login...');
      
      // Auto-redirect to login after 1.5s
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to accept invitation. Please try again.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setSubmitLoading(false);
    }
  };

  // State Machine Render Mapping
  switch (pageState) {
    case 'LOADING':
      return <InvitationLoadingState />;

    case 'INVALID_TOKEN':
      return <InvalidInvitationState />;

    case 'EXPIRED':
      return <InvitationExpiredState />;

    case 'ALREADY_ACCEPTED':
      return <InvitationAlreadyAcceptedState email={invitation?.email} />;

    case 'REVOKED':
      return <InvitationRevokedState />;

    case 'READY_TO_ACCEPT':
      return invitation ? (
        <AcceptInvitationForm
          invitation={invitation}
          onSubmit={handleAcceptSubmit}
          loading={submitLoading}
          error={errorMessage}
        />
      ) : (
        <InvalidInvitationState />
      );

    default:
      return <InvalidInvitationState />;
  }
}
