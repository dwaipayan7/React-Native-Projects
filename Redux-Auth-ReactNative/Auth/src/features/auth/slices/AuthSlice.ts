import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://10.0.2.2:5044/api';

interface AuthState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  token: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, data);

      const token = response.data.token;
      console.log(token);

      await AsyncStorage.setItem('token', token);
      return token;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'login failed');
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData);
      const token = response.data.token;
      console.log(token);

      await AsyncStorage.setItem('token', token);
      return token;
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.message || 'Registration failed',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.token = null;
      AsyncStorage.removeItem('token');
      //   console.log(AsyncStorage.getItem('token'));
      //   console.log(AsyncStorage);
      console.log(state.token);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload!;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export const auth = authSlice.reducer;
