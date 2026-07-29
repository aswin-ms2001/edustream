'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchStudentDetailsThunk,
  suspendStudentThunk,
  unsuspendStudentThunk,
} from '@/store/features/student/studentThunks';
import {
  selectSelectedStudent,
  selectStudentLoading,
  selectStudentError,
} from '@/store/features/student/studentSelectors';
import { SuspendStudentDialog } from '@/components/student/SuspendStudentDialog';
import { UnsuspendStudentDialog } from '@/components/student/UnsuspendStudentDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowLeft,
  GraduationCap,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Calendar,
  Clock,
  KeyRound,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

export default function StudentDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const dispatch = useAppDispatch();
  const student = useAppSelector(selectSelectedStudent);
  const loading = useAppSelector(selectStudentLoading);
  const error = useAppSelector(selectStudentError);

  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
  const [isUnsuspendOpen, setIsUnsuspendOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentDetailsThunk(id));
    }
  }, [dispatch, id]);

  const handleConfirmSuspend = async () => {
    if (!student) return;
    try {
      await dispatch(suspendStudentThunk(student.id)).unwrap();
      toast.success(`Student ${student.name} has been suspended.`);
      setIsSuspendOpen(false);
    } catch (err: any) {
      toast.error(err || 'Failed to suspend student.');
    }
  };

  const handleConfirmUnsuspend = async () => {
    if (!student) return;
    try {
      await dispatch(unsuspendStudentThunk(student.id)).unwrap();
      toast.success(`Student ${student.name} has been unsuspended.`);
      setIsUnsuspendOpen(false);
    } catch (err: any) {
      toast.error(err || 'Failed to unsuspend student.');
    }
  };

  if (loading.details) {
    return (
      <div className="w-full rounded-lg border border-slate-200 bg-white p-12 text-center shadow-sm">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]" />
        <p className="mt-4 text-sm font-medium text-slate-500">Loading student profile details...</p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild className="pl-0 text-slate-600 hover:text-slate-900">
          <Link href="/institution/students">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students Directory
          </Link>
        </Button>
        <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-12 text-center shadow-sm">
          <AlertCircle className="h-10 w-10 text-rose-500 mb-3" />
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Student Not Found</h2>
          <p className="text-sm text-slate-500 max-w-md mb-4">
            {error || 'The requested student account could not be found or you do not have permission to view it.'}
          </p>
          <Button asChild variant="outline">
            <Link href="/institution/students">Return to Student Directory</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Back Nav & Quick Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="pl-0 text-slate-600 hover:text-slate-900 mb-1">
            <Link href="/institution/students">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Students Directory
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-blue-600" />
            {student.name}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {student.status === 'ACTIVE' ? (
            <Button
              variant="destructive"
              onClick={() => setIsSuspendOpen(true)}
              className="flex items-center gap-2"
            >
              <ShieldAlert className="h-4 w-4" />
              Suspend Account
            </Button>
          ) : (
            <Button
              onClick={() => setIsUnsuspendOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
            >
              <ShieldCheck className="h-4 w-4" />
              Unsuspend Account
            </Button>
          )}
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">
              Student Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</p>
                <p className="text-sm font-medium text-slate-900">{student.name}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</p>
                <div className="flex items-center text-sm text-slate-900">
                  <Mail className="mr-2 h-4 w-4 text-slate-400" />
                  {student.email}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Authentication Provider</p>
                <div className="flex items-center text-sm">
                  <KeyRound className="mr-2 h-4 w-4 text-slate-400" />
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                      student.authProvider === 'GOOGLE'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {student.authProvider}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Account Status</p>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                      student.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {student.status}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Timestamps Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">
              Account Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registration Date</p>
              <div className="flex items-center text-sm text-slate-700">
                <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                {student.createdAt ? new Date(student.createdAt).toLocaleString() : '—'}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Profile Update</p>
              <div className="flex items-center text-sm text-slate-700">
                <Clock className="mr-2 h-4 w-4 text-slate-400" />
                {student.updatedAt ? new Date(student.updatedAt).toLocaleString() : '—'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialogs */}
      <SuspendStudentDialog
        open={isSuspendOpen}
        student={student}
        loading={loading.suspend}
        onOpenChange={setIsSuspendOpen}
        onConfirm={handleConfirmSuspend}
      />

      <UnsuspendStudentDialog
        open={isUnsuspendOpen}
        student={student}
        loading={loading.unsuspend}
        onOpenChange={setIsUnsuspendOpen}
        onConfirm={handleConfirmUnsuspend}
      />
    </div>
  );
}
