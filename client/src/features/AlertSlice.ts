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
    setAlert: (state, action) => ({
      ...state,
      alert: action.payload.alert,
      Type: action.payload.Type,
      result: action.payload.result,
    }),
    clearAlert: (state) => ({
      ...state,
      alert: '',
      Type: 'info',
      result: false,
    }),
  },
});

export const { setAlert, clearAlert } = AlertSlice.actions;

export default AlertSlice.reducer;
