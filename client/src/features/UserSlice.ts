import { createSlice } from '@reduxjs/toolkit';

const userAuthSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Exporting data for selectors
export const isAuthenticated = (state: any) => state.authenticated;

export const { setUser, setError } = userAuthSlice.actions;

export default userAuthSlice.reducer;
