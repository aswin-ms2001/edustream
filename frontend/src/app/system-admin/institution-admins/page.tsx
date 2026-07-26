"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useDebounce } from '@/hooks/useDebounce';
import {
  fetchInstitutionAdminsThunk,
  inviteInstitutionAdminThunk,
  updateInstitutionAdminNameThunk,
  suspendInstitutionAdminThunk,
  activateInstitutionAdminThunk,
  resendInvitationThunk,
} from '@/store/features/system-admin/systemAdminThunks';
import {
  selectSystemAdminAdmins,
  selectSystemAdminTotal,
  selectSystemAdminPage,
  selectSystemAdminLimit,
  selectSystemAdminTotalPages,
  selectSystemAdminLoading,
} from '@/store/features/system-admin/systemAdminSelectors';
import type { InstitutionAdmin, SystemAdminUserStatus } from '@/types/system-admin';
import type { InviteInstitutionAdminFormValues } from '@/lib/validations/system-admin';
import { toast } from '@/components/ui/sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Search, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

import InstitutionAdminTable from '@/components/system-admin/InstitutionAdminTable';
import NoAdminsEmptyState from '@/components/system-admin/NoAdminsEmptyState';
import NoSearchResultsEmptyState from '@/components/system-admin/NoSearchResultsEmptyState';
import InviteAdminDialog from '@/components/system-admin/InviteAdminDialog';
import EditNameDialog from '@/components/system-admin/EditNameDialog';
import SuspendAdminDialog from '@/components/system-admin/SuspendAdminDialog';
import ActivateAdminDialog from '@/components/system-admin/ActivateAdminDialog';
import ResendInvitationDialog from '@/components/system-admin/ResendInvitationDialog';

