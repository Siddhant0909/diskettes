import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databases } from "../../appwrite/appwriteConfig";
import { config } from "../../../config";
import { Query } from "appwrite";

export const fetchSavedDisk = createAsyncThunk(
  "savedDisk/fetchSavedDisk",
  async (userId) => {
    const response = await databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteSavedCollectionId,
      [Query.equal("userId", userId)]
    );
    return response.documents;
  }
);
export const fetchSavedDiskDetails = createAsyncThunk(
  "savedDisk/fetchSavedDiskDetails",
  async (diskIds) => {
    const promises = diskIds.map((diskId) =>
      databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        diskId
      )
    );
    const responses = await Promise.all(promises);
    return responses;
  }
);

export const saveDisk = createAsyncThunk(
  "savedDisk/saveDisk",
  async ({ userId, diskId }) => {
    return await databases.createDocument(
      config.appwriteDatabaseId,
      config.appwriteSavedCollectionId,
      "unique()",
      { userId, diskId }
    );
  }
);

export const unsaveDisk = createAsyncThunk(
  "savedDisk/unsaveDisk",
  async ({ documentId, diskId }) => {
    await databases.deleteDocument(
      config.appwriteDatabaseId,
      config.appwriteSavedCollectionId,
      documentId
    );
    return { documentId, diskId };
  }
);

const initialState = {
  loading: false,
  savedDisks: [],
  savedDisksDetails: [],
  error: null,
};

const saveSlice = createSlice({
  name: "savedDisk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedDisk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedDisk.fulfilled, (state, action) => {
        state.loading = false;
        state.savedDisks = action.payload;
      })
      .addCase(fetchSavedDisk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSavedDiskDetails.fulfilled, (state, action) => {
        state.savedDisksDetails = action.payload;
      })
      .addCase(fetchSavedDiskDetails.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(saveDisk.fulfilled, (state, action) => {
        state.savedDisks.push(action.payload);
      })
      .addCase(unsaveDisk.fulfilled, (state, action) => {
        state.savedDisks = state.savedDisks.filter(
          (disk) => disk.$id !== action.payload.documentId
        );
        state.savedDisksDetails = state.savedDisksDetails.filter(
          (disk) => disk.$id !== action.payload.diskId
        );
      })
      .addCase(unsaveDisk.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const saveReducer = saveSlice.reducer;
