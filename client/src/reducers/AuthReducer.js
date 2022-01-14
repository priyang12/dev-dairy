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

// eslint-disable-next-line
export default (state = initstate, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
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
        alert: action.payload.msg,
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
