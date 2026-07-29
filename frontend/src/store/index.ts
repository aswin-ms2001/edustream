import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/store/features/auth/authSlice";
import systemAdminReducer from "@/store/features/system-admin/systemAdminSlice";
import teacherReducer from "@/store/features/teacher/teacherSlice";
import studentReducer from "@/store/features/student/studentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    systemAdmin: systemAdminReducer,
    teacher: teacherReducer,
    student: studentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;