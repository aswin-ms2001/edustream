import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/store/features/auth/authSlice";
import systemAdminReducer from "@/store/features/system-admin/systemAdminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    systemAdmin: systemAdminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;