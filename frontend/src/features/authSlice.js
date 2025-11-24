import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

// =======================
// AUTH THUNKS
// =======================

// Login user
export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await API.post("/auth/login", data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// Register user
export const registerUser = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    const res = await API.post("/auth/register", data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// Check auth on page refresh (restore user)
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const res = await API.get("/auth/refresh"); // backend returns userObj
    return res.data;
  } catch (err) {
    return null; // invalid or expired token
  }
});

// =======================
// AUTH SLICE
// =======================

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.User;
        localStorage.setItem("token", action.payload.token);
      })

      // REGISTER
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.User;
        localStorage.setItem("token", action.payload.token);
      })

      // RESTORE USER AFTER REFRESH
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload; // backend returns plain user object
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

