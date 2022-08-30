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
    setToken: (state, action) => ({
      ...state,
      token: action.payload,
      authenticated: true,
    }),
    setError: (state, action) => ({
      ...state,
      error: action.payload,
      authenticated: false,
    }),
    logout: (state) => ({
      ...state,
      token: '',
      authenticated: false,
      error: null,
    }),
  },
});

export const { logout, setError, setToken } = AuthSlice.actions;

export default AuthSlice.reducer;
