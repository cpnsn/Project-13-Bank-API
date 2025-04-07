import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async ({credentials, rememberMe }, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials);
    const token = response.data.body.token;

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
  
      if (!token) throw new Error("No token available");
  
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      return response.data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
    "auth/updateUserProfile",
    async ({ firstName, lastName }, thunkAPI) => {
      try {
        const state = thunkAPI.getState();
        const token = state.auth.token;
  
        if (!token) throw new Error("No token available");
  
        const response = await axios.put(
          "http://localhost:3001/api/v1/user/profile",
          { firstName, lastName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        return response.data.body;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );  

const tokenFromStorage = localStorage.getItem('token') || sessionStorage.getItem('token');
const initialState = {
  user: null,
  token: tokenFromStorage || null,
  isAuthenticated: !!tokenFromStorage,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.body?.token;
        state.isAuthenticated = !!action.payload.body?.token;
        localStorage.setItem("token", action.payload.body?.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
