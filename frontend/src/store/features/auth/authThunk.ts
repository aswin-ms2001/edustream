import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services/auth/authService";
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
} from "./authTypes";

interface RejectedErrorResponse {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.login(data);
    } catch (error) {
      const err = error as RejectedErrorResponse;
      return rejectWithValue(
        err.response?.data?.error || "Failed to log in. Please check your credentials."
      );
    }
  }
);

export const registerThunk = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: string }
>(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.register(data);
    } catch (error) {
      const err = error as RejectedErrorResponse;
      return rejectWithValue(
        err.response?.data?.error || "Failed to create account. Please try again."
      );
    }
  }
);

export const verifyOtpThunk = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpRequest,
  { rejectValue: string }
>(
  "auth/verifyOtp",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.verifyOtp(data);
    } catch (error) {
      const err = error as RejectedErrorResponse;
      return rejectWithValue(
        err.response?.data?.error || "Invalid OTP. Please try again."
      );
    }
  }
);

export const googleLoginThunk = createAsyncThunk<
  GoogleLoginResponse,
  string,
  { rejectValue: string }
>(
  "auth/googleLogin",
  async (idToken, { rejectWithValue }) => {
    try {
      return await authService.googleLogin(idToken);
    } catch (error) {
      const err = error as RejectedErrorResponse;
      return rejectWithValue(
        err.response?.data?.error || "Google login failed"
      );
    }
  }
);

export const logoutThunk = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: string }
>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.logout();
    } catch (error) {
      const err = error as RejectedErrorResponse;
      return rejectWithValue(
        err.response?.data?.error || "Logout failed"
      );
    }
  }
);

export const refreshTokenThunk = createAsyncThunk<
  RefreshTokenResponse,
  void,
  { rejectValue: string }
>(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.refreshToken();
    } catch (error) {
      const err = error as RejectedErrorResponse;
      return rejectWithValue(
        err.response?.data?.error || "Refresh token failed"
      );
    }
  }
);

export const restoreSessionThunk = createAsyncThunk<
  RestoreSessionResponse,
  void,
  { rejectValue: string }
>(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.restoreSession();
    } catch (error) {
      const err = error as RejectedErrorResponse;
      return rejectWithValue(
        err.response?.data?.error || "Session restoration failed"
      );
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk<
  ForgotPasswordResponse,
  string,
  { rejectValue: string }
>(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      return await authService.forgotPassword(email);
    } catch (error) {
      const err = error as RejectedErrorResponse;
      return rejectWithValue(
        err.response?.data?.error || "Forgot password request failed"
      );
    }
  }
);

export const resetPasswordThunk = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordRequest,
  { rejectValue: string }
>(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.resetPassword(data);
    } catch (error) {
      const err = error as RejectedErrorResponse;
      return rejectWithValue(
        err.response?.data?.error || "Reset password failed"
      );
    }
  }
);

export const resendOtpThunk = createAsyncThunk<
  ResendOtpResponse,
  string,
  { rejectValue: string }
>(
  "auth/resendOtp",
  async (email, { rejectWithValue }) => {
    try {
      return await authService.resendOtp(email);
    } catch (error) {
      const err = error as RejectedErrorResponse;
      return rejectWithValue(
        err.response?.data?.error || "Resend OTP failed"
      );
    }
  }
);
