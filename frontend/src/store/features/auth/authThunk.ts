/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services/auth/authService";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data: any, { rejectWithValue }) => {
    try {
      return await authService.login(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to log in. Please check your credentials."
      );
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (data: any, { rejectWithValue }) => {
    try {
      return await authService.register(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to create account. Please try again."
      );
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      return await authService.verifyOtp(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Invalid OTP. Please try again."
      );
    }
  }
);

export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async (idToken: string, { rejectWithValue }) => {
    try {
      return await authService.googleLogin(idToken);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Google login failed"
      );
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.logout();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Logout failed"
      );
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.refreshToken();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Refresh token failed"
      );
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      return await authService.forgotPassword(email);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Forgot password request failed"
      );
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async (data: any, { rejectWithValue }) => {
    try {
      return await authService.resetPassword(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Reset password failed"
      );
    }
  }
);

export const resendOtpThunk = createAsyncThunk(
  "auth/resendOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      return await authService.resendOtp(email);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Resend OTP failed"
      );
    }
  }
);
