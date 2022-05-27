import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '../interface';

const initState: AuthState = {
  authenticated: false,
  token: '',
  error: null,
};

const AuthSlice = createSlice({
  name: 'AuthAPI',
  initialState: initState,
  reducers: {
    setToken: (state, action) => {
      state.authenticated = true;
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.authenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.authenticated = false;
      state.token = '';
      state.error = null;
    },
  },
});

// Exporting data for selectors
export const isAuthenticated = (state: any) => state.authenticated;

export const { logout, setError, setToken } = AuthSlice.actions;

export default AuthSlice.reducer;
