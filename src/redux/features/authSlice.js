import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account } from "../../appwrite/appwriteConfig";

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, name }) => {
    await account.create("unique()", email, password, name);
    await account.createEmailPasswordSession(email, password);
    return await account.getSession("current");
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    await account.createEmailPasswordSession(email, password);
    return await account.getSession("current");
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    return await account.getSession("current");
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return await account.deleteSession("current");
});

const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false,
};

const pendingCB = (state) => {
  state.loading = true;
  state.error = null;
};
const fulfilledCB = (state, action) => {
  state.loading = false;
  state.user = action.payload;
  state.isAuthenticated = true;
};
const rejectedCB = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, pendingCB)
      .addCase(signup.fulfilled, fulfilledCB)
      .addCase(signup.rejected, rejectedCB)
      .addCase(login.pending, pendingCB)
      .addCase(login.fulfilled, fulfilledCB)
      .addCase(login.rejected, rejectedCB)
      .addCase(getCurrentUser.pending, pendingCB)
      .addCase(getCurrentUser.fulfilled, fulfilledCB)
      .addCase(getCurrentUser.rejected, rejectedCB)
      .addCase(logout.pending, pendingCB)
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, rejectedCB);
  },
});

export default authSlice.reducer;
