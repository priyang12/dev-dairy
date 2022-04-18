import { SET_LOADING, STOP_LOADING, SET_ALERT, CLEAR_ALERT } from './types';

export const setAlertAction = (msg: string, result: boolean): any => ({
  type: SET_ALERT,
  payload: { msg, result },
});

export const clearAlertAction = (): any => ({
  type: CLEAR_ALERT,
});

export const setLoadingAction = (loading: number): any => ({
  type: SET_LOADING,
  payload: loading,
});

export const stopLoadingAction = (loading: number): any => ({
  type: STOP_LOADING,
  payload: loading,
});
