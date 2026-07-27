import api from '@/lib/api';
import type { ApiResponse } from '@/types/api';
import type {
  InvitationResult,
  AcceptInvitationRequest,
} from '@/types/invitation';

export const invitationService = {
  verifyInvitationToken: async (token: string): Promise<ApiResponse<InvitationResult>> => {
    const response = await api.get<ApiResponse<InvitationResult>>('/invitations/verify-token', {
      params: { token },
    });
    return response.data;
  },

  acceptInvitation: async (data: AcceptInvitationRequest): Promise<ApiResponse<InvitationResult>> => {
    const response = await api.post<ApiResponse<InvitationResult>>('/invitations/accept', data);
    return response.data;
  },
};
