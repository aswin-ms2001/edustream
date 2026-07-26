import { createAsyncThunk } from '@reduxjs/toolkit';
import { systemAdminService } from '@/services/system-admin/systemAdminService';
import {
  setAdminsList,
  setSelectedAdmin,
  updateAdminInState,
  setLoadingState,
  setError,
} from './systemAdminSlice';
import type {
  InviteInstitutionAdminRequest,
  ListInstitutionAdminsParams,
} from '@/types/system-admin';

export const fetchInstitutionAdminsThunk = createAsyncThunk(
  'systemAdmin/fetchList',
  async (params: ListInstitutionAdminsParams, { dispatch, rejectWithValue }) => {
    dispatch(setLoadingState({ key: 'list', value: true }));
    dispatch(setError(null));
    try {
      const response = await systemAdminService.listInstitutionAdmins(params);
      dispatch(setAdminsList(response.data));
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to fetch Institution Admins list';
      dispatch(setError(msg));
      return rejectWithValue(msg);
    } finally {
      dispatch(setLoadingState({ key: 'list', value: false }));
    }
  }
);

export const fetchInstitutionAdminDetailsThunk = createAsyncThunk(
  'systemAdmin/fetchDetails',
  async (id: string, { dispatch, rejectWithValue }) => {
    dispatch(setLoadingState({ key: 'details', value: true }));
    dispatch(setError(null));
    try {
      const response = await systemAdminService.getInstitutionAdminDetails(id);
      dispatch(setSelectedAdmin(response.data));
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to fetch Institution Admin details';
      dispatch(setError(msg));
      return rejectWithValue(msg);
    } finally {
      dispatch(setLoadingState({ key: 'details', value: false }));
    }
  }
);

export const inviteInstitutionAdminThunk = createAsyncThunk(
  'systemAdmin/invite',
  async (data: InviteInstitutionAdminRequest, { dispatch, rejectWithValue }) => {
    dispatch(setLoadingState({ key: 'invite', value: true }));
    try {
      const response = await systemAdminService.inviteInstitutionAdmin(data);
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to invite Institution Admin';
      return rejectWithValue(msg);
    } finally {
      dispatch(setLoadingState({ key: 'invite', value: false }));
    }
  }
);

export const updateInstitutionAdminNameThunk = createAsyncThunk(
  'systemAdmin/updateName',
  async ({ id, name }: { id: string; name: string }, { dispatch, rejectWithValue }) => {
    dispatch(setLoadingState({ key: 'updateName', value: true }));
    try {
      const response = await systemAdminService.updateInstitutionAdminName(id, name);
      dispatch(updateAdminInState(response.data));
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to update Institution Admin name';
      return rejectWithValue(msg);
    } finally {
      dispatch(setLoadingState({ key: 'updateName', value: false }));
    }
  }
);

export const suspendInstitutionAdminThunk = createAsyncThunk(
  'systemAdmin/suspend',
  async (id: string, { dispatch, rejectWithValue }) => {
    dispatch(setLoadingState({ key: 'suspend', value: true }));
    try {
      const response = await systemAdminService.suspendInstitutionAdmin(id);
      dispatch(updateAdminInState(response.data));
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to suspend Institution Admin';
      return rejectWithValue(msg);
    } finally {
      dispatch(setLoadingState({ key: 'suspend', value: false }));
    }
  }
);

export const activateInstitutionAdminThunk = createAsyncThunk(
  'systemAdmin/activate',
  async (id: string, { dispatch, rejectWithValue }) => {
    dispatch(setLoadingState({ key: 'activate', value: true }));
    try {
      const response = await systemAdminService.activateInstitutionAdmin(id);
      dispatch(updateAdminInState(response.data));
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to activate Institution Admin';
      return rejectWithValue(msg);
    } finally {
      dispatch(setLoadingState({ key: 'activate', value: false }));
    }
  }
);

export const resendInvitationThunk = createAsyncThunk(
  'systemAdmin/resendInvitation',
  async (id: string, { dispatch, rejectWithValue }) => {
    dispatch(setLoadingState({ key: 'resendInvitation', value: true }));
    try {
      const response = await systemAdminService.resendInvitation(id);
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to resend invitation email';
      return rejectWithValue(msg);
    } finally {
      dispatch(setLoadingState({ key: 'resendInvitation', value: false }));
    }
  }
);
