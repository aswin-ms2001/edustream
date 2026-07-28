import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Teacher } from '@/types/teacher';
import {
  fetchTeachersThunk,
  fetchTeacherDetailsThunk,
  inviteTeacherThunk,
  updateTeacherNameThunk,
  suspendTeacherThunk,
  activateTeacherThunk,
  resendTeacherInvitationThunk,
} from './teacherThunks';

export interface TeacherState {
  teachers: Teacher[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  selectedTeacher: Teacher | null;
  loading: {
    list: boolean;
    details: boolean;
    invite: boolean;
    updateName: boolean;
    suspend: boolean;
    activate: boolean;
    resendInvitation: boolean;
  };
  error: string | null;
}

const initialState: TeacherState = {
  teachers: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  selectedTeacher: null,
  loading: {
    list: false,
    details: false,
    invite: false,
    updateName: false,
    suspend: false,
    activate: false,
    resendInvitation: false,
  },
  error: null,
};

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setSelectedTeacher: (state, action: PayloadAction<Teacher | null>) => {
      state.selectedTeacher = action.payload;
    },
    clearTeacherError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // List Teachers
    builder
      .addCase(fetchTeachersThunk.pending, (state) => {
        state.loading.list = true;
        state.error = null;
      })
      .addCase(fetchTeachersThunk.fulfilled, (state, action) => {
        state.loading.list = false;
        state.teachers = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTeachersThunk.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload as string;
      });

    // Get Details
    builder
      .addCase(fetchTeacherDetailsThunk.pending, (state) => {
        state.loading.details = true;
        state.error = null;
      })
      .addCase(fetchTeacherDetailsThunk.fulfilled, (state, action) => {
        state.loading.details = false;
        state.selectedTeacher = action.payload;
      })
      .addCase(fetchTeacherDetailsThunk.rejected, (state, action) => {
        state.loading.details = false;
        state.error = action.payload as string;
      });

    // Invite Teacher
    builder
      .addCase(inviteTeacherThunk.pending, (state) => {
        state.loading.invite = true;
        state.error = null;
      })
      .addCase(inviteTeacherThunk.fulfilled, (state) => {
        state.loading.invite = false;
      })
      .addCase(inviteTeacherThunk.rejected, (state, action) => {
        state.loading.invite = false;
        state.error = action.payload as string;
      });

    // Update Name
    builder
      .addCase(updateTeacherNameThunk.pending, (state) => {
        state.loading.updateName = true;
        state.error = null;
      })
      .addCase(updateTeacherNameThunk.fulfilled, (state, action) => {
        state.loading.updateName = false;
        const updated = action.payload;
        if (state.selectedTeacher?.id === updated.id) {
          state.selectedTeacher = updated;
        }
        const index = state.teachers.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          state.teachers[index] = updated;
        }
      })
      .addCase(updateTeacherNameThunk.rejected, (state, action) => {
        state.loading.updateName = false;
        state.error = action.payload as string;
      });

    // Suspend Teacher
    builder
      .addCase(suspendTeacherThunk.pending, (state) => {
        state.loading.suspend = true;
        state.error = null;
      })
      .addCase(suspendTeacherThunk.fulfilled, (state, action) => {
        state.loading.suspend = false;
        const updated = action.payload;
        if (state.selectedTeacher?.id === updated.id) {
          state.selectedTeacher = updated;
        }
        const index = state.teachers.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          state.teachers[index] = updated;
        }
      })
      .addCase(suspendTeacherThunk.rejected, (state, action) => {
        state.loading.suspend = false;
        state.error = action.payload as string;
      });

    // Activate Teacher
    builder
      .addCase(activateTeacherThunk.pending, (state) => {
        state.loading.activate = true;
        state.error = null;
      })
      .addCase(activateTeacherThunk.fulfilled, (state, action) => {
        state.loading.activate = false;
        const updated = action.payload;
        if (state.selectedTeacher?.id === updated.id) {
          state.selectedTeacher = updated;
        }
        const index = state.teachers.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          state.teachers[index] = updated;
        }
      })
      .addCase(activateTeacherThunk.rejected, (state, action) => {
        state.loading.activate = false;
        state.error = action.payload as string;
      });

    // Resend Invitation
    builder
      .addCase(resendTeacherInvitationThunk.pending, (state) => {
        state.loading.resendInvitation = true;
        state.error = null;
      })
      .addCase(resendTeacherInvitationThunk.fulfilled, (state) => {
        state.loading.resendInvitation = false;
      })
      .addCase(resendTeacherInvitationThunk.rejected, (state, action) => {
        state.loading.resendInvitation = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedTeacher, clearTeacherError } = teacherSlice.actions;
export default teacherSlice.reducer;
