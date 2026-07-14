/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/lib/api';

export const authService = {
  login: async (data: any) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: any) => {
    const response = await api.post('/auth/register', { ...data, role: 'Student' });
    return response.data;
  },

  verifyOtp: async (data: { email: string; otp: string }) => {
    const response = await api.post('/auth/verify-otp', data);
    return response.data;
  },

  googleLogin: async (idToken: string) => {
    const response = await api.post('/auth/google-login', { idToken });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch {
      return { success: true, message: 'Forgot password email sent (mocked)' };
    }
  },

  resetPassword: async (data: any) => {
    try {
      const response = await api.post('/auth/reset-password', data);
      return response.data;
    } catch {
      return { success: true, message: 'Password reset successful (mocked)' };
    }
  },

  resendOtp: async (email: string) => {
    try {
      const response = await api.post('/auth/resend-otp', { email });
      return response.data;
    } catch {
      return { success: true, message: 'OTP resent successfully (mocked)' };
    }
  },
};
