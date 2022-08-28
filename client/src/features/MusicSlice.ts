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
    setLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    resetPlayer: (state) => ({
      ...state,
      CurrentMusic: -1,
    }),
    setPlayList: (state, action) => ({
      ...state,
      PlayList: action.payload,
    }),
    setCurrentMusic: (state, action) => {
      let CurrentMusic;
      if (action.payload > state.PlayList.length - 1) {
        CurrentMusic = 0;
      } else if (action.payload < 0) {
        CurrentMusic = state.PlayList.length - 1;
      } else {
        CurrentMusic = action.payload;
      }
      return {
        ...state,
        CurrentMusic,
      };
    },
  },
});

// Exporting Actions
export const { setLoading, setCurrentMusic, setPlayList, resetPlayer } =
  MusicSlice.actions;

export default MusicSlice.reducer;
