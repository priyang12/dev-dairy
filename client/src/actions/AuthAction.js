import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SET_LOADING,
  AUTH_ERROR,
  SENDTOKEN,
} from "./types";
import axios from "axios";
import setAuth from "../utils/setAuthToken";

//Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuth(localStorage.token);
    try {
      const res = await axios.get("/api/users/getuser");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: AUTH_ERROR,
        payload: "Auth ERROR",
      });
    }
  }
};
//register User
export const register = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/users/register", data, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.msg;
    console.log(errors);
    dispatch({
      type: REGISTER_FAIL,
      payload: errors,
    });
  }
};
// Login User
export const login = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/users/login", data, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// send Tokenfor resetPassword User
export const sendToken = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/users/resetpassword", email, config);

    dispatch({
      type: SENDTOKEN,
      payload: res.data.msg,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};
// resetPassword User
export const resetPassword = (password) => async (dispatch) => {
  if (localStorage.token) {
    setAuth(localStorage.token);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put("/api/users/resetpassword", password, config);

      dispatch({
        type: LOGIN_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  }
};
//logout user
export const logout = () => async (dispatch) => dispatch({ type: LOGOUT });

//loading
export const loading = () => async (dispatch) =>
  dispatch({ type: SET_LOADING });

// Clear Errors
export const clearErrors = () => async (dispatch) =>
  dispatch({ type: CLEAR_ERRORS });

// export const cleanCurrent  = () =>{
//     return{
//         type: CLEAR_CURRENT,
//     }
// }
