/* eslint-disable */
import axios from 'axios';
import type { Dispatch } from 'react';
import { REGISTER_SUCCESS, USER_LOADED, LOGIN_SUCCESS, LOGOUT } from './types';

import { FirebaseAuth } from '../FirebaseConfig';
import { setAlertAction, setLoadingAction } from './AlertAction';
import type { AuthActions } from '../reducers/AuthReducer';
import type { AlertActions } from '../reducers/AlertReducer';

// Load user
export const loadUser =
  () => async (dispatch: Dispatch<AlertActions | AuthActions>) => {
    try {
      dispatch(setLoadingAction(1));
      const res = await axios.get('/api/users/me');
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err: any) {
      let errorMessage = 'Server error';
      errorMessage = Boolean(err.response) && err.response.data.message;
      dispatch(setAlertAction(errorMessage, false));
    } finally {
      dispatch(setLoadingAction(-1));
    }
  };

// register User
export const RegisterUserAction =
  (UserData: { name: string; email: string; password: string }) =>
  async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch(setLoadingAction(1));
      // register firebase user and update display name
      const { user }: any = await FirebaseAuth.createUserWithEmailAndPassword(
        UserData.email,
        UserData.password
      );
      await user.updateProfile({
        displayName: UserData.name
      });

      dispatch({
        type: REGISTER_SUCCESS,
        payload: user
      });
      dispatch(setAlertAction('User registered successfully', true));
    } catch (err: any) {
      let errorMessage = 'Server error';
      errorMessage = Boolean(err.response) && err.response.data.message;
      dispatch(setAlertAction(errorMessage, false));
    } finally {
      dispatch(setLoadingAction(-1));
    }
  };

// Login User
export const LoginAction =
  (data: any) => async (dispatch: Dispatch<AlertActions | AuthActions>) => {
    try {
      dispatch(setLoadingAction(1));
      const response: any = await FirebaseAuth.signInWithEmailAndPassword(
        data.email,
        data.password
      );
      const { user } = response;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user
      });
    } catch (err: any) {
      let errorMessage = 'Server error';
      errorMessage = Boolean(err.response)
        ? err.response.data.message
        : err.code;

      dispatch(setAlertAction(err.code, false));
    } finally {
      dispatch(setLoadingAction(-1));
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

// logout user
export const logout = () => async (dispatch: Dispatch<AuthActions>) => {
  try {
    await FirebaseAuth.signOut();
    dispatch({ type: LOGOUT, payload: null });
  } catch (err: any) {
    let errorMessage = 'Server error';
    errorMessage = Boolean(err.response) && err.response.data.message;
    dispatch(setAlertAction(errorMessage, false));
  }
};
