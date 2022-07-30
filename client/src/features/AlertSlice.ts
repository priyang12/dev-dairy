import { createSlice } from '@reduxjs/toolkit';
import type { AlertState } from '../interface';

const initState: AlertState = {
  alert: '',
  Type: 'info',
  result: false,
};

const AlertSlice = createSlice({
  name: 'AlertSlice',
  initialState: initState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload.alert;
      state.result = action.payload.result;
      state.Type = action.payload.Type;
    },
    clearAlert: (state) => {
      state.alert = '';
      state.Type = 'info';
      state.result = false;
    },
  },
});

export const { setAlert, clearAlert } = AlertSlice.actions;

export default AlertSlice.reducer;
