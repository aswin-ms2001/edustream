import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { StudentSummary, StudentDetails } from '@/types/student';
import {
  fetchStudentsThunk,
  fetchStudentDetailsThunk,
  suspendStudentThunk,
  unsuspendStudentThunk,
} from './studentThunks';

export interface StudentState {
  students: StudentSummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  selectedStudent: StudentDetails | null;
  loading: {
    list: boolean;
    details: boolean;
    suspend: boolean;
    unsuspend: boolean;
  };
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  selectedStudent: null,
  loading: {
    list: false,
    details: false,
    suspend: false,
    unsuspend: false,
  },
  error: null,
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setSelectedStudent: (state, action: PayloadAction<StudentDetails | null>) => {
      state.selectedStudent = action.payload;
    },
    clearStudentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // List Students
    builder
      .addCase(fetchStudentsThunk.pending, (state) => {
        state.loading.list = true;
        state.error = null;
      })
      .addCase(fetchStudentsThunk.fulfilled, (state, action) => {
        state.loading.list = false;
        state.students = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchStudentsThunk.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload as string;
      });

    // Get Details
    builder
      .addCase(fetchStudentDetailsThunk.pending, (state) => {
        state.loading.details = true;
        state.error = null;
      })
      .addCase(fetchStudentDetailsThunk.fulfilled, (state, action) => {
        state.loading.details = false;
        state.selectedStudent = action.payload;
      })
      .addCase(fetchStudentDetailsThunk.rejected, (state, action) => {
        state.loading.details = false;
        state.error = action.payload as string;
      });

    // Suspend Student (In-Memory Optimistic Store Update)
    builder
      .addCase(suspendStudentThunk.pending, (state) => {
        state.loading.suspend = true;
        state.error = null;
      })
      .addCase(suspendStudentThunk.fulfilled, (state, action) => {
        state.loading.suspend = false;
        const updated = action.payload;
        if (state.selectedStudent?.id === updated.id) {
          state.selectedStudent = updated;
        }
        const index = state.students.findIndex((s) => s.id === updated.id);
        if (index !== -1) {
          state.students[index] = {
            ...state.students[index]!,
            status: updated.status,
            updatedAt: updated.updatedAt,
          };
        }
      })
      .addCase(suspendStudentThunk.rejected, (state, action) => {
        state.loading.suspend = false;
        state.error = action.payload as string;
      });

    // Unsuspend Student (In-Memory Optimistic Store Update)
    builder
      .addCase(unsuspendStudentThunk.pending, (state) => {
        state.loading.unsuspend = true;
        state.error = null;
      })
      .addCase(unsuspendStudentThunk.fulfilled, (state, action) => {
        state.loading.unsuspend = false;
        const updated = action.payload;
        if (state.selectedStudent?.id === updated.id) {
          state.selectedStudent = updated;
        }
        const index = state.students.findIndex((s) => s.id === updated.id);
        if (index !== -1) {
          state.students[index] = {
            ...state.students[index]!,
            status: updated.status,
            updatedAt: updated.updatedAt,
          };
        }
      })
      .addCase(unsuspendStudentThunk.rejected, (state, action) => {
        state.loading.unsuspend = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedStudent, clearStudentError } = studentSlice.actions;
export default studentSlice.reducer;
