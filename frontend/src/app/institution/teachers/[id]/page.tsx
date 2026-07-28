"use client";

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchTeacherDetailsThunk,
  updateTeacherNameThunk,
  suspendTeacherThunk,
  activateTeacherThunk,
  resendTeacherInvitationThunk,
} from '@/store/features/teacher/teacherThunks';
import {
  selectSelectedTeacher,
  selectTeacherLoading,
} from '@/store/features/teacher/teacherSelectors';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Shield,
  Edit3,
  Ban,
  CheckCircle2,
  RefreshCw,
  Clock,
  CheckCircle,
} from 'lucide-react';

import EditTeacherNameDialog from '@/components/teacher/EditTeacherNameDialog';
import SuspendTeacherDialog from '@/components/teacher/SuspendTeacherDialog';
import ActivateTeacherDialog from '@/components/teacher/ActivateTeacherDialog';
import ResendTeacherInvitationDialog from '@/components/teacher/ResendTeacherInvitationDialog';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TeacherDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const teacherId = resolvedParams.id;

  const dispatch = useAppDispatch();
  const teacher = useAppSelector(selectSelectedTeacher);
  const loading = useAppSelector(selectTeacherLoading);

  // Dialog States
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);
  const [resendOpen, setResendOpen] = useState(false);

  const loadDetails = () => {
    dispatch(fetchTeacherDetailsThunk(teacherId));
  };

  useEffect(() => {
    loadDetails();
  }, [teacherId]);

  const handleEditNameSubmit = async (newName: string) => {
    try {
      await dispatch(updateTeacherNameThunk({ id: teacherId, name: newName })).unwrap();
      toast.success('Teacher name updated successfully!');
      setEditNameOpen(false);
      loadDetails();
    } catch (err: any) {
      toast.error(err || 'Failed to update teacher name');
    }
  };

  const handleSuspendConfirm = async () => {
    try {
      await dispatch(suspendTeacherThunk(teacherId)).unwrap();
      toast.success('Teacher account suspended successfully.');
      setSuspendOpen(false);
      loadDetails();
    } catch (err: any) {
      toast.error(err || 'Failed to suspend teacher');
    }
  };

  const handleActivateConfirm = async () => {
    try {
      await dispatch(activateTeacherThunk(teacherId)).unwrap();
      toast.success('Teacher account activated successfully.');
      setActivateOpen(false);
      loadDetails();
    } catch (err: any) {
      toast.error(err || 'Failed to activate teacher');
    }
  };

  const handleResendConfirm = async () => {
    try {
      const result = await dispatch(resendTeacherInvitationThunk(teacherId)).unwrap();
      toast.success(result.message || 'Invitation email re-sent successfully!');
      setResendOpen(false);
      loadDetails();
    } catch (err: any) {
      toast.error(err || 'Failed to resend invitation email');
    }
  };

  if (loading.details && !teacher) {
    return (
      <div className="p-6 space-y-4 max-w-4xl mx-auto">
        <div className="h-6 w-32 bg-muted/40 rounded animate-pulse" />
        <div className="h-40 bg-muted/20 rounded-xl animate-pulse" />
        <div className="h-60 bg-muted/20 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-bold text-destructive">Teacher Not Found</h2>
        <p className="text-sm text-muted-foreground">The requested teacher account could not be found.</p>
        <Button asChild variant="outline">
          <Link href="/institution/teachers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Teachers
          </Link>
        </Button>
      </div>
    );
  }

  const getStatusBadge = () => {
    switch (teacher.status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Active Account
          </span>
        );
      case 'PENDING_ACTIVATION':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="h-3.5 w-3.5" />
            Pending Activation
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            Suspended
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <div>
        <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/institution/teachers">
            <ArrowLeft className="h-4 w-4" />
            Back to Teachers
          </Link>
        </Button>
      </div>

      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-xl border bg-card shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
            {teacher.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{teacher.name}</h1>
              {getStatusBadge()}
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {teacher.email}
            </p>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditNameOpen(true)} className="gap-2">
            <Edit3 className="h-4 w-4" />
            Edit Name
          </Button>

          {teacher.status === 'PENDING_ACTIVATION' && (
            <Button size="sm" onClick={() => setResendOpen(true)} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Resend Invitation
            </Button>
          )}

          {teacher.status === 'ACTIVE' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSuspendOpen(true)}
              className="gap-2 text-amber-600 hover:text-amber-700 hover:bg-amber-500/10 border-amber-500/30"
            >
              <Ban className="h-4 w-4" />
              Suspend
            </Button>
          )}

          {teacher.status === 'SUSPENDED' && (
            <Button
              size="sm"
              onClick={() => setActivateOpen(true)}
              className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <CheckCircle2 className="h-4 w-4" />
              Activate
            </Button>
          )}
        </div>
      </div>

      {/* Grid Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Profile Metadata
            </CardTitle>
            <CardDescription>Core identity and permission role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-mono text-xs font-semibold">{teacher.id}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Assigned Role</span>
              <span className="font-semibold flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-primary" />
                {teacher.role}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Account Created</span>
              <span className="font-medium flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                {teacher.createdAt ? new Date(teacher.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium">
                {teacher.updatedAt ? new Date(teacher.updatedAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Invitation Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Invitation Link Status
            </CardTitle>
            <CardDescription>Onboarding invitation status metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacher.status === 'PENDING_ACTIVATION' ? (
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-amber-700 dark:text-amber-400">
                  <Clock className="h-5 w-5" />
                  Invitation Pending Acceptance
                </div>
                <p className="text-xs text-muted-foreground">
                  An invitation link was dispatched to <strong className="text-foreground">{teacher.email}</strong>. The account will become active as soon as the teacher sets their password.
                </p>
                <div className="pt-2">
                  <Button size="sm" variant="outline" onClick={() => setResendOpen(true)} className="gap-2 w-full sm:w-auto">
                    <RefreshCw className="h-4 w-4" />
                    Resend Invitation Link
                  </Button>
                </div>
              </div>
            ) : teacher.status === 'ACTIVE' ? (
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle className="h-5 w-5" />
                  Invitation Accepted & Active
                </div>
                <p className="text-xs text-muted-foreground">
                  The teacher has accepted their invitation link and successfully activated their account password.
                </p>
              </div>
            ) : (
              <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-4 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-rose-700 dark:text-rose-400">
                  <Ban className="h-5 w-5" />
                  Account Access Suspended
                </div>
                <p className="text-xs text-muted-foreground">
                  This teacher account has been suspended by the Institution Administrator. Active login sessions have been revoked.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog Modals */}
      <EditTeacherNameDialog
        open={editNameOpen}
        onOpenChange={setEditNameOpen}
        teacher={teacher}
        onSubmit={handleEditNameSubmit}
        loading={loading.updateName}
      />

      <SuspendTeacherDialog
        open={suspendOpen}
        onOpenChange={setSuspendOpen}
        teacher={teacher}
        onConfirm={handleSuspendConfirm}
        loading={loading.suspend}
      />

      <ActivateTeacherDialog
        open={activateOpen}
        onOpenChange={setActivateOpen}
        teacher={teacher}
        onConfirm={handleActivateConfirm}
        loading={loading.activate}
      />

      <ResendTeacherInvitationDialog
        open={resendOpen}
        onOpenChange={setResendOpen}
        teacher={teacher}
        onConfirm={handleResendConfirm}
        loading={loading.resendInvitation}
      />
    </div>
  );
}
