import { createSlice } from "@reduxjs/toolkit";

import type { AuthState } from "./authTypes";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},
});

export default authSlice.reducer;