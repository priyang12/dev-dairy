import { createSlice } from '@reduxjs/toolkit';
import type { AlertState } from '../interface';

const initState: AlertState = {
  alert: '',
  result: false,
};

const AlertSlice = createSlice({
  name: 'AlertSlice',
  initialState: initState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload.alert;
      state.result = action.payload.result;
    },
    setTemporaryAlert: (state, action) => {
      state.alert = action.payload;
      state.result = false;
      setTimeout(() => {
        state.alert = '';
        state.result = false;
      }, 3000);
    },
    clearAlert: (state) => {
      state.alert = '';
      state.result = false;
    },
  },
});

export const { setAlert } = AlertSlice.actions;

export default AlertSlice.reducer;
