import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export const selectStudentState = (state: RootState) => state.student;

export const selectStudents = createSelector(
  [selectStudentState],
  (studentState) => studentState.students
);

export const selectStudentTotal = createSelector(
  [selectStudentState],
  (studentState) => studentState.total
);

export const selectStudentPage = createSelector(
  [selectStudentState],
  (studentState) => studentState.page
);

export const selectStudentLimit = createSelector(
  [selectStudentState],
  (studentState) => studentState.limit
);

export const selectStudentTotalPages = createSelector(
  [selectStudentState],
  (studentState) => studentState.totalPages
);

export const selectSelectedStudent = createSelector(
  [selectStudentState],
  (studentState) => studentState.selectedStudent
);

export const selectStudentLoading = createSelector(
  [selectStudentState],
  (studentState) => studentState.loading
);

export const selectStudentError = createSelector(
  [selectStudentState],
  (studentState) => studentState.error
);
