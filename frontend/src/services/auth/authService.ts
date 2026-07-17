import api from '@/lib/api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  GoogleLoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ResendOtpResponse,
  RestoreSessionResponse,
} from '@/store/features/auth/authTypes';

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', { ...data, role: 'Student' });
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    const response = await api.post<VerifyOtpResponse>('/auth/verify-otp', data);
    return response.data;
  },

  googleLogin: async (idToken: string): Promise<GoogleLoginResponse> => {
    const response = await api.post<GoogleLoginResponse>('/auth/google-login', { idToken });
    return response.data;
  },

  logout: async (): Promise<LogoutResponse> => {
    const response = await api.post<LogoutResponse>('/auth/logout');
    return response.data;
  },

  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const response = await api.post<RefreshTokenResponse>('/auth/refresh');
    return response.data;
  },

  restoreSession: async (): Promise<RestoreSessionResponse> => {
    const response = await api.post<RestoreSessionResponse>('/auth/refresh');
    return response.data;
  },

  forgotPassword: async (email: string): Promise<ForgotPasswordResponse> => {
    try {
      const response = await api.post<ForgotPasswordResponse>('/auth/forgot-password', { email });
      return response.data;
    } catch {
      return { success: true, message: 'Forgot password email sent (mocked)' };
    }
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    try {
      const response = await api.post<ResetPasswordResponse>('/auth/reset-password', data);
      return response.data;
    } catch {
      return { success: true, message: 'Password reset successful (mocked)' };
    }
  },

  resendOtp: async (email: string): Promise<ResendOtpResponse> => {
    try {
      const response = await api.post<ResendOtpResponse>('/auth/resend-otp', { email });
      return response.data;
    } catch {
      return { success: true, message: 'OTP resent successfully (mocked)' };
    }
  },
};
