"use client";

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchTeachersThunk,
  inviteTeacherThunk,
  updateTeacherNameThunk,
  suspendTeacherThunk,
  activateTeacherThunk,
  resendTeacherInvitationThunk,
} from '@/store/features/teacher/teacherThunks';
import {
  selectTeachers,
  selectTeacherTotal,
  selectTeacherPage,
  selectTeacherLimit,
  selectTeacherTotalPages,
  selectTeacherLoading,
} from '@/store/features/teacher/teacherSelectors';
import { useDebounce } from '@/hooks/useDebounce';
import type { Teacher, TeacherStatus } from '@/types/teacher';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import {
  Users,
  Plus,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';

import TeacherTable from '@/components/teacher/TeacherTable';
import InviteTeacherDialog from '@/components/teacher/InviteTeacherDialog';
import EditTeacherNameDialog from '@/components/teacher/EditTeacherNameDialog';
import SuspendTeacherDialog from '@/components/teacher/SuspendTeacherDialog';
import ActivateTeacherDialog from '@/components/teacher/ActivateTeacherDialog';
import ResendTeacherInvitationDialog from '@/components/teacher/ResendTeacherInvitationDialog';
import NoTeachersEmptyState from '@/components/teacher/NoTeachersEmptyState';
import NoSearchResultsEmptyState from '@/components/teacher/NoSearchResultsEmptyState';

export default function InstitutionTeachersPage() {
  const dispatch = useAppDispatch();

  const teachers = useAppSelector(selectTeachers);
  const total = useAppSelector(selectTeacherTotal);
  const page = useAppSelector(selectTeacherPage);
  const limit = useAppSelector(selectTeacherLimit);
  const totalPages = useAppSelector(selectTeacherTotalPages);
  const loading = useAppSelector(selectTeacherLoading);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [statusFilter, setStatusFilter] = useState<TeacherStatus | 'ALL'>('ALL');

  // Modal Dialog States
  const [inviteOpen, setInviteOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);
  const [resendOpen, setResendOpen] = useState(false);

  // Fetch Teachers Data
  const loadTeachers = (targetPage = page) => {
    dispatch(
      fetchTeachersThunk({
        page: targetPage,
        limit,
        search: debouncedSearch || undefined,
        status: statusFilter === 'ALL' ? undefined : statusFilter,
      })
    );
  };

  useEffect(() => {
    loadTeachers(1);
  }, [debouncedSearch, statusFilter]);

  // Modal Action Handlers
  const handleInviteSubmit = async (values: { name: string; email: string }) => {
    try {
      const result = await dispatch(inviteTeacherThunk(values)).unwrap();
      toast.success(result.message || 'Teacher invitation sent successfully!');
      setInviteOpen(false);
      loadTeachers(1);
    } catch (err: any) {
      toast.error(err || 'Failed to send teacher invitation');
    }
  };

  const handleEditNameSubmit = async (newName: string) => {
    if (!selectedTeacher) return;
    try {
      await dispatch(updateTeacherNameThunk({ id: selectedTeacher.id, name: newName })).unwrap();
      toast.success('Teacher name updated successfully!');
      setEditNameOpen(false);
      setSelectedTeacher(null);
    } catch (err: any) {
      toast.error(err || 'Failed to update teacher name');
    }
  };

  const handleSuspendConfirm = async () => {
    if (!selectedTeacher) return;
    try {
      await dispatch(suspendTeacherThunk(selectedTeacher.id)).unwrap();
      toast.success(`Account for ${selectedTeacher.name} has been suspended.`);
      setSuspendOpen(false);
      setSelectedTeacher(null);
    } catch (err: any) {
      toast.error(err || 'Failed to suspend teacher');
    }
  };

  const handleActivateConfirm = async () => {
    if (!selectedTeacher) return;
    try {
      await dispatch(activateTeacherThunk(selectedTeacher.id)).unwrap();
      toast.success(`Account for ${selectedTeacher.name} is now active.`);
      setActivateOpen(false);
      setSelectedTeacher(null);
    } catch (err: any) {
      toast.error(err || 'Failed to activate teacher');
    }
  };

  const handleResendConfirm = async () => {
    if (!selectedTeacher) return;
    try {
      const result = await dispatch(resendTeacherInvitationThunk(selectedTeacher.id)).unwrap();
      toast.success(result.message || 'Invitation re-sent successfully!');
      setResendOpen(false);
      setSelectedTeacher(null);
      loadTeachers();
    } catch (err: any) {
      toast.error(err || 'Failed to resend invitation');
    }
  };

  const isFiltered = debouncedSearch !== '' || statusFilter !== 'ALL';
  const hasNoDataAtAll = !loading.list && teachers.length === 0 && !isFiltered;
  const hasNoSearchResults = !loading.list && teachers.length === 0 && isFiltered;

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Teacher Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage teacher accounts, issue email invitations, and control access permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => loadTeachers(page)}
            disabled={loading.list}
            title="Refresh list"
          >
            <RefreshCw className={`h-4 w-4 ${loading.list ? 'animate-spin' : ''}`} />
          </Button>

          <Button onClick={() => setInviteOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Invite Teacher
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full sm:w-48"
          >
            <option value="ALL">All Account Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING_ACTIVATION">Pending Activation</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('ALL');
            }}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Reset Filters
          </Button>
        )}
      </div>

      {/* Content Rendering */}
      {loading.list ? (
        <div className="space-y-3 py-4">
          <div className="h-10 bg-muted/40 rounded-md animate-pulse" />
          <div className="h-16 bg-muted/20 rounded-md animate-pulse" />
          <div className="h-16 bg-muted/20 rounded-md animate-pulse" />
          <div className="h-16 bg-muted/20 rounded-md animate-pulse" />
        </div>
      ) : hasNoDataAtAll ? (
        <NoTeachersEmptyState onInvite={() => setInviteOpen(true)} />
      ) : hasNoSearchResults ? (
        <NoSearchResultsEmptyState
          onClearFilters={() => {
            setSearchTerm('');
            setStatusFilter('ALL');
          }}
        />
      ) : (
        <div className="space-y-4">
          <TeacherTable
            teachers={teachers}
            onEditName={(t) => {
              setSelectedTeacher(t);
              setEditNameOpen(true);
            }}
            onSuspend={(t) => {
              setSelectedTeacher(t);
              setSuspendOpen(true);
            }}
            onActivate={(t) => {
              setSelectedTeacher(t);
              setActivateOpen(true);
            }}
            onResendInvitation={(t) => {
              setSelectedTeacher(t);
              setResendOpen(true);
            }}
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between py-2 text-sm text-muted-foreground">
              <div>
                Showing page <strong className="text-foreground">{page}</strong> of{' '}
                <strong className="text-foreground">{totalPages}</strong> ({total} total teachers)
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadTeachers(page - 1)}
                  disabled={page <= 1 || loading.list}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadTeachers(page + 1)}
                  disabled={page >= totalPages || loading.list}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal Dialogs */}
      <InviteTeacherDialog
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        onSubmit={handleInviteSubmit}
        loading={loading.invite}
      />

      <EditTeacherNameDialog
        open={editNameOpen}
        onOpenChange={setEditNameOpen}
        teacher={selectedTeacher}
        onSubmit={handleEditNameSubmit}
        loading={loading.updateName}
      />

      <SuspendTeacherDialog
        open={suspendOpen}
        onOpenChange={setSuspendOpen}
        teacher={selectedTeacher}
        onConfirm={handleSuspendConfirm}
        loading={loading.suspend}
      />

      <ActivateTeacherDialog
        open={activateOpen}
        onOpenChange={setActivateOpen}
        teacher={selectedTeacher}
        onConfirm={handleActivateConfirm}
        loading={loading.activate}
      />

      <ResendTeacherInvitationDialog
        open={resendOpen}
        onOpenChange={setResendOpen}
        teacher={selectedTeacher}
        onConfirm={handleResendConfirm}
        loading={loading.resendInvitation}
      />
    </div>
  );
}
