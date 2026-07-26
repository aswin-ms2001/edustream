import api from '@/lib/api';
import type { ApiResponse } from '@/types/api';
import type {
  InviteInstitutionAdminRequest,
  ListInstitutionAdminsParams,
  PaginatedInstitutionAdminsData,
  InstitutionAdmin,
  InvitationResultResponse,
} from '@/types/system-admin';

export const systemAdminService = {
  inviteInstitutionAdmin: async (data: InviteInstitutionAdminRequest): Promise<ApiResponse<InvitationResultResponse>> => {
    const response = await api.post<ApiResponse<InvitationResultResponse>>('/system-admin/institution-admins/invite', data);
    return response.data;
  },

  listInstitutionAdmins: async (params: ListInstitutionAdminsParams): Promise<ApiResponse<PaginatedInstitutionAdminsData>> => {
    const response = await api.get<ApiResponse<PaginatedInstitutionAdminsData>>('/system-admin/institution-admins', { params });
    return response.data;
  },

  getInstitutionAdminDetails: async (id: string): Promise<ApiResponse<InstitutionAdmin>> => {
    const response = await api.get<ApiResponse<InstitutionAdmin>>(`/system-admin/institution-admins/${id}`);
    return response.data;
  },

  updateInstitutionAdminName: async (id: string, name: string): Promise<ApiResponse<InstitutionAdmin>> => {
    const response = await api.patch<ApiResponse<InstitutionAdmin>>(`/system-admin/institution-admins/${id}/name`, { name });
    return response.data;
  },

  suspendInstitutionAdmin: async (id: string): Promise<ApiResponse<InstitutionAdmin>> => {
    const response = await api.post<ApiResponse<InstitutionAdmin>>(`/system-admin/institution-admins/${id}/suspend`);
    return response.data;
  },

  activateInstitutionAdmin: async (id: string): Promise<ApiResponse<InstitutionAdmin>> => {
    const response = await api.post<ApiResponse<InstitutionAdmin>>(`/system-admin/institution-admins/${id}/activate`);
    return response.data;
  },

  resendInvitation: async (id: string): Promise<ApiResponse<InvitationResultResponse>> => {
    const response = await api.post<ApiResponse<InvitationResultResponse>>(`/system-admin/institution-admins/${id}/resend-invitation`);
    return response.data;
  },
};
