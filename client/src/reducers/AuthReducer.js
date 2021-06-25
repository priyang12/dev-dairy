import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SENDTOKEN,
  UPDATE_USER_PIC,
} from "../actions/types";

const initstate = {
  token: null,
  loading: true,
  isAuth: null,
  user: null,
  error: null,
};

// eslint-disable-next-line
export default (state = initstate, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuth: true,
        error: null,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("avatar");
      return {
        ...state,
        token: null,
        user: null,
        isAuth: null,
        error: action.payload,
        loading: false,
      };
    case UPDATE_USER_PIC:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SENDTOKEN:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
