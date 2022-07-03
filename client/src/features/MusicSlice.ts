import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '../interface';

const initState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  CurrentMusicKey: '',
};

export type MusicState = typeof initState;

const MusicSlice = createSlice({
  name: 'AuthAPI',
  initialState: initState,
  reducers: {
    setCurrentMusicKey: (state, action) => {
      state.CurrentMusicKey = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
      state.errorMessage = action.payload;
    },
    clearError: (state) => {
      state.isError = false;
      state.errorMessage = '';
    },
  },
});

// Exporting Actions
export const { setCurrentMusicKey, setLoading, setError, clearError } =
  MusicSlice.actions;

export default MusicSlice.reducer;
