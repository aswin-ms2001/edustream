import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { InstitutionAdmin } from '@/types/system-admin';

export interface SystemAdminState {
  admins: InstitutionAdmin[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  selectedAdmin: InstitutionAdmin | null;
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

const initialState: SystemAdminState = {
  admins: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  selectedAdmin: null,
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

export const systemAdminSlice = createSlice({
  name: 'systemAdmin',
  initialState,
  reducers: {
    clearSystemAdminError: (state) => {
      state.error = null;
    },
    setSelectedAdmin: (state, action: PayloadAction<InstitutionAdmin | null>) => {
      state.selectedAdmin = action.payload;
    },
    setAdminsList: (
      state,
      action: PayloadAction<{ items: InstitutionAdmin[]; total: number; page: number; limit: number; totalPages: number }>
    ) => {
      state.admins = action.payload.items;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
    },
    updateAdminInState: (state, action: PayloadAction<InstitutionAdmin>) => {
      const index = state.admins.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.admins[index] = action.payload;
      }
      if (state.selectedAdmin && state.selectedAdmin.id === action.payload.id) {
        state.selectedAdmin = action.payload;
      }
    },
    setLoadingState: (
      state,
      action: PayloadAction<{ key: keyof SystemAdminState['loading']; value: boolean }>
    ) => {
      state.loading[action.payload.key] = action.payload.value;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  clearSystemAdminError,
  setSelectedAdmin,
  setAdminsList,
  updateAdminInState,
  setLoadingState,
  setError,
} = systemAdminSlice.actions;

export default systemAdminSlice.reducer;
