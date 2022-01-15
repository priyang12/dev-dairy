import { User, UserInfo } from "firebase/auth";
import { AuthState } from "../actions/interfaces";
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_USER_PIC,
} from "../actions/types";

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
const data = {
  displayName: "priyang",
  email: "gk@gmail.com",
  emailVerified: false,
  isAnonymous: false,
  phoneNumber: null,
  photoURL: null,
  providerData: Array(1),
  providerId: "firebase",
  refreshToken:
    "AFxQ4_pLdv3Wp2VvUFpWM06l0MAOhuTpcgaQNiXAZAos1M5DevGqimzPYgUhQid_N5ZHi6sP6S-2JEtp5CMbCLI7QM9FbCqipYBxPWQbF_krLwHzWxeOlHzn5xvVWEUvZ3Ch4YMWc-Sb5WTgxPmrrrpDb67RjtirWjsNfJ6VbPdHD_CC1SFyDve8VxhiwbKBHBjcsUbqbAuJ",
  tenantId: null,
  uid: "3d5idu5RcuYWKkuuv5jVfrZHx8e2",
};

type TaskPayload = {
  [REGISTER_SUCCESS]: UserInfo;
  [LOGIN_SUCCESS]: UserInfo;
  [USER_LOADED]: User;
  [LOGOUT]: null;
  [UPDATE_USER_PIC]: string;
};

export type AuthActions = ActionMap<TaskPayload>[keyof ActionMap<TaskPayload>];

const initialState: AuthState = {
  token: null,
  isAuth: null,
  user: null,
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
        error: null,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case LOGOUT:
      return {
        token: null,
        user: null,
        isAuth: null,
        error: null,
      };
    case UPDATE_USER_PIC:
      return {
        ...state,
        alert: action.payload,

        error: null,
      };

    default:
      return state;
  }
};
