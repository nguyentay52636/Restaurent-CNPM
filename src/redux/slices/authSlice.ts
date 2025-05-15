import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUserDataType } from '../../lib/apis/types.';
import { loginAPI, registerAPI } from '../../lib/apis/userApi';
import { RootState } from '../store';

// Define the auth state type
interface AuthState {
  user: IUserDataType | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  registrationSuccess: boolean;
}

const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

// Initial state
const initialState: AuthState = {
  user: currentUser,
  token: localStorage.getItem('token'),
  isAuthenticated,
  isLoading: false,
  error: null,
  registrationSuccess: false,
};

// Create async thunks for login and register
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await loginAPI({ email, password });

      // Giả sử API trả về dạng:
      // {
      //   data: {
      //     user: { id, email, ... },
      //     token: "eyJhbGci... (JWT Token)"
      //   }
      // }

      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Login failed');
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userData: Partial<IUserDataType> = {
        email,
        password,
      };
      const response = await registerAPI(userData as IUserDataType);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Registration failed');
    }
  },
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAuthenticated');
    },
    setCredentials: (state, action: PayloadAction<{ user: IUserDataType; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; // Giả sử payload có user
        state.token = action.payload.accessToken; // Giả sử payload có
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
        localStorage.setItem('isAuthenticated', JSON.stringify(true));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthenticated');
      });

    // Register cases
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.registrationSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.registrationSuccess = false;
      });
  },
});

export const { logout, setCredentials, clearError, resetRegistrationSuccess } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
