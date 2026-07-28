import api from '@/lib/api';
import type { ApiResponse } from '@/types/api';
import type {
  InviteTeacherRequest,
  ListTeachersParams,
  PaginatedTeachersData,
  Teacher,
} from '@/types/teacher';
import type { InvitationResult } from '@/types/invitation';

export const teacherService = {
  inviteTeacher: async (data: InviteTeacherRequest): Promise<ApiResponse<InvitationResult>> => {
    const response = await api.post<ApiResponse<InvitationResult>>('/teachers/invite', data);
    return response.data;
  },

  listTeachers: async (params: ListTeachersParams): Promise<ApiResponse<PaginatedTeachersData>> => {
    const response = await api.get<ApiResponse<PaginatedTeachersData>>('/teachers', { params });
    return response.data;
  },

  getTeacherDetails: async (id: string): Promise<ApiResponse<Teacher>> => {
    const response = await api.get<ApiResponse<Teacher>>(`/teachers/${id}`);
    return response.data;
  },

  updateTeacherName: async (id: string, name: string): Promise<ApiResponse<Teacher>> => {
    const response = await api.patch<ApiResponse<Teacher>>(`/teachers/${id}/name`, { name });
    return response.data;
  },

  suspendTeacher: async (id: string): Promise<ApiResponse<Teacher>> => {
    const response = await api.post<ApiResponse<Teacher>>(`/teachers/${id}/suspend`);
    return response.data;
  },

  activateTeacher: async (id: string): Promise<ApiResponse<Teacher>> => {
    const response = await api.post<ApiResponse<Teacher>>(`/teachers/${id}/activate`);
    return response.data;
  },

  resendTeacherInvitation: async (id: string): Promise<ApiResponse<InvitationResult>> => {
    const response = await api.post<ApiResponse<InvitationResult>>(`/teachers/${id}/resend-invitation`);
    return response.data;
  },
};
