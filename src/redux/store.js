import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { diskReducer } from "./features/diskSlice";
import { saveReducer } from "./features/saveSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    disk: diskReducer,
    savedDisk: saveReducer,
  },
});
