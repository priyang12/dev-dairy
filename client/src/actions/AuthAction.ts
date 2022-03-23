import { REGISTER_SUCCESS, USER_LOADED, LOGIN_SUCCESS, LOGOUT } from "./types";
import axios from "axios";

import { FirebaseAuth } from "../FirebaseConfig";
import { Dispatch } from "react";
import { setAlertAction, setLoadingAction } from "./AlertAction";
import { AuthActions } from "../reducers/AuthReducer";
import { AlertActions } from "../reducers/AlertReducer";

//Load user
export const loadUser = () => async (
  dispatch: Dispatch<AlertActions | AuthActions>
) => {
  try {
    dispatch(setLoadingAction(1));
    const res = await axios.get("/api/users/me");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err: any) {
    let errorMessage = "Server Error";
    if (err.response) {
      errorMessage = err.response.data.message;
    }
    dispatch(setAlertAction(errorMessage, false));
  } finally {
    dispatch(setLoadingAction(-1));
  }
};

//register User
// export const register = (data) => async (dispatch) => {
//   try {
//     const res = await axios.post("/api/users/register", data, config);
//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: res.data,
//     });
//     dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.msg;
//     console.log(errors);
//     dispatch({
//       type: REGISTER_FAIL,
//       payload: errors,
//     });
//   }
// };
// Login User
export const LoginAction = (data: any) => async (
  dispatch: Dispatch<AlertActions | AuthActions>
) => {
  try {
    dispatch(setLoadingAction(1));
    const response: any = await FirebaseAuth.signInWithEmailAndPassword(
      data.email,
      data.password
    );
    const { user } = response;
    console.log(response);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
  } catch (err: any) {
    let errorMessage = "Server Error";
    if (err.response) {
      errorMessage = err.response.data.message;
    }
    dispatch(setAlertAction(errorMessage, false));
  }
};

// // Update Profile Picture
// export const UpdateProfilePic = (data) => async (dispatch) => {
//   try {
//     const res = await axios.post("/api/PhotoUpload/avatar", data);
//     dispatch({
//       type: UPDATE_USER_PIC,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.msg;
//     console.log(errors);
//     dispatch({
//       type: AUTH_ERROR,
//       payload: errors,
//     });
//   }
// };

//logout user
export const logout = () => async (dispatch: Dispatch<AuthActions>) =>
  dispatch({ type: LOGOUT, payload: null });

// export const cleanCurrent  = () =>{
//     return{
//         type: CLEAR_CURRENT,
//     }
// }
