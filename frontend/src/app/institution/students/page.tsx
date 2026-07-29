'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchStudentsThunk,
  suspendStudentThunk,
  unsuspendStudentThunk,
} from '@/store/features/student/studentThunks';
import {
  selectStudents,
  selectStudentTotal,
  selectStudentPage,
  selectStudentLimit,
  selectStudentTotalPages,
  selectStudentLoading,
} from '@/store/features/student/studentSelectors';
import type { StudentSummary, StudentStatus } from '@/types/student';
import { useDebounce } from '@/hooks/useDebounce';
import { StudentTable } from '@/components/student/StudentTable';
import { SuspendStudentDialog } from '@/components/student/SuspendStudentDialog';
import { UnsuspendStudentDialog } from '@/components/student/UnsuspendStudentDialog';
import { NoStudentsEmptyState } from '@/components/student/NoStudentsEmptyState';
import { NoSearchResultsEmptyState } from '@/components/student/NoSearchResultsEmptyState';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export default function StudentsListPage() {
  const dispatch = useAppDispatch();
  const students = useAppSelector(selectStudents);
  const total = useAppSelector(selectStudentTotal);
  const page = useAppSelector(selectStudentPage);
  const limit = useAppSelector(selectStudentLimit);
  const totalPages = useAppSelector(selectStudentTotalPages);
  const loading = useAppSelector(selectStudentLoading);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<StudentStatus | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  // Exact 300ms debounced search matching Teacher Management
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Selected Student for Dialogs
  const [targetStudent, setTargetStudent] = useState<StudentSummary | null>(null);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
  const [isUnsuspendOpen, setIsUnsuspendOpen] = useState(false);

  // Fetch Students when page, debounced search, or status filter changes
  useEffect(() => {
    dispatch(
      fetchStudentsThunk({
        page: currentPage,
        limit: 10,
        search: debouncedSearch || undefined,
        status: selectedStatus === 'ALL' ? undefined : selectedStatus,
      })
    );
  }, [dispatch, currentPage, debouncedSearch, selectedStatus]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value as StudentStatus | 'ALL');
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('ALL');
    setCurrentPage(1);
  };

  const handleOpenSuspend = (student: StudentSummary) => {
    setTargetStudent(student);
    setIsSuspendOpen(true);
  };

  const handleOpenUnsuspend = (student: StudentSummary) => {
    setTargetStudent(student);
    setIsUnsuspendOpen(true);
  };

  const handleConfirmSuspend = async () => {
    if (!targetStudent) return;
    try {
      await dispatch(suspendStudentThunk(targetStudent.id)).unwrap();
      toast.success(`Student ${targetStudent.name} has been suspended.`);
      setIsSuspendOpen(false);
      setTargetStudent(null);
    } catch (err: any) {
      toast.error(err || 'Failed to suspend student.');
    }
  };

  const handleConfirmUnsuspend = async () => {
    if (!targetStudent) return;
    try {
      await dispatch(unsuspendStudentThunk(targetStudent.id)).unwrap();
      toast.success(`Student ${targetStudent.name} has been unsuspended.`);
      setIsUnsuspendOpen(false);
      setTargetStudent(null);
    } catch (err: any) {
      toast.error(err || 'Failed to unsuspend student.');
    }
  };

  const isFiltering = !!debouncedSearch || selectedStatus !== 'ALL';
  const showNoStudentsOverall = !loading.list && students.length === 0 && !isFiltering;
  const showNoSearchResults = !loading.list && students.length === 0 && isFiltering;

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-blue-600" />
            Student Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View and manage self-registered student accounts within your institution.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-sm font-medium text-slate-600 whitespace-nowrap">
            Status:
          </label>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="SUSPENDED">SUSPENDED</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      {loading.list ? (
        <div className="w-full rounded-lg border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]" />
          <p className="mt-4 text-sm font-medium text-slate-500">Loading student directory...</p>
        </div>
      ) : showNoStudentsOverall ? (
        <NoStudentsEmptyState />
      ) : showNoSearchResults ? (
        <NoSearchResultsEmptyState onClearFilters={handleClearFilters} />
      ) : (
        <>
          <StudentTable
            students={students}
            onSuspend={handleOpenSuspend}
            onUnsuspend={handleOpenUnsuspend}
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-600">
                Showing page <span className="font-semibold text-slate-900">{page}</span> of{' '}
                <span className="font-semibold text-slate-900">{totalPages}</span> ({total} total students)
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1 || loading.list}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || loading.list}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Confirmation Dialogs */}
      <SuspendStudentDialog
        open={isSuspendOpen}
        student={targetStudent}
        loading={loading.suspend}
        onOpenChange={setIsSuspendOpen}
        onConfirm={handleConfirmSuspend}
      />

      <UnsuspendStudentDialog
        open={isUnsuspendOpen}
        student={targetStudent}
        loading={loading.unsuspend}
        onOpenChange={setIsUnsuspendOpen}
        onConfirm={handleConfirmUnsuspend}
      />
    </div>
  );
}
