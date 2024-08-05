import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databases } from "../../appwrite/appwriteConfig";
import { config } from "../../../config";
import { Query } from "appwrite";

export const fetchAllDisk = createAsyncThunk("disk/fetchAllDisk", async () => {
  const response = await databases.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteCollectionId,
    [Query.orderDesc("$createdAt")]
  );
  return response.documents;
});

export const fetchUserDisk = createAsyncThunk(
  "disk/fetchUserDisk",
  async (userId) => {
    const response = await databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
    );
    return response.documents;
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
  async ({ documentId, data }) => {
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
  async (documentId) => {
    return await databases.deleteDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      documentId
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
        state.loading = false;
        state.disks.push(action.payload);
      })
      .addCase(createNewDisk.rejected, rejectedCB)
      .addCase(getDisk.pending, pendingCB)
      .addCase(getDisk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getDisk.rejected, rejectedCB)
      .addCase(updateDisk.fulfilled, (state, action) => {
        state.disks = state.disks.map((disk) =>
          disk.$id === action.payload.$id ? action.payload : disk
        );
      })
      .addCase(updateDisk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteDisk.pending, pendingCB)
      .addCase(deleteDisk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDisk.rejected, rejectedCB);
  },
});

export const diskReducer = diskSlice.reducer;
