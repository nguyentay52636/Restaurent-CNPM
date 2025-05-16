import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUserDataType } from '../../lib/apis/types.';
import { loginAPI, registerAPI } from '../../lib/apis/userApi';

// Define the auth state type
interface AuthState {
  user: IUserDataType | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  registrationSuccess: boolean;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
  registrationSuccess: false,
};

// Create async thunks for login and register
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginAPI({ email, password });
      // Assuming the API returns a token in the data
      if (response.data && response.data.id) {
        localStorage.setItem('token', response.data.id.toString());
        return response.data;
      }
      return rejectWithValue(response.message || 'Login failed');
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Create a partial IUserDataType with required fields for registration
      const userData: Partial<IUserDataType> = {
        email,
        password,
      };
      const response = await registerAPI(userData as IUserDataType);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Registration failed');
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
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
        state.user = action.payload;
        state.token = action.payload.id.toString();
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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
