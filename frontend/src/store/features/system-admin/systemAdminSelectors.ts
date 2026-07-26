import type { RootState } from '@/store';

export const selectSystemAdminAdmins = (state: RootState) => state.systemAdmin.admins;
export const selectSystemAdminTotal = (state: RootState) => state.systemAdmin.total;
export const selectSystemAdminPage = (state: RootState) => state.systemAdmin.page;
export const selectSystemAdminLimit = (state: RootState) => state.systemAdmin.limit;
export const selectSystemAdminTotalPages = (state: RootState) => state.systemAdmin.totalPages;
export const selectSelectedSystemAdmin = (state: RootState) => state.systemAdmin.selectedAdmin;
export const selectSystemAdminLoading = (state: RootState) => state.systemAdmin.loading;
export const selectSystemAdminError = (state: RootState) => state.systemAdmin.error;
