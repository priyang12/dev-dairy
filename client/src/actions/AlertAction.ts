import {
  SET_LOADING,
  STOP_LOADING,
  SET_ALERT,
  CLEAR_ALERT,
} from "../actions/types";

export const setAlertAction = (msg: string, result: boolean): any => {
  return {
    type: SET_ALERT,
    payload: { msg, result },
  };
};

export const clearAlertAction = (): any => {
  return {
    type: CLEAR_ALERT,
  };
};

export const setLoadingAction = (loading: number): any => {
  return {
    type: SET_LOADING,
    payload: loading,
  };
};

export const stopLoadingAction = (loading: number): any => {
  return {
    type: STOP_LOADING,
    payload: loading,
  };
};
