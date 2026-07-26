"use client";

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchInstitutionAdminDetailsThunk,
  updateInstitutionAdminNameThunk,
  suspendInstitutionAdminThunk,
  activateInstitutionAdminThunk,
  resendInvitationThunk,
} from '@/store/features/system-admin/systemAdminThunks';
import {
  selectSelectedSystemAdmin,
  selectSystemAdminLoading,
  selectSystemAdminError,
} from '@/store/features/system-admin/systemAdminSelectors';
import { toast } from '@/components/ui/sonner';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  Building2,
  Mail,
  Calendar,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Edit3,
  MailPlus,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import EditNameDialog from '@/components/system-admin/EditNameDialog';
import SuspendAdminDialog from '@/components/system-admin/SuspendAdminDialog';
import ActivateAdminDialog from '@/components/system-admin/ActivateAdminDialog';
import ResendInvitationDialog from '@/components/system-admin/ResendInvitationDialog';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function InstitutionAdminDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const adminId = resolvedParams.id;

  const dispatch = useAppDispatch();
  const admin = useAppSelector(selectSelectedSystemAdmin);
  const loading = useAppSelector(selectSystemAdminLoading);
  const error = useAppSelector(selectSystemAdminError);

  // Action Dialog States
  const [editNameDialogOpen, setEditNameDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [resendDialogOpen, setResendDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchInstitutionAdminDetailsThunk(adminId));
  }, [dispatch, adminId]);

  const handleEditNameSubmit = async (newName: string) => {
    if (!admin) return;
    const result = await dispatch(
      updateInstitutionAdminNameThunk({ id: admin.id, name: newName })
    );
    if (updateInstitutionAdminNameThunk.fulfilled.match(result)) {
      toast.success('Institution Administrator name updated');
      setEditNameDialogOpen(false);
    } else {
      toast.error((result.payload as string) || 'Failed to update name');
    }
  };

  const handleSuspendConfirm = async () => {
    if (!admin) return;
    const result = await dispatch(suspendInstitutionAdminThunk(admin.id));
    if (suspendInstitutionAdminThunk.fulfilled.match(result)) {
      toast.success(`${admin.name} has been suspended and active sessions revoked`);
      setSuspendDialogOpen(false);
    } else {
      toast.error((result.payload as string) || 'Failed to suspend user');
    }
  };

  const handleActivateConfirm = async () => {
    if (!admin) return;
    const result = await dispatch(activateInstitutionAdminThunk(admin.id));
    if (activateInstitutionAdminThunk.fulfilled.match(result)) {
      toast.success(`${admin.name} has been activated`);
      setActivateDialogOpen(false);
    } else {
      toast.error((result.payload as string) || 'Failed to activate user');
    }
  };

  const handleResendConfirm = async () => {
    if (!admin) return;
    const result = await dispatch(resendInvitationThunk(admin.id));
    if (resendInvitationThunk.fulfilled.match(result)) {
      toast.success(`Invitation re-sent to ${admin.email}`);
      setResendDialogOpen(false);
    } else {
      toast.error((result.payload as string) || 'Failed to resend invitation');
    }
  };

  if (loading.details && !admin) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !admin) {
    return (
      <div className="space-y-4">
        <Link
          href="/system-admin/institution-admins"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Institution Administrators
        </Link>
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="h-6 w-6" />
              <p className="font-semibold">{error || 'Institution Administrator not found'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Active
          </span>
        );
      case 'PENDING_ACTIVATION':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-600 dark:text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Pending Activation
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-sm font-semibold text-rose-600 dark:text-rose-400">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            Suspended
          </span>
        );
      default:
        return <span className="text-sm font-medium">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <Link
        href="/system-admin/institution-admins"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Institution Administrators
      </Link>

      {/* Header Profile Card */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
              {admin.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{admin.name}</h1>
                {getStatusBadge(admin.status)}
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4" />
                {admin.email}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditNameDialogOpen(true)} className="gap-2">
              <Edit3 className="h-4 w-4" />
              Edit Name
            </Button>

            {admin.status === 'PENDING_ACTIVATION' && (
              <Button variant="outline" size="sm" onClick={() => setResendDialogOpen(true)} className="gap-2 text-amber-600 border-amber-500/30 hover:bg-amber-500/10">
                <MailPlus className="h-4 w-4" />
                Resend Invitation
              </Button>
            )}

            {admin.status !== 'SUSPENDED' ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setSuspendDialogOpen(true)}
                className="gap-2"
              >
                <ShieldAlert className="h-4 w-4" />
                Suspend Account
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => setActivateDialogOpen(true)}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <ShieldCheck className="h-4 w-4" />
                Activate Account
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Details Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-mono text-xs text-foreground">{admin.id}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Role</span>
              <span className="font-semibold text-primary">{admin.role}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Account Status</span>
              <span>{admin.status}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Created Date</span>
              <span className="flex items-center gap-1.5 text-foreground">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                {admin.createdAt ? new Date(admin.createdAt).toLocaleString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="flex items-center gap-1.5 text-foreground">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                {admin.updatedAt ? new Date(admin.updatedAt).toLocaleString() : 'N/A'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Invitation Context Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Invitation Bounded Context Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Invitation Link Status</span>
              {admin.status === 'PENDING_ACTIVATION' ? (
                admin.hasPendingInvitation ? (
                  <span className="flex items-center gap-1.5 font-medium text-amber-600">
                    <Clock className="h-4 w-4" />
                    Pending Acceptance (Active Link)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-medium text-rose-600">
                    <AlertCircle className="h-4 w-4" />
                    Invitation Expired
                  </span>
                )
              ) : (
                <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Invitation Accepted & Account Active
                </span>
              )}
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Invitation Action Required</span>
              <span>
                {admin.status === 'PENDING_ACTIVATION'
                  ? admin.hasPendingInvitation
                    ? 'Awaiting user onboarding completion'
                    : 'Resend invitation link required'
                  : 'None (Account active)'}
              </span>
            </div>

            <div className="rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
              {admin.status === 'PENDING_ACTIVATION'
                ? 'This user was created via System Administration invitation. Once the user clicks their email invitation link and sets a password, their status will transition to ACTIVE.'
                : 'This administrator account has been fully onboarded and activated.'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Dialogs */}
      <EditNameDialog
        open={editNameDialogOpen}
        onOpenChange={setEditNameDialogOpen}
        admin={admin}
        onSubmit={handleEditNameSubmit}
        loading={loading.updateName}
      />

      <SuspendAdminDialog
        open={suspendDialogOpen}
        onOpenChange={setSuspendDialogOpen}
        admin={admin}
        onConfirm={handleSuspendConfirm}
        loading={loading.suspend}
      />

      <ActivateAdminDialog
        open={activateDialogOpen}
        onOpenChange={setActivateDialogOpen}
        admin={admin}
        onConfirm={handleActivateConfirm}
        loading={loading.activate}
      />

      <ResendInvitationDialog
        open={resendDialogOpen}
        onOpenChange={setResendDialogOpen}
        admin={admin}
        onConfirm={handleResendConfirm}
        loading={loading.resendInvitation}
      />
    </div>
  );
}
