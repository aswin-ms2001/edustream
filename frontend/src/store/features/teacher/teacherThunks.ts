import { createAsyncThunk } from '@reduxjs/toolkit';
import { teacherService } from '@/services/teacher/teacherService';
import type {
  InviteTeacherRequest,
  ListTeachersParams,
  PaginatedTeachersData,
  Teacher,
} from '@/types/teacher';
import type { InvitationResult } from '@/types/invitation';

export const fetchTeachersThunk = createAsyncThunk<
  PaginatedTeachersData,
  ListTeachersParams,
  { rejectValue: string }
>('teacher/fetchTeachers', async (params, { rejectWithValue }) => {
  try {
    const response = await teacherService.listTeachers(params);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to fetch teachers';
    return rejectWithValue(message);
  }
});

export const fetchTeacherDetailsThunk = createAsyncThunk<
  Teacher,
  string,
  { rejectValue: string }
>('teacher/fetchTeacherDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await teacherService.getTeacherDetails(id);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to fetch teacher details';
    return rejectWithValue(message);
  }
});

export const inviteTeacherThunk = createAsyncThunk<
  InvitationResult,
  InviteTeacherRequest,
  { rejectValue: string }
>('teacher/inviteTeacher', async (data, { rejectWithValue }) => {
  try {
    const response = await teacherService.inviteTeacher(data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to invite teacher';
    return rejectWithValue(message);
  }
});

export const updateTeacherNameThunk = createAsyncThunk<
  Teacher,
  { id: string; name: string },
  { rejectValue: string }
>('teacher/updateTeacherName', async ({ id, name }, { rejectWithValue }) => {
  try {
    const response = await teacherService.updateTeacherName(id, name);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to update teacher name';
    return rejectWithValue(message);
  }
});

export const suspendTeacherThunk = createAsyncThunk<
  Teacher,
  string,
  { rejectValue: string }
>('teacher/suspendTeacher', async (id, { rejectWithValue }) => {
  try {
    const response = await teacherService.suspendTeacher(id);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to suspend teacher';
    return rejectWithValue(message);
  }
});

export const activateTeacherThunk = createAsyncThunk<
  Teacher,
  string,
  { rejectValue: string }
>('teacher/activateTeacher', async (id, { rejectWithValue }) => {
  try {
    const response = await teacherService.activateTeacher(id);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to activate teacher';
    return rejectWithValue(message);
  }
});

export const resendTeacherInvitationThunk = createAsyncThunk<
  InvitationResult,
  string,
  { rejectValue: string }
>('teacher/resendTeacherInvitation', async (id, { rejectWithValue }) => {
  try {
    const response = await teacherService.resendTeacherInvitation(id);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to resend invitation';
    return rejectWithValue(message);
  }
});
