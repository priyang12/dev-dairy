import { createSlice } from '@reduxjs/toolkit';

const initState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  CurrentMusic: 0,
  PlayList: [],
};

export type MusicState = typeof initState;

const MusicSlice = createSlice({
  name: 'MusicSlice',
  initialState: initState,
  reducers: {
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
    setPlayList: (state, action) => {
      state.PlayList = action.payload;
    },
    setCurrentMusic: (state, action) => {
      state.CurrentMusic = action.payload;
    },
  },
});

// Exporting Actions
export const {
  setLoading,
  setCurrentMusic,
  setPlayList,
  setError,
  clearError,
} = MusicSlice.actions;

export default MusicSlice.reducer;
