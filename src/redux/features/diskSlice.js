import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databases } from "../../appwrite/appwriteConfig";
import { config } from "../../../config";
import { Query } from "appwrite";

export const fetchAllDisk = createAsyncThunk("disk/fetchAllDisk", async () => {
  return await databases.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteCollectionId
  );
});

export const fetchUserDisk = createAsyncThunk(
  "disk/fetchUserDisk",
  async (userId) => {
    return await databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      [Query.equal("userId", userId)]
    );
  }
);

export const createNewDisk = createAsyncThunk(
  "disk/createNewDisk",
  async (data) => {
    return await databases.createDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      "unique()",
      data
    );
  }
);

export const getDisk = createAsyncThunk("disk/getDisk", async (documentId) => {
  return await databases.getDocument(
    config.appwriteDatabaseId,
    config.appwriteCollectionId,
    documentId
  );
});

export const updateDisk = createAsyncThunk(
  "disk/updateDisk",
  async (documentId, data) => {
    return await databases.updateDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      documentId,
      data
    );
  }
);

export const deleteDisk = createAsyncThunk(
  "disk/deleteDisk",
  async (databaseId) => {
    return await databases.deleteDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      databaseId
    );
  }
);

const pendingCB = (state) => {
  state.loading = true;
  state.error = null;
};

const fulfilledCB = (state, action) => {
  state.loading = false;
  state.disks = action.payload;
};

const rejectedCB = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

const initialState = {
  loading: false,
  disks: [],
  error: null,
};

const diskSlice = createSlice({
  name: "disk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDisk.pending, pendingCB)
      .addCase(fetchAllDisk.fulfilled, fulfilledCB)
      .addCase(fetchAllDisk.rejected, rejectedCB)
      .addCase(fetchUserDisk.pending, pendingCB)
      .addCase(fetchUserDisk.fulfilled, fulfilledCB)
      .addCase(fetchUserDisk.rejected, rejectedCB)
      .addCase(createNewDisk.pending, pendingCB)
      .addCase(createNewDisk.fulfilled, (state, action) => {
        state.disks.push(action.payload);
      })
      .addCase(createNewDisk.rejected, rejectedCB)
      .addCase(getDisk.pending, pendingCB)
      .addCase(getDisk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getDisk.rejected, rejectedCB)
      .addCase(updateDisk.pending, pendingCB)
      .addCase(updateDisk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDisk.rejected, rejectedCB)
      .addCase(deleteDisk.pending, pendingCB)
      .addCase(deleteDisk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDisk.rejected, rejectedCB);
  },
});

export const diskReducer = diskSlice.reducer;
