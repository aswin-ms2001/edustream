import { createAsyncThunk } from '@reduxjs/toolkit';
import { studentService } from '@/services/student/studentService';
import type {
  ListStudentsParams,
  PaginatedStudentsData,
  StudentDetails,
} from '@/types/student';

export const fetchStudentsThunk = createAsyncThunk<
  PaginatedStudentsData,
  ListStudentsParams,
  { rejectValue: string }
>('student/fetchStudents', async (params, { rejectWithValue }) => {
  try {
    const response = await studentService.listStudents(params);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to fetch students';
    return rejectWithValue(message);
  }
});

export const fetchStudentDetailsThunk = createAsyncThunk<
  StudentDetails,
  string,
  { rejectValue: string }
>('student/fetchStudentDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await studentService.getStudentDetails(id);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to fetch student details';
    return rejectWithValue(message);
  }
});

export const suspendStudentThunk = createAsyncThunk<
  StudentDetails,
  string,
  { rejectValue: string }
>('student/suspendStudent', async (id, { rejectWithValue }) => {
  try {
    const response = await studentService.suspendStudent(id);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to suspend student';
    return rejectWithValue(message);
  }
});

export const unsuspendStudentThunk = createAsyncThunk<
  StudentDetails,
  string,
  { rejectValue: string }
>('student/unsuspendStudent', async (id, { rejectWithValue }) => {
  try {
    const response = await studentService.unsuspendStudent(id);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to unsuspend student';
    return rejectWithValue(message);
  }
});
