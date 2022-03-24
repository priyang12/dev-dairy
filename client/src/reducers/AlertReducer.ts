import type { AlertState } from '../actions/interfaces';
import {
  SET_LOADING,
  STOP_LOADING,
  SET_ALERT,
  CLEAR_ALERT,
} from '../actions/types';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type AlertPayload = {
  [SET_LOADING]: number;
  [STOP_LOADING]: number;
  [SET_ALERT]: { msg: string; result: string };
  [CLEAR_ALERT]: any;
};

export type AlertActions = ActionMap<AlertPayload>[keyof ActionMap<AlertPayload>];

const initialState: AlertState = {
  alert: null,
  result: false,
  loading: 0,
};

// eslint-disable-next-line
export default (state = initialState, action: AlertActions) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload + 1,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: action.payload - 1,
      };
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload.msg,
        result: action.payload.result,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        alert: null,
        result: false,
      };
    default:
      return state;
  }
};
