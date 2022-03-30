import type { User, UserInfo } from 'firebase/auth';
import type { AuthState } from '../actions/interfaces';
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_USER_PIC
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
type AuthPayload = {
  [REGISTER_SUCCESS]: UserInfo;
  [LOGIN_SUCCESS]: UserInfo;
  [USER_LOADED]: User;
  [LOGOUT]: null;
  [UPDATE_USER_PIC]: string;
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

// Retrieve user data from session storage
const getUser = (): User | null => {
  const user = sessionStorage.getItem('user');
  return user != null ? JSON.parse(user) : null;
};
const data = getUser();
const initialState: AuthState = {
  token: null,
  isAuth: !!data,
  user: data
};

// eslint-disable-next-line
export default (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        error: null
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuth: true
      };
    case LOGOUT:
      return {
        token: null,
        user: null,
        isAuth: null,
        error: null
      };
    case UPDATE_USER_PIC:
      return {
        ...state,
        alert: action.payload,
        error: null
      };

    default:
      return state;
  }
};
