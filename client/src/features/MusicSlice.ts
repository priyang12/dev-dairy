import { createSlice } from '@reduxjs/toolkit';

const initState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  CurrentMusic: -1,
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
      if (action.payload > state.PlayList.length - 1) {
        state.CurrentMusic = 0;
      } else if (action.payload < 0) {
        state.CurrentMusic = state.PlayList.length - 1;
      } else {
        state.CurrentMusic = action.payload;
      }
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
