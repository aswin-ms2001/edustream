import api from '@/lib/api';
import type { ApiResponse } from '@/types/api';
import type {
  ListStudentsParams,
  PaginatedStudentsData,
  StudentDetails,
} from '@/types/student';

export const studentService = {
  listStudents: async (params: ListStudentsParams): Promise<ApiResponse<PaginatedStudentsData>> => {
    const response = await api.get<ApiResponse<PaginatedStudentsData>>('/students', { params });
    return response.data;
  },

  getStudentDetails: async (id: string): Promise<ApiResponse<StudentDetails>> => {
    const response = await api.get<ApiResponse<StudentDetails>>(`/students/${id}`);
    return response.data;
  },

  suspendStudent: async (id: string): Promise<ApiResponse<StudentDetails>> => {
    const response = await api.patch<ApiResponse<StudentDetails>>(`/students/${id}/suspend`);
    return response.data;
  },

  unsuspendStudent: async (id: string): Promise<ApiResponse<StudentDetails>> => {
    const response = await api.patch<ApiResponse<StudentDetails>>(`/students/${id}/unsuspend`);
    return response.data;
  },
};
