import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export const selectTeacherState = (state: RootState) => state.teacher;

export const selectTeachers = createSelector(
  [selectTeacherState],
  (teacherState) => teacherState.teachers
);

export const selectTeacherTotal = createSelector(
  [selectTeacherState],
  (teacherState) => teacherState.total
);

export const selectTeacherPage = createSelector(
  [selectTeacherState],
  (teacherState) => teacherState.page
);

export const selectTeacherLimit = createSelector(
  [selectTeacherState],
  (teacherState) => teacherState.limit
);

export const selectTeacherTotalPages = createSelector(
  [selectTeacherState],
  (teacherState) => teacherState.totalPages
);

export const selectSelectedTeacher = createSelector(
  [selectTeacherState],
  (teacherState) => teacherState.selectedTeacher
);

export const selectTeacherLoading = createSelector(
  [selectTeacherState],
  (teacherState) => teacherState.loading
);

export const selectTeacherError = createSelector(
  [selectTeacherState],
  (teacherState) => teacherState.error
);
