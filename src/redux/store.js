import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { diskReducer } from "./features/diskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    disk: diskReducer,
  },
});
