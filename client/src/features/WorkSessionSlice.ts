import { createSlice } from '@reduxjs/toolkit';

const initState = {
  isLoading: false,
  Project: {
    id: '',
    name: '',
  },
};

export type WorkSessionState = typeof initState;

const WorkSessionSlice = createSlice({
  name: 'WorkSessionSlice',
  initialState: initState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProject: (state, action) => {
      state.Project = action.payload;
    },
  },
});

// Exporting Actions
export const { setLoading, setProject } = WorkSessionSlice.actions;

export default WorkSessionSlice.reducer;