export default function InstitutionAdminsPage() {
  const dispatch = useAppDispatch();

  // Redux Selectors
  const admins = useAppSelector(selectSystemAdminAdmins);
  const total = useAppSelector(selectSystemAdminTotal);
  const page = useAppSelector(selectSystemAdminPage);
  const limit = useAppSelector(selectSystemAdminLimit);
  const totalPages = useAppSelector(selectSystemAdminTotalPages);
  const loading = useAppSelector(selectSystemAdminLoading);

  // Local Filter & Pagination State
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [statusFilter, setStatusFilter] = useState<SystemAdminUserStatus | ''>('');
  const [currentPage, setCurrentPage] = useState(1);

  // Dialog Visibility & Selection State
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [editNameDialogOpen, setEditNameDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [resendDialogOpen, setResendDialogOpen] = useState(false);
  const [targetAdmin, setTargetAdmin] = useState<InstitutionAdmin | null>(null);

  // Load Data
  const loadAdmins = useCallback(() => {
    dispatch(
      fetchInstitutionAdminsThunk({
        page: currentPage,
        limit,
        search: debouncedSearch || undefined,
        status: statusFilter || undefined,
      })
    );
  }, [dispatch, currentPage, limit, debouncedSearch, statusFilter]);

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);

  // Handle Search Input Change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Handle Status Filter Change
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as SystemAdminUserStatus | '');
    setCurrentPage(1);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  // Action Triggers
  const handleInviteSubmit = async (values: InviteInstitutionAdminFormValues) => {
    const result = await dispatch(inviteInstitutionAdminThunk(values));
    if (inviteInstitutionAdminThunk.fulfilled.match(result)) {
      toast.success(`Invitation email sent to ${values.email}`);
      setInviteDialogOpen(false);
      loadAdmins();
    } else {
      toast.error((result.payload as string) || 'Failed to send invitation');
    }
  };

  const handleEditNameSubmit = async (newName: string) => {
    if (!targetAdmin) return;
    const result = await dispatch(
      updateInstitutionAdminNameThunk({ id: targetAdmin.id, name: newName })
    );
    if (updateInstitutionAdminNameThunk.fulfilled.match(result)) {
      toast.success('Institution Administrator name updated');
      setEditNameDialogOpen(false);
    } else {
      toast.error((result.payload as string) || 'Failed to update name');
    }
  };

  const handleSuspendConfirm = async () => {
    if (!targetAdmin) return;
    const result = await dispatch(suspendInstitutionAdminThunk(targetAdmin.id));
    if (suspendInstitutionAdminThunk.fulfilled.match(result)) {
      toast.success(`${targetAdmin.name} has been suspended and sessions revoked`);
      setSuspendDialogOpen(false);
    } else {
      toast.error((result.payload as string) || 'Failed to suspend user');
    }
  };

  const handleActivateConfirm = async () => {
    if (!targetAdmin) return;
    const result = await dispatch(activateInstitutionAdminThunk(targetAdmin.id));
    if (activateInstitutionAdminThunk.fulfilled.match(result)) {
      toast.success(`${targetAdmin.name} has been activated`);
      setActivateDialogOpen(false);
    } else {
      toast.error((result.payload as string) || 'Failed to activate user');
    }
  };

  const handleResendConfirm = async () => {
    if (!targetAdmin) return;
    const result = await dispatch(resendInvitationThunk(targetAdmin.id));
    if (resendInvitationThunk.fulfilled.match(result)) {
      toast.success(`Invitation re-sent to ${targetAdmin.email}`);
      setResendDialogOpen(false);
    } else {
      toast.error((result.payload as string) || 'Failed to resend invitation');
    }
  };

  const isFiltering = Boolean(search || statusFilter);

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Institution Administrators
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage Institution Administrator accounts, invitations, and access permissions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={loadAdmins}
            disabled={loading.list}
            title="Refresh List"
          >
            <RefreshCw className={`h-4 w-4 ${loading.list ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => setInviteDialogOpen(true)} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Invite Admin
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING_ACTIVATION">Pending Activation</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {/* Content Rendering */}
      {loading.list && admins.length === 0 ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 w-full animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : admins.length === 0 ? (
        isFiltering ? (
          <NoSearchResultsEmptyState onReset={handleResetFilters} />
        ) : (
          <NoAdminsEmptyState onInvite={() => setInviteDialogOpen(true)} />
        )
      ) : (
        <div className="space-y-4">
          <InstitutionAdminTable
            admins={admins}
            onEditName={(admin) => {
              setTargetAdmin(admin);
              setEditNameDialogOpen(true);
            }}
            onSuspend={(admin) => {
              setTargetAdmin(admin);
              setSuspendDialogOpen(true);
            }}
            onActivate={(admin) => {
              setTargetAdmin(admin);
              setActivateDialogOpen(true);
            }}
            onResendInvitation={(admin) => {
              setTargetAdmin(admin);
              setResendDialogOpen(true);
            }}
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
              <div>
                Showing page <strong>{page}</strong> of <strong>{totalPages}</strong> ({total} total administrators)
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1 || loading.list}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || loading.list}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Dialogs */}
      <InviteAdminDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
        onSubmit={handleInviteSubmit}
        loading={loading.invite}
      />

      <EditNameDialog
        open={editNameDialogOpen}
        onOpenChange={setEditNameDialogOpen}
        admin={targetAdmin}
        onSubmit={handleEditNameSubmit}
        loading={loading.updateName}
      />

      <SuspendAdminDialog
        open={suspendDialogOpen}
        onOpenChange={setSuspendDialogOpen}
        admin={targetAdmin}
        onConfirm={handleSuspendConfirm}
        loading={loading.suspend}
      />

      <ActivateAdminDialog
        open={activateDialogOpen}
        onOpenChange={setActivateDialogOpen}
        admin={targetAdmin}
        onConfirm={handleActivateConfirm}
        loading={loading.activate}
      />

      <ResendInvitationDialog
        open={resendDialogOpen}
        onOpenChange={setResendDialogOpen}
        admin={targetAdmin}
        onConfirm={handleResendConfirm}
        loading={loading.resendInvitation}
      />
    </div>
  );
}
